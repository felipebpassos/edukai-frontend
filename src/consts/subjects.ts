// /consts/subjects.ts
export interface SubjectData {
    name: string;
    grades: number[];
    image: string;
}

export const subjects: SubjectData[] = [
    {
        name: 'Língua Portuguesa',
        grades: [8.0, 9.2, 7.5, 8.8],
        image: '/subjects/portugues.png',
    },
    {
        name: 'Ciências',
        grades: [5.0, 6.0, 4.8],
        image: '/subjects/ciencias.png',
    },
    {
        name: 'Artes',
        grades: [6.2, 5.9, 6.5],
        image: '/subjects/artes.png',
    },
    {
        name: 'Geografia',
        grades: [4.0, 5.1, 5.5],
        image: '/subjects/geografia.png',
    },
    {
        name: 'História',
        grades: [7.0, 6.8, 7.2],
        image: '/subjects/historia.png',
    },
    {
        name: 'Filosofia',
        grades: [4.5, 5.2, 5.0],
        image: '/subjects/filosofia.png',
    },
];
