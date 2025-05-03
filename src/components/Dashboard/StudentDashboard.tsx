'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Subjects from '@/components/Student/Subjects'
import Classroom from '@/components/Student/Classroom'
import Grades from '@/components/Student/Grades'
import Profile from '@/components/Profile'

type Tab = 'Matérias' | 'Turma' | 'Boletim' | 'Perfil'

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>('Matérias')

    const renderTab = () => {
        switch (activeTab) {
            case 'Matérias':
                return <Subjects />
            case 'Turma':
                return <Classroom />
            case 'Boletim':
                return <Grades />
            case 'Perfil':
                return <Profile />
        }
    }

    const tabs: Tab[] = ['Matérias', 'Turma', 'Boletim', 'Perfil']

    return (
        <div className="min-h-screen text-white">

            <Header
                className="py-4 mt-24"
                links={tabs.map(tab => ({
                    label: tab,
                    onClick: () => setActiveTab(tab),
                }))}
                activeLabel={activeTab}
            />

            <main className="max-w-3xl mx-auto px-4 py-8">
                {renderTab()}
            </main>
        </div>
    )
}
