// src/components/Dashboard/AdminDashboard.tsx
'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Report from '@/components/Admin/Report'
import Schools from '@/components/Admin/Schools'
import Users from '@/components/Admin/Users'
import Profile from '@/components/Profile'

type Tab = 'Relatório' | 'Escolas' | 'Usuários' | 'Perfil'

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>('Relatório')

    const renderTab = () => {
        switch (activeTab) {
            case 'Relatório':
                return <Report />
            case 'Escolas':
                return <Schools />
            case 'Usuários':
                return <Users />
            case 'Perfil':
                return <Profile />
        }
    }

    const tabs: Tab[] = ['Relatório', 'Escolas', 'Usuários', 'Perfil']

    return (
        <div className="min-h-screen text-white">
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
