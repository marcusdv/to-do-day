/**
 * Componente Header - Cabeçalho com título, data, timer e streak
 */

import { useMetas } from '../hooks/useMetas';
import { Tarefa } from '../types';
interface HeaderProps {
  tempoRestante: string;
  tarefas: Tarefa[];
}

export function Header({ tempoRestante, tarefas }: HeaderProps) {
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

  return (
    <header className='text-center pt-4'>
      {/* Título principal */}
      <div className='inline-flex items-center gap-3 mb-4'>
        <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
          <span className='text-white text-xl'>📋</span>
        </div>
        <div>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            Tarefas de Hoje
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Estatísticas em tempo real */}
      <div className='flex items-center justify-center gap-6 text-sm text-gray-600'>
        <div className='flex items-center gap-2'>
          <span>⏰ Deadline:</span>
          <span className='bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold'>
            {tempoRestante}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <span>🔥 Streak:</span>
          <span className='bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold'>0 dias</span>
        </div>
      </div>


      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-sm font-bold text-gray-800">{totalTarefas}</div>
          <div className="text-xs text-gray-600">Total</div>
        </div>
        <div className="text-center p-2 bg-green-50 rounded-lg">
          <div className="text-sm font-bold text-green-600">{tarefasConcluidas}</div>
          <div className="text-xs text-gray-600">Concluídas</div>
        </div>
        <div className="text-center p-2 bg-orange-50 rounded-lg">
          <div className="text-sm font-bold text-orange-600">{totalTarefas - tarefasConcluidas}</div>
          <div className="text-xs text-gray-600">Pendentes</div>
        </div>
      </div>
    </header>
  );
}
