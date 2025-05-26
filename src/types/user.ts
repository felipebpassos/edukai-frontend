// src/types/user.ts

/**
 * Payload para criação de usuário
 */
export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
}

/**
 * Payload para atualização de usuário (todos os campos opcionais)
 */
export type UpdateUserRequest = Partial<CreateUserRequest>;

/**
 * Tipo de usuário retornado pela API
 */
export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    roleId: string;
    schoolId?: string;
    classroomId?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}

export interface GetUserByRoleParams {
    page: number;
    limit: number;
    name?: string;
    email?: string;
}


