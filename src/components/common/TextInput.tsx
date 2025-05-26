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
    min?: number
    max?: number
}

export function TextInput<T extends FieldValues>({
    label,
    name,
    register,
    required = false,
    error,
    placeholder,
    type = 'text',
    min,
    max,
}: TextInputProps<T>) {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'number') {
            const value = e.target.valueAsNumber;
            if (!isNaN(value)) {
                if (min !== undefined && value < min) e.target.value = String(min);
                if (max !== undefined && value > max) e.target.value = String(max);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (type === 'number') {
            if (['e', 'E', '+', '-'].includes(e.key)) {
                e.preventDefault();
            }
        }
    };

    return (
        <div>
            <label htmlFor={String(name)} className="block text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={String(name)}
                type={type}
                min={type === 'number' ? min : undefined}
                max={type === 'number' ? max : undefined}
                step={type === 'number' ? 'any' : undefined}
                {...register(name, {
                    required: required ? 'Campo obrigatório' : false,
                    ...(type === 'number' && min !== undefined
                        ? { min: { value: min, message: `Valor mínimo é ${min}` } }
                        : {}),
                    ...(type === 'number' && max !== undefined
                        ? { max: { value: max, message: `Valor máximo é ${max}` } }
                        : {}),
                })}
                placeholder={placeholder}
                className={`w-full rounded px-3 py-2 border 
                    text-black placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-purple-600 
                    ${error ? 'border-red-500' : 'border-gray-300'}`}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">
                    {error.message || 'Campo inválido'}
                </p>
            )}
        </div>
    );
}





