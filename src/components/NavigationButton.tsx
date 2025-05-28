'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface Props {
    icon: IconDefinition
    text: string
    active: boolean
    onClick: () => void
}

export function NavigationButton({ icon, text, active, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center gap-2
                px-4 py-2
                rounded-lg
                font-semibold
                transition
                ${active
                    ? 'bg-purple-800 text-white shadow-[0_0_20px_rgba(128,0,255,0.7)]'
                    : 'bg-white text-primary hover:bg-gray-100'
                }
            `}
        >
            <FontAwesomeIcon icon={icon} />
            <span>{text}</span>
        </button>
    )
}
