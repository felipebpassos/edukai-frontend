import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store'
import { logout } from '@/store/slices/authSlice' // ajuste o path conforme seu slice

export default function Profile() {
    const dispatch = useDispatch()
    const { name, email, phone } = useSelector((state: RootState) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className="max-w-md mx-auto bg-gray-800 text-white rounded-2xl shadow-md p-6">
            <h2 className="text-3xl font-bold mb-4 text-center">Perfil</h2>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="font-medium">Nome:</span>
                    <span>{name}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">E-mail:</span>
                    <span>{email}</span>
                </div>
                {phone && (
                    <div className="flex justify-between">
                        <span className="font-medium">Telefone:</span>
                        <span>{phone}</span>
                    </div>
                )}
            </div>
            <button
                onClick={handleLogout}
                className="mt-6 w-full bg-white text-primary font-semibold py-2 rounded-xl transition-colors"
            >
                Sair
            </button>
        </div>
    )
}
