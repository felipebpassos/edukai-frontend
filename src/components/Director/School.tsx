// src/components/Director/School.tsx
'use client'

import React, { useState } from 'react'

const schoolInfo = {
    name: 'Escola Municipal José de Alencar',
    address: 'Rua das Flores, 123 - Centro, Fortaleza - CE',
    totalStudents: 512,
    totalClassrooms: 18,
}

const periods = [
    { name: '2025 - 1º Semestre', status: 'Aberto', startDate: '01/03/2025', endDate: '30/06/2025' },
    { name: '2024 - 2º Semestre', status: 'Fechado', startDate: '01/08/2024', endDate: '15/12/2024' },
    { name: '2024 - 1º Semestre', status: 'Fechado', startDate: '01/03/2024', endDate: '30/06/2024' },
    { name: '2023 - 2º Semestre', status: 'Fechado', startDate: '01/08/2023', endDate: '15/12/2023' },
]

const classes = ['6º C', '7º B', '8º C', '7º A', '9º A']

export default function School() {
    const [selectedPeriod, setSelectedPeriod] = useState(periods[0])

    return (
        <div className="space-y-8 bg-purple-900/50 p-6 rounded-2xl">

            {/* Bloco da Escola */}
            <div className="border border-purple-700 rounded-md p-6 mb-8 text-center">
                <h1 className="text-2xl font-semibold mb-2">{schoolInfo.name}</h1>
                <p className="text-white/80 mb-4">{schoolInfo.address}</p>
                <div className="flex justify-center gap-8 text-sm">
                    <div>
                        <p className="text-white/70">Alunos matriculados</p>
                        <p className="text-lg font-semibold text-white">{schoolInfo.totalStudents}</p>
                    </div>
                    <div>
                        <p className="text-white/70">Salas de aula</p>
                        <p className="text-lg font-semibold text-white">{schoolInfo.totalClassrooms}</p>
                    </div>
                </div>
            </div>

            {/* Linha com período atual + lista lateral */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 border border-purple-700 rounded-md p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-semibold">Período letivo</h2>
                        <button className="text-sm bg-purple-700 hover:bg-purple-600 px-3 py-1 rounded">
                            Editar
                        </button>
                    </div>
                    <p><span className="font-medium">Nome:</span> {selectedPeriod.name}</p>
                    <p>
                        <span className="font-medium">Status:</span>{' '}
                        <span className={selectedPeriod.status === 'Aberto' ? 'text-green-400' : 'text-yellow-400'}>
                            {selectedPeriod.status}
                        </span>
                    </p>
                    <p><span className="font-medium">Início:</span> {selectedPeriod.startDate}</p>
                    <p><span className="font-medium">Término:</span> {selectedPeriod.endDate}</p>
                </div>

                {/* Lista lateral de períodos letivos */}
                <div className="w-full lg:w-64 border border-purple-700 rounded-md p-4 overflow-y-auto max-h-72">
                    <h3 className="text-lg font-semibold mb-3">Todos os períodos</h3>
                    <ul className="space-y-2">
                        {periods.map((p) => (
                            <li
                                key={p.name}
                                className={`cursor-pointer p-2 rounded ${p.name === selectedPeriod.name
                                    ? 'bg-purple-600 text-white font-semibold'
                                    : 'bg-purple-700/30 hover:bg-purple-600/60 text-white/80'
                                    }`}
                                onClick={() => setSelectedPeriod(p)}
                            >
                                {p.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Turmas */}
            <div className="bg-purple-800/50 p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">Turmas</h2>
                    <button className="text-sm bg-purple-700 hover:bg-purple-600 px-3 py-1 rounded">
                        Criar
                    </button>
                </div>
                <ul className="space-y-2">
                    {classes.map((c) => (
                        <li
                            key={c}
                            className="flex justify-between items-center bg-purple-700/20 p-2 rounded"
                        >
                            <span>{c}</span>
                            <button className="text-sm text-purple-300 hover:text-white">
                                Ver turma
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
