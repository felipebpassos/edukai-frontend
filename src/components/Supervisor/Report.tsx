// src/components/Supervisor/Report.tsx
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
            {/* Cabeçalho */}
            <div className="border border-[#3B195D] rounded-md p-6 mb-8 text-center">
                <p className="text-sm opacity-75">Boas vindas</p>
                <h1 className="text-2xl font-semibold mt-1">Secretário(a) {name}</h1>
                <p className="text-sm opacity-75 mt-1">{formattedDate}</p>
            </div>

            {/* Grid principal */}
            <div className="grid gap-6 lg:grid-cols-2 items-start mb-6">
                {/* Rank geral dos colégios */}
                <section className="bg-[#3B195D] p-4 rounded-lg shadow flex flex-col h-[384px]">
                    <h2 className="text-xl font-semibold mb-4">Rank dos Colégios</h2>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                layout="vertical"
                                data={schoolsData}
                                margin={{ top: 10, right: 40, bottom: 10, left: 10 }}
                                barCategoryGap="15%"
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
                                    width={180}
                                    tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                                    axisLine={{ stroke: '#ffffff60' }}
                                    tickLine={false}
                                    interval={0}
                                />
                                <Tooltip
                                    formatter={v => [`${v}%`, 'Pontuação']}
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
                    </div>
                </section>

                {/* Colégios com alto e baixo desempenho */}
                <div className="flex flex-col space-y-6 w-full">
                    {/* Alto desempenho */}
                    <section className="bg-[#3B195D] p-4 rounded-lg shadow flex flex-col h-[180px]">
                        <h2 className="text-xl font-semibold mb-4">Colégios com alto desempenho</h2>
                        <div className="flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={topSchools}
                                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                                    barCategoryGap="15%"
                                >
                                    <defs>
                                        <linearGradient id="topSchoolsGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#D8B4FE" stopOpacity={0.9} />
                                            <stop offset="100%" stopColor="#9333EA" stopOpacity={0.9} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                                        axisLine={{ stroke: '#ffffff60' }}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        domain={[0, 100]}
                                        tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                                        axisLine={{ stroke: '#ffffff60' }}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        formatter={v => [`${v}%`, 'Pontuação']}
                                        contentStyle={{ backgroundColor: '#1D0A32', borderRadius: 8, border: 'none' }}
                                        itemStyle={{ color: '#EDE9FE' }}
                                        cursor={{ fill: '#ffffff10' }}
                                    />
                                    <Bar
                                        dataKey="score"
                                        fill="url(#topSchoolsGradient)"
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
                        </div>
                    </section>

                    {/* Baixo desempenho */}
                    <section className="bg-[#3B195D] p-4 rounded-lg shadow flex flex-col h-[180px]">
                        <h2 className="text-xl font-semibold mb-4">Colégios com baixo desempenho</h2>
                        <div className="flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={lowSchools}
                                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                                    barCategoryGap="15%"
                                >
                                    <defs>
                                        <linearGradient id="lowSchoolsGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#D8B4FE" stopOpacity={0.9} />
                                            <stop offset="100%" stopColor="#9333EA" stopOpacity={0.9} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                                        axisLine={{ stroke: '#ffffff60' }}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        domain={[0, 100]}
                                        tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                                        axisLine={{ stroke: '#ffffff60' }}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        formatter={v => [`${v}%`, 'Pontuação']}
                                        contentStyle={{ backgroundColor: '#1D0A32', borderRadius: 8, border: 'none' }}
                                        itemStyle={{ color: '#EDE9FE' }}
                                        cursor={{ fill: '#ffffff10' }}
                                    />
                                    <Bar
                                        dataKey="score"
                                        fill="url(#lowSchoolsGradient)"
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
                        </div>
                    </section>
                </div>
            </div>

            {/* Texto descritivo resumido */}
            <p className="text-base leading-relaxed">
                No ranking geral, o destaque vai para <strong>CEU EMEF Manoel Vieira de Queiroz Filho</strong> com 92%,
                seguido por <strong>CEU EMEF Tres Lagos</strong> (88%) e
                <strong> EMEF Antonio Alves da Silva, SG</strong> (82%). Já no
                contraponto, os três colégios com menor desempenho são
                <strong> CEU EMEF Jardim Eliana</strong> (60%),
                <strong> EMEF Vargem Grande</strong> (68%) e
                <strong> EMEF Damião, Frei</strong> (75%). Esses indicadores
                ajudam a mapear quais unidades merecem reconhecimento e onde focar ações de
                melhoria.
            </p>
        </div>
    )
}
