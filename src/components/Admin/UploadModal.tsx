'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import type { CreateDocumentRequest } from '@/types/upload'
import { uploadDocument } from '@/api/upload'

type Props = {
    isOpen: boolean
    onClose: () => void
    onUploadSuccess: () => void
}

export default function UploadModal({ isOpen, onClose, onUploadSuccess }: Props) {
    const token = useSelector((state: RootState) => state.auth.access_token)!
    const [form, setForm] = useState<Omit<CreateDocumentRequest, 'file'>>({
        title: '',
        series: '',
        educationLevel: '',
        author: '',
        description: '',
        subjectId: '',
    })
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if (!isOpen) return null

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target
        setForm((f) => ({ ...f, [name]: value }))
    }

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setFile(e.target.files[0])
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Upload de Livro/Arquivo</h3>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-gray-700 mb-1">Arquivo</label>
                        <input type="file" onChange={handleFile} />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Título*</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Digite um título para o livro/arquivo"
                            className="w-full rounded px-3 py-2 border 
                    text-black placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                            className="w-full rounded px-3 py-2 border 
                    text-black placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Descrição</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Escreva uma breve descrição"
                            className="w-full rounded px-3 py-2 border 
                    text-black placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Disciplina*</label>
                        <input
                            name="subjectId"
                            value={form.subjectId}
                            onChange={handleChange}
                            placeholder="Digite o nome da disciplina"
                            className="w-full rounded px-3 py-2 border 
                    text-black placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Nível de Ensino*</label>
                        <input
                            name="educationLevel"
                            value={form.educationLevel}
                            onChange={handleChange}
                            placeholder="Digite o nível de ensino"
                            className="w-full rounded px-3 py-2 border 
                    text-black placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                            className="w-full rounded px-3 py-2 border 
                    text-black placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded border"
                            disabled={loading}
                        >
                            Cancelar
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
            </div>
        </div>
    )
}
