// src/components/Director/Report.tsx
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

const classesData: RankItem[] = [
    { name: '6º C', score: 85 },
    { name: '7º B', score: 78 },
    { name: '8º C', score: 72 },
    { name: '7º A', score: 68 },
    { name: '9º A', score: 62 },
    { name: '6º A', score: 55 },
    { name: '7º C', score: 50 },
    { name: '1º A', score: 45 },
]

const profsData: RankItem[] = [
    { name: 'Mario Alberto', score: 92 },
    { name: 'Gustavo Miguel', score: 88 },
    { name: 'Juliana Almeida', score: 82 },
    { name: 'Carla Trindade', score: 76 },
    { name: 'Isadora Machado', score: 68 },
    { name: 'Rubens Cruz', score: 60 },
    { name: 'Karen Freitas', score: 52 },
    { name: 'Jorge de Oliveira', score: 48 },
]

const subjectsData: RankItem[] = [
    { name: 'Mat', score: 75 },
    { name: 'Fis', score: 80 },
    { name: 'Por', score: 65 },
    { name: 'Ciê', score: 70 },
    { name: 'Ing', score: 85 },
    { name: 'Esp', score: 60 },
    { name: 'His', score: 68 },
    { name: 'Geo', score: 55 },
    { name: 'Fil', score: 50 },
    { name: 'Ed', score: 45 },
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
        <div className="bg-[#2A1248] p-6 rounded-2xl shadow-lg text-white">
            {/* Boas vindas */}
            <div className="border border-[#3B195D] rounded-md p-6 mb-8 text-center">
                <p className="text-sm opacity-75">Boas vindas</p>
                <h1 className="text-2xl font-semibold mt-1">Diretor(a) {name}</h1>
                <p className="text-sm opacity-75 mt-1">{formattedDate}</p>
            </div>

            {/* Rankings horizontal */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Classes */}
                <section className="bg-[#3B195D] p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Rank de classes</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                            layout="vertical"
                            data={classesData}
                            margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
                        >
                            <defs>
                                <linearGradient id="classesGradient" x1="0" y1="0" x2="1" y2="0">
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
                                width={100}
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
                                fill="url(#classesGradient)"
                                radius={[0, 8, 8, 0]}
                                barSize={16}
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

                {/* Professores */}
                <section className="bg-[#3B195D] p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Rank dos professores</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                            layout="vertical"
                            data={profsData}
                            margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
                        >
                            <defs>
                                <linearGradient id="profsGradient" x1="0" y1="0" x2="1" y2="0">
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
                                width={140}
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
                                fill="url(#profsGradient)"
                                radius={[0, 8, 8, 0]}
                                barSize={16}
                                animationDuration={800}
                            >
                                <LabelList
                                    dataKey="score"
                                    position="right"
                                    formatter={(v: number) => [`${v}%`, 'Pontuação']}
                                    style={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 600 }}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </section>
            </div>

            {/* Ranking vertical de matérias */}
            <section className="bg-[#3B195D] p-4 rounded-lg shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">Ranking de matérias</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjectsData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                        <defs>
                            <linearGradient id="subjectsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#D8B4FE" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#9333EA" stopOpacity={0.9} />
                            </linearGradient>
                        </defs>
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
                            fill="url(#subjectsGradient)"
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

            {/* Texto descritivo */}
            <p className="text-base leading-relaxed">
                Os dados mostram que a turma <strong>6º C</strong> lidera o desempenho geral com
                85%, seguida pelas demais classes. Entre os professores, <strong>Mario Alberto</strong>{' '}
                está no topo com 92% de avaliações positivas. No ranking de matérias,{' '}
                <strong>Inglês</strong> apresenta a maior média (85%), enquanto{' '}
                <strong>Educação Física</strong> e <strong>Filosofia</strong> estão nas faixas
                inferiores. Esses insights ajudam a identificar áreas de excelência e
                oportunidades de melhoria na escola.
            </p>
        </div>
    )
}
