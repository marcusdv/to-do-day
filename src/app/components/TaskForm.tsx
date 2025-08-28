/**
 * TaskForm.tsx
 * Componente responsável pelo formulário de criação de novas tarefas
 * Inclui validação de horário limite (10h) e gerenciamento do estado do input
 * Exibe aviso quando o horário limite é ultrapassado
 */

import { useState } from 'react';
import { Tarefa } from "../types";
import { useMetas } from '../hooks/useMetas';

interface TaskFormProps {
  adicionarTarefa: (nome: string, prioridade: Tarefa["prioridade"]) => void;
  tarefas: Tarefa[];
}

/**
 * Componente de formulário para adicionar novas tarefas
 * Gerencia o input do usuário e valida se ainda é possível criar tarefas
 */
export function TaskForm({ adicionarTarefa, tarefas }: TaskFormProps) {
  // Estado local para controlar o valor do input de texto
  const [inputTarefa, setInputTarefa] = useState('');

  // Estado local para controlar a prioridade da tarefa
  const [prioridade, setPrioridade] = useState<'baixa' | 'media' | 'alta'>('baixa');



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
  /**
   * Função para processar a submissão de nova tarefa
   * Valida horário limite e se o input não está vazio
   */
  const handleSubmit = () => {
    // Não adiciona se o input estiver vazio ou apenas com espaços
    if (inputTarefa.trim() === '') return;

    // ✅ Adicionar validação de segurança
    if (typeof adicionarTarefa !== 'function') {
      console.error('adicionarTarefa não é uma função!');
      return;
    }

    // Chama função callback para adicionar a tarefa e limpa o input
    adicionarTarefa(inputTarefa.trim(), prioridade);
    setInputTarefa('');
  };

  // Cor da barra baseada no progresso
  const getCorBarra = () => {
    if (progresso < 25) return "bg-red-500";
    if (progresso < 50) return "bg-orange-500";
    if (progresso < 75) return "bg-yellow-500";
    if (progresso < META_PERCENTUAL) return "bg-blue-500";
    return "bg-green-500";
  };

  // Renderização condicional: se passou das 10h, mostra aviso de bloqueio
  // ! if (!podeCriarTarefas()) {
  if (false) {
    return (
      <div className='w-full max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg'>
        <div className='flex items-center gap-3'>
          <span className='text-2xl'>⏰</span>
          <div>
            <h3 className='font-semibold text-red-800'>Horário para criar tarefas encerrado</h3>
            <p className='text-sm text-red-600'>
              Você pode criar tarefas apenas até às 10:00h. Foque em concluir as tarefas já criadas!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Renderização normal: formulário ativo para adicionar tarefas
  return (
    <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
      <div className='flex gap-3'>
        {/* Campo de input para digitar nova tarefa */}
        <input
          type="text"
          value={inputTarefa}
          onChange={(e) => setInputTarefa(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} // Permite submeter com Enter
          placeholder="Adicionar nova tarefa..."
          className='flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
        />


        {/* Botão para escolher prioridade da tarefa */}
        <ul className='flex gap-4 items-center'>
          <li>
            <button
              onClick={() => setPrioridade('baixa')}
              className={` text-white rounded-full px-4 py-2 cursor-pointer
              ${prioridade === 'baixa' ? 'ring-2 ring-green-800 bg-green-500' : 'bg-green-200'}`}
            >
              1
            </button>
          </li>
          <li>
            <button
              onClick={() => setPrioridade('media')}
              className={` text-white rounded-full px-4 py-2 cursor-pointer
              ${prioridade === 'media' ? 'ring-2 ring-yellow-800 bg-yellow-500' : 'bg-yellow-200'}`}
            >
              2
            </button>
          </li>
          <li>
            <button
              onClick={() => setPrioridade('alta')}
              className={` text-white rounded-full px-4 py-2 cursor-pointer
              ${prioridade === 'alta' ? 'ring-2 ring-red-800 bg-red-500' : 'bg-red-200'}`}
            >
              3
            </button>
          </li>
        </ul>


        {/* Botão para submeter a nova tarefa */}
        <button
          onClick={handleSubmit}
          className='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105'
        >
          Adicionar
        </button>
      </div>

      {/* Barra de Progresso */}


      <div className="w-full bg-gray-200 rounded-full h-6 relative px-2 mt-4">
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
  );
}
