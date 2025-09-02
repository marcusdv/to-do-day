/**
 * Componente Header - Cabeçalho com título, data, timer e streak
 */

import { FcAlarmClock, FcList, FcRating, FcTodoList } from 'react-icons/fc';
import { Tarefa } from '../types';
interface HeaderProps {
  tempoRestante: string;
  tarefas: Tarefa[];
}

export function Header({ tempoRestante, tarefas }: HeaderProps) {

  // Cálculos locais
  const totalTarefas = tarefas.length;
  const tarefasConcluidas = tarefas.filter(t => t.concluida).length;

  return (
    <header className='text-center pt-4'>
      {/* Título principal */}
      <div className='inline-flex items-center gap-3 mb-4'>
        <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center'>
          <span className=' text-xl '><FcTodoList className='w-6 h-6' /></span>
        </div>
        <div>
          <h1 className='text-4xl font-bold text-black'>
            É Pra Hoje!
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
          <span className='flex items-center gap-2'><FcAlarmClock className='w-4 h-4' /> Deadline:</span>
          <span className='bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold'>
            {tempoRestante}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='flex items-center gap-2'><FcRating className='w-4 h-4' /> Streak:</span>
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
