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
        <div className="bg-purple-900/50 p-6 rounded-2xl shadow-lg text-white">
            {/* Boas vindas */}
            <div className="border border-purple-700 rounded-md p-6 mb-8 text-center">
                <p className="text-sm opacity-75">Boas vindas</p>
                <h1 className="text-2xl font-semibold mt-1">Diretor(a) {name}</h1>
                <p className="text-sm opacity-75 mt-1">{formattedDate}</p>
            </div>

            {/* Rankings horizontal */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <section className="bg-purple-800/50 p-4 rounded-lg shadow">
                    <h2 className="text-xl mb-4">Rank de classes</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                            layout="vertical"
                            data={classesData}
                            margin={{ top: 0, right: 20, bottom: 0, left: 40 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis type="number" domain={[0, 100]} hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                tick={{ fontSize: 12 }}
                                width={80}
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

                <section className="bg-purple-800/50 p-4 rounded-lg shadow">
                    <h2 className="text-xl mb-4">Rank dos professores</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                            layout="vertical"
                            data={profsData}
                            margin={{ top: 0, right: 20, bottom: 0, left: 40 }}
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
            </div>

            {/* Ranking vertical de matérias */}
            <section className="bg-purple-800/50 p-4 rounded-lg shadow mb-8">
                <h2 className="text-xl mb-4">Ranking de matérias</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={subjectsData}>
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

            {/* Resumo gerado por IA */}
            <p className="text-base leading-relaxed">
                Os dados mostram que a turma <strong>6º C</strong> lidera o desempenho geral com 85%, seguida pelas demais classes. Entre os professores, <strong>Mario Alberto</strong> está no topo com 92% de avaliações positivas. No ranking de matérias, <strong>Inglês</strong> apresenta a maior média (85%), enquanto <strong>Educação Física</strong> e <strong>Filosofia</strong> estão nas faixas inferiores. Esses insights ajudam a identificar áreas de excelência e oportunidades de melhoria na escola.
            </p>
        </div>
    )
}
