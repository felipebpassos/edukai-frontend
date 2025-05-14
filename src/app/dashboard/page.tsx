// src/app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import StudentDashboard from '@/components/Dashboard/StudentDashboard'
import DirectorDashboard from '@/components/Dashboard/DirectorDashboard'
import TeacherDashboard from '@/components/Dashboard/TeacherDashboard'
import SupervisorDashboard from '@/components/Dashboard/SupervisorDashboard'
import AdminDashboard from '@/components/Dashboard/AdminDashboard'
import type { RootState } from '@/store'

function useHasMounted() {
    const [hasMounted, setHasMounted] = useState(false)
    useEffect(() => {
        setHasMounted(true)
    }, [])
    return hasMounted
}

export default function DashboardPage() {
    const router = useRouter()
    const hasMounted = useHasMounted()
    const role = useSelector((state: RootState) => state.auth.role)

    useEffect(() => {
        if (!hasMounted) return

        if (!role) {
            router.replace('/login')
        } else {
            document.title =
                role === 'STUDENT'
                    ? 'Painel do Aluno | Eduk.AI'
                    : role === 'DIRECTOR'
                        ? 'Painel do Diretor | Eduk.AI'
                        : role === 'TEACHER'
                            ? 'Painel do Professor | Eduk.AI'
                            : 'Painel Administrativo | Eduk.AI'
        }
    }, [hasMounted, role, router])

    if (!hasMounted || !role) return null

    switch (role) {
        case 'STUDENT':
            return <StudentDashboard />
        case 'DIRECTOR':
            return <DirectorDashboard />
        case 'TEACHER':
            return <TeacherDashboard />
        case 'SUPERVISOR':
            return <SupervisorDashboard />
        case 'ADMIN':
            return <AdminDashboard />
        default:
            return (
                <div className="p-8 text-center text-red-500">
                    Permissão inválida.
                </div>
            )
    }
}
