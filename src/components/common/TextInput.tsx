'use client'

import React from 'react'
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form'

export type TextInputProps<T extends FieldValues> = {
    label: string
    name: Path<T>
    register: UseFormRegister<T>
    required?: boolean
    error?: FieldError
    placeholder?: string
    type?: 'text' | 'number'
}

export function TextInput<T extends FieldValues>({
    label,
    name,
    register,
    required = false,
    error,
    placeholder,
    type = 'text',
}: TextInputProps<T>) {
    return (
        <div>
            <label htmlFor={String(name)} className="block text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={String(name)}
                type={type}
                {...register(name, { required })}
                placeholder={placeholder}
                className={`w-full rounded px-3 py-2 border 
                    text-black placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-purple-600 
                    ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">
                    Campo obrigatório
                </p>
            )}
        </div>
    )
}


