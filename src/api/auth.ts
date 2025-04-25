import type { LoginResponse } from '@/types/auth'

type LoginRequest = {
    email: string
    password: string
}

// função reutilizável no client também
export async function authenticateUser({ email, password }: LoginRequest): Promise<LoginResponse> {
    let role: LoginResponse['role']

    console.log(password)

    if (email.includes('student')) role = 'STUDENT'
    else if (email.includes('director')) role = 'DIRECTOR'
    else role = 'STUDENT'

    return { role }
}
