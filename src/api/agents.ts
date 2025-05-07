// src/api/agents.ts
import type { AgentResponse } from '@/types/agent';

/**
 * Envia a pergunta do aluno ao endpoint /agents/student,
 * usando o Bearer token para autorização.
 */
export async function askStudentAgent(
    input: string,
    token: string
): Promise<AgentResponse> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/agents/student`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ input }),
        }
    );

    if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || 'Erro ao chamar o agente');
    }

    return res.json();
}
