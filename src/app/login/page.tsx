'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authenticateUser } from '@/api/auth'
import Image from 'next/image'

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
        <div className="relative">

            <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={120}
                className="absolute bottom-[108%] left-1/2 transform -translate-x-1/2"
            />

            <form
                onSubmit={handleLogin}
                className="bg-[#f4ede8] p-8 rounded-xl shadow-lg w-full max-w-md mx-auto"
            >

                <h1 className="text-3xl font-bold text-primary mb-2">
                    Olá,<br />Boas Vindas!
                </h1>
                <p className="text-primary mb-6 text-sm">
                    Para ter acesso à plataforma, faça o seu login.
                </p>
                <input
                    type="email"
                    placeholder="Usuário"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="
    w-full
    p-3
    mb-4
    rounded
    border
    border-transparent
    border-l-4
    border-l-purple-700 
    bg-white
    placeholder-primary
  "
                    required
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="
    w-full
    p-3
    mb-2
    rounded
    border
    border-transparent
    border-l-4
    border-l-purple-700
    bg-white
    placeholder-primary
  "
                    required
                />
                <div className="flex items-center justify-between text-sm mb-4">
                    <label className="flex items-center gap-2 text-primary">
                        <input type="checkbox" className="accent-purple-900" />
                        Mantenha-me conectado
                    </label>
                    <a href="#" className="text-primary hover:underline">
                        Esqueceu a senha?
                    </a>
                </div>
                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}
                <button
                    type="submit"
                    className="w-full py-3 rounded bg-primary hover:bg-purple-900 text-white font-semibold transition"
                >
                    Entrar
                </button>
            </form>
        </div>
    )
}
