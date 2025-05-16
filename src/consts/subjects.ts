// /consts/subjects.ts
export interface SubjectData {
    name: string
    grades: number[]
    image: string
    teacher: string
    content: string[]
}

export const subjects: SubjectData[] = [
    {
        name: 'Língua Portuguesa',
        grades: [8.0, 9.2, 7.5, 8.8],
        image: '/subjects/portugues.png',
        teacher: 'Profª. Ana Silva',
        content: [
            'Interpretação de texto',
            'Gramática: classes de palavras',
            'Redação: dissertação argumentativa',
        ],
    },
    {
        name: 'Ciências',
        grades: [5.0, 6.0, 4.8],
        image: '/subjects/ciencias.png',
        teacher: 'Prof. Carlos Menezes',
        content: [
            'Reino animal e vegetal',
            'Cadeia alimentar',
            'Sustentabilidade e meio ambiente',
        ],
    },
    {
        name: 'Artes',
        grades: [6.2, 5.9, 6.5],
        image: '/subjects/artes.png',
        teacher: 'Profª. Beatriz Costa',
        content: [
            'História da arte',
            'Desenho e pintura: técnicas básicas',
            'Expressão corporal',
        ],
    },
    {
        name: 'Geografia',
        grades: [4.0, 5.1, 5.5],
        image: '/subjects/geografia.png',
        teacher: 'Prof. Eduardo Rocha',
        content: [
            'Mapas e projeções cartográficas',
            'Regiões brasileiras',
            'Impactos ambientais e geopolítica',
        ],
    },
    {
        name: 'História',
        grades: [7.0, 6.8, 7.2],
        image: '/subjects/historia.png',
        teacher: 'Profª. Juliana Alves',
        content: [
            'Brasil: período colonial',
            'Inconfidência Mineira',
            'República Velha e movimentos sociais',
        ],
    },
    {
        name: 'Filosofia',
        grades: [4.5, 5.2, 5.0],
        image: '/subjects/filosofia.png',
        teacher: 'Prof. Renato Silva',
        content: [
            'Introdução aos filósofos clássicos',
            'Ética e moral',
            'Lógica e argumentação',
        ],
    },
]
