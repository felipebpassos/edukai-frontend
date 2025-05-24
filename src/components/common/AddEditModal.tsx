// src/components/common/AddEditModal.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, FieldValues, Path, FieldError, DefaultValues } from 'react-hook-form'
import { FaSpinner, FaSave, FaTimes } from 'react-icons/fa'
import { TextInput } from './TextInput'
import { Select } from './Select'

export type FieldOption = { value: string; label: string }
export type FieldConfig<T extends FieldValues> = {
    name: Path<T>
    label: string
    type: 'text' | 'number' | 'select' | 'multiselect'
    options?: FieldOption[]
    placeholder?: string
    required?: boolean
}

export interface AddEditModalProps<T extends FieldValues> {
    title: string
    isOpen: boolean
    isEditing?: boolean
    fields: FieldConfig<T>[]
    initialValues?: Partial<T>
    onClose: () => void
    onSubmit: (data: T) => Promise<void>
}

export function AddEditModal<T extends FieldValues>({
    title,
    isOpen,
    isEditing = false,
    fields,
    initialValues,
    onClose,
    onSubmit,
}: AddEditModalProps<T>) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<T>({
        defaultValues: initialValues as DefaultValues<T>,
    })

    const [formError, setFormError] = useState<string | null>(null)

    useEffect(() => {
        if (initialValues) reset(initialValues as DefaultValues<T>)
    }, [initialValues, reset])

    if (!isOpen) return null

    const submitHandler: SubmitHandler<T> = async (data) => {
        setFormError(null)
        try {
            await onSubmit(data)
            onClose()
        } catch (err: unknown) {
            if (err instanceof Error) {
                setFormError(err.message)
            } else {
                setFormError('Ocorreu um erro')
            }
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {/* Botão de fechar */}
                <button
                    onClick={onClose}
                    className="absolute top-[-10] right-[-10] w-8 h-8 flex items-center justify-center rounded-full bg-purple-700 hover:bg-purple-600 text-white"
                    aria-label="Fechar"
                >
                    <FaTimes className="text-sm" />
                </button>

                <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
                {formError && (
                    <p className="text-red-600 mb-4">{formError}</p>
                )}

                <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
                    {fields.map((f) => {
                        const fieldError = errors[f.name] as FieldError | undefined
                        const isFieldRequired = f.required ?? false
                        const labelText = isFieldRequired ? `${f.label}*` : f.label

                        if (f.type === 'text' || f.type === 'number') {
                            return (
                                <TextInput<T>
                                    key={f.name}
                                    label={labelText}
                                    name={f.name}
                                    register={register}
                                    required={isFieldRequired}
                                    error={fieldError}
                                    placeholder={f.placeholder}
                                    type={f.type}
                                />
                            )
                        }

                        if (f.type === 'select' || f.type === 'multiselect') {
                            return (
                                <Select<T>
                                    key={f.name}
                                    label={labelText}
                                    name={f.name}
                                    control={control}
                                    rules={f.required ? { required: true } : {}}
                                    error={fieldError}
                                    options={f.options || []}
                                    multiple={f.type === 'multiselect'}
                                />
                            )
                        }

                        return null
                    })}

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-400 text-white"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-4 py-2 rounded bg-purple-800 hover:bg-purple-600 text-white"
                        >
                            {isSubmitting ? (
                                <FaSpinner className="animate-spin text-sm" />
                            ) : (
                                <FaSave className="text-sm" />
                            )}
                            {isEditing ? 'Salvar' : 'Criar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

