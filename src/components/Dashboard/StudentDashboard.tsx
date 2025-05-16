'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Home from '@/components/Student/Home'
import Subjects from '@/components/Student/Subjects'
import Grades from '@/components/Student/Grades'
import Profile from '@/components/Profile'

type Tab = 'Home' | 'Matérias' | 'Boletim' | 'Perfil'

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>('Home')

    const renderTab = () => {
        switch (activeTab) {
            case 'Home':
                return <Home />
            case 'Matérias':
                return <Subjects />
            case 'Boletim':
                return <Grades />
            case 'Perfil':
                return <Profile />
        }
    }

    const tabs: Tab[] = ['Home', 'Matérias', 'Boletim', 'Perfil']

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

            <main className="max-w-3xl mx-auto px-4 py-8">
                {renderTab()}
            </main>
        </div>
    )
}
