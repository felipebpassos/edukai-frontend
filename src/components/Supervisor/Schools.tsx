// src/components/Supervisor/Schools.tsx
'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { FaEdit, FaPlus } from 'react-icons/fa'

type School = {
    id: string
    name: string
    address: string
}

const mockSchools: School[] = [
    { id: '1', name: 'EMEF Damião, Frei', address: 'Rua das Flores, 123' },
    { id: '2', name: 'CEU EMEF Tres Lagos', address: 'Av. dos Lagos, 456' },
    { id: '3', name: 'CEU EMEF Jardim Eliana', address: 'Rua Primavera, 789' },
    { id: '4', name: 'EMEF Antonio Alves da Silva, SG', address: 'Av. São Geraldo, 101' },
]

export default function Schools() {
    const { name } = useSelector((state: RootState) => state.auth)

    return (
        <section className="bg-purple-900/50 p-6 rounded-lg shadow text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Escolas</h2>
                <button className="flex items-center gap-2 text-sm bg-purple-800 hover:bg-purple-600 px-3 py-1 rounded">
                    <FaPlus className="text-xs" />
                    Cadastrar
                </button>
            </div>

            <ul className="space-y-4">
                {mockSchools.map((school) => (
                    <li
                        key={school.id}
                        className="flex justify-between items-center bg-purple-700/20 p-4 rounded"
                    >
                        <div>
                            <p className="font-medium">{school.name}</p>
                            <p className="text-sm text-purple-300">{school.address}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded bg-purple-800 hover:bg-purple-600">
                                <FaEdit className="text-white text-sm" />
                            </button>
                            <button className="text-sm bg-purple-800 hover:bg-purple-600 px-3 py-1 rounded">
                                Ver escola
                            </button>
                        </div>
                    </li>
                ))}

                {mockSchools.length === 0 && (
                    <p className="text-center text-purple-300">
                        Você ainda não tem escolas cadastradas, {name}.
                    </p>
                )}
            </ul>
        </section>
    )
}
