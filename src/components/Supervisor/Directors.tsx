// src/components/Supervisor/Directors.tsx
'use client'

import React, { useState } from 'react'
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'

import Pagination from '@/components/common/Pagination'
import { AddEditModal, FieldConfig } from '@/components/common/AddEditModal'
import type { CreateUserRequest } from '@/types/user'

type Director = {
    id: string
    name: string
    email: string
    phone?: string
}

const initialMockDirectors: Director[] = [
    { id: '1', name: 'Maria Oliveira', email: 'maria.oliveira@escola.com' },
    { id: '2', name: 'João Silva', email: 'joao.silva@escola.com' },
    { id: '3', name: 'Ana Lima', email: 'ana.lima@escola.com' },
    { id: '4', name: 'Pedro Santos', email: 'pedro.santos@escola.com' },
    { id: '5', name: 'Cláudia Souza', email: 'claudia.souza@escola.com' },
    { id: '6', name: 'Rafael Costa', email: 'rafael.costa@escola.com' },
    { id: '7', name: 'Fernanda Rocha', email: 'fernanda.rocha@escola.com' },
    { id: '8', name: 'Lucas Lima', email: 'lucas.lima@escola.com' },
    { id: '9', name: 'Patrícia Alves', email: 'patricia.alves@escola.com' },
    { id: '10', name: 'Bruno Pires', email: 'bruno.pires@escola.com' },
]

export default function Directors() {
    const [directors] = useState<Director[]>(initialMockDirectors)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 8

    // filtra por nome
    const filteredDirectors = directors.filter((director) =>
        director.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // paginação
    const totalPages = Math.ceil(filteredDirectors.length / pageSize)
    const paginatedDirectors = filteredDirectors.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedDirector, setSelectedDirector] = useState<Director | null>(null)

    const fields: FieldConfig<CreateUserRequest>[] = [
        { name: 'name', label: 'Nome', type: 'text', placeholder: 'Digite o nome' },
        { name: 'email', label: 'Email', type: 'text', placeholder: 'Digite o email' },
        { name: 'phone', label: 'Telefone', type: 'text', placeholder: '(xx) xxxxx-xxxx' },
    ]

    const handleNew = () => {
        setIsEditing(false)
        setSelectedDirector(null)
        setIsModalOpen(true)
    }

    const handleEdit = (director: Director) => {
        setIsEditing(true)
        setSelectedDirector(director)
        setIsModalOpen(true)
    }

    const handleDelete = (id: string) => {
        alert('Professor deletado (mock). Veja o console para detalhes.')
        console.log('Deletar professor com ID:', id)
    }

    const handleSubmit = async (data: CreateUserRequest) => {
        if (isEditing && selectedDirector) {
            alert('Professor editado (mock). Veja o console para detalhes.')
            console.log('Editar professor:', { id: selectedDirector.id, ...data })
        } else {
            alert('Professor criado (mock). Veja o console para detalhes.')
            console.log('Novo professor:', data)
        }
        setIsModalOpen(false)
    }

    return (
        <section className="bg-purple-900/50 p-6 rounded-lg shadow text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Diretores</h2>
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
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                    }}
                />
            </div>

            <ul className="space-y-4">
                {paginatedDirectors.map((director) => (
                    <li
                        key={director.id}
                        className="flex justify-between items-center bg-purple-700/20 p-4 rounded"
                    >
                        <div>
                            <p className="font-medium">{director.name}</p>
                            <p className="text-sm text-purple-300">{director.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleEdit(director)}
                                className="p-2 rounded bg-purple-800 hover:bg-purple-600"
                            >
                                <FaEdit className="text-white text-sm" />
                            </button>
                            <button onClick={() => handleDelete(director.id)} className="p-2 rounded bg-purple-800 hover:bg-purple-600">
                                <FaTrash className="text-white text-sm" />
                            </button>
                        </div>
                    </li>
                ))}

                {filteredDirectors.length === 0 && (
                    <p className="text-center text-purple-300">
                        Nenhum diretor encontrado.
                    </p>
                )}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <AddEditModal<CreateUserRequest>
                title={isEditing ? 'Editar Diretor' : 'Cadastrar Diretor'}
                isOpen={isModalOpen}
                isEditing={isEditing}
                fields={fields}
                initialValues={selectedDirector ?? undefined}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </section>
    )
}
