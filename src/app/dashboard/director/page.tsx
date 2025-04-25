// File: src/app/dashboard/director/page.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

// Tipagens
type ClassRank = { name: string; score: number }
type ProfRank = { name: string; score: number }
type SubjectRank = { name: string; score: number }

// Dados simulados
const classesData: ClassRank[] = [
    { name: '6º C', score: 85 },
    { name: '7º B', score: 78 },
    { name: '8º B', score: 72 },
    { name: '7º A', score: 68 },
    { name: '9º A', score: 62 },
    { name: '6º A', score: 55 },
    { name: '7º C', score: 50 },
    { name: '1º A', score: 45 },
]

const profsData: ProfRank[] = [
    { name: 'Mario Alberto', score: 92 },
    { name: 'Gustavo Miguel', score: 88 },
    { name: 'Juliana Almeida', score: 82 },
    { name: 'Carla Trindade', score: 76 },
    { name: 'Isadora Machado', score: 68 },
    { name: 'Rubens Cruz', score: 60 },
    { name: 'Karen Freitas', score: 52 },
    { name: 'Jorge de Oliveira', score: 48 },
]

const subjectsData: SubjectRank[] = [
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
    { name: 'Bio', score: 58 },
    { name: 'Art', score: 90 },
]

export default function DirectorDashboardPage() {
    const today = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white py-8">
            {/* Header + Nav */}
            <header className="mb-8">
                <div className="flex justify-center">
                    <Image src="/logo.svg" alt="Eduk.AI" width={140} height={48} />
                </div>
                <nav className="mt-4 flex justify-center space-x-6 uppercase text-sm">
                    <Link href="#" className="hover:underline">Relatório</Link>
                    <Link href="#" className="hover:underline">Minha área</Link>
                    <Link href="#" className="hover:underline">Assistente</Link>
                    <Link href="#" className="hover:underline">Perfil</Link>
                </nav>
            </header>

            {/* Card principal */}
            <div className="container mx-auto bg-purple-800/30 border border-white/20 rounded-xl p-6 space-y-6">
                {/* Boas vindas */}
                <section className="text-center p-4 border border-white/20 rounded-lg">
                    <p className="text-sm opacity-70">Boas vindas</p>
                    <h1 className="text-2xl font-semibold">Diretor(a) Ângela de Souza</h1>
                    <p className="text-xs opacity-70">{today}</p>
                </section>

                {/* Rankings lado a lado */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Rank de classes */}
                    <div className="p-4 border border-white/20 rounded-lg">
                        <h2 className="mb-2 text-lg">Rank de classes</h2>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart
                                layout="vertical"
                                data={classesData}
                                margin={{ left: 40, right: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis type="number" domain={[0, 100]} hide />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    width={60}
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip />
                                <Bar
                                    dataKey="score"
                                    fill="#A78BFA"
                                    radius={[0, 4, 4, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Rank dos professores */}
                    <div className="p-4 border border-white/20 rounded-lg">
                        <h2 className="mb-2 text-lg">Rank dos professores</h2>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart
                                layout="vertical"
                                data={profsData}
                                margin={{ left: 40, right: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis type="number" domain={[0, 100]} hide />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    width={100}
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip />
                                <Bar
                                    dataKey="score"
                                    fill="#A78BFA"
                                    radius={[0, 4, 4, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                {/* Ranking de matérias */}
                <section className="p-4 border border-white/20 rounded-lg">
                    <h2 className="mb-2 text-lg text-center">Ranking de matérias</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={subjectsData} margin={{ bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} />
                            <Tooltip formatter={value => `${value}%`} />
                            <Bar
                                dataKey="score"
                                fill="#A78BFA"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </section>
            </div>
        </div>
    )
}
