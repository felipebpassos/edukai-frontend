'use client'

import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import type { Tab } from '@/components/Dashboard/AdminDashboard'
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from 'recharts'

type UsageItem = { name: string; users: number }
type TimeItem = { date: string; users: number }

function generateMockData(days: number): TimeItem[] {
    const data: TimeItem[] = []
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const date = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
        }).format(d)
        data.push({
            date,
            users: Math.floor(Math.random() * 90) + 10,
        })
    }
    return data
}

const clientsData: UsageItem[] = [
    { name: 'Cliente A', users: 120 },
    { name: 'Cliente B', users: 85 },
    { name: 'Cliente C', users: 140 },
    { name: 'Cliente D', users: 60 },
    { name: 'Cliente E', users: 95 },
]

const topClients: UsageItem[] = [...clientsData]
    .sort((a, b) => b.users - a.users)
    .slice(0, 3)

const TOTAL_SCHOOLS = 20
const totalClients = clientsData.length
const totalUsers = clientsData.reduce((sum, c) => sum + c.users, 0)

interface ReportProps {
    onTabChange: (tab: Tab) => void
}

export default function Report({ onTabChange }: ReportProps) {
    const { name } = useSelector((state: RootState) => state.auth)
    const today = new Date()
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(today)

    const periods = useMemo(() => [
        { label: 'Últimos 7 Dias', days: 7 },
        { label: 'Últimos 30 Dias', days: 30 },
        { label: 'Últimos 90 Dias', days: 90 },
    ], [])

    const [selectedPeriod, setSelectedPeriod] = useState(periods[0].label)

    const timeData = useMemo(() => {
        const opt = periods.find(p => p.label === selectedPeriod)!
        return generateMockData(opt.days)
    }, [selectedPeriod, periods])

    return (
        <div className="bg-[#2A1248] p-6 rounded-2xl shadow-lg text-white">
            {/* Boas-vindas */}
            <div className="border border-[#3B195D] rounded-md p-6 mb-8 text-center">
                <p className="text-sm opacity-75">Boas vindas</p>
                <h1 className="text-2xl font-semibold mt-1">
                    Administrador(a) {name}
                </h1>
                <p className="text-sm opacity-75 mt-1">{formattedDate}</p>
            </div>

            {/* Resumo geral */}
            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-[#3B195D] p-4 rounded-lg shadow flex flex-col justify-between">
                    <div>
                        <p className="text-sm opacity-75">Total de Clientes</p>
                        <p className="text-2xl font-bold">{totalClients}</p>
                    </div>
                    <button
                        onClick={() => onTabChange('Clientes')}
                        className="text-xs underline self-end"
                    >
                        Ver todos
                    </button>
                </div>
                <div className="bg-[#3B195D] p-4 rounded-lg shadow flex flex-col justify-between">
                    <div>
                        <p className="text-sm opacity-75">Total de Escolas</p>
                        <p className="text-2xl font-bold">{TOTAL_SCHOOLS}</p>
                    </div>
                    <button
                        onClick={() => onTabChange('Escolas')}
                        className="text-xs underline self-end"
                    >
                        Ver todos
                    </button>
                </div>
                <div className="bg-[#3B195D] p-4 rounded-lg shadow flex flex-col justify-between">
                    <div>
                        <p className="text-sm opacity-75">Total de Usuários</p>
                        <p className="text-2xl font-bold">{totalUsers}</p>
                    </div>
                    <button
                        onClick={() => onTabChange('Usuários')}
                        className="text-xs underline self-end"
                    >
                        Ver todos
                    </button>
                </div>
            </div>

            {/* Gráficos de clientes */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Usuários por Cliente */}
                <section className="bg-[#3B195D] p-4 rounded-lg shadow flex justify-center items-center">
                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Usuários por Cliente
                        </h2>
                        <ResponsiveContainer width="100%" height={clientsData.length * 36 + 50}>
                            <BarChart
                                layout="vertical"
                                data={clientsData}
                                margin={{ top: 8, right: 40, bottom: 8, left: 8 }}
                                barCategoryGap="12%"
                            >
                                <defs>
                                    <linearGradient id="adminGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#D8B4FE" stopOpacity={0.9} />
                                        <stop offset="100%" stopColor="#9333EA" stopOpacity={0.9} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                                <XAxis type="number" domain={[0, 'dataMax']} hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    formatter={v => [v, 'Usuários']}
                                    contentStyle={{ backgroundColor: '#1D0A32', borderRadius: 8, border: 'none' }}
                                    itemStyle={{ color: '#EDE9FE' }}
                                    cursor={{ fill: '#ffffff10' }}
                                />
                                <Bar
                                    dataKey="users"
                                    fill="url(#adminGradient)"
                                    radius={[0, 8, 8, 0]}
                                    barSize={18}
                                    animationDuration={800}
                                >
                                    <LabelList
                                        dataKey="users"
                                        position="right"
                                        offset={8}
                                        formatter={(v: number) => `${v}`}
                                        style={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 600 }}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                {/* Clientes com maior uso */}
                <section className="bg-[#3B195D] p-4 rounded-lg shadow flex justify-center items-center">
                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Clientes com maior uso
                        </h2>
                        <ResponsiveContainer width="100%" height={160}>
                            <BarChart data={topClients} margin={{ top: 32, right: 24, bottom: 8, left: 8 }} barCategoryGap="20%">
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    domain={[0, 'dataMax']}
                                    tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    formatter={v => [v, 'Usuários']}
                                    contentStyle={{ backgroundColor: '#1D0A32', borderRadius: 8, border: 'none' }}
                                    itemStyle={{ color: '#EDE9FE' }}
                                    cursor={{ fill: '#ffffff10' }}
                                />
                                <Bar
                                    dataKey="users"
                                    fill="url(#adminGradient)"
                                    radius={[8, 8, 0, 0]}
                                    barSize={20}
                                    animationDuration={800}
                                >
                                    <LabelList
                                        dataKey="users"
                                        position="top"
                                        offset={8}
                                        formatter={(v: number) => `${v}`}
                                        style={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 600 }}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>
            </div>

            {/* Gráfico de tempo */}
            <section className="bg-[#3B195D] p-4 rounded-lg shadow mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        Novos usuários nos {selectedPeriod}
                    </h2>
                    <select
                        className="bg-[#2A1248] border border-[#3B195D] text-white rounded px-2 py-1 focus:outline-none text-sm"
                        value={selectedPeriod}
                        onChange={e => setSelectedPeriod(e.target.value)}
                    >
                        {periods.map(p => (
                            <option key={p.label} value={p.label}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={timeData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            formatter={v => [v, 'Usuários']}
                            contentStyle={{ backgroundColor: '#1D0A32', borderRadius: 8, border: 'none' }}
                            itemStyle={{ color: '#EDE9FE' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="users"
                            stroke="#D8B4FE"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </section>
        </div>
    )
}
