// src/app/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import LoginInput from '@/components/LoginInput'
import SlideUpModal from '@/components/SlideUpModal';
import BubbleBackground from '@/components/BubbleBackground';
import { modalInfo, ModalType } from '@/components/modalInfo';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);

    const { auth, login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        document.title = 'Login | Eduk.AI';
    }, []);

    function useHasMounted() {
        const [has, setHas] = useState(false);
        useEffect(() => setHas(true), []);
        return has;
    }
    const hasMounted = useHasMounted();

    useEffect(() => {
        if (!hasMounted) return;
        if (auth.access_token) router.replace('/dashboard');
    }, [hasMounted, auth.access_token, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(email, password);
            router.push('/dashboard');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Erro inesperado');
        } finally {
            setLoading(false);
        }
    };

    const openModal = (type: ModalType) => (e: React.MouseEvent) => {
        e.preventDefault();
        setModalType(type);
    };
    const closeModal = () => setModalType(null);

    return (
        <div className="relative">
            {/* ——— Fundo de bolinhas fixo ——— */}
            <BubbleBackground count={200} />

            {/* ——— Conteúdo principal ——— */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
                {/* Logo */}
                <Image
                    src="/logo.png"
                    alt="Logo Eduk.ai"
                    width={120}
                    height={120}
                    className="mb-4"
                />

                {/* Tagline */}
                <p className="text-gray-300 text-center mb-6 text-sm max-w-md">
                    Sua escola on-line e aprendizado com IA.
                    <button
                        onClick={openModal('sobre')}
                        className="ml-2 text-gray-300 hover:text-gray-200"
                        aria-label="Sobre Eduk.ai"
                    >
                        <FontAwesomeIcon icon={faCircleInfo} size="lg" />
                    </button>
                </p>

                {/* Form */}
                <form
                    onSubmit={handleLogin}
                    className="bg-[#f4ede8] p-8 rounded-xl shadow-lg w-full max-w-md"
                >
                    <h1 className="text-3xl font-bold text-primary mb-2">
                        Olá,<br />Boas Vindas!
                    </h1>
                    <p className="text-primary mb-6 text-sm">
                        Para ter acesso à plataforma, faça o seu login.
                    </p>

                    <LoginInput
                        type="email"
                        placeholder="Usuário"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <LoginInput
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex items-center justify-between text-sm mb-4">
                        <label className="flex items-center gap-2 text-primary">
                            <input type="checkbox" className="accent-purple-900" />
                            Mantenha-me conectado
                        </label>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                alert('Função de recuperação de senha em breve.')
                            }}
                            className="text-primary hover:underline"
                        >
                            Esqueceu a senha?
                        </a>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded bg-primary text-white font-semibold transition hover:bg-purple-900 hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                            'Entrar'
                        )}
                    </button>
                </form>

                {/* Rodapé */}
                <div className="text-center mt-4 text-sm text-gray-400 max-w-md">
                    <span>Ler </span>
                    <a
                        href="#"
                        onClick={openModal('privacy')}
                        className="text-gray-300 hover:[text-decoration:underline]"
                        onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                        onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                    >
                        políticas de privacidade
                    </a>
                    {' '}e{' '}
                    <a
                        href="#"
                        onClick={openModal('terms')}
                        className="text-gray-300"
                        onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                        onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                    >
                        termos de uso
                    </a>.
                </div>

                {/* Modal */}
                <SlideUpModal
                    isOpen={!!modalType}
                    title={modalType ? modalInfo[modalType].title : null}
                    onClose={closeModal}
                >
                    {modalType ? modalInfo[modalType].content : null}
                </SlideUpModal>
            </div>
        </div>
    );
}
