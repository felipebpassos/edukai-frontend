'use client'

import React, { useState } from 'react'
import { subjects } from '@/consts/subjects'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

export default function Subjects() {
    const [openIdx, setOpenIdx] = useState<number | null>(null)

    const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i)

    return (
        <div className="bg-gradient-to-b from-purple-950 to-purple-800 py-12 px-4 text-white">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10">
                    9º ano - Ensino Fundamental
                </h2>

                <div className="space-y-6">
                    {subjects.map((subj, idx) => (
                        <div
                            key={subj.name}
                            className="bg-purple-700/30 border border-purple-500 rounded-xl transition-all duration-300 shadow-lg"
                        >
                            <button
                                onClick={() => toggle(idx)}
                                className="w-full flex justify-between items-center gap-4 px-6 py-4 hover:bg-purple-600/30 transition-all duration-200"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <Image
                                            src={subj.image}
                                            alt={subj.name}
                                            width={48}
                                            height={48}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <span className="text-lg font-semibold">{subj.name}</span>
                                </div>
                                <FontAwesomeIcon
                                    icon={openIdx === idx ? faMinus : faPlus}
                                    className="text-white text-xl"
                                />
                            </button>

                            {openIdx === idx && (
                                <div className="px-6 pb-6 pt-2 text-sm">
                                    <p className="mb-2">
                                        <span className="font-semibold">Professor:</span>{' '}
                                        {subj.teacher}
                                    </p>
                                    <ul className="list-disc list-inside space-y-1">
                                        {subj.content.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
