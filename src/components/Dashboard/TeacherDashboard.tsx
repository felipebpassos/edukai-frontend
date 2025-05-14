// src/components/Dashboard/TeacherDashboard.tsx
'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Report from '@/components/Teacher/Report'
import Classrooms from '@/components/Teacher/Classrooms'
import Grades from '@/components/Teacher/Grades'
import Profile from '@/components/Profile'

type Tab = 'Relatório' | 'Turmas' | 'Notas' | 'Perfil'

export default function TeacherDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>('Relatório')

    const renderTab = () => {
        switch (activeTab) {
            case 'Relatório':
                return <Report />
            case 'Turmas':
                return <Classrooms />
            case 'Notas':
                return <Grades />
            case 'Perfil':
                return <Profile />
        }
    }

    const tabs: Tab[] = ['Relatório', 'Turmas', 'Notas', 'Perfil']

    return (
        <div className="min-h-screen text-white py-12">
            <Header
                className="py-4"
                links={tabs.map(tab => ({
                    label: tab,
                    onClick: () => setActiveTab(tab),
                }))}
                activeLabel={activeTab}
            />

            <main className="max-w-4xl mx-auto px-4 py-8">
                {renderTab()}
            </main>
        </div>
    )
}
