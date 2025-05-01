// components/modalInfo.tsx
import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export type ModalType = 'sobre' | 'privacy' | 'terms';

interface ModalEntry {
    title: React.ReactNode;
    content: React.ReactNode;
}

export const modalInfo: Record<ModalType, ModalEntry> = {
    sobre: {
        title: (
            <div className="flex justify-center mb-2">
                <Image
                    src="/logo-2.png"
                    alt="Eduk.ai"
                    width={180}
                    height={180}
                />
            </div>
        ),
        content: (
            <>
                <p>
                    Bem-vindo à Eduk.ai, sua plataforma de gestão escolar que une notas,
                    desempenho e o poder da IA em um só lugar.
                </p>

                <div className="relative w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center my-4">
                    <button
                        className="w-14 h-14 bg-primary rounded-full text-white flex items-center justify-center"
                        aria-label="Assistir vídeo"
                    >
                        <FontAwesomeIcon icon={faPlay} size="lg" />
                    </button>
                </div>

                <p>
                    Com a Eduk.ai você cria resumos, mapas mentais e acompanha
                    o desempenho dos alunos em tempo real. Tudo pensado para tornar
                    o ensino mais eficiente e alinhado às necessidades de cada estudante.
                </p>
            </>
        ),
    },

    privacy: {
        title: 'Política de Privacidade',
        content: (
            <>
                <p>
                    Na Eduk.ai, sua privacidade é nossa prioridade. Coletamos apenas
                    os dados necessários para o funcionamento da plataforma e nunca
                    os compartilhamos sem o seu consentimento prévio.
                </p>
                <p>
                    Em conformidade com a LGPD (Lei Geral de Proteção de Dados – Lei nº 13.709/2018),
                    você tem o direito de acessar, corrigir e solicitar a exclusão dos seus
                    dados a qualquer momento.
                </p>
                <p>
                    Caso tenha dúvidas ou queira exercer seus direitos, entre em contato
                    pelo email <a href="mailto:privacy@eduk.ai" className="underline">privacy@eduk.ai</a>.
                </p>
            </>
        ),
    },

    terms: {
        title: 'Termos de Uso',
        content: (
            <>
                <p>
                    Estes Termos de Uso regem o acesso e uso da plataforma Eduk.ai.
                    Ao se cadastrar, você concorda em utilizar nossos serviços de forma
                    responsável e em conformidade com a legislação brasileira.
                </p>
                <p>
                    É proibido o uso da plataforma para fins ilícitos, spam ou distribuição
                    de conteúdo não autorizado.
                </p>
                <p>
                    Reservamo-nos o direito de suspender ou encerrar contas que violem
                    estes termos, bem como de atualizar estas condições conforme necessário.
                </p>
            </>
        ),
    },
};
