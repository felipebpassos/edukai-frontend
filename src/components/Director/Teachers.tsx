// src/components/Director/Teachers.tsx
'use client'

import React from 'react'

type Teacher = {
    name: string
    email: string
    subject: string
}

const teachers: Teacher[] = [
    { name: 'Mario Alberto', email: 'mario.alberto@escola.com', subject: 'Matemática' },
    { name: 'Gustavo Miguel', email: 'gustavo.miguel@escola.com', subject: 'Física' },
    { name: 'Juliana Almeida', email: 'juliana.almeida@escola.com', subject: 'Português' },
    { name: 'Carla Trindade', email: 'carla.trindade@escola.com', subject: 'História' },
    { name: 'Isadora Machado', email: 'isadora.machado@escola.com', subject: 'Inglês' },
    { name: 'Rubens Cruz', email: 'rubens.cruz@escola.com', subject: 'Geografia' },
    { name: 'Karen Freitas', email: 'karen.freitas@escola.com', subject: 'Educação Física' },
    { name: 'Jorge de Oliveira', email: 'jorge.oliveira@escola.com', subject: 'Filosofia' },
]

export default function Teachers() {
    return (
        <section className="bg-purple-900/40 p-6 rounded-2xl shadow text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Professores</h2>
                <button className="bg-purple-700 hover:bg-purple-600 px-4 py-2 text-sm rounded">
                    Cadastrar
                </button>
            </div>

            <ul className="space-y-3">
                {teachers.map((teacher, idx) => (
                    <li
                        key={idx}
                        className="bg-purple-700/20 p-4 rounded flex justify-between items-center"
                    >
                        <div>
                            <p className="font-semibold">{teacher.name}</p>
                            <p className="text-sm text-purple-200">{teacher.subject}</p>
                            <p className="text-xs text-purple-300">{teacher.email}</p>
                        </div>
                        <button className="text-sm text-purple-300 hover:text-white">
                            Editar
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}
