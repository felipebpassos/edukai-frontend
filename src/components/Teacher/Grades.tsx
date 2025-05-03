// src/components/Teacher/Grades.tsx
'use client'

import React, { useState } from 'react'

type StudentGrades = {
    name: string
    grades: (number | undefined)[]
}

const classOptions = [
    '6º C - Ciências',
    '7º B - Ciências',
    '8º A - Ciências',
]

const studentsData: StudentGrades[] = [
    { name: 'José da Silva', grades: [8.8, 7.6, 9.2] },
    { name: 'Pedro Campos', grades: [7.0, 6.8, 7.4] },
    { name: 'Maria Freitas', grades: [9.5, 9.2, 9.8] },
    { name: 'Ana Nunes', grades: [8.0, 7.8, 8.2] },
    { name: 'Reinaldo B.', grades: [7.2, 6.9, 7.5] },
]

export default function Grades() {
    const [selectedClass, setSelectedClass] = useState(classOptions[0])

    return (
        <div className="max-w-4xl mx-auto p-8 rounded-xl text-white">
            {/* Select de turma */}
            <div className="flex justify-center mb-6">
                <select
                    value={selectedClass}
                    onChange={e => setSelectedClass(e.target.value)}
                    className="bg-purple-700/50 border border-purple-600 text-white px-4 py-2 rounded-md"
                >
                    {classOptions.map(cls => (
                        <option key={cls} value={cls}>
                            {cls}
                        </option>
                    ))}
                </select>
            </div>

            {/* Tabela de notas */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="w-max px-4 py-3 text-left text-base font-semibold uppercase text-gray-200 align-middle">
                                Aluno
                            </th>
                            {Array.from({ length: 6 }, (_, i) => (
                                <th
                                    key={i}
                                    className="w-1/12 px-2 py-3 text-center text-sm font-medium text-gray-200 align-middle"
                                >
                                    {`${i + 1}º`}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {studentsData.map(({ name, grades }, idx) => {
                            const gradientClass =
                                idx % 2 === 0
                                    ? 'bg-gradient-to-r from-[#582EA0] to-transparent'
                                    : 'bg-gradient-to-l from-[#582EA0] to-transparent'

                            return (
                                <tr key={name}>
                                    <td className="px-4 py-3 align-middle">
                                        <span
                                            className={`block w-full px-4 py-2 ${gradientClass} rounded-md uppercase text-base font-bold text-white text-left`}
                                        >
                                            {name}
                                        </span>
                                    </td>
                                    {Array.from({ length: 6 }, (_, i) => (
                                        <td key={i} className="px-2 py-2 text-center align-middle">
                                            <button
                                                type="button"
                                                className="inline-flex items-center justify-center rounded-md p-[3px] bg-gradient-to-r from-[#582EA0] to-transparent"
                                            >
                                                <div className="bg w-12 h-10 flex items-center justify-center text-sm rounded-sm">
                                                    {grades[i] !== undefined ? grades[i]?.toFixed(1) : ''}
                                                </div>
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
