// src/components/Admin/Uploads.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import type { Document } from '@/types/upload'
import { getDocuments, deleteDocument } from '@/api/upload'
import UploadModal from './UploadModal'
import ConfirmModal from '@/components/common/ConfirmModal'
import { FaUpload, FaTrash } from 'react-icons/fa'

export default function Uploads() {
    const token = useSelector((state: RootState) => state.auth.access_token)!
    const [docs, setDocs] = useState<Document[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showUploadModal, setShowUploadModal] = useState(false)

    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const fetchDocuments = async () => {
        setLoading(true)
        setError(null)
        try {
            const list = await getDocuments({}, token)
            setDocs(list)
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Erro desconhecido')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDocuments()
    }, [])

    function requestDelete(id: string) {
        setDeleteId(id)
        setShowDeleteModal(true)
    }

    async function confirmDelete() {
        if (!deleteId) return
        setShowDeleteModal(false)
        setLoading(true)
        setError(null)
        try {
            await deleteDocument(deleteId, token)
            await fetchDocuments()
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Erro desconhecido')
            }
        } finally {
            setLoading(false)
            setDeleteId(null)
        }
    }

    return (
        <div className="text-white pt-6">

            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-400">Erro: {error}</p>}

            {!loading && !error && docs.length === 0 && (
                <p className='text-center'>Nenhum documento encontrado.</p>
            )}

            {!loading && !error && docs.length > 0 && (
                <ul className="space-y-3">
                    {docs.map((d) => (
                        <li
                            key={d.id}
                            className="
                                border border-gray-500 
                                rounded p-3 
                                hover:bg-gray-800 
                                transition
                                flex justify-between items-start
                            "
                        >
                            <div>
                                <h3 className="font-bold">{d.title}</h3>
                                <p className="text-sm">
                                    Série: {d.series} • Nível: {d.educationLevel}
                                </p>
                                <a
                                    href={d.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-300 underline"
                                >
                                    Baixar
                                </a>
                            </div>
                            <button
                                onClick={() => requestDelete(d.id)}
                                className="p-2 rounded bg-purple-800 hover:bg-purple-600"
                            >
                                <FaTrash className="text-white text-sm" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={() => setShowUploadModal(true)}
                className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-gradient-to-r 
                    from-purple-500 
                    to-purple-600
                    hover:from-purple-600 
                    hover:to-purple-700
                    text-white
                    font-semibold
                    px-5
                    py-3
                    rounded-xl
                    shadow-md
                    hover:shadow-lg
                    hover:scale-[1.02]
                    active:scale-100
                    transition-all
                    duration-200
                    mt-6
                "
            >
                <FaUpload className="text-lg" />
                Novo Upload
            </button>

            <UploadModal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onUploadSuccess={() => {
                    setShowUploadModal(false)
                    fetchDocuments()
                }}
            />

            <ConfirmModal
                title="Confirmar exclusão"
                message="Deseja realmente deletar este documento?"
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </div>
    )
}
