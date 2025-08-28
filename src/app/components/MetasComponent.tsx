import { useMetas } from '@/app/hooks/useMetas';
import { Tarefa } from '../types'

export const MetasComponent = ({ tarefas }: { tarefas: Tarefa[] }) => {
    const {
        calcularProgresso,
        getMensagemMotivacional,
        tarefasParaMeta,
        getMetaAtingida,
    } = useMetas(tarefas);

    // Cálculos locais
    const progresso = calcularProgresso(tarefas);
    const metaAtingida = getMetaAtingida();
    const faltamTarefas = tarefasParaMeta();
    const totalTarefas = tarefas.length;
    const tarefasConcluidas = tarefas.filter(t => t.concluida).length;
    const META_PERCENTUAL = 80;

    // Cor da barra baseada no progresso
    const getCorBarra = () => {
        if (progresso < 25) return "bg-red-500";
        if (progresso < 50) return "bg-orange-500";
        if (progresso < 75) return "bg-yellow-500";
        if (progresso < META_PERCENTUAL) return "bg-blue-500";
        return "bg-green-500";
    };

    return (
        <div className="bg-white pt-4 px-12 mb-2 mx-4 pb-1 rounded-lg shadow-lg border border-gray-200 fixed bottom-0 left-0 right-0 ">


            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="text-center p-1 bg-gray-50 rounded-lg">
                    <div className="text-sm font-bold text-gray-800">{totalTarefas}</div>
                    <div className="text-xs text-gray-600">Total</div>
                </div>
                <div className="text-center p-1 bg-green-50 rounded-lg">
                    <div className="text-sm font-bold text-green-600">{tarefasConcluidas}</div>
                    <div className="text-xs text-gray-600">Concluídas</div>
                </div>
                <div className="text-center p-1 bg-orange-50 rounded-lg">
                    <div className="text-sm font-bold text-orange-600">{totalTarefas - tarefasConcluidas}</div>
                    <div className="text-xs text-gray-600">Pendentes</div>
                </div>
            </div>

            {/* Mensagem Motivacional */}
            {/* <div className="text-center mb-6 flex flex-col justify-between">
                    <p className="text-md font-medium text-gray-700">
                        {getMensagemMotivacional()}
                    </p>

                    {/* Informação sobre meta */}
            {/* {!metaAtingida && faltamTarefas > 0 && (
                        <p className="text-gray-600">
                            Faltam apenas <span className="font-bold text-blue-600">{faltamTarefas}</span>
                            {faltamTarefas === 1 ? ' tarefa' : ' tarefas'} para atingir sua meta!
                        </p>
                    )} */}

            {/* Badge de Status */}
            {/* <div className="">
                        {metaAtingida ? (
                            <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-100 border border-green-200">
                                <span className="text-2xl mr-2">🏆</span>
                                <span className="font-bold text-green-800">Meta Atingida!</span>
                            </div>
                        ) : (
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 border border-blue-200">
                                <span className="text-md mr-2">🎯</span>
                                <span className="font-bold text-blue-800">Em Progresso</span>
                            </div>
                        )}
                    </div>
                </div> */}





            {/* Barra de Progresso */}
            <div>
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span>Progresso</span>
                    <span>Meta: {META_PERCENTUAL}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-6 relative">
                    {/* Barra de progresso */}
                    <div
                        className={`h-6 rounded-full transition-all duration-700 ease-out ${getCorBarra()}`}
                        style={{ width: `${Math.min(progresso, 100)}%` }}
                    >
                        {/* Texto dentro da barra se houver espaço */}
                        {progresso > 15 && (
                            <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
                                {progresso}%
                            </span>
                        )}
                    </div>

                    {/* Linha da meta */}
                    <div
                        className="absolute top-0 h-6 w-0.5 bg-gray-700"
                        style={{ left: `${META_PERCENTUAL}%`, transform: 'translateX(-50%)' }}
                    />
                </div>
            </div>
        </div>
    );
};