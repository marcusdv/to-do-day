/**
 * TaskForm.tsx
 * Componente responsável pelo formulário de criação de novas tarefas
 * Inclui validação de horário limite (10h) e gerenciamento do estado do input
 * Exibe aviso quando o horário limite é ultrapassado
 */

import { useState, useRef, useEffect } from 'react';
import { Tarefa } from "../types";
import { useMetas } from '../hooks/useMetas';
import { podeCriarTarefas } from '../utils/dateUtils';

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

  // Referência para o input de tarefa
  const inputRef = useRef<HTMLInputElement>(null);

  // Se todas as tarefas de prioridade alta foram concluida
  const [prioridadeAltaConcluida, setPrioridadeAltaConcluida] = useState(false);

  // Se o botão de fechar caixa de horario de criar tarefas foi clicado
  const [alertaVisivel, setAlertaVisivel] = useState(true);


  // Atualiza sempre que as tarefas mudam
  useEffect(() => {
    const tarefasAlta = tarefas.filter(t => t.prioridade === 'alta');

    // Se não há tarefas de alta prioridade, considero como true
    // Para que o botão apareça mesmo se não haja tarefas "altas"
    if (tarefasAlta.length === 0) {
      setPrioridadeAltaConcluida(true);
      return;
    }

    // Verifica se TODAS as tarefas de alta prioridade estão concluídas
    const todasConcluidas = tarefasAlta.every(t => t.concluida);
    setPrioridadeAltaConcluida(todasConcluidas);
  }, [tarefas]); // ← Dependência importante!


  const {
    calcularProgresso,
  } = useMetas(tarefas);



  // Cálculos locais
  const progresso = calcularProgresso(tarefas);
  const META_PERCENTUAL = 80;
  /**
   * Função para processar a submissão de nova tarefa
   * Valida horário limite e se o input não está vazio
   */
  const handleSubmit = () => {
    // Não adiciona se o input estiver vazio ou apenas com espaços
    if (inputTarefa.trim() === '') return;

    // Adicionar validação de segurança
    if (typeof adicionarTarefa !== 'function') {
      console.error('adicionarTarefa não é uma função!');
      return;
    }

    // Chama função callback para adicionar a tarefa e limpa o input
    adicionarTarefa(inputTarefa.trim(), prioridade);

    // limpa layout
    setInputTarefa('');

    // Volta o foco para o input
    inputRef.current?.focus();
  };

  // Cor da barra baseada no progresso
  const getCorBarra = () => {
    if (progresso < 25) return "bg-red-500";
    if (progresso < 50) return "bg-orange-500";
    if (progresso < 75) return "bg-yellow-500";
    if (progresso < META_PERCENTUAL) return "bg-blue-500";
    return "bg-green-500";
  };

  const botaoConcluirDia = () => {
    return (
      <>
        {
          progresso >= META_PERCENTUAL && prioridadeAltaConcluida && (
            <div className='col-span-full cursor-pointer '>
              <button className='px-6 text-2xl py-3 w-full cursor-pointer select-none bg-gradient-to-r from-white via-blue-500 to-green-500 text-white rounded-xl hover:from-blue-600 hover:to-green-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 animate-gradient'>
                Concluir dia
              </button>
            </div>
          )
        }
      </>
    )
  }

  // Renderização condicional: se passou das 10h, mostra aviso de bloqueio
  if (!podeCriarTarefas()) {
    return (
      <>
        {/* Alerta de horário encerrado */}
        {/* Caso o botão de fechar caixa seja fechado, o botão ainda aparece as tarefas forem concluidas. */}
        {alertaVisivel && (
          <div className='relative w-full max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg'>
            <div className='flex items-center gap-3'>
              <span className='text-2xl'>⏰</span>
              <div>
                <h3 className='font-semibold text-red-800'>Horário para criar tarefas encerrado</h3>
                <p className='text-sm text-red-600'>
                  Você pode criar tarefas apenas até às 10:00h. Foque em concluir as tarefas já criadas!
                </p>
              </div>
            </div>
            <span className='absolute right-2 top-0  text-lg cursor-pointer' onClick={() => setAlertaVisivel(false)}>x</span>
          </div>
        )}
        {botaoConcluirDia()}
      </>
    );
  }

  // Renderização normal: formulário ativo para adicionar tarefas
  return (
    <>
      <div className='grid grid-cols-1 gap-4  md:grid-cols-8 gap-x-3 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 '>


        {/* Campo de input para digitar nova tarefa */}
        <input
          type="text"
          ref={inputRef}
          value={inputTarefa}
          onChange={(e) => setInputTarefa(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} // Permite submeter com Enter
          placeholder="Adicionar nova tarefa..."
          maxLength={45}
          className='flex-1 px-4 py-3 md:col-span-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
        />


        {/* Botão para escolher prioridade da tarefa */}
        <ul className='col-span-full md:col-span-3 flex gap-3 items-center justify-center '>
          <li>
            <button
              onClick={() => setPrioridade('baixa')}
              className={` text-white rounded-full px-4 py-2 h-12 w-12 cursor-pointer
              ${prioridade === 'baixa' ? 'ring-2 ring-green-800 bg-green-500' : 'bg-green-200'}`}
            >
              !
            </button>
          </li>
          <li>
            <button
              onClick={() => setPrioridade('media')}
              className={` text-white rounded-full px-4 py-2 h-12 w-12 cursor-pointer
              ${prioridade === 'media' ? 'ring-2 ring-yellow-800 bg-yellow-500' : 'bg-yellow-200'}`}
            >
              !!
            </button>
          </li>
          <li>
            <button
              onClick={() => setPrioridade('alta')}
              className={` text-white rounded-full px-4 py-2 h-12 w-12 cursor-pointer
              ${prioridade === 'alta' ? 'ring-2 ring-red-800 bg-red-500' : 'bg-red-200'}`}
            >
              !!!
            </button>
          </li>
        </ul>


        {/* Botão para submeter a nova tarefa */}
        <button
          onClick={handleSubmit}
          className='md:col-span-5 px-6 py-3 bg-gradient-to-r cursor-pointer from-pink-500 to-red-500 text-white rounded-xl hover:from-pink-600 hover:to-red-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105'
        >
          Adicionar
        </button>

        {/* Barra de Progresso */}
        <div className="col-span-full bg-gray-200 rounded-full h-6 relative">
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
      <div className='w-full mx-auto mt-2'>
        {botaoConcluirDia()}
      </div>
    </>
  );
}
