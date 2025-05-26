// src/types/school.ts

/**
 * Payload para criação de escola
 */
export interface CreateSchoolRequest {
    name: string;
    address: string;
    neighborhood: string;
    zipCode: string;
    city: string;
    state: string;
    averageGrade?: number;
}

/**
 * Payload para atualização de escola (todos os campos opcionais)
 */
export type UpdateSchoolRequest = Partial<CreateSchoolRequest>;

/**
 * Tipo de escola retornado pela API
 */
export interface School {
    id: string;
    name: string;
    address: string;
    neighborhood: string;
    zipCode: string;
    city: string;
    state: string;
    averageGrade: number;
    supervisorId: string;
    directorId?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Parâmetros para busca paginada de escolas
 */
export interface GetSchoolParams {
    page: number;
    limit: number;
    name?: string;
    city?: string;
    state?: string;
}