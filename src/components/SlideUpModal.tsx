import { ReactNode } from 'react';

type SlideUpModalProps = {
    isOpen: boolean;
    title: ReactNode;
    onClose: () => void;
    children: ReactNode;
};

export default function SlideUpModal({
    isOpen,
    title,
    onClose,
    children,
}: SlideUpModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed w-full inset-0 z-50">
            {/* Fundo escuro */}
            <div className="modal-overlay" onClick={onClose} />

            {/* Modal em largura total (100vw) */}
            <div
                className="modal-sheet bg-white flex flex-col"
                style={{ width: '100vw', height: '90vh' }}
            >
                {/* Botão de fechar no canto direito do modal */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                    aria-label="Fechar modal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Conteúdo centralizado */}
                <div className="relative w-full max-w-3xl mx-auto px-6 h-full flex flex-col">
                    {/* Título centralizado com text-primary */}
                    <header className="pt-10 pb-4 text-center border-b border-gray-200">
                        <div className="inline-block text-primary">{title}</div>
                    </header>

                    {/* Conteúdo com scroll */}
                    <div className="modal-content flex-1 py-6 overflow-y-auto space-y-6 text-gray-700 text-sm">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
