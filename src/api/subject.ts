// src/api/subject.ts
import type { Subject, CreateSubjectRequest, UpdateSubjectRequest } from '@/types/subject';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

async function handleResponse<T>(res: Response, errorMsg: string): Promise<T> {
    if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.message ?? errorMsg);
    }
    return res.json() as Promise<T>;
}

/**
 * Cadastra uma nova matéria
 */
export function createSubject(
    dto: CreateSubjectRequest,
    token: string
): Promise<Subject> {
    return fetch(
        `${BASE_URL}/subject`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dto),
        }
    ).then(res => handleResponse<Subject>(res, 'Erro ao cadastrar matéria'));
}

/**
 * Atualiza dados da matéria
 */
export function updateSubject(
    id: string,
    dto: UpdateSubjectRequest,
    token: string
): Promise<Subject> {
    return fetch(
        `${BASE_URL}/subject/${id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dto),
        }
    ).then(res => handleResponse<Subject>(res, 'Erro ao atualizar matéria'));
}

/**
 * Busca todas as matérias
 */
export function getSubjects(
    token: string
): Promise<Subject[]> {
    return fetch(
        `${BASE_URL}/subject`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    ).then(res => handleResponse<Subject[]>(res, 'Erro ao buscar matérias'));
}

/**
 * Faz upload de imagem de capa para a matéria
 */
export function uploadSubjectCover(
    id: string,
    file: File,
    token: string
): Promise<Subject> {
    const formData = new FormData();
    formData.append('file', file);

    return fetch(
        `${BASE_URL}/subject/${id}/cover`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }
    ).then(res => handleResponse<Subject>(res, 'Erro ao enviar imagem de capa'));
}

/**
 * Remove imagem de capa da matéria
 */
export function deleteSubjectCover(
    id: string,
    token: string
): Promise<Subject> {
    return fetch(
        `${BASE_URL}/subject/${id}/cover`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then(res => handleResponse<Subject>(res, 'Erro ao deletar imagem de capa'));
}

/**
 * Deleta a matéria
 */
export function deleteSubject(
    id: string,
    token: string
): Promise<{ message: string }> {
    return fetch(
        `${BASE_URL}/subject/${id}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then(res => handleResponse<{ message: string }>(res, 'Erro ao deletar matéria'));
}
