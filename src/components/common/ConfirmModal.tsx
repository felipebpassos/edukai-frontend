// src/components/common/ConfirmModal.tsx
'use client'

import React from 'react'
import { FaTimes } from 'react-icons/fa'

export interface ConfirmModalProps {
    title: string
    message?: string
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    confirmText?: string
    cancelText?: string
}

export default function ConfirmModal({
    title,
    message = '',
    isOpen,
    onClose,
    onConfirm,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
}: ConfirmModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-[-10] right-[-10] w-8 h-8 flex items-center justify-center rounded-full bg-purple-700 hover:bg-purple-600 text-white"
                    aria-label="Fechar"
                >
                    <FaTimes className="text-sm" />
                </button>

                <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
                {message && <p className="mb-4 text-gray-600">{message}</p>}

                <div className="flex justify-end gap-2 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-400 text-white"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-purple-800 hover:bg-purple-600 text-white"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}
