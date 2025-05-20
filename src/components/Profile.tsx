'use client'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store'
import { logout } from '@/store/slices/authSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default function Profile() {
    const dispatch = useDispatch()
    const { name, email, phone, role } = useSelector((state: RootState) => state.auth)

    const roleLabels: Record<string, string> = {
        STUDENT: 'Aluno(a)',
        TEACHER: 'Professor(a)',
        DIRECTOR: 'Diretor(a)',
        SUPERVISOR: 'Supervisor(a)',
        ADMIN: 'Administrador(a)',
    }

    const roleLabel =
        typeof role === 'string' && roleLabels[role] ? roleLabels[role] : 'Usuário'

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div
            className="
        max-w-xl mx-auto
        bg
        border border-gray-300
        rounded-2xl
        px-16 py-14
        shadow-[0_20px_40px_rgba(139,0,139,0.6)]
      "
        >
            <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
                <FontAwesomeIcon icon={faUserCircle} className="text-white mr-1 text-1xl" />
                Meus dados
            </h2>

            <div className="space-y-4">
                {/* Cargo e nome */}
                <div className="bg-purple-900 rounded-md py-3 px-4 flex items-center space-x-2">
                    <span className="font-medium text-white">{roleLabel}:</span>
                    <span className="text-white">{name}</span>
                </div>

                {/* E-mail */}
                <div className="bg-purple-900 rounded-md py-3 px-4 flex items-center space-x-2">
                    <span className="font-medium text-white">E-mail:</span>
                    <span className="text-white">{email}</span>
                </div>

                {/* Telefone */}
                <div className="bg-purple-900 rounded-md py-3 px-4 flex items-center space-x-2">
                    <span className="font-medium text-white">Telefone:</span>
                    <span className="text-white">{phone ?? '-'}</span>
                </div>
            </div>

            <button
                onClick={handleLogout}
                className="
          mt-6 w-full
          bg-white text-primary font-semibold
          py-2 rounded-xl
        "
            >
                Sair
            </button>
        </div>
    )
}
