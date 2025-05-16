'use client'

import React, { useState } from 'react'
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import Pagination from '@/components/common/Pagination'
import { AddEditModal, FieldConfig } from '@/components/common/AddEditModal'
import type { CreateUserRequest } from '@/types/user'

type Client = { id: string; name: string; description: string }
type School = { id: string; name: string; address: string }
type UserType = 'Admin' | 'Supervisor' | 'Diretor' | 'Professor' | 'Aluno'
type User = {
    id: string
    name: string
    email: string
    type: UserType
    clientId?: string
    schoolId?: string
}

const initialMockClients: Client[] = [
    { id: '1', name: 'João Supervisor', description: 'Prefeitura de Florianópolis' },
    { id: '2', name: 'Secretaria de Educação AR', description: 'Prefeitura de Aracaju' },
    { id: '4', name: 'Cláudia Medeiros', description: 'Prefeitura de Belo Horizonte' },
    { id: '5', name: 'Rede Alfa Educação', description: 'Grupo privado nacional' },
    { id: '6', name: 'Secretaria Municipal de Educação de SP', description: 'Prefeitura de São Paulo' },
]

const initialMockSchools: School[] = [
    { id: '1', name: 'EMEF Damião Frei', address: 'Rua das Flores, 123' },
    { id: '2', name: 'CEU EMEF Três Lagos', address: 'Av. dos Lagos, 456' },
    { id: '3', name: 'CEU EMEF Jardim Eliana', address: 'Rua Primavera, 789' },
    { id: '4', name: 'EMEF Antônio Alves da Silva', address: 'Av. São Geraldo, 101' },
    { id: '5', name: 'EMEF Exemplo 5', address: 'Rua Exemplo 5, 50' },
    { id: '6', name: 'EMEF Exemplo 6', address: 'Rua Exemplo 6, 60' },
    { id: '7', name: 'EMEF Exemplo 7', address: 'Rua Exemplo 7, 70' },
    { id: '8', name: 'EMEF Exemplo 8', address: 'Rua Exemplo 8, 80' },
    { id: '9', name: 'EMEF Exemplo 9', address: 'Rua Exemplo 9, 90' },
    { id: '10', name: 'EMEF Exemplo 10', address: 'Rua Exemplo 10, 100' },
    { id: '11', name: 'EMEF Exemplo 11', address: 'Rua Exemplo 11, 110' },
    { id: '12', name: 'EMEF Exemplo 12', address: 'Rua Exemplo 12, 120' },
    { id: '13', name: 'EMEF Exemplo 13', address: 'Rua Exemplo 13, 130' },
    { id: '14', name: 'EMEF Exemplo 14', address: 'Rua Exemplo 14, 140' },
    { id: '15', name: 'EMEF Exemplo 15', address: 'Rua Exemplo 15, 150' },
    { id: '16', name: 'EMEF Exemplo 16', address: 'Rua Exemplo 16, 160' },
    { id: '17', name: 'EMEF Exemplo 17', address: 'Rua Exemplo 17, 170' },
    { id: '18', name: 'EMEF Exemplo 18', address: 'Rua Exemplo 18, 180' },
    { id: '19', name: 'EMEF Exemplo 19', address: 'Rua Exemplo 19, 190' },
    { id: '20', name: 'EMEF Exemplo 20', address: 'Rua Exemplo 20, 200' },
]

// Mapeia escolas por cliente (4 escolas por cliente)
const schoolsByClient: Record<string, School[]> = {
    '1': initialMockSchools.slice(0, 4),
    '2': initialMockSchools.slice(4, 8),
    '4': initialMockSchools.slice(8, 12),
    '5': initialMockSchools.slice(12, 16),
    '6': initialMockSchools.slice(16, 20),
}

const userTypes: UserType[] = ['Admin', 'Supervisor', 'Diretor', 'Professor', 'Aluno']

const initialMockUsers: User[] = Array.from({ length: 100 }, (_, i) => {
    const id = (i + 1).toString()
    const type = userTypes[Math.floor(Math.random() * userTypes.length)]
    const name = `Usuário ${id}`
    const email = `usuario${id}@escola.com`
    let clientId: string | undefined
    let schoolId: string | undefined

    if (type === 'Diretor') {
        clientId = initialMockClients[Math.floor(Math.random() * initialMockClients.length)].id
    } else if (type === 'Professor' || type === 'Aluno') {
        clientId = initialMockClients[Math.floor(Math.random() * initialMockClients.length)].id
        const clientSchools = schoolsByClient[clientId] || []
        schoolId = clientSchools.length
            ? clientSchools[Math.floor(Math.random() * clientSchools.length)].id
            : undefined
    }

    return { id, name, email, type, clientId, schoolId }
})

