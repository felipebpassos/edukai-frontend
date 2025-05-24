'use client'

import React from 'react'
import {
    Controller,
    Control,
    FieldError,
    FieldValues,
    Path,
    UseControllerProps,
} from 'react-hook-form'

type Option = { value: string; label: string }

type SelectProps<T extends FieldValues> = {
    label: string
    name: Path<T>
    control: Control<T>
    error?: FieldError
    options: Option[]
    multiple?: boolean
    // agora rules usa o tipo exato que Controller espera
    rules?: UseControllerProps<T, Path<T>>['rules']
}

export function Select<T extends FieldValues>({
    label,
    name,
    control,
    error,
    options,
    multiple = false,
    rules = {},
}: SelectProps<T>) {
    const placeholderText = multiple
        ? ''
        : rules.required
            ? 'Selecione...'
            : 'Selecione (opcional)'

    return (
        <div>
            <label htmlFor={name} className="block text-gray-700 mb-1">
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <select
                        id={name}
                        multiple={multiple}
                        {...field}
                        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${error ? 'border-red-500' : 'border-gray-300'
                            }`}
                    >
                        {!multiple && <option value="">{placeholderText}</option>}
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
                    {error.type === 'required'
                        ? multiple
                            ? 'Seleção obrigatória'
                            : 'Campo obrigatório'
                        : error.message}
                </p>
            )}
        </div>
    )
}
