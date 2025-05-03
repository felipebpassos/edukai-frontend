// /utils/grades.ts
/**
 * Calcula a média de um array de números e retorna com uma casa decimal.
 * Se o array estiver vazio, retorna 0.
 */
export function calculateAverage(grades: number[]): number {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, g) => acc + g, 0);
    return Number((sum / grades.length).toFixed(1));
}
