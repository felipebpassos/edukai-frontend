// src/components/Admin/Clients.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Pagination from '@/components/common/Pagination'
import { AddEditModal, FieldConfig } from '@/components/common/AddEditModal'
import { getSupervisors } from '@/api/user'
import type { User } from '@/types/user'
import type { RootState } from '@/store'

type Client = {
    id: string
    name: string
    email: string
    phone: string
}

export default function Clients() {
    const token = useSelector((state: RootState) => state.auth.access_token)
    const [allClients, setAllClients] = useState<Client[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 8

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedClient, setSelectedClient] = useState<Client | null>(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fields: FieldConfig<{ name: string; email: string; phone: string }>[] = [
        { name: 'name', label: 'Nome', type: 'text', placeholder: 'Digite o nome', required: true },
        { name: 'email', label: 'Email', type: 'text', placeholder: 'Digite o email', required: true },
        { name: 'phone', label: 'Telefone', type: 'text', placeholder: 'Digite o telefone', required: true },
    ]

    // 1. fetch all supervisors once
    useEffect(() => {
        if (!token) return
        setLoading(true)
        setError(null)

        getSupervisors({ page: 1, limit: 1000, name: undefined, email: undefined }, token)
            .then(res => {
                const clients = res.data.map((u: User) => ({
                    id: u.id,
                    name: u.name,
                    email: u.email ?? '',
                    phone: u.phone ?? '',
                }))
                setAllClients(clients)
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [token])

    // 2. filter + paginate in memory
    const filtered = allClients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // never less than one page
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))

    // enforce valid page
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
    }

    const paginated = filtered.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

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

    const handleSubmit = async (data: { name: string; email: string; phone: string }) => {
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
                    <FaPlus className="text-xs" /> Cadastrar
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

            {error && <p className="text-red-400 mb-4">Erro ao carregar: {error}</p>}

            <ul className="space-y-4">
                {loading ? (
                    <p className="text-center text-purple-300">Carregando...</p>
                ) : paginated.length > 0 ? (
                    paginated.map(client => (
                        <li
                            key={client.id}
                            className="flex justify-between items-center bg-purple-700/20 p-4 rounded"
                        >
                            <div>
                                <p className="font-medium text-lg">{client.name}</p>
                                <p className="text-sm text-purple-300">
                                    <span className="font-semibold">Email:</span> {client.email}
                                </p>
                                <p className="text-sm text-purple-300">
                                    <span className="font-semibold">Telefone:</span> {client.phone}
                                </p>
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
                    ))
                ) : (
                    <p className="text-center text-purple-300">Nenhum cliente encontrado.</p>
                )}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <AddEditModal<{ name: string; email: string; phone: string }>
                key={isEditing ? selectedClient?.id : 'new'}
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
