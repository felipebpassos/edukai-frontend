'use client'

import React from 'react'

export default function ProfileSection({
    name,
    email,
    phone,
}: {
    name: string
    email: string
    phone?: string
}) {
    return (
        <>
            <div className="space-y-4">
                <div className="bg-purple-900 rounded-md py-3 px-4 flex items-center space-x-2">
                    <span className="font-medium text-white">Nome:</span>
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
        </>
    )
}
