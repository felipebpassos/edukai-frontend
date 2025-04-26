// File: src/app/dashboard/student/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

type Subject = {
    name: string
    avg: number
    image: string
}

// Simulação de dados dinâmicos
const subjects: Subject[] = [
    { name: 'Matemática', avg: 6.2, image: '/images/matematica.jpg' },
    { name: 'Português', avg: 8.1, image: '/images/portugues.jpg' },
    { name: 'Ciências', avg: 5.4, image: '/images/ciencias.jpg' },
    { name: 'História', avg: 7.0, image: '/images/historia.jpg' },
    { name: 'Geografia', avg: 4.9, image: '/images/geografia.jpg' },
]

export default function StudentDashboardPage() {
    const [showBars, setShowBars] = useState(false)

    const worstThree = [...subjects]
        .sort((a, b) => a.avg - b.avg)
        .slice(0, 3)

    const [activeIndex, setActiveIndex] = useState(0)
    const len = subjects.length
    const prev = () => setActiveIndex(i => (i - 1 + len) % len)
    const next = () => setActiveIndex(i => (i + 1) % len)
    const leftIndex = (activeIndex - 1 + len) % len
    const rightIndex = (activeIndex + 1) % len

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white">
            {/* Logo */}
            <header className="py-4">
                <div className="flex items-center justify-center space-x-2">
                    <Image src="/logo.png" alt="Eduk.AI" width={120} height={40} />
                </div>
                {/* Nav */}
                <nav className="mt-4 flex justify-center space-x-8 uppercase text-sm">
                    <Link href="#" className="hover:underline">Home</Link>
                    <Link href="#" className="hover:underline">Turma</Link>
                    <Link href="#" className="hover:underline">Boletim</Link>
                    <Link href="#" className="hover:underline">Perfil</Link>
                </nav>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-12">
                {/* Gráfico de barras */}
                <section className="bg-purple-800/50 p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl">Seu relatório</h2>
                        <button
                            onClick={() => setShowBars(v => !v)}
                            className="text-2xl"
                            aria-label="Mostrar/ocultar barras"
                        >
                            {showBars ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={subjects}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Bar
                                dataKey="avg"
                                fill="#A78BFA"
                                opacity={showBars ? 1 : 0}
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </section>

                {/* Recomendações */}
                <section>
                    <h3 className="text-lg mb-2">
                        Recomendamos o estudo dessas matérias
                    </h3>
                    <div className="flex space-x-4">
                        {worstThree.map(subj => (
                            <span
                                key={subj.name}
                                className="px-4 py-2 bg-indigo-600 rounded-full text-sm"
                            >
                                {subj.name}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Carrossel 3D */}
                <section className="relative h-80 flex items-center justify-center">
                    {/* Navegação */}
                    <button
                        onClick={prev}
                        className="absolute left-4 text-3xl opacity-50 hover:opacity-100 z-20"
                        aria-label="Anterior"
                    >
                        ‹
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-4 text-3xl opacity-50 hover:opacity-100 z-20"
                        aria-label="Próximo"
                    >
                        ›
                    </button>

                    {/* Slides */}
                    {subjects.map((subj, i) => {
                        let style = ''
                        if (i === activeIndex) style = 'scale-100 z-20'
                        else if (i === leftIndex)
                            style = 'absolute left-0 scale-75 grayscale z-10'
                        else if (i === rightIndex)
                            style = 'absolute right-0 scale-75 grayscale z-10'
                        else return null

                        return (
                            <div
                                key={subj.name}
                                className={`transition-transform duration-500 ${style}`}
                            >
                                <div className="relative w-64 h-40 rounded-lg overflow-hidden shadow-lg">
                                    <Image
                                        src={subj.image}
                                        alt={subj.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white font-bold text-lg">
                                            {subj.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>
            </main>
        </div>
    )
}
