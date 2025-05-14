// src/components/Dashboard/SupervisorDashboard.tsx
'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Report from '@/components/Supervisor/Report'
import Schools from '@/components/Supervisor/Schools'
import Directors from '@/components/Supervisor/Directors'
import Profile from '@/components/Profile'

type Tab = 'Relatório' | 'Escolas' | 'Diretores' | 'Perfil'

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>('Relatório')

    const renderTab = () => {
        switch (activeTab) {
            case 'Relatório':
                return <Report />
            case 'Escolas':
                return <Schools />
            case 'Diretores':
                return <Directors />
            case 'Perfil':
                return <Profile />
        }
    }

    const tabs: Tab[] = ['Relatório', 'Escolas', 'Diretores', 'Perfil']

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
