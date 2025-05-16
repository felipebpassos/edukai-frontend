// src/api/auth.ts
/*
import type { LoginResponse } from '@/types/auth';

export async function authenticateUser(credentials: {
    email: string;
    password: string;
}): Promise<LoginResponse> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            }
        );

        if (!res.ok) {
            if (res.status === 401) {
                throw new Error('Credenciais inválidas');
            }
            const err = await res.json().catch(() => null);
            throw new Error(err?.message || 'Erro ao autenticar');
        }

        return res.json();
    } catch (error: unknown) {
        if (error instanceof TypeError) {
            throw new Error('Erro de conexão: não foi possível conectar ao servidor');
        }
        throw error;
    }
}
*/

import type { LoginResponse } from '@/types/auth';

const mockUsers: Record<string, LoginResponse> = {
    'diretor@escola.com': {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        name: 'Carlos Rodrigues',
        email: 'diretor@escola.com',
        phone: '(85) 98765-4321',
        role: 'DIRECTOR',
        schoolId: 'ed33247b-6e9f-4fbc-8057-dc4ea5460d6f',
    },
    'camila.fernandes@aluno.escola.com': {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        name: 'Camila Fernandes',
        email: 'camila.fernandes@aluno.escola.com',
        phone: null,
        role: 'STUDENT',
        schoolId: 'ed33247b-6e9f-4fbc-8057-dc4ea5460d6f',
    },
    'mariana.santos@escola.com': {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        name: 'Mariana Santos',
        email: 'mariana.santos@escola.com',
        phone: '(85) 98765-3333',
        role: 'TEACHER',
        schoolId: 'ed33247b-6e9f-4fbc-8057-dc4ea5460d6f',
    },
    'admin@sistema.com': {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        name: 'Administrador do Sistema',
        email: 'admin@sistema.com',
        phone: null,
        role: 'ADMIN',
        schoolId: null,
    },
    'supervisor@sistema.com': {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        name: 'Supervisor Escolar',
        email: 'supervisor@sistema.com',
        phone: '(85) 98765-6666',
        role: 'SUPERVISOR',
        schoolId: null,
    },
};

export async function authenticateUser({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockUsers[email.toLowerCase()];
            if (!user) {
                return reject(new Error('Credenciais inválidas'));
            }
            if (password !== 'senha123') {
                return reject(new Error('Credenciais inválidas'));
            }
            return resolve(user);
        }, 1000); // simula 1s de delay
    });
}
