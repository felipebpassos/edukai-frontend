// src/components/Teacher/Classrooms.tsx
'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

type Classroom = {
    id: string
    name: string
    schedule: string
}

const mockClassrooms: Classroom[] = [
    { id: '1', name: '6º C - Ciências', schedule: 'Seg, Qua e Sex • 08:00 – 10:00' },
    { id: '2', name: '7º B - Ciências', schedule: 'Ter, Qui • 10:00 – 12:00' },
    { id: '3', name: '8º A - Ciências', schedule: 'Seg, Qua • 13:00 – 15:00' },
    { id: '4', name: '9º C - Ciências', schedule: 'Ter, Qui • 15:00 – 17:00' },
]

export default function Classrooms() {
    const { name } = useSelector((state: RootState) => state.auth)

    return (
        <section className="bg-purple-900/50 p-6 rounded-lg shadow text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Turmas ministradas</h2>
            </div>
            <ul className="space-y-4">
                {mockClassrooms.map((cls) => (
                    <li
                        key={cls.id}
                        className="flex justify-between items-center bg-purple-700/20 p-4 rounded"
                    >
                        <div>
                            <p className="font-medium">{cls.name}</p>
                            <p className="text-sm text-purple-300">{cls.schedule}</p>
                        </div>
                        <button className="text-sm bg-purple-800 hover:bg-purple-600 px-3 py-1 rounded">
                            Ver turma
                        </button>
                    </li>
                ))}
                {mockClassrooms.length === 0 && (
                    <p className="text-center text-purple-300">
                        Você ainda não ministra nenhuma turma, {name}.
                    </p>
                )}
            </ul>
        </section>
    )
}
