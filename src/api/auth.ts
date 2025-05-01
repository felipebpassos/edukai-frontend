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
