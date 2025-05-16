// src/components/Admin/Schools.tsx
'use client'

import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Pagination from '@/components/common/Pagination'

type School = {
    id: string
    name: string
    address: string
    neighborhood: string
    city: string
    state: string
    average: number
}

const initialMockSchools: School[] = [
    { id: '1', name: 'EMEF Damião Frei', address: 'Rua das Flores, 123', neighborhood: 'Centro', city: 'Florianópolis', state: 'SC', average: 6 },
    { id: '2', name: 'CEU EMEF Três Lagos', address: 'Av. dos Lagos, 456', neighborhood: 'Três Lagoas', city: 'Florianópolis', state: 'SC', average: 7 },
    { id: '3', name: 'CEU EMEF Jardim Eliana', address: 'Rua Primavera, 789', neighborhood: 'Jardim Eliana', city: 'São Paulo', state: 'SP', average: 8 },
    { id: '4', name: 'EMEF Antônio Alves da Silva', address: 'Av. São Geraldo, 101', neighborhood: 'São Geraldo', city: 'Maceió', state: 'AL', average: 6 },
    { id: '5', name: 'EMEF Exemplo 5', address: 'Rua Exemplo 5, 50', neighborhood: 'Bairro 5', city: 'Campinas', state: 'SP', average: 5 },
    { id: '6', name: 'EMEF Exemplo 6', address: 'Rua Exemplo 6, 60', neighborhood: 'Bairro 6', city: 'Campinas', state: 'SP', average: 7 },
    { id: '7', name: 'EMEF Exemplo 7', address: 'Rua Exemplo 7, 70', neighborhood: 'Bairro 7', city: 'Porto Alegre', state: 'RS', average: 9 },
    { id: '8', name: 'EMEF Exemplo 8', address: 'Rua Exemplo 8, 80', neighborhood: 'Bairro 8', city: 'Porto Alegre', state: 'RS', average: 6 },
    { id: '9', name: 'EMEF Exemplo 9', address: 'Rua Exemplo 9, 90', neighborhood: 'Bairro 9', city: 'Salvador', state: 'BA', average: 8 },
    { id: '10', name: 'EMEF Exemplo 10', address: 'Rua Exemplo 10, 100', neighborhood: 'Bairro 10', city: 'Salvador', state: 'BA', average: 7 },
    { id: '11', name: 'EMEF Exemplo 11', address: 'Rua Exemplo 11, 110', neighborhood: 'Bairro 11', city: 'Recife', state: 'PE', average: 6 },
    { id: '12', name: 'EMEF Exemplo 12', address: 'Rua Exemplo 12, 120', neighborhood: 'Bairro 12', city: 'Recife', state: 'PE', average: 5 },
    { id: '13', name: 'EMEF Exemplo 13', address: 'Rua Exemplo 13, 130', neighborhood: 'Bairro 13', city: 'Fortaleza', state: 'CE', average: 8 },
    { id: '14', name: 'EMEF Exemplo 14', address: 'Rua Exemplo 14, 140', neighborhood: 'Bairro 14', city: 'Fortaleza', state: 'CE', average: 7 },
    { id: '15', name: 'EMEF Exemplo 15', address: 'Rua Exemplo 15, 150', neighborhood: 'Bairro 15', city: 'Manaus', state: 'AM', average: 6 },
    { id: '16', name: 'EMEF Exemplo 16', address: 'Rua Exemplo 16, 160', neighborhood: 'Bairro 16', city: 'Manaus', state: 'AM', average: 9 },
    { id: '17', name: 'EMEF Exemplo 17', address: 'Rua Exemplo 17, 170', neighborhood: 'Bairro 17', city: 'João Pessoa', state: 'PB', average: 5 },
    { id: '18', name: 'EMEF Exemplo 18', address: 'Rua Exemplo 18, 180', neighborhood: 'Bairro 18', city: 'João Pessoa', state: 'PB', average: 7 },
    { id: '19', name: 'EMEF Exemplo 19', address: 'Rua Exemplo 19, 190', neighborhood: 'Bairro 19', city: 'Goiânia', state: 'GO', average: 8 },
    { id: '20', name: 'EMEF Exemplo 20', address: 'Rua Exemplo 20, 200', neighborhood: 'Bairro 20', city: 'Goiânia', state: 'GO', average: 6 },
]

export default function Schools() {
    const [schools] = useState<School[]>(initialMockSchools)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 8

    const filtered = schools.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const totalPages = Math.ceil(filtered.length / pageSize)
    const paginated = filtered.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    const handleView = (id: string) => {
        console.log('Ver escola com ID:', id)
    }

    return (
        <section className="bg-purple-900/50 p-6 rounded-lg shadow text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Escolas</h2>
            </div>

            <div className="mb-6 relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-300">
                    <FaSearch />
                </span>
                <input
                    type="text"
                    placeholder="Pesquisar por nome"
                    className="w-full pl-10 py-2 bg-purple-700/20 placeholder-purple-300 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={searchTerm}
                    onChange={e => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                    }}
                />
            </div>

            <ul className="space-y-4">
                {paginated.map(school => (
                    <li
                        key={school.id}
                        className="flex justify-between items-center bg-purple-700/20 p-4 rounded"
                    >
                        <div>
                            <p className="font-medium">{school.name}</p>
                            <p className="text-sm text-purple-300">
                                {school.address}, {school.neighborhood}, {school.city} – {school.state}
                            </p>
                        </div>
                        <button
                            onClick={() => handleView(school.id)}
                            className="text-sm bg-purple-800 hover:bg-purple-600 px-3 py-1 rounded"
                        >
                            Ver escola
                        </button>
                    </li>
                ))}

                {filtered.length === 0 && (
                    <p className="text-center text-purple-300">Nenhuma escola encontrada.</p>
                )}
            </ul>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </section>
    )
}
