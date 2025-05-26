// src/components/Admin/Uploads.tsx

'use client'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import type { Document } from '@/types/upload'
import { getDocuments } from '@/api/upload'
import UploadModal from './UploadModal'
import { FaUpload } from 'react-icons/fa'

export default function Uploads() {
    const token = useSelector((state: RootState) => state.auth.access_token)!
    const [docs, setDocs] = useState<Document[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showUploadModal, setShowUploadModal] = useState(false)

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
                            "
                        >
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
        </div>
    )
}