export default function Users() {
    const [users] = useState<User[]>(initialMockUsers)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState<UserType | ''>('')
    const [filterClient, setFilterClient] = useState<string | ''>('')
    const [filterSchool, setFilterSchool] = useState<string | ''>('')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 5

    // Filtros e pesquisa
    const filteredBySearch = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const filteredByType = filterType
        ? filteredBySearch.filter(u => u.type === filterType)
        : filteredBySearch
    const filteredByClient =
        (filterType === 'Diretor' || filterType === 'Professor' || filterType === 'Aluno') && filterClient
            ? filteredByType.filter(u => u.clientId === filterClient)
            : filteredByType
    const filtered =
        (filterType === 'Professor' || filterType === 'Aluno') && filterSchool
            ? filteredByClient.filter(u => u.schoolId === filterSchool)
            : filteredByClient

    // Paginação
    const totalPages = Math.ceil(filtered.length / pageSize)
    const paginated = filtered.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    // Modal de adicionar/editar
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const handleNew = () => {
        setIsEditing(false)
        setSelectedUser(null)
        setIsModalOpen(true)
    }

    const handleEdit = (user: User) => {
        setIsEditing(true)
        setSelectedUser(user)
        setIsModalOpen(true)
    }

    const handleDelete = (id: string) => {
        alert('Usuário deletado (mock). Veja o console para detalhes.')
        console.log('Deletar usuário com ID:', id)
    }

    const handleSubmit = async (data: CreateUserRequest) => {
        if (isEditing && selectedUser) {
            alert('Usuário editado (mock). Veja o console para detalhes.')
            console.log('Editar usuário:', { id: selectedUser.id, ...data })
        } else {
            alert('Usuário criado (mock). Veja o console para detalhes.')
            console.log('Novo usuário:', data)
        }
        setIsModalOpen(false)
    }

    // Campos do modal
    const fields: FieldConfig<CreateUserRequest>[] = [
        { name: 'name', label: 'Nome', type: 'text', placeholder: 'Digite o nome' },
        { name: 'email', label: 'Email', type: 'text', placeholder: 'Digite o email' },
        { name: 'phone', label: 'Telefone', type: 'text', placeholder: '(xx) xxxxx-xxxx' },
    ]

    return (
        <section className="bg-purple-900/50 p-6 rounded-lg shadow text-white">
            <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                <h2 className="text-2xl font-semibold">Usuários</h2>
                <button
                    onClick={handleNew}
                    className="flex items-center gap-2 text-sm bg-purple-800 hover:bg-purple-600 px-3 py-1 rounded"
                >
                    <FaPlus className="text-xs" /> Cadastrar
                </button>
            </div>

            <div className="flex flex-wrap items-center mb-6 gap-4">
                {/* filtros junto ao título */}
                <select
                    className="bg-purple-700/20 text-white px-3 py-2 rounded focus:outline-none"
                    value={filterType}
                    onChange={e => { setFilterType(e.target.value as UserType); setFilterClient(''); setFilterSchool(''); setCurrentPage(1) }}
                >
                    <option value="">Todos os tipos</option>
                    {userTypes.map(t => (<option key={t} value={t}>{t}</option>))}
                </select>
                {(filterType === 'Diretor' || filterType === 'Professor' || filterType === 'Aluno') && (
                    <select
                        className="bg-purple-700/20 text-white px-3 py-2 rounded focus:outline-none"
                        value={filterClient}
                        onChange={e => { setFilterClient(e.target.value); setFilterSchool(''); setCurrentPage(1) }}
                    >
                        <option value="">Todos os clientes</option>
                        {initialMockClients.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                    </select>
                )}
                {(filterType === 'Professor' || filterType === 'Aluno') && (
                    <select
                        className="bg-purple-700/20 text-white px-3 py-2 rounded focus:outline-none"
                        value={filterSchool}
                        onChange={e => { setFilterSchool(e.target.value); setCurrentPage(1) }}
                    >
                        <option value="">Todas as escolas</option>
                        {(filterClient ? schoolsByClient[filterClient] || [] : initialMockSchools).map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                )}
            </div>

            <div className="mb-4 relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-300">
                    <FaSearch />
                </span>
                <input
                    type="text"
                    placeholder="Pesquisar por nome"
                    className="w-full pl-10 py-2 px-3 bg-purple-700/20 placeholder-purple-300 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={searchTerm}
                    onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1) }}
                />
            </div>

            <ul className="space-y-4">
                {paginated.map(u => (
                    <li key={u.id} className="flex justify-between items-center bg-purple-700/20 p-4 rounded">
                        <div>
                            <p className="font-medium">{u.name}</p>
                            <p className="text-sm text-purple-300">{u.type}</p>
                            {u.clientId && <p className="text-sm text-purple-300">{initialMockClients.find(c => c.id === u.clientId)?.name}</p>}
                            {u.schoolId && <p className="text-sm text-purple-300">{initialMockSchools.find(s => s.id === u.schoolId)?.name}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleEdit(u)} className="p-2 rounded bg-purple-800 hover:bg-purple-600">
                                <FaEdit className="text-white text-sm" />
                            </button>
                            <button onClick={() => handleDelete(u.id)} className="p-2 rounded bg-purple-800 hover:bg-purple-600">
                                <FaTrash className="text-white text-sm" />
                            </button>
                        </div>
                    </li>
                ))}

                {filtered.length === 0 && (
                    <p className="text-center text-purple-300">Nenhum usuário encontrado.</p>
                )}
            </ul>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

            <AddEditModal<CreateUserRequest>
                title={isEditing ? 'Editar Usuário' : 'Cadastrar Usuário'}
                isOpen={isModalOpen}
                isEditing={isEditing}
                fields={fields}
                initialValues={selectedUser ?? undefined}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </section>
    )
}