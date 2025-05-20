'use client'

import 'github-markdown-css/github-markdown.css'
import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store'
import {
    newSession,
    selectSession,
    deleteSession,
    renameSession,
    addUserMessage,
    addAssistantMessage,
    ChatSession,
} from '@/store/slices/agentAiSlice'
import {
    FaPaperPlane,
    FaChevronLeft,
    FaPlus,
    FaEllipsisV,
    FaEdit,
    FaTrash,
    FaMap,
} from 'react-icons/fa'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { askStudentAgent } from '@/api/agents'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MindMap, { MindMapData } from '@/components/MindMap'

// Hook para montagem
function useHasMounted() {
    const [hasMounted, setHasMounted] = useState(false)
    useEffect(() => setHasMounted(true), [])
    return hasMounted
}

// Indicador de typing
function TypingIndicator() {
    return (
        <div className="flex space-x-1 p-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-wave" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-wave" style={{ animationDelay: '0.15s' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-wave" style={{ animationDelay: '0.3s' }} />
        </div>
    )
}

export default function ClientStudyRoom() {
    const dispatch = useDispatch()
    const { auth } = useAuth()
    const router = useRouter()
    const hasMounted = useHasMounted()

    // Modal mental map
    const [isMindMapModalOpen, setIsMindMapModalOpen] = useState(false)
    const [mindMapData, setMindMapData] = useState<MindMapData | null>(null)

    // Nova sessão ao montar
    useEffect(() => { dispatch(newSession()) }, [dispatch])

    // Selectors e estados
    const allSessions = useSelector((state: RootState) => state.agentAi.sessions)
    const currentSessionIndex = useSelector((state: RootState) => state.agentAi.currentSessionIndex)
    const sessionsForHistory = allSessions.filter(sess => sess.messages.some(m => m.role === 'user'))
    const [prompt, setPrompt] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null)
    const bottomRef = useRef<HTMLDivElement>(null)

    // Primeira mensagem automática
    useEffect(() => {
        if (!hasMounted) return
        const session = allSessions[currentSessionIndex]
        if (session.messages.length === 0) {
            setIsTyping(true)
            const timer = setTimeout(() => {
                dispatch(addAssistantMessage({ sessionId: session.id, content: 'Olá, como posso te ajudar hoje?' }))
                setIsTyping(false)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [hasMounted, currentSessionIndex, allSessions, dispatch])

    // Redirect sem token
    useEffect(() => {
        if (!hasMounted) return
        if (!auth.access_token) router.replace('/login')
    }, [hasMounted, auth.access_token, router])

    // Scroll ao fim
    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [allSessions, currentSessionIndex, isTyping])

    // Fecha dropdown clicando fora
    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (!(e.target as Element).closest('.dropdown-container')) setDropdownOpen(null)
        }
        document.addEventListener('click', onClickOutside)
        return () => document.removeEventListener('click', onClickOutside)
    }, [])

    if (!hasMounted || !auth.access_token) return null

    // Renderiza conteúdo de mensagem ou botão
    const renderMessageContent = (content: string) => {
        const clean = content.trim().replace(/^```json/, '').replace(/```$/, '')
        try {
            const parsed = JSON.parse(clean)
            if (parsed?.mindMap) {
                return (
                    <button
                        onClick={() => { setMindMapData(parsed); setIsMindMapModalOpen(true) }}
                        className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                    >
                        <FaMap className="text-white" />
                        Ver Mapa Mental
                    </button>
                )
            }
        } catch { }
        return <article className="markdown-body break-words"><ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown></article>
    }

    // Handlers chat
    const handleNewChat = () => { dispatch(newSession()); setPrompt(''); setDropdownOpen(null) }
    const handleSessionClick = (idx: number) => { dispatch(selectSession({ index: idx })); setPrompt(''); setDropdownOpen(null) }
    const handleSend = () => {
        const text = prompt.trim()
        if (!text) return

        const session = allSessions[currentSessionIndex]

        if (session.title === 'Novo chat') {
            dispatch(renameSession({ id: session.id, title: text }))
        }

        dispatch(addUserMessage({ sessionId: session.id, content: text }))
        setPrompt('')
        setIsTyping(true)

        askStudentAgent(text, auth.access_token!)
            .then(({ answer }) =>
                dispatch(addAssistantMessage({ sessionId: session.id, content: answer }))
            )
            .catch(err =>
                dispatch(addAssistantMessage({ sessionId: session.id, content: `❗ Erro: ${err.message}` }))
            )
            .finally(() => setIsTyping(false))
    }

    // Formatação histórico
    const now = new Date()
    const monthFmt = new Intl.DateTimeFormat('pt-BR', { month: 'long' })
    const getDaysDiff = (a: Date, b: Date) => Math.floor((Date.UTC(a.getFullYear(), a.getMonth(), a.getDate()) - Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())) / (1000 * 60 * 60 * 24))
    const getLabel = (iso: string) => {
        const d = new Date(iso), diff = getDaysDiff(now, d)
        if (diff === 0) return 'Hoje'
        if (diff === 1) return 'Ontem'
        if (diff <= 7) return '7 dias anteriores'
        if (diff <= 30) return '30 dias anteriores'
        if (diff < 365) return monthFmt.format(d)
        return `${monthFmt.format(d)} de ${d.getFullYear()}`
    }
    const sorted = [...sessionsForHistory].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    const groups = sorted.reduce<{ label: string; sessions: ChatSession[] }[]>((acc, sess) => {
        const lbl = getLabel(sess.createdAt)
        const g = acc.find(x => x.label === lbl)
        if (g) g.sessions.push(sess)
        else acc.push({ label: lbl, sessions: [sess] })
        return acc
    }, [])
    const chatHistory = allSessions[currentSessionIndex].messages

    return (
        <main className="relative flex container flex-col h-[85dvh] min-h-[500px] p-6 bg-gradient-to-b from-[#2A1248] to-[#15062E] text-white space-y-6">

            {/* Modal full-screen */}
            {isMindMapModalOpen && mindMapData && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative w-full h-full">
                        <button
                            onClick={() => setIsMindMapModalOpen(false)}
                            className="absolute top-4 right-4 text-purple-500 text-3xl font-bold hover:text-purple-300 z-10"
                        >×</button>
                        <div className="w-full h-full overflow-auto p-4 bg-gray-950 rounded-lg">
                            <MindMap data={mindMapData} />
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <Image src="/logo.png" alt="Logo Eduk.ai" width={120} height={120} className="absolute top-4 left-1/2 transform -translate-x-1/2" />
            <div className="mb-2">
                <button onClick={() => router.back()} className="flex items-center text-sm text-gray-300 hover:text-gray-100">
                    <FaChevronLeft className="mr-1" /> Voltar
                </button>
            </div>
            <h1 className="text-xl font-bold text-center mt-4 opacity-50">ASSISTENTE EDUCACIONAL</h1>

            {/* Body */}
            <div className="flex flex-1 gap-6 overflow-hidden">
                {/* Chat area */}
                <section className="flex-1 flex flex-col bg-[#2A1248] rounded-2xl p-4 overflow-hidden">
                    <div className="chat flex-1 overflow-y-auto pr-2">
                        {chatHistory.map((msg, i) => (
                            <div key={i} className={`flex mb-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.role === 'user' ? 'bg-purple-500' : 'bg-purple-700'} text-sm sm:text-base`} style={{ transformOrigin: msg.role === 'user' ? 'bottom right' : 'bottom left' }}>
                                    {renderMessageContent(msg.content)}
                                </div>
                            </div>
                        ))}
                        {isTyping && <TypingIndicator />}
                        <div ref={bottomRef} />
                    </div>
                    {/* Input */}
                    <div className="mt-4 flex">
                        <input
                            type="text"
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            placeholder="Peça um resumo, mapa mental ou questionário..."
                            className="flex-1 p-2 rounded-l-lg bg-[#1D0A32] text-white placeholder-[rgba(194,168,255,0.7)] focus:outline-none"
                        />
                        <button onClick={handleSend} className="px-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-r-lg flex items-center justify-center">
                            <FaPaperPlane />
                        </button>
                    </div>
                </section>

                {/* Histórico */}
                <aside className="w-1/3 flex flex-col bg-[#ECE5F6] rounded-2xl p-4 text-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold">Histórico</h2>
                        <button onClick={handleNewChat} className="p-2 rounded-md hover:bg-[#e0d7f7]">
                            <FaPlus />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {groups.map(group => (
                            <React.Fragment key={group.label}>
                                <div className="py-3 text-xs font-semibold text-gray-500">{group.label}</div>
                                {group.sessions.map(sess => {
                                    const idx = allSessions.findIndex(s => s.id === sess.id)
                                    const active = idx === currentSessionIndex
                                    return (
                                        <div key={sess.id} className={`relative flex items-center justify-between px-3 py-2 rounded-md dropdown-container ${active ? 'bg-[#d1c4e9]' : ''} hover:bg-[#e0d7f7]`}>
                                            <button className="flex-1 text-left text-sm font-medium truncate" onClick={() => handleSessionClick(idx)}>{sess.title}</button>
                                            <button onClick={() => setDropdownOpen(o => o === idx ? null : idx)} className="ml-2 p-1 rounded hover:bg-gray-200"><FaEllipsisV /></button>
                                            {dropdownOpen === idx && (
                                                <div className="absolute right-2 top-full mt-1 w-32 bg-white rounded shadow-lg text-gray-800 z-10">
                                                    <button onClick={() => { const t = window.prompt('Renomear chat:', sess.title); if (t?.trim()) dispatch(renameSession({ id: sess.id, title: t.trim() })); setDropdownOpen(null) }} className="flex items-center w-full px-2 py-1 hover:bg-gray-100"><FaEdit className="mr-2" />Renomear</button>
                                                    <button onClick={() => { dispatch(deleteSession({ id: sess.id })); setDropdownOpen(null) }} className="flex items-center w-full px-2 py-1 hover:bg-gray-100"><FaTrash className="mr-2" />Excluir</button>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </aside>
            </div>
        </main>
    )
}
