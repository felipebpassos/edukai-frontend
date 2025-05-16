// src/components/Director/Teachers.tsx
'use client'

import React, { useState } from 'react'
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'

import { AddEditModal, FieldConfig } from '@/components/common/AddEditModal'
import Pagination from '@/components/common/Pagination'

type Teacher = {
    id: string
    name: string
    email: string
    subject: string
}

type CreateTeacherRequest = {
    name: string;
    email: string;
    subject: string;
}

const initialMockTeachers: Teacher[] = [
    { id: '1', name: 'Mario Alberto', email: 'mario.alberto@escola.com', subject: 'Matemática' },
    { id: '2', name: 'Gustavo Miguel', email: 'gustavo.miguel@escola.com', subject: 'Física' },
    { id: '3', name: 'Juliana Almeida', email: 'juliana.almeida@escola.com', subject: 'Português' },
    { id: '4', name: 'Carla Trindade', email: 'carla.trindade@escola.com', subject: 'História' },
    { id: '5', name: 'Isadora Machado', email: 'isadora.machado@escola.com', subject: 'Inglês' },
    { id: '6', name: 'Rubens Cruz', email: 'rubens.cruz@escola.com', subject: 'Geografia' },
    { id: '7', name: 'Karen Freitas', email: 'karen.freitas@escola.com', subject: 'Educação Física' },
    { id: '8', name: 'Jorge de Oliveira', email: 'jorge.oliveira@escola.com', subject: 'Filosofia' },
    { id: '9', name: 'Fernanda Lima', email: 'fernanda.lima@escola.com', subject: 'Artes' },
    { id: '10', name: 'Bruno Santos', email: 'bruno.santos@escola.com', subject: 'Biologia' },
]

export default function Teachers() {
    const [teachers] = useState<Teacher[]>(initialMockTeachers)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 6

    // Filtra por nome
    const filteredTeachers = teachers.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Calcula paginação
    const totalPages = Math.ceil(filteredTeachers.length / pageSize)
    const paginatedTeachers = filteredTeachers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)

    const fields: FieldConfig<CreateTeacherRequest>[] = [
        { name: 'name', label: 'Nome', type: 'text', placeholder: 'Digite o nome' },
        { name: 'email', label: 'Email', type: 'text', placeholder: 'Digite o email' },
        { name: 'subject', label: 'Disciplina', type: 'text', placeholder: 'Digite a disciplina' },
    ];

    const handleNew = () => {
        setIsEditing(false)
        setSelectedTeacher(null)
        setIsModalOpen(true)
    }

    const handleEdit = (teacher: Teacher) => {
        setIsEditing(true)
        setSelectedTeacher(teacher)
        setIsModalOpen(true)
    }

    const handleDelete = (id: string) => {
        alert('Professor deletado (mock). Veja o console para detalhes.')
        console.log('Deletar professor com ID:', id)
    }

    const handleSubmit = async (data: CreateTeacherRequest) => {
        if (isEditing && selectedTeacher) {
            alert('Professor editado (mock). Veja o console para detalhes.');
            console.log('Editar professor:', { id: selectedTeacher.id, ...data });
        } else {
            alert('Professor criado (mock). Veja o console para detalhes.');
            console.log('Novo professor:', data);
        }
        setIsModalOpen(false);
    };


    return (
        <section className="bg-purple-900/50 p-6 rounded-lg shadow text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Professores</h2>
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
                {paginatedTeachers.map(teacher => (
                    <li
                        key={teacher.id}
                        className="flex justify-between items-center bg-purple-700/20 p-4 rounded"
                    >
                        <div>
                            <p className="font-medium">{teacher.name}</p>
                            <p className="text-sm text-purple-300">{teacher.subject}</p>
                            <p className="text-xs text-purple-300">{teacher.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleEdit(teacher)}
                                className="p-2 rounded bg-purple-800 hover:bg-purple-600"
                            >
                                <FaEdit className="text-white text-sm" />
                            </button>
                            <button onClick={() => handleDelete(teacher.id)} className="p-2 rounded bg-purple-800 hover:bg-purple-600">
                                <FaTrash className="text-white text-sm" />
                            </button>
                        </div>
                    </li>
                ))}

                {filteredTeachers.length === 0 && (
                    <p className="text-center text-purple-300">
                        Nenhum professor encontrado.
                    </p>
                )}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={page => setCurrentPage(page)}
            />


            <AddEditModal<CreateTeacherRequest>
                title={isEditing ? 'Editar Professor' : 'Cadastrar Professor'}
                isOpen={isModalOpen}
                isEditing={isEditing}
                fields={fields}
                initialValues={selectedTeacher ?? undefined}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </section>
    )
}