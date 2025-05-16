'use client'

import React from 'react'
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form'

type TextInputProps<T extends FieldValues> = {
    label: string
    name: Path<T>
    register: UseFormRegister<T>
    error?: FieldError
    placeholder?: string
    type?: 'text' | 'number' // <-- adicionado
}

export function TextInput<T extends FieldValues>({
    label,
    name,
    register,
    error,
    placeholder,
    type = 'text', // <-- valor padrão
}: TextInputProps<T>) {
    return (
        <div>
            <label htmlFor={name} className="block text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={name}
                type={type} // <-- aqui usa o tipo dinamicamente
                {...register(name, { required: true })}
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


