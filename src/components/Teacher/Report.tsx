'use client'

import React, { useState } from 'react'
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
type ClassOption = { name: string; school: string }

// opções de turmas com escolas
const classOptions: ClassOption[] = [
    { name: '6º C - Ciências', school: 'Escola Municipal José de Alencar' },
    { name: '7º B - Ciências', school: 'Escola Municipal José de Alencar' },
    { name: '8º A - Ciências', school: 'Colégio Master' },
    { name: '9º B - Ciências', school: 'Colégio Master' },
]

// mock dos dados
const studentsData: RankItem[] = [
    { name: 'José da Silva', score: 88 },
    { name: 'Pedro Campos', score: 76 },
    { name: 'Maria Freitas', score: 92 },
    { name: 'Ana Nunes', score: 80 },
    { name: 'Reinaldo B.', score: 72 },
    { name: 'Rose Mariana', score: 85 },
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

    const [selectedClassIndex, setSelectedClassIndex] = useState(0)

    return (
        <div className="bg-[#2A1248] p-6 rounded-2xl shadow-lg text-white">
            {/* Boas vindas */}
            <div className="border border-[#3B195D] rounded-md p-6 mb-8 text-center">
                <p className="text-sm opacity-75">Boas vindas</p>
                <h1 className="text-2xl font-semibold mt-1">Prof. {name}</h1>
                <p className="text-sm opacity-75 mt-1">{formattedDate}</p>
            </div>

            {/* Select de turma */}
            <div className="flex justify-center mb-6">
                <select
                    value={selectedClassIndex}
                    onChange={e => setSelectedClassIndex(Number(e.target.value))}
                    className="bg-purple-700/50 border border-purple-600 text-white px-4 py-2 rounded-md"
                >
                    {classOptions.map((cls, idx) => (
                        <option key={idx} value={idx}>
                            {`${cls.name} - ${cls.school}`}
                        </option>
                    ))}
                </select>
            </div>

            {/* Gráficos em 2 colunas, sem stretch */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 items-start">
                {/* Rank da sala */}
                <section className="bg-[#3B195D] py-4 px-8 rounded-lg shadow flex flex-col h-[370px]">
                    <h2 className="text-xl font-semibold mb-4">Rank da sala</h2>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                layout="vertical"
                                data={studentsData}
                                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                                barCategoryGap="15%"
                            >
                                <defs>
                                    <linearGradient id="studentsGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#D8B4FE" stopOpacity={0.9} />
                                        <stop offset="100%" stopColor="#9333EA" stopOpacity={0.9} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                                <XAxis type="number" domain={[0, 100]} hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    width={150}
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
                                    fill="url(#studentsGradient)"
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

                {/* Bom Desempenho */}
                <section className="bg-[#3B195D] py-4 px-8 rounded-lg shadow flex flex-col h-[370px]">
                    <h2 className="text-xl font-semibold mb-4">Bom Desempenho</h2>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={topPerformers}
                                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                                barCategoryGap="15%"
                            >
                                <defs>
                                    <linearGradient id="topGradient" x1="0" y1="0" x2="0" y2="1">
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
                                    fill="url(#topGradient)"
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

            {/* Precisa melhorar */}
            <section className="bg-[#3B195D] py-4 px-8 rounded-lg shadow flex flex-col h-[280px] mb-8">
                <h2 className="text-xl font-semibold mb-4">Precisa melhorar</h2>
                <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={lowPerformers}
                            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                            barCategoryGap="15%"
                        >
                            <defs>
                                <linearGradient id="lowGradient" x1="0" y1="0" x2="0" y2="1">
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
                                fill="url(#lowGradient)"
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
