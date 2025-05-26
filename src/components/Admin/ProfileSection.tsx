'use client'

import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/slices/authSlice'

export default function ProfileSection({
    name,
    email,
    phone,
}: {
    name: string
    email: string
    phone?: string
}) {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="bg-purple-900 rounded-md py-3 px-4 flex items-center space-x-2">
                    <span className="font-medium text-white">Admin:</span>
                    <span className="text-white">{name}</span>
                </div>
                <div className="bg-purple-900 rounded-md py-3 px-4 flex items-center space-x-2">
                    <span className="font-medium text-white">E-mail:</span>
                    <span className="text-white">{email}</span>
                </div>
                <div className="bg-purple-900 rounded-md py-3 px-4 flex items-center space-x-2">
                    <span className="font-medium text-white">Telefone:</span>
                    <span className="text-white">{phone ?? '-'}</span>
                </div>
            </div>

            <button
                onClick={handleLogout}
                className="
                    w-full 
                    bg-white 
                    text-primary 
                    font-semibold 
                    py-2 
                    rounded-xl 
                    border 
                    border-primary 
                    hover:bg-primary 
                    hover:text-white 
                    transition
                "
            >
                Sair
            </button>
        </div>
    )
}

