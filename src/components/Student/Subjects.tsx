import { useState } from 'react'
import Image from 'next/image'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

type Subject = {
    name: string
    avg: number
    image: string
}

const subjects: Subject[] = [
    { name: 'Língua Portuguesa', avg: 8.1, image: '/subjects/portugues.png' },
    { name: 'Ciências', avg: 5.4, image: '/subjects/ciencias.png' },
    { name: 'Artes', avg: 6.2, image: '/subjects/artes.png' },
    { name: 'Geografia', avg: 4.9, image: '/subjects/geografia.png' },
    { name: 'História', avg: 7.0, image: '/subjects/historia.png' },
    { name: 'Filosofia', avg: 4.9, image: '/subjects/filosofia.png' },
]

export default function Subjects() {
    const [showBars, setShowBars] = useState(false)
    // pega as 3 piores
    const worstThree = [...subjects].sort((a, b) => a.avg - b.avg).slice(0, 3)
    // carousel
    const [activeIndex, setActiveIndex] = useState(0)
    const len = subjects.length
    const prev = () => setActiveIndex(i => (i - 1 + len) % len)
    const next = () => setActiveIndex(i => (i + 1) % len)
    const leftIndex = (activeIndex - 1 + len) % len
    const rightIndex = (activeIndex + 1) % len

    return (
        <div className="space-y-12">
            {/* Gráfico */}
            <section className="bg-purple-900/50 p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl">Seu relatório</h2>
                    <button
                        onClick={() => setShowBars(v => !v)}
                        className="text-2xl"
                        aria-label="Mostrar/ocultar barras"
                    >
                        {showBars ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={subjects}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar
                            dataKey="avg"
                            fill="#A78BFA"
                            opacity={showBars ? 1 : 0}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </section>

            {/* Recomendações */}
            <section className="w-fit mx-auto text-center">
                <h3 className="text-lg mb-4 uppercase opacity-70">
                    Recomendamos o estudo dessas matérias
                </h3>
                <div className="flex justify-center flex-wrap gap-4">
                    {worstThree.map(subj => (
                        <span
                            key={subj.name}
                            className="px-5 py-2 bg-light rounded-md text-base font-extrabold uppercase"
                        >
                            {subj.name}
                        </span>
                    ))}
                </div>
            </section>

            {/* Carrossel 3D */}
            <section className="relative h-[24rem] flex items-center justify-center">
                <button
                    onClick={prev}
                    className="absolute left-4 text-3xl opacity-50 hover:opacity-100 z-30"
                    aria-label="Anterior"
                >
                    ‹
                </button>
                <button
                    onClick={next}
                    className="absolute right-4 text-3xl opacity-50 hover:opacity-100 z-30"
                    aria-label="Próximo"
                >
                    ›
                </button>

                {subjects.map((subj, i) => {
                    const isActive = i === activeIndex
                    const isLeft = i === leftIndex
                    const isRight = i === rightIndex
                    if (!isActive && !isLeft && !isRight) return null

                    const pos = isActive ? 'left-1/2 -translate-x-1/2'
                        : isLeft ? 'left-[8%]'
                            : 'right-[8%]'
                    const size = isActive
                        ? 'scale-105 z-20'
                        : 'scale-80 z-10 filter grayscale'

                    return (
                        <div
                            key={subj.name}
                            className={`absolute ${pos} transform transition-transform duration-500 ${size} h-full`}
                            style={{ aspectRatio: 0.813 }}
                        >
                            <Image
                                src={subj.image}
                                alt={subj.name}
                                fill
                                className="object-cover rounded-lg shadow-lg"
                            />
                            {isActive && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-extrabold text-xl text-center">
                                        {subj.name}
                                    </span>
                                </div>
                            )}
                        </div>
                    )
                })}
            </section>
        </div>
    )
}
