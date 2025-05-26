// src/api/school.ts

import type {
    PaginatedResponse,
} from '@/types/common';
import type { CreateSchoolRequest, UpdateSchoolRequest, School, GetSchoolParams } from '@/types/school';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

async function handleResponse<T>(res: Response, errorMsg: string): Promise<T> {
    if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.message ?? errorMsg);
    }
    return res.json() as Promise<T>;
}

/**
 * Busca escolas paginadas com filtros de nome, cidade e estado
 */
export function getSchools(
    params: GetSchoolParams,
    token: string,
): Promise<PaginatedResponse<School>> {
    const query = new URLSearchParams();
    query.append('page', String(params.page));
    query.append('limit', String(params.limit));
    if (params.name) query.append('name', params.name);
    if (params.city) query.append('city', params.city);
    if (params.state) query.append('state', params.state);

    return fetch(
        `${BASE_URL}/school?${query.toString()}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    ).then(res =>
        handleResponse<PaginatedResponse<School>>(
            res,
            'Erro ao buscar escolas',
        ),
    );
}

/**
 * Cria uma nova escola
 */
export function createSchool(
    dto: CreateSchoolRequest,
    token: string,
): Promise<School> {
    return fetch(
        `${BASE_URL}/school`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dto),
        },
    ).then(res => handleResponse<School>(res, 'Erro ao criar escola'));
}

/**
 * Atualiza uma escola existente
 */
export function updateSchool(
    id: string,
    dto: UpdateSchoolRequest,
    token: string,
): Promise<School> {
    return fetch(
        `${BASE_URL}/school/${id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dto),
        },
    ).then(res => handleResponse<School>(res, 'Erro ao atualizar escola'));
}

/**
 * Atribui um diretor à escola
 */
export function assignDirector(
    schoolId: string,
    directorId: string,
    token: string,
): Promise<School> {
    return fetch(
        `${BASE_URL}/school/${schoolId}/director`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ directorId }),
        },
    ).then(res => handleResponse<School>(res, 'Erro ao atribuir diretor'));
}

/**
 * Desvincula um professor de uma escola
 */
export function unassignTeacher(
    schoolId: string,
    teacherId: string,
    token: string,
): Promise<{ message: string }> {
    return fetch(
        `${BASE_URL}/school/${schoolId}/teacher/${teacherId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    ).then(res => handleResponse<{ message: string }>(res, 'Erro ao desvincular professor'));
}
