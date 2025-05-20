'use client'

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@/store'
import { logout } from '@/store/slices/authSlice'
import { NavigationButton } from '@/components/NavigationButton'
import { faUpload, faBook, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import ProfileSection from '@/components/Admin/ProfileSection'
import Uploads from '@/components/Admin/Uploads'
import Subjects from '@/components/Admin/Subjects'

export default function Options() {
    const dispatch = useDispatch()
    const { name, email, phone } = useSelector((state: RootState) => state.auth)

    const [active, setActive] = useState<'perfil' | 'uploads' | 'materias'>('perfil')

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
                px-8 py-10
                shadow-[0_20px_40px_rgba(139,0,139,0.6)]
            "
        >
            {/* Navegação */}
            <div className="flex justify-start gap-4 mb-6">
                <NavigationButton
                    icon={faUserCircle}
                    text="Perfil"
                    active={active === 'perfil'}
                    onClick={() => setActive('perfil')}
                />
                <NavigationButton
                    icon={faUpload}
                    text="Uploads"
                    active={active === 'uploads'}
                    onClick={() => setActive('uploads')}
                />
                <NavigationButton
                    icon={faBook}
                    text="Matérias"
                    active={active === 'materias'}
                    onClick={() => setActive('materias')}
                />
            </div>

            {/* Conteúdo */}
            {active === 'perfil' && <ProfileSection
                name={name ?? ''}
                email={email ?? ''}
                phone={phone ?? undefined}
            />
            }
            {active === 'uploads' && <Uploads />}
            {active === 'materias' && <Subjects />}

            <button
                onClick={handleLogout}
                className="mt-6 w-full bg-white text-primary font-semibold py-2 rounded-xl"
            >
                Sair
            </button>
        </div>
    )
}
