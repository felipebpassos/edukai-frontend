// src/components/Supervisor/Teachers.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Pagination from '@/components/common/Pagination'
import { AddEditModal, FieldConfig } from '@/components/common/AddEditModal'
import { getTeachers } from '@/api/user'
import type { CreateUserRequest, User } from '@/types/user'
import type { RootState } from '@/store'

type Teacher = {
    id: string
    name: string
    email: string
    phone?: string
}

export default function Teachers() {
    const token = useSelector((state: RootState) => state.auth.access_token)
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [total, setTotal] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 8

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)

    const fields: FieldConfig<CreateUserRequest>[] = [
        { name: 'name', label: 'Nome', type: 'text', placeholder: 'Digite o nome', required: true },
        { name: 'email', label: 'Email', type: 'text', placeholder: 'Digite o email', required: true },
        { name: 'phone', label: 'Telefone', type: 'text', placeholder: '(xx) xxxxx-xxxx', required: false },
    ]

    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
    }

    useEffect(() => {
        if (!token) return
        setLoading(true)
        setError(null)

        getTeachers({ page: currentPage, limit: pageSize, name: searchTerm }, token)
            .then(res => {
                const { data, meta } = res
                setTeachers(
                    data.map((u: User) => ({
                        id: u.id,
                        name: u.name,
                        email: u.email ?? '',
                        phone: u.phone ?? '',
                    }))
                )
                setTotal(meta.total)
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [token, currentPage, searchTerm])

    const handleNew = () => {
        setIsEditing(false)
        setSelectedTeacher(null)
        setIsModalOpen(true)
    }

    const handleEdit = (teacher: Teacher) => {
        setIsEditing(true)
        setSelectedTeacher(teacher)
        setIsModalOpen(true)
    }

    const handleDelete = (id: string) => {
        alert('Professor deletado (mock). Veja o console para detalhes.')
        console.log('Deletar professor com ID:', id)
    }

    const handleSubmit = async (data: CreateUserRequest) => {
        if (isEditing && selectedTeacher) {
            alert('Professor editado (mock). Veja o console para detalhes.')
            console.log('Editar professor:', { id: selectedTeacher.id, ...data })
        } else {
            alert('Novo professor criado (mock). Veja o console para detalhes.')
            console.log('Criar professor:', data)
        }
        setIsModalOpen(false)
    }

    return (
        <section className="bg-purple-900/50 p-6 rounded-lg shadow text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Professores</h2>
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
                ) : teachers.length > 0 ? (
                    teachers.map(teacher => (
                        <li key={teacher.id} className="flex justify-between items-center bg-purple-700/20 p-4 rounded">
                            <div>
                                <p className="font-medium">{teacher.name}</p>
                                <p className="text-sm text-purple-300">{teacher.email}</p>
                                {teacher.phone && <p className="text-sm text-purple-300">{teacher.phone}</p>}
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleEdit(teacher)} className="p-2 rounded bg-purple-800 hover:bg-purple-600">
                                    <FaEdit className="text-white text-sm" />
                                </button>
                                <button onClick={() => handleDelete(teacher.id)} className="p-2 rounded bg-purple-800 hover:bg-purple-600">
                                    <FaTrash className="text-white text-sm" />
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-purple-300">Nenhum professor encontrado.</p>
                )}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <AddEditModal<CreateUserRequest>
                title={isEditing ? 'Editar Professor' : 'Cadastrar Professor'}
                isOpen={isModalOpen}
                isEditing={isEditing}
                fields={fields}
                initialValues={selectedTeacher ?? undefined}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </section>
    )
}
