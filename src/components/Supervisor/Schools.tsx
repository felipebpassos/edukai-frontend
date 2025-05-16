// src/components/Supervisor/Schools.tsx
'use client'

import React, { useState } from 'react'
import { FaEdit, FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import Pagination from '@/components/common/Pagination'
import { AddEditModal, FieldConfig } from '@/components/common/AddEditModal'

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
    { id: '2', name: 'CEU EMEF Três Lagos', address: 'Av. dos Lagos, 456', neighborhood: 'Três Lagoas', city: 'Florianópolis', state: 'SC', average: 6 },
    { id: '3', name: 'CEU EMEF Jardim Eliana', address: 'Rua Primavera, 789', neighborhood: 'Jardim Eliana', city: 'São Paulo', state: 'SP', average: 6 },
    { id: '4', name: 'EMEF Antônio Alves da Silva', address: 'Av. São Geraldo, 101', neighborhood: 'São Geraldo', city: 'Maceió', state: 'AL', average: 6 },
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

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null)

    const fields: FieldConfig<{
        name: string
        address: string
        neighborhood: string
        city: string
        state: string
        average: number
    }>[] = [
            { name: 'name', label: 'Nome', type: 'text', placeholder: 'Digite o nome' },
            { name: 'address', label: 'Endereço', type: 'text', placeholder: 'Digite o endereço' },
            { name: 'neighborhood', label: 'Bairro', type: 'text', placeholder: 'Digite o bairro' },
            { name: 'city', label: 'Cidade', type: 'text', placeholder: 'Digite a cidade' },
            { name: 'state', label: 'Estado', type: 'text', placeholder: 'Digite o estado' },
            { name: 'average', label: 'Média Escolar', type: 'number', placeholder: 'Digite a média' },
        ]

    const handleNew = () => {
        setIsEditing(false)
        setSelectedSchool(null)
        setIsModalOpen(true)
    }

    const handleEdit = (school: School) => {
        setIsEditing(true)
        setSelectedSchool(school)
        setIsModalOpen(true)
    }

    const handleView = (id: string) => {
        // Navegar para detalhes da escola ou ação de visualização
        console.log('Ver escola com ID:', id)
    }

    const handleDelete = (id: string) => {
        alert('Escola deletada (mock). Veja o console para detalhes.')
        console.log('Deletar escola:', id)
    }

    const handleSubmit = async (data: {
        name: string
        address: string
        neighborhood: string
        city: string
        state: string
        average: number
    }) => {
        if (isEditing && selectedSchool) {
            alert('Escola editada (mock). Veja o console para detalhes.')
            console.log('Editar escola:', { id: selectedSchool.id, ...data })
        } else {
            alert('Escola criada (mock). Veja o console para detalhes.')
            console.log('Nova escola:', data)
        }
        setIsModalOpen(false)
    }

    return (
        <section className="bg-purple-900/50 p-6 rounded-lg shadow text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Escolas</h2>
                <button
                    onClick={handleNew}
                    className="flex items-center gap-2 text-sm bg-purple-800 hover:bg-purple-600 px-3 py-1 rounded"
                >
                    <FaPlus className="text-xs" />
                    Cadastrar
                </button>
            </div>

            <div className="mb-6 relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-300">
                    <FaSearch />
                </span>
                <input
                    type="text"
                    placeholder="Pesquisar por nome"
                    className="w-full pl-10 py-2 px-3 bg-purple-700/20 placeholder-purple-300 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                            {/* Nome da escola */}
                            <p className="font-medium">{school.name}</p>
                            {/* Endereço completo em uma linha */}
                            <p className="text-sm text-purple-300">
                                {school.address}, {school.neighborhood}, {school.city} - {school.state}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleEdit(school)}
                                className="p-2 rounded bg-purple-800 hover:bg-purple-600"
                            >
                                <FaEdit className="text-white text-sm" />
                            </button>
                            <button
                                onClick={() => handleDelete(school.id)}
                                className="p-2 rounded bg-purple-800 hover:bg-purple-600"
                            >
                                <FaTrash className="text-white text-sm" />
                            </button>
                            <button
                                onClick={() => handleView(school.id)}
                                className="text-sm bg-purple-800 hover:bg-purple-600 px-3 py-1 rounded"
                            >
                                Ver escola
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            <AddEditModal<{
                name: string
                address: string
                neighborhood: string
                city: string
                state: string
                average: number
            }>
                title={isEditing ? 'Editar Escola' : 'Cadastrar Escola'}
                isOpen={isModalOpen}
                isEditing={isEditing}
                fields={fields}
                initialValues={selectedSchool ?? undefined}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </section>
    )
}