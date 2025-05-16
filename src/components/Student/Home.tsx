// /components/student/Subjects.tsx
import { useState, useMemo } from 'react'
import Image from 'next/image'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from 'recharts'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'

import { subjects as subjectsData, SubjectData } from '@/consts/subjects'
import { calculateAverage } from '@/utils/grades'

type Subject = SubjectData & { avg: number }

export default function Home() {
    // calcula médias
    const subjects: Subject[] = useMemo(
        () =>
            subjectsData.map((subj) => ({
                ...subj,
                avg: calculateAverage(subj.grades),
            })),
        []
    )

    // seleciona 3 piores
    const worstThree = [...subjects]
        .sort((a, b) => a.avg - b.avg)
        .slice(0, 3)

    // carousel
    const [activeIndex, setActiveIndex] = useState(0)
    const len = subjects.length
    const prev = () => setActiveIndex((i) => (i - 1 + len) % len)
    const next = () => setActiveIndex((i) => (i + 1) % len)
    const leftIndex = (activeIndex - 1 + len) % len
    const rightIndex = (activeIndex + 1) % len

    return (
        <div className="space-y-12">
            {/* Gráfico */}
            <section className="bg-[#2A1248] p-6 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-semibold text-white mb-4">Seu relatório</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjects} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                        <defs>
                            <linearGradient id="avgGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#D8B4FE" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#9333EA" stopOpacity={0.9} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                            axisLine={{ stroke: '#ffffff60' }}
                        />
                        <YAxis
                            domain={[0, 10]}
                            tick={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 500 }}
                            axisLine={{ stroke: '#ffffff60' }}
                        />
                        <Tooltip
                            formatter={(value: number) => [`${value.toFixed(1)}`, 'média']}
                            labelFormatter={(label: string) => label}
                            contentStyle={{
                                backgroundColor: '#1D0A32',
                                borderRadius: 8,
                                border: 'none',
                            }}
                            itemStyle={{ color: '#EDE9FE' }}
                            cursor={{ fill: '#ffffff10' }}
                        />
                        <Bar
                            dataKey="avg"
                            fill="url(#avgGradient)"
                            radius={[8, 8, 0, 0]}
                            barSize={24}
                            animationDuration={800}
                        >
                            <LabelList
                                dataKey="avg"
                                position="top"
                                formatter={(value: number) => value.toFixed(1)}
                                style={{ fill: '#EDE9FE', fontSize: 12, fontWeight: 600 }}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </section>

            {/* Recomendações */}
            <section className="w-fit mx-auto text-center">
                <h3 className="text-lg mb-4 uppercase text-gray-300">
                    Recomendamos o estudo dessas matérias
                </h3>
                <div className="flex justify-center flex-wrap gap-2">
                    {worstThree.map((subj) => (
                        <span
                            key={subj.name}
                            className="px-5 py-2 bg-purple-900/50 rounded-md text-base font-extrabold uppercase text-white"
                        >
                            {subj.name}
                        </span>
                    ))}
                </div>
            </section>

            {/* Carrossel 3D */}
            <section className="relative h-[24rem] flex items-center justify-center">
                {/* Botões de navegação */}
                <button
                    onClick={prev}
                    aria-label="Anterior"
                    className="absolute z-30 flex items-center justify-center w-8 h-8 border border-white rounded-full"
                    style={{
                        left: 'calc(50% - 11rem)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'linear-gradient(90deg, rgba(167,139,250,1) 0%, rgba(65,41,106,1) 100%)',
                    }}
                >
                    <FaChevronLeft className="text-white" />
                </button>
                <button
                    onClick={next}
                    aria-label="Próximo"
                    className="absolute z-30 flex items-center justify-center w-8 h-8 border border-white rounded-full"
                    style={{
                        left: 'calc(50% + 9.3rem)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'linear-gradient(90deg, rgba(167,139,250,1) 0%, rgba(65,41,106,1) 100%)',
                    }}
                >
                    <FaChevronRight className="text-white" />
                </button>

                {/* Slides */}
                {subjects.map((subj, i) => {
                    const isActive = i === activeIndex
                    const isLeft = i === leftIndex
                    const isRight = i === rightIndex
                    if (!isActive && !isLeft && !isRight) return null

                    const pos = isActive
                        ? 'left-1/2 -translate-x-1/2'
                        : isLeft
                            ? 'left-[2%]'
                            : 'right-[2%]'
                    const size = isActive
                        ? 'scale-105 z-20'
                        : 'scale-75 z-10 filter grayscale'

                    return (
                        <div
                            key={subj.name}
                            className={`absolute ${pos} transform transition-transform duration-500 ${size} h-full`}
                            style={{ aspectRatio: 0.813 }}
                        >
                            {isActive ? (
                                <Link href={`/study-room?subject=${encodeURIComponent(subj.name)}`}>
                                    <div className="relative h-full w-full group cursor-pointer">
                                        <Image
                                            src={subj.image}
                                            alt={subj.name}
                                            fill
                                            className="object-cover rounded-lg shadow-2xl"
                                        />
                                        {/* Nome da matéria */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/25 rounded-lg">
                                            <span className="text-white font-extrabold text-2xl text-center">
                                                {subj.name}
                                            </span>
                                        </div>
                                        {/* Overlay ao hover */}
                                        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg flex items-end justify-center pb-3">
                                            <span className="text-white font-bold">Estudar com IA</span>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <Image
                                    src={subj.image}
                                    alt={subj.name}
                                    fill
                                    className="object-cover rounded-lg shadow-2xl"
                                />
                            )}
                        </div>
                    )
                })}
            </section>

            {/* Texto explicativo abaixo do carrossel */}
            <p className="text-center text-gray-300 text-sm mt-4">
                Escolha uma matéria e inicie seu estudo.
            </p>
        </div>
    )
}
