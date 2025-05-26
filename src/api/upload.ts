// src/api/upload.ts

import type { Document, CreateDocumentRequest, GetDocumentsParams } from '@/types/upload';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

async function handleResponse<T>(res: Response, errorMsg: string): Promise<T> {
    if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.message ?? errorMsg);
    }
    return res.json() as Promise<T>;
}

/**
 * Faz upload de documento (form-data)
 */
export function uploadDocument(
    dto: CreateDocumentRequest,
    token: string
): Promise<Document> {
    const formData = new FormData();
    formData.append('file', dto.file);
    formData.append('title', dto.title);
    if (dto.author) formData.append('author', dto.author);
    if (dto.description) formData.append('description', dto.description);
    formData.append('series', dto.series);
    formData.append('educationLevel', dto.educationLevel);
    if (dto.subjectId) formData.append('subjectId', dto.subjectId);

    return fetch(
        `${BASE_URL}/documents/upload`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }
    ).then(res => handleResponse<Document>(res, 'Erro ao enviar documento'));
}

/**
 * Busca todos os documentos com filtros opcionais
 */
export function getDocuments(
    params: GetDocumentsParams,
    token: string
): Promise<Document[]> {
    const query = new URLSearchParams();
    if (params.title) query.append('title', params.title);
    if (params.series) query.append('series', params.series);
    if (params.educationLevel) query.append('educationLevel', params.educationLevel);
    if (params.processingStatus) query.append('processingStatus', params.processingStatus);
    if (params.subjectId) query.append('subjectId', params.subjectId);

    const url = `${BASE_URL}/documents?${query.toString()}`;
    return fetch(
        url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    ).then(res =>
        handleResponse<Document[]>(res, 'Erro ao buscar documentos')
    );
}

/**
 * Deleta um documento pelo ID
 */
export function deleteDocument(
    id: string,
    token: string,
): Promise<{ message: string }> {
    return fetch(
        `${BASE_URL}/documents/${id}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then(res =>
        handleResponse<{ message: string }>(res, 'Erro ao deletar documento'),
    );
}
