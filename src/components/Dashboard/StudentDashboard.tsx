'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Subjects from '@/components/Student/Subjects'
import Class from '@/components/Student/Class'
import Grades from '@/components/Student/Grades'
import Profile from '@/components/Student/Profile'

type Tab = 'Matérias' | 'Turma' | 'Boletim' | 'Perfil'

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>('Matérias')

    const renderTab = () => {
        switch (activeTab) {
            case 'Matérias':
                return <Subjects />
            case 'Turma':
                return <Class />
            case 'Boletim':
                return <Grades />
            case 'Perfil':
                return <Profile />
        }
    }

    const tabs: Tab[] = ['Matérias', 'Turma', 'Boletim', 'Perfil']

    return (
        <div className="min-h-screen text-white">
            {/* Header como navbar de abas */}
            <Header
                className="py-4 mt-40"
                links={tabs.map(tab => ({
                    label: tab,
                    onClick: () => setActiveTab(tab),
                }))}
                activeLabel={activeTab}
            />

            {/* Conteúdo da aba */}
            <main className="max-w-3xl mx-auto px-4 py-8">
                {renderTab()}
            </main>
        </div>
    )
}
