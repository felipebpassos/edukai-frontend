'use client'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import Header from '@/components/Header'

type ClassRank = { name: string; score: number }
type ProfRank = { name: string; score: number }
type SubjectRank = { name: string; score: number }

const classesData: ClassRank[] = [
    { name: '6º C', score: 85 },
    { name: '7º B', score: 78 },
    { name: '8º C', score: 72 },
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
]

export default function DirectorDashboard() {
    const tabs = ['Escola', 'Turmas', 'Professores', 'Perfil'] as const

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white">
            {/* Header */}
            <Header
                className="py-4"
                links={tabs.map(label => ({
                    label,
                    onClick: () => { },
                }))}
                activeLabel="Visão Geral"
            />

            <main className="container mx-auto px-4 py-8 space-y-12">
                {/* Ranking de Turmas */}
                <section className="bg-purple-800/50 p-6 rounded-lg shadow">
                    <h2 className="text-xl mb-4">Ranking de Turmas</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={classesData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Bar dataKey="score" fill="#A78BFA" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </section>

                {/* Ranking de Professores */}
                <section className="bg-purple-800/50 p-6 rounded-lg shadow">
                    <h2 className="text-xl mb-4">Ranking de Professores</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={profsData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Bar dataKey="score" fill="#A78BFA" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </section>

                {/* Ranking de Matérias */}
                <section className="bg-purple-800/50 p-6 rounded-lg shadow">
                    <h2 className="text-xl mb-4">Ranking de Matérias</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={subjectsData}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Bar dataKey="score" fill="#A78BFA" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </section>
            </main>
        </div>
    )
}
