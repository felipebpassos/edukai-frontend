// src/components/Admin/Report.tsx
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

// Dados de exemplo para os colégios
const schoolsData: RankItem[] = [
    { name: 'EMEF Damião, Frei', score: 75 },
    { name: 'CEU EMEF Tres Lagos', score: 88 },
    { name: 'EMEF Vargem Grande', score: 68 },
    { name: 'CEU EMEF Manoel Vieira de Queiroz Filho', score: 92 },
    { name: 'CEU EMEF Jardim Eliana', score: 60 },
    { name: 'EMEF Antonio Alves da Silva, SG', score: 82 },
]

// Top 3 e Bottom 3
const topSchools = [...schoolsData].sort((a, b) => b.score - a.score).slice(0, 3)
const lowSchools = [...schoolsData].sort((a, b) => a.score - b.score).slice(0, 3)

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
            {/* Cabeçalho */}
            <div className="border border-purple-700 rounded-md p-6 mb-8 text-center">
                <p className="text-sm opacity-75">Boas vindas</p>
                <h1 className="text-2xl font-semibold mt-1">Secretário(a) {name}</h1>
                <p className="text-sm opacity-75 mt-1">{formattedDate}</p>
            </div>

            {/* Grid de relatórios: 2 colunas no lg */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Rank dos Colégios (coluna da esquerda) */}
                <section className="bg-purple-800/50 p-4 rounded-lg shadow">
                    <h2 className="text-xl mb-4">Rank dos Colégios</h2>
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart
                            layout="vertical"
                            data={schoolsData}
                            margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis type="number" domain={[0, 100]} hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                tick={{ fontSize: 12 }}
                                width={140}
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

                {/* Colunas da direita: alto e baixo desempenho empilhados */}
                <div className="flex flex-col space-y-6">
                    {/* Alto desempenho */}
                    <section className="bg-purple-800/50 p-4 rounded-lg shadow">
                        <h2 className="text-xl mb-4">Colégios com alto desempenho</h2>
                        <ResponsiveContainer width="100%" height={160}>
                            <BarChart
                                layout="vertical"
                                data={topSchools}
                                margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis type="number" domain={[0, 100]} hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tick={{ fontSize: 12 }}
                                    width={140}
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

                    {/* Baixo desempenho */}
                    <section className="bg-purple-800/50 p-4 rounded-lg shadow">
                        <h2 className="text-xl mb-4">Colégios com baixo desempenho</h2>
                        <ResponsiveContainer width="100%" height={160}>
                            <BarChart
                                layout="vertical"
                                data={lowSchools}
                                margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis type="number" domain={[0, 100]} hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tick={{ fontSize: 12 }}
                                    width={140}
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
                </div>
            </div>
        </div>
    )
}
