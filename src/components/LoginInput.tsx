'use client'

import React, { InputHTMLAttributes, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

type LoginInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    type: 'email' | 'password'
    variant?: 'white' | 'light'
}

export default function LoginInput({
    type,
    variant = 'white',
    className = '',
    ...rest
}: LoginInputProps) {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    const bgClass = variant === 'light' ? 'bg-[#f4ede8]' : 'bg-white'

    return (
        <div className="relative w-full mb-4">
            <input
                type={inputType}
                className={`
          w-full
          p-3
          rounded
          border border-transparent
          border-l-6 border-l-purple-700
          ${bgClass}
          placeholder-primary
          focus:outline-none
          ${isPassword ? 'pr-10' : ''}
          ${className}
        `}
                {...rest}
            />
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center"
                    tabIndex={-1}
                >
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="text-primary w-4 h-4"
                    />
                </button>
            )}
        </div>
    )
}
