// src/components/Admin/Schools.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { FaSearch, FaTrash } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Pagination from '@/components/common/Pagination'
import ConfirmModal from '@/components/common/ConfirmModal'
import { getSchools } from '@/api/school'
import type { RootState } from '@/store'
import type { School as ApiSchool } from '@/types/school'

type School = {
    id: string
    name: string
    address: string
    neighborhood: string
    city: string
    state: string
    average: number
}

export default function Schools() {
    const token = useSelector((state: RootState) => state.auth.access_token)
    const [schools, setSchools] = useState<School[]>([])
    const [total, setTotal] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 8

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const totalPages = Math.max(1, Math.ceil(total / pageSize))

    useEffect(() => {
        if (!token) return

        setLoading(true)
        setError(null)

        getSchools({ page: currentPage, limit: pageSize, name: searchTerm }, token)
            .then(res => {
                setSchools(
                    res.data.map((s: ApiSchool) => ({
                        id: s.id,
                        name: s.name,
                        address: s.address,
                        neighborhood: s.neighborhood,
                        city: s.city,
                        state: s.state,
                        average: s.averageGrade,
                    }))
                )
                setTotal(res.meta.total)
            })
            .catch(err => {
                console.error('Erro ao carregar escolas:', err)
                setError(err.message)
            })
            .finally(() => setLoading(false))
    }, [token, currentPage, searchTerm])

    const handleView = (id: string) => {
        console.log('Ver escola com ID:', id)
    }

    const requestDelete = (id: string) => {
        setDeleteId(id)
        setShowDeleteModal(true)
    }

    const confirmDelete = () => {
        if (!deleteId) return
        setShowDeleteModal(false)
        alert('Escola deletada (mock). Veja o console para detalhes.')
        console.log('Deletar escola com ID:', deleteId)
        setDeleteId(null)
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

            {error && (
                <p className="text-red-400 mb-4">Erro ao carregar: {error}</p>
            )}

            <ul className="space-y-4">
                {loading ? (
                    <p className="text-center text-purple-300">Carregando...</p>
                ) : schools.length > 0 ? (
                    schools.map(school => (
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
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleView(school.id)}
                                    className="text-sm bg-purple-800 hover:bg-purple-600 px-3 py-1 rounded"
                                >
                                    Ver escola
                                </button>
                                <button
                                    onClick={() => requestDelete(school.id)}
                                    className="p-2 rounded bg-purple-800 hover:bg-purple-600"
                                >
                                    <FaTrash className="text-white text-sm" />
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-purple-300">Nenhuma escola encontrada.</p>
                )}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <ConfirmModal
                title="Confirmar exclusão"
                message="Deseja realmente deletar esta escola?"
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </section>
    )
}
