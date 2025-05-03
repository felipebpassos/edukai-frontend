'use client'

import React from 'react'
import Image from 'next/image'

interface NavLink {
    label: string
    onClick: () => void
}

interface HeaderProps {
    links: NavLink[]
    activeLabel?: string
    className?: string
}

export default function Header({
    links,
    activeLabel,
    className = '',
}: HeaderProps) {
    return (
        <header className={className}>
            <div className="flex items-center justify-center">
                <Image src="/logo.png" alt="Eduk.AI" width={120} height={40} />
            </div>

            <div className="mt-4 flex justify-center">
                <div className="rounded-[38px] bg-gradient-to-r from-[#7F51D0] via-[#6117E4] to-[#41296A] p-[2px]">
                    <div className="bg rounded-[36px]">
                        <nav className="flex justify-center space-x-8 text-sm px-8 py-2">
                            {links.map(({ label, onClick }) => (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={onClick}
                                    className={`${label === activeLabel ? 'font-semibold' : ''
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}
