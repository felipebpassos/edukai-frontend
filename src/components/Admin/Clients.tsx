// src/components/Admin/Clients.tsx
'use client'

import React, { useState } from 'react'
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import Pagination from '@/components/common/Pagination'
import { AddEditModal, FieldConfig } from '@/components/common/AddEditModal'

type Client = {
    id: string
    name: string
    description: string
}

const initialMockClients: Client[] = [
    { id: '1', name: 'João Supervisor', description: 'Prefeitura de Florianópolis' },
    { id: '2', name: 'Secretaria de Educação AR', description: 'Prefeitura de Aracaju' },
    { id: '4', name: 'Cláudia Medeiros', description: 'Prefeitura de Belo Horizonte' },
    { id: '5', name: 'Rede Alfa Educação', description: 'Grupo privado nacional' },
    { id: '6', name: 'Secretaria Municipal de Educação de SP', description: 'Prefeitura de São Paulo' },
]

export default function Clients() {
    const [clients] = useState<Client[]>(initialMockClients)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 8

    const filtered = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const totalPages = Math.ceil(filtered.length / pageSize)
    const paginated = filtered.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedClient, setSelectedClient] = useState<Client | null>(null)

    const fields: FieldConfig<{ name: string; description: string }>[] = [
        { name: 'name', label: 'Nome', type: 'text', placeholder: 'Digite o nome' },
        { name: 'description', label: 'Descrição', type: 'text', placeholder: 'Digite a descrição' },
    ]

    const handleNew = () => {
        setIsEditing(false)
        setSelectedClient(null)
        setIsModalOpen(true)
    }

    const handleEdit = (client: Client) => {
        setIsEditing(true)
        setSelectedClient(client)
        setIsModalOpen(true)
    }

    const handleDelete = (id: string) => {
        alert('Cliente deletado (mock). Veja o console para detalhes.')
        console.log('Deletar cliente com ID:', id)
    }

    const handleSubmit = async (data: { name: string; description: string }) => {
        if (isEditing && selectedClient) {
            alert('Cliente editado (mock). Veja o console para detalhes.')
            console.log('Editar cliente:', { id: selectedClient.id, ...data })
        } else {
            alert('Cliente criado (mock). Veja o console para detalhes.')
            console.log('Novo cliente:', data)
        }

        setIsModalOpen(false)
    }

    return (
        <section className="bg-purple-900/50 p-6 rounded-lg shadow text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Clientes</h2>
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
                {paginated.map(client => (
                    <li
                        key={client.id}
                        className="flex justify-between items-center bg-purple-700/20 p-4 rounded"
                    >
                        <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-purple-300">{client.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleEdit(client)}
                                className="p-2 rounded bg-purple-800 hover:bg-purple-600"
                            >
                                <FaEdit className="text-white text-sm" />
                            </button>
                            <button
                                onClick={() => handleDelete(client.id)}
                                className="p-2 rounded bg-purple-800 hover:bg-purple-600"
                            >
                                <FaTrash className="text-white text-sm" />
                            </button>
                        </div>
                    </li>
                ))}

                {filtered.length === 0 && (
                    <p className="text-center text-purple-300">
                        Nenhum cliente encontrado.
                    </p>
                )}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <AddEditModal<{ name: string; description: string }>
                title={isEditing ? 'Editar Cliente' : 'Cadastrar Cliente'}
                isOpen={isModalOpen}
                isEditing={isEditing}
                fields={fields}
                initialValues={selectedClient ?? undefined}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </section>
    )
}
