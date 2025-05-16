'use client'

import React, { useState } from 'react'
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import { AddEditModal, FieldConfig } from '@/components/common/AddEditModal'
import Pagination from '@/components/common/Pagination'
import type { CreateUserRequest } from '@/types/user'

type Student = {
    id: string
    name: string
    email: string
    classroom: string
}

const initialMockStudents: Student[] = [
    { id: '1', name: 'Ana Beatriz', email: 'ana.beatriz@escola.com', classroom: 'Turma A' },
    { id: '2', name: 'Bruno Souza', email: 'bruno.souza@escola.com', classroom: 'Turma B' },
    { id: '3', name: 'Camila Rocha', email: 'camila.rocha@escola.com', classroom: 'Turma C' },
    { id: '4', name: 'Diego Ferreira', email: 'diego.ferreira@escola.com', classroom: 'Turma D' },
    { id: '5', name: 'Eduarda Martins', email: 'eduarda.martins@escola.com', classroom: 'Turma A' },
    { id: '6', name: 'Felipe Santos', email: 'felipe.santos@escola.com', classroom: 'Turma B' },
    { id: '7', name: 'Gabriela Lima', email: 'gabriela.lima@escola.com', classroom: 'Turma C' },
    { id: '8', name: 'Henrique Alves', email: 'henrique.alves@escola.com', classroom: 'Turma D' },
    { id: '9', name: 'Isabela Costa', email: 'isabela.costa@escola.com', classroom: 'Turma A' },
    { id: '10', name: 'João Pedro', email: 'joao.pedro@escola.com', classroom: 'Turma B' },
]

export default function Students() {
    const [students] = useState<Student[]>(initialMockStudents)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 6

    // filtro por nome
    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // paginação
    const totalPages = Math.ceil(filteredStudents.length / pageSize)
    const paginatedStudents = filteredStudents.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

    const fields: FieldConfig<CreateUserRequest>[] = [
        { name: 'name', label: 'Nome', type: 'text', placeholder: 'Digite o nome' },
        { name: 'email', label: 'Email', type: 'text', placeholder: 'Digite o email' },
        { name: 'phone', label: 'Telefone', type: 'text', placeholder: '(xx) xxxxx-xxxx' },
    ]

    const handleNew = () => {
        setIsEditing(false)
        setSelectedStudent(null)
        setIsModalOpen(true)
    }

    const handleEdit = (student: Student) => {
        setIsEditing(true)
        setSelectedStudent(student)
        setIsModalOpen(true)
    }

    const handleDelete = (id: string) => {
        alert('Aluno deletado (mock). Veja o console para detalhes.')
        console.log('Deletar aluno com ID:', id)
    }

    const handleSubmit = async (data: CreateUserRequest) => {
        if (isEditing && selectedStudent) {
            alert('Aluno editado (mock). Veja o console para detalhes.')
            console.log('Editar aluno:', { id: selectedStudent.id, ...data })
        } else {
            alert('Aluno criado (mock). Veja o console para detalhes.')
            console.log('Novo aluno:', data)
        }
        setIsModalOpen(false)
    }

    return (
        <section className="bg-purple-900/50 p-6 rounded-lg shadow text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Alunos</h2>
                <button
                    onClick={handleNew}
                    className="flex items-center gap-2 text-sm bg-purple-800 hover:bg-purple-600 px-3 py-1 rounded"
                >
                    <FaPlus className="text-xs" />
                    Cadastrar
                </button>
            </div>

            <div className="mb-6 relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-300">
                    <FaSearch />
                </span>
                <input
                    type="text"
                    placeholder="Pesquisar por nome"
                    className="w-full pl-10 py-2 px-3 bg-purple-700/20 placeholder-purple-300 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={searchTerm}
                    onChange={e => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                    }}
                />
            </div>

            <ul className="space-y-4">
                {paginatedStudents.map(student => (
                    <li
                        key={student.id}
                        className="flex justify-between items-center bg-purple-700/20 p-4 rounded"
                    >
                        <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-purple-300">{student.classroom}</p>
                            <p className="text-xs text-purple-300">{student.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleEdit(student)}
                                className="p-2 rounded bg-purple-800 hover:bg-purple-600"
                            >
                                <FaEdit className="text-white text-sm" />
                            </button>
                            <button
                                onClick={() => handleDelete(student.id)}
                                className="p-2 rounded bg-purple-800 hover:bg-purple-600"
                            >
                                <FaTrash className="text-white text-sm" />
                            </button>
                        </div>
                    </li>
                ))}

                {filteredStudents.length === 0 && (
                    <p className="text-center text-purple-300">
                        Nenhum aluno encontrado.
                    </p>
                )}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={page => setCurrentPage(page)}
            />

            <AddEditModal<CreateUserRequest>
                title={isEditing ? 'Editar Aluno' : 'Cadastrar Aluno'}
                isOpen={isModalOpen}
                isEditing={isEditing}
                fields={fields}
                initialValues={selectedStudent ?? undefined}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </section>
    )
}
