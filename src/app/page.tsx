/**
 * page.tsx
 * Componente principal da aplicação de lista de tarefas
 * Orquestra todos os componentes filhos e gerencia o estado global
 * Implementa proteção contra hydration mismatch do Next.js
 */

'use client';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useTimer } from './hooks/useTimer';
import { useTasks } from './hooks/useTasks';

/**
 * Componente principal da aplicação
 * Gerencia todo o estado e orquestra a comunicação entre componentes
 */
export default function Home() {
  // Estado para controlar se o componente foi montado no cliente
  // Evita erros de hidratação do Next.js entre servidor e cliente
  const [mounted, setMounted] = useState(false);

  // Hook customizado que retorna tempo restante até meia-noite
  const tempoRestante = useTimer(); // Exemplo: "9h 35m 15s"

  // Hook customizado para gerenciar todas as operações com tarefas
  const { tarefas, adicionarTarefa, concluirTarefa, excluirTarefa, editarTarefa } = useTasks();

  // useEffect para marcar que o componente foi montado no cliente
  // Executado apenas uma vez após a montagem
  useEffect(() => {
    setMounted(true);
  }, []);


  // ===== RENDERIZAÇÃO CONDICIONAL PARA EVITAR HYDRATION MISMATCH =====
  // Não renderiza nada até a hidratação estar completa
  if (!mounted) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4'>
        <div className="max-w-2xl mx-auto">
          <header className='text-center mb-8 pt-8'>
            <div className='inline-flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                <span className='text-white text-xl'>📋</span>
              </div>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                Tarefas de Hoje
              </h1>
            </div>
            <div className='flex items-center justify-center gap-2 text-sm text-gray-600'>
              <span>Carregando...</span>
            </div>
          </header>
        </div>
      </div>
    );
  }


  // ===== 🎨 RENDERIZAÇÃO DO COMPONENTE =====

  return (
    // Container principal com fundo gradiente

    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4'>
      {/* Container centralizado com largura máxima */}
      <div className="max-w-2xl mx-auto flex flex-col gap-4">

        {/* ===== 📋 CABEÇALHO ===== */}
        <Header tempoRestante={tempoRestante} tarefas={tarefas} />

        {/* ===== 📝 FORMULÁRIO DE ADIÇÃO DE TAREFAS ===== */}
        <TaskForm adicionarTarefa={adicionarTarefa} tarefas={tarefas} />

        {/* ===== 📋 LISTA DE TAREFAS ===== */}
        <TaskList tarefas={tarefas} onToggleTask={concluirTarefa} excluirTarefa={excluirTarefa} editarTarefa={editarTarefa} />

      </div>
    </div>

  );
}