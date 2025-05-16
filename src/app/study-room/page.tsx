// src/app/study-room/page.tsx
'use client'
export const dynamic = 'force-dynamic'

import 'github-markdown-css/github-markdown.css'
import React, { useState, useRef, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { subjects as subjectsData, SubjectData } from '@/consts/subjects'
import {
    FaPaperPlane,
    FaChevronLeft,
    FaPlus,
    FaEllipsisV,
    FaEdit,
    FaTrash,
} from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import { askStudentAgent } from '@/api/agents'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/** Hook para saber quando o componente já montou no cliente */
function useHasMounted() {
    const [hasMounted, setHasMounted] = useState(false)
    useEffect(() => setHasMounted(true), [])
    return hasMounted
}

/** indica “digitando…” */
function TypingIndicator() {
    return (
        <div className="flex space-x-1 p-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-wave" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-wave delay-150" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-wave delay-300" />
        </div>
    )
}

/** bolha de mensagem */
function Message({
    children,
    isUser,
}: {
    children: React.ReactNode
    isUser?: boolean
}) {
    const [isVisible, setIsVisible] = useState(isUser ?? false)
    useEffect(() => {
        if (!isUser) setIsVisible(true)
    }, [isUser])

    return (
        <div className={`flex mb-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`
          max-w-[80%] rounded-lg px-4 py-2
          ${isUser ? 'bg-purple-500' : 'bg-purple-700'}
          text-sm sm:text-base
          transition-opacity duration-500
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
                style={{ transformOrigin: isUser ? 'bottom right' : 'bottom left' }}
            >
                <article className="markdown-body break-words">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {children as string}
                    </ReactMarkdown>
                </article>
            </div>
        </div>
    )
}

type ChatMessage = {
    role: 'user' | 'assistant'
    content: string
    messageType: 'Resumo' | 'Mapa mental' | 'Questionário'
}

type ChatSession = {
    title: string
    messages: ChatMessage[]
}

export default function StudyRoomPage() {
    const { auth } = useAuth()
    const router = useRouter()
    const hasMounted = useHasMounted()
    const params = useSearchParams()

    const subjectFromQuery = params.get('subject') || subjectsData[0].name
    const initialSubject =
        subjectsData.find((s) => s.name === subjectFromQuery) || subjectsData[0]

    const [selectedSubject, setSelectedSubject] = useState<SubjectData>(
        initialSubject
    )
    const [selectedType, setSelectedType] = useState<'Resumo' | 'Mapa mental' | 'Questionário'>(
        'Resumo'
    )
    const [prompt, setPrompt] = useState('')
    const [sessions, setSessions] = useState<ChatSession[]>([
        {
            title: 'Novo chat',
            messages: [
                {
                    role: 'assistant',
                    content: 'Olá, como posso te ajudar hoje?',
                    messageType: 'Resumo',
                },
            ],
        },
    ])
    const [currentSession, setCurrentSession] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null)
    const bottomRef = useRef<HTMLDivElement>(null)

    // Proteção de rota
    useEffect(() => {
        if (!hasMounted) return
        if (!auth.access_token) router.replace('/login')
    }, [hasMounted, auth.access_token, router])

    // Scroll automático
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [sessions, currentSession, isTyping])

    // Fecha dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (!(e.target as Element).closest('.dropdown-container')) {
                setDropdownOpen(null)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    if (!hasMounted || !auth.access_token) return null

    const handleNewChat = () => {
        const newSession: ChatSession = {
            title: 'Novo chat',
            messages: [
                {
                    role: 'assistant',
                    content: 'Olá, como posso te ajudar hoje?',
                    messageType: 'Resumo',
                },
            ],
        }
        setSessions((prev) => [...prev, newSession])
        setCurrentSession(sessions.length)
        setPrompt('')
        setDropdownOpen(null)
    }

    const handleSessionClick = (idx: number) => {
        setCurrentSession(idx)
        setPrompt('')
        setDropdownOpen(null)
    }

    const handleSend = () => {
        const text = prompt.trim()
        if (!text) return

        setSessions((prev) =>
            prev.map((s, i) =>
                i === currentSession
                    ? {
                        ...s,
                        title: text,
                        messages: [
                            ...s.messages,
                            { role: 'user', content: text, messageType: selectedType },
                        ],
                    }
                    : s
            )
        )
        setPrompt('')
        setIsTyping(true)

        askStudentAgent(text, auth.access_token!)
            .then(({ answer }) => {
                setSessions((prev) =>
                    prev.map((s, i) =>
                        i === currentSession
                            ? {
                                ...s,
                                messages: [
                                    ...s.messages,
                                    {
                                        role: 'assistant',
                                        content: answer,
                                        messageType: selectedType,
                                    },
                                ],
                            }
                            : s
                    )
                )
            })
            .catch((err: Error) => {
                setSessions((prev) =>
                    prev.map((s, i) =>
                        i === currentSession
                            ? {
                                ...s,
                                messages: [
                                    ...s.messages,
                                    {
                                        role: 'assistant',
                                        content: `❗ Erro: ${err.message}`,
                                        messageType: selectedType,
                                    },
                                ],
                            }
                            : s
                    )
                )
            })
            .finally(() => setIsTyping(false))
    }

    const handleToggleDropdown = (idx: number) =>
        setDropdownOpen(dropdownOpen === idx ? null : idx)

    const handleRenameSession = (idx: number) => {
        const newTitle = window.prompt('Renomear chat:', sessions[idx].title)
        if (newTitle?.trim()) {
            setSessions((prev) =>
                prev.map((s, i) =>
                    i === idx ? { ...s, title: newTitle.trim() } : s
                )
            )
        }
        setDropdownOpen(null)
    }

    const handleDeleteSession = (idx: number) => {
        setSessions((prev) => prev.filter((_, i) => i !== idx))
        if (currentSession === idx) {
            setCurrentSession((p) => (p > 0 ? p - 1 : 0))
        } else if (currentSession > idx) {
            setCurrentSession((p) => p - 1)
        }
        setDropdownOpen(null)
    }

    const chatHistory = sessions[currentSession].messages

    return (
        <main className="min-h-[600px] h-[80dvh] p-6 bg-gradient-to-b from-[#2A1248] to-[#15062E] text-white flex flex-col space-y-6 mt-20">
            <div className="mb-2">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-sm text-gray-300 hover:text-gray-100"
                >
                    <FaChevronLeft className="mr-1" />
                    Voltar
                </button>
            </div>

            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold">SEU ASSISTENTE EDUCACIONAL</h1>
                <div className="flex items-center space-x-4">
                    <select
                        value={selectedType}
                        onChange={(e) =>
                            setSelectedType(e.target.value as 'Resumo' | 'Mapa mental')
                        }
                        className="p-2 bg-[#1D0A32] rounded-lg text-white"
                    >
                        <option value="summary">Resumo</option>
                        <option value="mindmap">Mapa mental</option>
                        <option value="questionnaire">Questionário</option>
                    </select>
                    <select
                        value={selectedSubject.name}
                        onChange={(e) => {
                            const s = subjectsData.find((s) => s.name === e.target.value)
                            if (s) setSelectedSubject(s)
                        }}
                        className="w-48 p-2 bg-[#1D0A32] rounded-lg text-white"
                    >
                        {subjectsData.map((s) => (
                            <option key={s.name} value={s.name}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>
            </header>

            <div className="flex flex-1 gap-6">
                <section className="flex-1 flex flex-col bg-[#2A1248] rounded-2xl p-4">
                    <div className="flex-1 overflow-y-auto">
                        {chatHistory.map((msg, i) => (
                            <Message key={i} isUser={msg.role === 'user'}>
                                {msg.content}
                            </Message>
                        ))}
                        {isTyping && <TypingIndicator />}
                        <div ref={bottomRef} />
                    </div>
                    <div className="mt-4 flex">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={`Pergunte algo sobre ${selectedSubject.name}...`}
                            className="flex-1 p-2 rounded-l-lg bg-[#1D0A32] text-white focus:outline-none"
                        />
                        <button
                            onClick={handleSend}
                            className="px-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-r-lg flex items-center justify-center"
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </section>

                <aside className="w-1/3 flex flex-col bg-[#ECE5F6] rounded-2xl p-4 text-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold">Histórico</h2>
                        <button
                            onClick={handleNewChat}
                            className="p-2 rounded-md hover:bg-[#e0d7f7]"
                        >
                            <FaPlus />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {sessions.map((session, idx) => (
                            <div
                                key={idx}
                                className={`relative flex items-center justify-between px-3 py-2 rounded-md dropdown-container ${currentSession === idx ? 'bg-[#d1c4e9]' : ''
                                    } hover:bg-[#e0d7f7]`}
                            >
                                <button
                                    className="flex-1 text-left text-sm font-medium truncate"
                                    onClick={() => handleSessionClick(idx)}
                                >
                                    {session.title}
                                </button>
                                <button
                                    onClick={() => handleToggleDropdown(idx)}
                                    className="ml-2 p-1 rounded hover:bg-gray-200"
                                >
                                    <FaEllipsisV />
                                </button>
                                {dropdownOpen === idx && (
                                    <div className="absolute right-2 top-full mt-1 w-32 bg-white rounded shadow-lg text-gray-800 z-10">
                                        <button
                                            onClick={() => handleRenameSession(idx)}
                                            className="flex items-center w-full px-2 py-1 hover:bg-gray-100"
                                        >
                                            <FaEdit className="mr-2" /> Renomear
                                        </button>
                                        <button
                                            onClick={() => handleDeleteSession(idx)}
                                            className="flex items-center w-full px-2 py-1 hover:bg-gray-100"
                                        >
                                            <FaTrash className="mr-2" /> Excluir
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </main>
    )
}
