'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Report from '@/components/Admin/Report'
import Clients from '@/components/Admin/Clients'
import Schools from '@/components/Admin/Schools'
import Users from '@/components/Admin/Users'
import Options from '@/components/Admin/Options'

export type Tab = 'Relatório' | 'Clientes' | 'Escolas' | 'Usuários' | 'Opções'

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>('Relatório')

    const renderTab = () => {
        switch (activeTab) {
            case 'Relatório':
                return <Report onTabChange={setActiveTab} />
            case 'Clientes':
                return <Clients />
            case 'Escolas':
                return <Schools />
            case 'Usuários':
                return <Users />
            case 'Opções':
                return <Options />
        }
    }

    const tabs: Tab[] = ['Relatório', 'Clientes', 'Escolas', 'Usuários', 'Opções']

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
