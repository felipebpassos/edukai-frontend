// src/components/Teacher/Report.tsx
'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

type RankItem = { name: string; score: number }

// mock dos dados
const studentsData: RankItem[] = [
    { name: 'José da Silva', score: 88 },
    { name: 'Pedro Campos', score: 76 },
    { name: 'Maria Freitas', score: 92 },
    { name: 'Ana Nunes', score: 80 },
    { name: 'Reinaldo B.', score: 72 },
    { name: 'RoseMariana', score: 85 },
    { name: 'Cristian Silva', score: 68 },
    { name: 'Nathalia Lopez', score: 74 },
]

const topPerformers: RankItem[] = [
    { name: 'Maria', score: 95 },
    { name: 'José', score: 90 },
    { name: 'Ana', score: 88 },
    { name: 'Rose', score: 85 },
]

const lowPerformers: RankItem[] = [
    { name: 'Pedro', score: 60 },
    { name: 'Nathalia', score: 65 },
    { name: 'Reinaldo', score: 58 },
    { name: 'Cristian', score: 62 },
]

export default function Report() {
    const { name } = useSelector((state: RootState) => state.auth)
    const today = new Date()
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(today)

    return (
        <div className="bg-purple-900/50 p-6 rounded-2xl shadow-lg text-white">
            {/* Boas vindas */}
            <div className="border border-purple-700 rounded-md p-6 mb-8 text-center">
                <p className="text-sm opacity-75">Boas vindas</p>
                <h1 className="text-2xl font-semibold mt-1">Prof. {name}</h1>
                <p className="text-sm opacity-75 mt-1">{formattedDate}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Rank da sala (horizontal) */}
                <section className="bg-purple-800/50 p-4 rounded-lg shadow">
                    <h2 className="text-xl mb-4">Rank da sala</h2>
                    <ResponsiveContainer height={300}>
                        <BarChart
                            layout="vertical"
                            data={studentsData}
                            margin={{ top: 0, right: 20, bottom: 0, left: 80 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis type="number" domain={[0, 100]} hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                tick={{ fontSize: 12 }}
                                width={120}
                            />
                            <Tooltip />
                            <Bar
                                dataKey="score"
                                fill="#A78BFA"
                                radius={[0, 4, 4, 0]}
                                barSize={12}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </section>

                {/* Bom Desempenho & Precisa melhorar (vertical) */}
                <div className="flex flex-col gap-6">
                    <section className="bg-purple-800/50 p-4 rounded-lg shadow">
                        <h2 className="text-xl mb-4">Bom Desempenho</h2>
                        <ResponsiveContainer width="100%" height={150}>
                            <BarChart data={topPerformers} margin={{ left: 20, right: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Bar
                                    dataKey="score"
                                    fill="#A78BFA"
                                    radius={[4, 4, 0, 0]}
                                    barSize={20}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </section>

                    <section className="bg-purple-800/50 p-4 rounded-lg shadow">
                        <h2 className="text-xl mb-4">Precisa melhorar</h2>
                        <ResponsiveContainer width="100%" height={150}>
                            <BarChart data={lowPerformers} margin={{ left: 20, right: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Bar
                                    dataKey="score"
                                    fill="#A78BFA"
                                    radius={[4, 4, 0, 0]}
                                    barSize={20}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </section>
                </div>
            </div>
        </div>
    )
}
