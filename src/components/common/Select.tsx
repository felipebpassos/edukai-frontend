'use client'

import React from 'react'
import { Controller, Control, FieldError, FieldValues, Path } from 'react-hook-form'

type Option = { value: string; label: string }

type SelectProps<T extends FieldValues> = {
    label: string
    name: Path<T>
    control: Control<T>
    error?: FieldError
    options: Option[]
    multiple?: boolean
}

export function Select<T extends FieldValues>({
    label,
    name,
    control,
    error,
    options,
    multiple = false,
}: SelectProps<T>) {
    return (
        <div>
            <label htmlFor={name} className="block text-gray-700 mb-1">
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <select
                        id={name}
                        multiple={multiple}
                        {...field}
                        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${error ? 'border-red-500' : 'border-gray-300'
                            }`}
                    >
                        {!multiple && <option value="">Selecione...</option>}
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                )}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">
                    {multiple ? 'Seleção obrigatória' : 'Campo obrigatório'}
                </p>
            )}
        </div>
    )
}
