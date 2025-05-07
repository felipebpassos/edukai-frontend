// src/components/BubbleBackground.tsx
'use client'

import { useState, useEffect, CSSProperties } from 'react'

type Bubble = {
    size: number
    left: number
    delay: number    // negativo para “pré-avançar” a animação
    duration: number
    hue: number
    alpha: number
}

interface BubbleBackgroundProps {
    count?: number
}

export default function BubbleBackground({ count = 200 }: BubbleBackgroundProps) {
    const [bubbles, setBubbles] = useState<Bubble[]>([])

    useEffect(() => {
        const arr: Bubble[] = Array.from({ length: count }).map(() => {
            const size = Math.random() * 25 + 15        // 15–40px
            const left = Math.random() * 100            // 0–100%
            const duration = Math.random() * 6 + 8      // 8–14s
            const delay = -Math.random() * duration     // delay negativo para pré-avançar
            const hue = 290 + Math.random() * 20        // 290°–310°
            const alpha = Math.random() * 0.15 + 0.1    // 0.1–0.25
            return { size, left, delay, duration, hue, alpha }
        })
        setBubbles(arr)
    }, [count])

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {bubbles.map((b, i) => {
                const style: CSSProperties = {
                    width: `${b.size}px`,
                    height: `${b.size}px`,
                    left: `${b.left}%`,
                    animationDelay: `${b.delay}s`,
                    animationDuration: `${b.duration}s`,
                    background: `hsla(${b.hue},90%,70%,${b.alpha})`,
                }
                return <span key={i} className="bubble" style={style} />
            })}
        </div>
    )
}
