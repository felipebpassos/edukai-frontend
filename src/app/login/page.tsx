'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authenticateUser } from '@/api/auth'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            const { role } = await authenticateUser({ email, password })

            switch (role) {
                case 'STUDENT':
                    router.push('/dashboard/student')
                    return
                case 'DIRECTOR':
                    router.push('/dashboard/director')
                    return
                default:
                    setError('Permissão inválida')
            }
        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message)
            else setError('Erro inesperado')
        }
    }

    return (
        <div>
            <form
                onSubmit={handleLogin}
                className="bg-purple-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
            >
                <h1 className="text-2xl mb-6 text-center">Login Eduk.AI</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 rounded bg-purple-700 placeholder-purple-300"
                    required
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 rounded bg-purple-700 placeholder-purple-300"
                    required
                />

                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                <button
                    type="submit"
                    className="w-full py-3 rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                    Entrar
                </button>
            </form>
        </div>
    )
}
