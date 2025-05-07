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
    LabelList,
} from 'recharts'

type RankItem = { name: string; score: number }

const schoolsData: RankItem[] = [
    { name: 'EMEF Damião, Frei', score: 75 },
    { name: 'CEU EMEF Tres Lagos', score: 88 },
    { name: 'EMEF Vargem Grande', score: 68 },
    { name: 'CEU EMEF Manoel Vieira de Queiroz Filho', score: 92 },
    { name: 'CEU EMEF Jardim Eliana', score: 60 },
    { name: 'EMEF Antonio Alves da Silva, SG', score: 82 },
]

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
        <div className="bg-[#2A1248] p-6 rounded-2xl shadow-lg text-white">
            <div className="border border-[#3B195D] rounded-md p-6 mb-8 text-center">
                <p className="text-sm opacity-75">Boas vindas</p>
                <h1 className="text-2xl font-semibold mt-1">Secretário(a) {name}</h1>
                <p className="text-sm opacity-75 mt-1">{formattedDate}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Rank geral dos colégios */}
                <section className="bg-[#3B195D] p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Rank dos Colégios</h2>
                    <ResponsiveContainer width="100%" height={schoolsData.length * 40 + 50}>
                        <BarChart
                            layout="vertical"
                            data={schoolsData}
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                            barCategoryGap="20%"
                        >
                            <defs>
                                <linearGradient id="adminGradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#D8B4FE" stopOpacity={0.9} />
                                    <stop offset="100%" stopColor="#9333EA" stopOpacity={0.9} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                            <XAxis type="number" domain={[0, 100]} hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                                width={200}
                                axisLine={{ stroke: '#ffffff60' }}
                                tickLine={false}
                            />
                            <Tooltip
                                formatter={(v) => [`${v}%`, 'Pontuação']}
                                contentStyle={{ backgroundColor: '#1D0A32', borderRadius: 8, border: 'none' }}
                                itemStyle={{ color: '#EDE9FE' }}
                                cursor={{ fill: '#ffffff10' }}
                            />
                            <Bar
                                dataKey="score"
                                fill="url(#adminGradient)"
                                radius={[0, 8, 8, 0]}
                                barSize={20}
                                animationDuration={800}
                            >
                                <LabelList
                                    dataKey="score"
                                    position="right"
                                    formatter={(v: number) => `${v}%`}
                                    style={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 600 }}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </section>

                <div className="flex flex-col space-y-6">
                    {/* Alto desempenho */}
                    <section className="bg-[#3B195D] p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Colégios com alto desempenho</h2>
                        <ResponsiveContainer width="100%" height={160}>
                            <BarChart
                                data={topSchools}
                                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                barCategoryGap="20%"
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                                    axisLine={{ stroke: '#ffffff60' }}
                                />
                                <YAxis
                                    domain={[0, 100]}
                                    tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                                    axisLine={{ stroke: '#ffffff60' }}
                                />
                                <Tooltip
                                    formatter={(v) => [`${v}%`, 'Pontuação']}
                                    contentStyle={{ backgroundColor: '#1D0A32', borderRadius: 8, border: 'none' }}
                                    itemStyle={{ color: '#EDE9FE' }}
                                    cursor={{ fill: '#ffffff10' }}
                                />
                                <Bar
                                    dataKey="score"
                                    fill="url(#adminGradient)"
                                    radius={[8, 8, 0, 0]}
                                    barSize={24}
                                    animationDuration={800}
                                >
                                    <LabelList
                                        dataKey="score"
                                        position="top"
                                        formatter={(v: number) => `${v}%`}
                                        style={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 600 }}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </section>

                    {/* Baixo desempenho */}
                    <section className="bg-[#3B195D] p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Colégios com baixo desempenho</h2>
                        <ResponsiveContainer width="100%" height={160}>
                            <BarChart
                                data={lowSchools}
                                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                barCategoryGap="20%"
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                                    axisLine={{ stroke: '#ffffff60' }}
                                />
                                <YAxis
                                    domain={[0, 100]}
                                    tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                                    axisLine={{ stroke: '#ffffff60' }}
                                />
                                <Tooltip
                                    formatter={(v) => [`${v}%`, 'Pontuação']}
                                    contentStyle={{ backgroundColor: '#1D0A32', borderRadius: 8, border: 'none' }}
                                    itemStyle={{ color: '#EDE9FE' }}
                                    cursor={{ fill: '#ffffff10' }}
                                />
                                <Bar
                                    dataKey="score"
                                    fill="url(#adminGradient)"
                                    radius={[8, 8, 0, 0]}
                                    barSize={24}
                                    animationDuration={800}
                                >
                                    <LabelList
                                        dataKey="score"
                                        position="top"
                                        formatter={(v: number) => `${v}%`}
                                        style={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 600 }}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </section>
                </div>
            </div>
        </div>
    )
}
