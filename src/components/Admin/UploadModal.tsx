// src/components/Admin/UploadModal.tsx

'use client'

import React, { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import type { CreateDocumentRequest } from '@/types/upload'
import { uploadDocument } from '@/api/upload'
import { FaFilePdf } from 'react-icons/fa'

type Props = {
    isOpen: boolean
    onClose: () => void
    onUploadSuccess: () => void
}

const initialFormState: Omit<CreateDocumentRequest, 'file'> = {
    title: '',
    series: '',
    educationLevel: '',
    author: '',
    description: '',
    subjectId: '',
}

export default function UploadModal({ isOpen, onClose, onUploadSuccess }: Props) {
    const token = useSelector((state: RootState) => state.auth.access_token)!
    const [form, setForm] = useState(initialFormState)
    const [file, setFile] = useState<File | null>(null)
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isOpen) {
            setForm(initialFormState)
            setFile(null)
            setStep(1)
            setError(null)
            setLoading(false)
        }
    }, [isOpen])

    if (!isOpen) return null

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setForm((f) => ({ ...f, [name]: value }))
    }

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0]
        if (selected && selected.type === 'application/pdf') {
            setFile(selected)
            setError(null)
        } else {
            setError('Apenas arquivos PDF são permitidos')
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const dropped = e.dataTransfer.files[0]
        if (dropped && dropped.type === 'application/pdf') {
            setFile(dropped)
            setError(null)
        } else {
            setError('Apenas arquivos PDF são permitidos')
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!file) {
            setError('Selecione um arquivo')
            return
        }
        setLoading(true)
        setError(null)
        try {
            await uploadDocument({ ...form, file }, token)
            onUploadSuccess()
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

    return (
        <div className="fixed text-black inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Upload de Livro/Arquivo</h3>
                {error && <p className="text-red-500 mb-2">{error}</p>}

                {step === 1 && (
                    <div>
                        <div
                            className="border-2 border-dashed border-purple-300 bg-purple-100 rounded p-6 text-center cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            <div className="flex flex-col items-center justify-center gap-2">
                                <FaFilePdf size={30} className="text-purple-700" />
                                <p className="text-purple-700">
                                    {file ? file.name : 'Arraste um arquivo PDF aqui ou clique para selecionar'}
                                </p>
                            </div>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={handleFileSelect}
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-400 text-white"
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="px-4 py-2 rounded bg-purple-600 text-white"
                                disabled={!file}
                            >
                                Próximo
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label className="block text-gray-700 mb-1">Título*</label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Digite um título para o livro/arquivo"
                                className="w-full rounded px-3 py-2 border text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Autor*</label>
                            <input
                                name="author"
                                value={form.author}
                                onChange={handleChange}
                                placeholder="Digite o nome do autor"
                                className="w-full rounded px-3 py-2 border text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Descrição</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Escreva uma breve descrição"
                                className="w-full rounded px-3 py-2 border text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Disciplina*</label>
                            <input
                                name="subjectId"
                                value={form.subjectId}
                                onChange={handleChange}
                                placeholder="Digite o nome da disciplina"
                                className="w-full rounded px-3 py-2 border text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Nível de Ensino*</label>
                            <input
                                name="educationLevel"
                                value={form.educationLevel}
                                onChange={handleChange}
                                placeholder="Digite o nível de ensino"
                                className="w-full rounded px-3 py-2 border text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Série*</label>
                            <input
                                name="series"
                                value={form.series}
                                onChange={handleChange}
                                placeholder="Digite a série"
                                className="w-full rounded px-3 py-2 border text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                        </div>
                        <div className="flex justify-between gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-400 text-white"
                                disabled={loading}
                            >
                                Voltar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-purple-600 text-white"
                                disabled={loading}
                            >
                                {loading ? 'Enviando...' : 'Enviar'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
