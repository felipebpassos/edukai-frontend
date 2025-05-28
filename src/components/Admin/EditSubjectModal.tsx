// src/components/Admin/EditSubjectModal.tsx
'use client'

import React, { useState, ChangeEvent, FormEvent, useRef, DragEvent } from 'react'
import Image from 'next/image'
import { FaTimes, FaSave } from 'react-icons/fa'

type Props = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: { name: string; description: string }, file: File | null) => void
    loading?: boolean
    error?: string | null
    initialData: { name: string; description: string; imagePath?: string }
}

export default function EditSubjectModal({
    isOpen,
    onClose,
    onSubmit,
    loading = false,
    error = null,
    initialData,
}: Props) {
    const [form, setForm] = useState({ name: initialData.name, description: initialData.description })
    const [file, setFile] = useState<File | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    function handleMetaChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setForm(f => ({ ...f, [name]: value }))
    }

    function triggerFile() {
        inputRef.current?.click()
    }

    function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
        const sel = e.target.files?.[0]
        if (sel && sel.type.match(/image\//)) {
            setFile(sel)
        }
    }

    function handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault()
        const sel = e.dataTransfer.files[0]
        if (sel && sel.type.match(/image\//)) {
            setFile(sel)
        }
    }

    function handleDragOver(e: DragEvent<HTMLDivElement>) {
        e.preventDefault()
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        onSubmit(form, file)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl text-black flex gap-6">
                {/* Botão de fechar */}
                <button
                    onClick={onClose}
                    className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-purple-700 hover:bg-purple-600 text-white"
                    aria-label="Fechar"
                >
                    <FaTimes className="text-sm" />
                </button>

                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-[460px] h-[568px] flex items-center justify-center cursor-pointer"
                    onClick={triggerFile}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {file
                        ? <Image src={URL.createObjectURL(file)} alt="Cover" width={460} height={568} className="object-cover rounded" />
                        : <span className="text-gray-500">Arraste ou clique para adicionar capa (460x568)</span>
                    }
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                    />
                </div>
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                    <div>
                        {error && <p className="text-red-600 mb-4">{error}</p>}
                        <div className="mb-3">
                            <label htmlFor="name" className="block text-gray-700 mb-1">
                                Nome*
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleMetaChange}
                                required
                                className="w-full rounded px-3 py-2 border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                placeholder="Nome da matéria"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-gray-700 mb-1">
                                Descrição*
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleMetaChange}
                                required
                                className="w-full rounded px-3 py-2 border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                placeholder="Descrição da matéria"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-400 text-white"
                        >Cancelar</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 rounded bg-purple-800 hover:bg-purple-600 text-white"
                        >
                            {loading ? (
                                'Atualizando...'
                            ) : (
                                <>
                                    <FaSave className="text-sm" />
                                    Salvar
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
