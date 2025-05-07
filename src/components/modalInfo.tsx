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
                    Bem-vindo à Eduk.ai, a plataforma de gestão escolar do futuro. Aqui, conectamos
                    tecnologia de ponta com as necessidades reais de escolas, professores, alunos
                    e responsáveis.
                </p>
                <p>
                    Nosso objetivo é transformar a maneira como a educação é acompanhada e analisada,
                    oferecendo um ambiente intuitivo, seguro e poderoso. Através da inteligência artificial,
                    conseguimos gerar resumos automáticos, mapas mentais personalizados e relatórios
                    em tempo real que facilitam a tomada de decisão.
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
                    Acreditamos que cada aluno tem um ritmo, e a tecnologia pode — e deve —
                    ajudar a construir uma jornada educacional mais personalizada e inclusiva.
                    A Eduk.ai foi criada pensando nisso: facilitar o dia a dia e ampliar o
                    potencial de aprendizagem.
                </p>
            </>
        ),
    },

    privacy: {
        title: 'Política de Privacidade',
        content: (
            <>
                <p>
                    A sua privacidade é extremamente importante para nós. Na Eduk.ai, tratamos
                    os seus dados com seriedade, respeitando os mais altos padrões de segurança
                    e privacidade.
                </p>
                <p>
                    Coletamos apenas as informações estritamente necessárias para o bom
                    funcionamento da plataforma, como nome, e-mail, dados de login e dados
                    escolares relacionados à sua atuação na instituição. Esses dados são
                    utilizados exclusivamente para oferecer uma experiência personalizada,
                    segura e eficiente.
                </p>
                <p>
                    Estamos em total conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                    Você tem o direito de acessar, corrigir, portar ou até excluir seus dados,
                    conforme previsto na legislação brasileira.
                </p>
                <p>
                    Caso tenha qualquer dúvida ou deseje exercer seus direitos, entre em contato
                    conosco pelo e-mail: <a href="mailto:privacy@eduk.ai" className="underline">privacy@eduk.ai</a>.
                </p>
            </>
        ),
    },

    terms: {
        title: 'Termos de Uso',
        content: (
            <>
                <p>
                    Estes Termos de Uso regulam o uso da plataforma Eduk.ai. Ao utilizar nossos
                    serviços, você concorda com os termos aqui apresentados, comprometendo-se
                    a utilizá-los de forma ética e responsável.
                </p>
                <p>
                    O acesso à plataforma é concedido mediante cadastro e concordância com os
                    presentes termos. É estritamente proibido utilizar a Eduk.ai para práticas
                    ilegais, disseminação de spam, tentativas de invasão, uso indevido de dados
                    de terceiros ou qualquer ação que prejudique o funcionamento da plataforma
                    e a experiência dos demais usuários.
                </p>
                <p>
                    A Eduk.ai se reserva o direito de suspender ou encerrar contas que estejam
                    em desacordo com estas regras, bem como alterar estes termos sempre que
                    necessário, com aviso prévio através dos canais oficiais.
                </p>
                <p>
                    Ao continuar usando a plataforma, você concorda automaticamente com quaisquer
                    atualizações publicadas neste documento.
                </p>
            </>
        ),
    },
};
