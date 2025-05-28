// src/components/Admin/Clients.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Pagination from '@/components/common/Pagination'
import { AddEditModal, FieldConfig } from '@/components/common/AddEditModal'
import ConfirmModal from '@/components/common/ConfirmModal'
import NotificationToast from '@/components/common/NotificationToast'
import {
    getSupervisors,
    createSupervisor,
    updateSupervisor,
    deleteSupervisor,
} from '@/api/user'
import type { User } from '@/types/user'
import type { RootState } from '@/store'

type Client = {
    id: string
    name: string
    email: string
    phone?: string
}

export default function Clients() {
    const token = useSelector((state: RootState) => state.auth.access_token)!
    const [allClients, setAllClients] = useState<Client[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 8

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedClient, setSelectedClient] = useState<Client | null>(null)

    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [toast, setToast] = useState<{
        type: 'success' | 'error'
        message: string
    } | null>(null)

    const showToast = (type: 'success' | 'error', message: string) => {
        setToast({ type, message })
    }

    const loadClients = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await getSupervisors({ page: 1, limit: 1000 }, token)
            setAllClients(
                res.data.map((u: User) => ({
                    id: u.id,
                    name: u.name,
                    email: u.email,
                    phone: u.phone,
                }))
            )
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) loadClients()
    }, [token])

    const filtered = allClients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
    const paginated = filtered.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    const commonFields: FieldConfig<{
        name: string
        email: string
        phone?: string
        password?: string
    }>[] = [
            {
                name: 'name',
                label: 'Nome',
                type: 'text',
                placeholder: 'Digite o nome',
                required: true,
            },
            {
                name: 'email',
                label: 'Email',
                type: 'text',
                placeholder: 'Digite o email',
                required: true,
            },
            {
                name: 'phone',
                label: 'Telefone',
                type: 'text',
                placeholder: 'Digite o telefone',
                required: true,
            },
        ]

    const passwordField: FieldConfig<{
        name: string
        email: string
        phone?: string
        password?: string
    }> = {
        name: 'password',
        label: 'Senha',
        type: 'text',
        placeholder: isEditing ? 'Crie uma nova senha' : 'Crie uma senha',
        required: !isEditing,
    }

    const fields = [...commonFields, passwordField]

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

    const handleSubmit = async (data: {
        name: string
        email: string
        phone?: string
        password?: string
    }) => {
        try {
            if (isEditing && selectedClient) {
                const updateDto: Partial<{
                    name: string
                    email: string
                    phone?: string
                    password: string
                }> = {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                }
                if (data.password) updateDto.password = data.password

                await updateSupervisor(selectedClient.id, updateDto, token)
                showToast('success', 'Supervisor atualizado com sucesso!')
            } else {
                if (!data.password) {
                    showToast('error', 'Senha é obrigatória para cadastro')
                    return
                }
                await createSupervisor(
                    {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        password: data.password,
                    },
                    token
                )
                showToast('success', 'Supervisor criado com sucesso!')
            }
            setIsModalOpen(false)
            loadClients()
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : 'Erro na operação'
            showToast('error', errorMessage)
        }
    }

    const requestDelete = (id: string) => {
        setDeleteId(id)
        setShowDeleteModal(true)
    }

    const confirmDelete = async () => {
        if (!deleteId) return
        try {
            await deleteSupervisor(deleteId, token)
            showToast('success', 'Supervisor deletado com sucesso!')
            setShowDeleteModal(false)
            loadClients()
            setDeleteId(null)
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : 'Erro na operação'
            showToast('error', errorMessage)
        }
    }

    return (
        <section className="bg-purple-900/50 p-6 rounded-lg shadow text-white relative">
            {toast && (
                <NotificationToast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}

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

            {filtered.length > 0 && (
                <p className="mb-1 text-sm text-purple-300">
                    {filtered.length} resultado{filtered.length > 1 ? 's' : ''} encontrado
                    {filtered.length > 1 ? 's' : ''}
                </p>
            )}

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
                                    onClick={() => requestDelete(client.id)}
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
                onPageChange={setCurrentPage}
            />

            <AddEditModal<{
                name: string
                email: string
                phone?: string
                password?: string
            }>
                key={isEditing && selectedClient ? selectedClient.id : 'new'}
                title={isEditing ? 'Editar Cliente' : 'Cadastrar Cliente'}
                isOpen={isModalOpen}
                isEditing={isEditing}
                fields={fields}
                initialValues={selectedClient ?? undefined}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />

            <ConfirmModal
                title="Confirmar exclusão"
                message="Deseja realmente deletar este cliente?"
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </section>
    )
}
