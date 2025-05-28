// src/components/common/NotificationToast.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

export type NotificationToastProps = {
    type: 'success' | 'error'
    message: string
    duration?: number // in milliseconds
    onClose?: () => void
}

export default function NotificationToast({
    type,
    message,
    duration = 3000,
    onClose,
}: NotificationToastProps) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(true)
        const hideTimer = setTimeout(() => {
            setVisible(false)
            const closeTimer = setTimeout(() => {
                onClose?.()
            }, 300)
            return () => clearTimeout(closeTimer)
        }, duration)
        return () => clearTimeout(hideTimer)
    }, [duration, onClose])

    const icon = type === 'success' ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />

    return (
        <div
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2
        bg-white px-4 py-2 rounded shadow-lg flex items-center space-x-2 z-50
        transition-transform duration-300 ease-out
        ${visible ? 'translate-y-0' : 'translate-y-20'}`.replace(/\s+/g, ' ')}
        >
            {icon}
            <span className="text-purple-600 font-medium">{message}</span>
        </div>
    )
}