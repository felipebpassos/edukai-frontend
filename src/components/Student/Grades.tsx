// /components/student/Grades.tsx
import Image from 'next/image'
import { subjects } from '@/consts/subjects'

export default function Grades() {
    return (
        <div className="max-w-4xl mx-auto p-8 rounded-xl text-white">
            {/* Header */}
            <div className="flex justify-center">
                <Image
                    src="/notas.png"
                    alt="NOTAS | SEMESTRE"
                    width={400}
                    height={80}
                />
            </div>

            {/* Tabela de notas */}
            <div className="mt-8 overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            {/* coluna Matéria com largura automática baseada no maior conteúdo */}
                            <th className="w-max px-4 py-3 text-right text-base font-semibold uppercase text-gray-200 align-middle">
                                Matéria
                            </th>
                            {Array.from({ length: 6 }, (_, i) => (
                                <th
                                    key={i}
                                    className="w-1/12 px-2 py-3 text-center text-sm font-medium text-gray-200 align-middle"
                                >
                                    {`${i + 1}º`}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map(({ name, grades }, idx) => {
                            // escolhe 'to-r' ou 'to-l' conforme índice par/ímpar
                            const dir = idx % 2 === 0 ? 'to-r' : 'to-l'

                            return (
                                <tr key={name}>
                                    {/* nome da matéria com container padronizado, alinhado à direita e fonte maior */}
                                    <td className="px-4 py-3 align-middle">
                                        <span
                                            className={`
                        block w-full
                        px-4 py-2
                        bg-gradient-${dir} from-[#582EA0] to-transparent
                        rounded-md uppercase text-base font-bold text-white
                        text-right
                      `}
                                        >
                                            {name}
                                        </span>
                                    </td>

                                    {/* notas das 6 unidades */}
                                    {Array.from({ length: 6 }, (_, i) => (
                                        <td
                                            key={i}
                                            className="px-2 py-2 text-center align-middle"
                                        >
                                            <div className="inline-flex items-center justify-center rounded-md p-[3px] bg-gradient-to-r from-[#582EA0] to-transparent">
                                                <div className="bg w-12 h-10 flex items-center justify-center text-sm rounded-sm">
                                                    {grades[i] !== undefined ? grades[i].toFixed(1) : ''}
                                                </div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
