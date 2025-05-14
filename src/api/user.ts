// src/api/users.ts
import type { CreateUserRequest, UpdateUserRequest, User } from '@/types/user';

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
