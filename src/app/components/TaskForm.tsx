/**
 * TaskForm.tsx
 * Componente responsável pelo formulário de criação de novas tarefas
 * Inclui validação de horário limite (10h) e gerenciamento do estado do input
 * Exibe aviso quando o horário limite é ultrapassado
 */

import { useState } from 'react';
import { podeCriarTarefas } from '../utils/dateUtils';

// Interface que define as props do componente
interface TaskFormProps {
  onAddTask: (nome: string) => void; // Função callback para adicionar tarefa
}

/**
 * Componente de formulário para adicionar novas tarefas
 * Gerencia o input do usuário e valida se ainda é possível criar tarefas
 */
export function TaskForm({ onAddTask }: TaskFormProps) {
  // Estado local para controlar o valor do input de texto
  const [inputTarefa, setInputTarefa] = useState('');

  /**
   * Função para processar a submissão de nova tarefa
   * Valida horário limite e se o input não está vazio
   */
  const handleSubmit = () => {
    // Não adiciona se o input estiver vazio ou apenas com espaços
    if (inputTarefa.trim() === '') return;

    // Chama função callback para adicionar a tarefa e limpa o input
    onAddTask(inputTarefa.trim());
    setInputTarefa('');
  };

  // Renderização condicional: se passou das 10h, mostra aviso de bloqueio
  if (!podeCriarTarefas()) {
    // if (false) {
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
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()} // Permite submeter com Enter
          placeholder="Adicionar nova tarefa..."
          className='flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
        />
        {/* Botão para submeter a nova tarefa */}
        <button
          onClick={handleSubmit}
          className='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105'
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
