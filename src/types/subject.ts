// src/types/subject.ts

/**
 * Tipo de Subject retornado pela API
 */
export interface Subject {
    id: string;
    name: string;
    description: string;
    imagePath?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}

/**
 * Payload para criação de uma matéria
 */
export interface CreateSubjectRequest {
    name: string;
    description?: string;
}

/**
 * Payload para atualização de uma matéria
 */
export interface UpdateSubjectRequest {
    name?: string;
    description?: string;
}
