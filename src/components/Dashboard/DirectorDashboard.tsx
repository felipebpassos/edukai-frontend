'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Report from '@/components/Director/Report'
import School from '@/components/Director/School'
import Teachers from '@/components/Director/Teachers'
import Profile from '@/components/Profile'

type Tab = 'Relatório' | 'Escola' | 'Professores' | 'Perfil'

export default function DirectorDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>('Relatório')

    const renderTab = () => {
        switch (activeTab) {
            case 'Relatório':
                return <Report />
            case 'Escola':
                return <School />
            case 'Professores':
                return <Teachers />
            case 'Perfil':
                return <Profile />
        }
    }

    const tabs: Tab[] = ['Relatório', 'Escola', 'Professores', 'Perfil']

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

            <main className="max-w-4xl mx-auto px-4 py-8">
                {renderTab()}
            </main>
        </div>
    )
}
