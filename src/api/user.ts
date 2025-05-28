// src/api/users.ts
import type { CreateUserRequest, UpdateUserRequest, User, GetUserByRoleParams } from '@/types/user';
import type { PaginatedResponse } from '@/types/common';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

async function handleResponse<T>(res: Response, errorMsg: string): Promise<T> {
    if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.message ?? errorMsg);
    }
    return res.json() as Promise<T>;
}

export function createSupervisor(
    dto: CreateUserRequest,
    token: string
): Promise<User> {
    return fetch(`${BASE_URL}/user/supervisor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
    }).then(res => handleResponse<User>(res, 'Erro ao criar supervisor'));
}

export function createDirector(
    dto: CreateUserRequest,
    token: string
): Promise<User> {
    return fetch(`${BASE_URL}/user/director`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
    }).then(res => handleResponse<User>(res, 'Erro ao criar diretor'));
}

export function createTeacher(
    dto: CreateUserRequest,
    token: string
): Promise<User> {
    return fetch(`${BASE_URL}/user/teacher`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
    }).then(res => handleResponse<User>(res, 'Erro ao criar professor'));
}

export function createStudent(
    dto: CreateUserRequest,
    token: string
): Promise<User> {
    return fetch(`${BASE_URL}/user/student`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
    }).then(res => handleResponse<User>(res, 'Erro ao criar aluno'));
}

export function updateSupervisor(
    id: string,
    dto: UpdateUserRequest,
    token: string
): Promise<User> {
    return fetch(`${BASE_URL}/user/supervisor/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
    }).then(res => handleResponse<User>(res, 'Erro ao atualizar supervisor'));
}

export function updateDirector(
    id: string,
    dto: UpdateUserRequest,
    token: string
): Promise<User> {
    return fetch(`${BASE_URL}/user/director/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
    }).then(res => handleResponse<User>(res, 'Erro ao atualizar diretor'));
}

export function updateTeacher(
    id: string,
    dto: UpdateUserRequest,
    token: string
): Promise<User> {
    return fetch(`${BASE_URL}/user/teacher/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
    }).then(res => handleResponse<User>(res, 'Erro ao atualizar professor'));
}

export function updateStudent(
    id: string,
    dto: UpdateUserRequest,
    token: string
): Promise<User> {
    return fetch(`${BASE_URL}/user/student/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
    }).then(res => handleResponse<User>(res, 'Erro ao atualizar aluno'));
}

export function getSupervisors(
    params: GetUserByRoleParams,
    token: string
): Promise<PaginatedResponse<User>> {
    const query = new URLSearchParams();
    query.append('page', String(params.page));
    query.append('limit', String(params.limit));
    if (params.name) query.append('name', params.name);
    if (params.email) query.append('email', params.email);

    return fetch(
        `${BASE_URL}/user/supervisor?${query.toString()}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    ).then(res =>
        handleResponse<PaginatedResponse<User>>(
            res,
            'Erro ao buscar supervisores'
        )
    );
}

export function getDirectors(
    params: GetUserByRoleParams,
    token: string
): Promise<PaginatedResponse<User>> {
    const query = new URLSearchParams();
    query.append('page', String(params.page));
    query.append('limit', String(params.limit));
    if (params.name) query.append('name', params.name);
    if (params.email) query.append('email', params.email);

    return fetch(
        `${BASE_URL}/user/director?${query.toString()}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    ).then(res =>
        handleResponse<PaginatedResponse<User>>(
            res,
            'Erro ao buscar diretores'
        )
    );
}

export function getTeachers(
    params: GetUserByRoleParams,
    token: string
): Promise<PaginatedResponse<User>> {
    const query = new URLSearchParams();
    query.append('page', String(params.page));
    query.append('limit', String(params.limit));
    if (params.name) query.append('name', params.name);
    if (params.email) query.append('email', params.email);

    return fetch(
        `${BASE_URL}/user/teacher?${query.toString()}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    ).then(res =>
        handleResponse<PaginatedResponse<User>>(
            res,
            'Erro ao buscar professores'
        )
    );
}

export function getStudents(
    params: GetUserByRoleParams,
    token: string
): Promise<PaginatedResponse<User>> {
    const query = new URLSearchParams();
    query.append('page', String(params.page));
    query.append('limit', String(params.limit));
    if (params.name) query.append('name', params.name);
    if (params.email) query.append('email', params.email);

    return fetch(
        `${BASE_URL}/user/student?${query.toString()}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    ).then(res =>
        handleResponse<PaginatedResponse<User>>(
            res,
            'Erro ao buscar alunos'
        )
    );
}

export function deleteSupervisor(
    id: string,
    token: string
): Promise<User> {
    return fetch(`${BASE_URL}/user/supervisor/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then(res => handleResponse<User>(res, 'Erro ao deletar supervisor'));
}

export function deleteDirector(
    id: string,
    token: string
): Promise<User> {
    return fetch(`${BASE_URL}/user/director/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then(res => handleResponse<User>(res, 'Erro ao deletar diretor'));
}

export function deleteTeacher(
    id: string,
    token: string
): Promise<User> {
    return fetch(`${BASE_URL}/user/teacher/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then(res => handleResponse<User>(res, 'Erro ao deletar professor'));
}

export function deleteStudent(
    id: string,
    token: string
): Promise<User> {
    return fetch(`${BASE_URL}/user/student/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then(res => handleResponse<User>(res, 'Erro ao deletar aluno'));
}
