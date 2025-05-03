// app/study-room/page.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { subjects as subjectsData, SubjectData } from '@/consts/subjects'
import { FaPaperPlane } from 'react-icons/fa'

/** indica “digitando…” */
export function TypingIndicator() {
    return (
        <div className="flex space-x-1 p-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-wave" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-wave delay-150" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-wave delay-300" />
        </div>
    )
}

/** bolha de mensagem */
export function Message({
    children,
    isUser
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
                className={`max-w-[80%] rounded-lg px-4 py-2 
          ${isUser ? 'bg-purple-600' : 'bg-purple-700'} 
          text-sm sm:text-base
          whitespace-pre-line transition-opacity duration-500 
          ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    transformOrigin: isUser ? 'bottom right' : 'bottom left'
                }}
            >
                {children}
            </div>
        </div>
    )
}

type ChatMessage = {
    role: 'user' | 'assistant'
    content: string
}

export default function StudyRoom() {
    const params = useSearchParams()
    const subjectFromQuery = params.get('subject') || subjectsData[0].name
    const initialSubject =
        subjectsData.find((s) => s.name === subjectFromQuery) ||
        subjectsData[0]

    const [selectedSubject, setSelectedSubject] = useState<SubjectData>(initialSubject)
    const [prompt, setPrompt] = useState('')
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
    const [isTyping, setIsTyping] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    // scroll sempre que muda histórico ou typing
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatHistory, isTyping])

    // primeira mensagem da IA
    useEffect(() => {
        setIsTyping(true)
        setTimeout(() => {
            setChatHistory([{ role: 'assistant', content: 'Olá, como posso te ajudar hoje?' }])
            setIsTyping(false)
        }, 800)
    }, [])

    const handleSend = () => {
        const text = prompt.trim()
        if (!text) return
        setChatHistory((h) => [...h, { role: 'user', content: text }])
        setPrompt('')
        setIsTyping(true)
        setTimeout(() => {
            setChatHistory((h) => [
                ...h,
                {
                    role: 'assistant',
                    content: `Resposta simulada para "${text}" em ${selectedSubject.name}.`
                }
            ])
            setIsTyping(false)
        }, 800)
    }

    return (
        <main className="min-h-[600px] h-[80dvh] p-6 bg-gradient-to-b from-[#2A1248] to-[#15062E] text-white flex flex-col space-y-6">
            {/* Título + Select */}
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold">
                    CONVERSE ABAIXO COM SEU ASSISTENTE EDUCACIONAL
                </h1>
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
            </header>

            {/* Chat + Histórico */}
            <div className="flex flex-1 gap-6">
                {/* Chat principal */}
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

                {/* Histórico de prompts */}
                <aside className="w-1/3 flex flex-col bg-[#ECE5F6] rounded-2xl p-4 text-gray-800">
                    <h2 className="mb-4 font-semibold">Histórico</h2>
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {chatHistory.map((msg, i) => (
                            <button
                                key={i}
                                onClick={() => setPrompt(msg.content)}
                                className="w-full text-left px-3 py-2 rounded-md hover:bg-[#e0d7f7] text-sm"
                            >
                                {msg.content.length > 40
                                    ? msg.content.substring(0, 40) + '…'
                                    : msg.content}
                            </button>
                        ))}
                    </div>
                </aside>
            </div>
        </main>
    )
}
