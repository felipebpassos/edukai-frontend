'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import SlideUpModal from '@/components/SlideUpModal';
import { modalInfo, ModalType } from '@/components/modalInfo';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);

    const { login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        document.title = 'Login | Eduk.AI'
    }, [])

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

            {/* Logo */}
            <Image
                src="/logo.png"
                alt="Logo Eduk.ai"
                width={120}
                height={120}
                className="absolute bottom-[102%] left-1/2 transform -translate-x-1/2"
            />

            {/* Tagline */}
            <p className="text-gray-300 text-center mb-6 text-sm w-full max-w-md mx-auto">
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
                    className="w-full p-3 mb-4 rounded border border-transparent border-l-6 border-l-purple-700 bg-white placeholder-primary focus:outline-none"
                    required
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full p-3 mb-2 rounded border border-transparent border-l-6 border-l-purple-700 bg-white placeholder-primary focus:outline-none"
                    required
                />

                <div className="flex items-center justify-between text-sm mb-4">
                    <label className="flex items-center gap-2 text-primary">
                        <input type="checkbox" className="accent-purple-900" />
                        Mantenha-me conectado
                    </label>
                    <a
                        href="#"
                        onClick={openModal('privacy')}
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
            <div className="text-center mt-4 text-sm text-gray-400">
                <span>Ler </span>
                <a
                    href="#"
                    onClick={openModal('privacy')}
                    className="text-gray-300 hover:underline"
                >
                    políticas de privacidade
                </a>
                {' '}e{' '}
                <a
                    href="#"
                    onClick={openModal('terms')}
                    className="text-gray-300 hover:underline"
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
    );
}
