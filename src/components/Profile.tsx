import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store'
import { logout } from '@/store/slices/authSlice'

export default function Profile() {
    const dispatch = useDispatch()
    const { name, email, phone } = useSelector((state: RootState) => state.auth)

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
            <h2 className="text-2xl font-semibold mb-4 text-white">
                Meus dados
            </h2>

            <div className="space-y-4">
                {/* Nome */}
                <div className="bg-purple-900 rounded-md py-3 px-4 flex items-center space-x-2">
                    <span className="font-medium text-white">Nome:</span>
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
