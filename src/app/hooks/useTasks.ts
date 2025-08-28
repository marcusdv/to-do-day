/**
 * useTasks.ts
 * Hook customizado para gerenciar o estado das tarefas
 * Centraliza toda lógica de CRUD (Create, Read, Update) das tarefas
 * Persiste dados no localStorage com chave única por data
 * Organiza automaticamente tarefas pendentes primeiro, concluídas depois
 */

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "./useLocalStorage";
import { Tarefa } from "../types";
import { getToday } from "../utils/dateUtils";

/**
 * Função para ordenar tarefas por prioridade
 * PENDENTES: Alta (3) -> Média (2) -> Baixa (1)
 * CONCLUÍDAS: Todas no final, também por prioridade
 */
const ordenarPorPrioridade = (tarefas: Tarefa[]): Tarefa[] => {
  const prioridades = { alta: 3, media: 2, baixa: 1 };

  return [...tarefas].sort((a, b) => {
    // 🔥 PRIMEIRO CRITÉRIO: Tarefas não concluídas SEMPRE primeiro
    if (a.concluida !== b.concluida) {
      return a.concluida ? 1 : -1; // Pendentes (false) = -1, Concluídas (true) = 1
    }

    // 🎯 SEGUNDO CRITÉRIO: Dentro do mesmo status, ordenar por prioridade
    const prioridadeA = prioridades[a.prioridade];
    const prioridadeB = prioridades[b.prioridade];

    if (prioridadeA !== prioridadeB) {
      return prioridadeB - prioridadeA; // Alta → Média → Baixa
    }

    // 📅 TERCEIRO CRITÉRIO: Se prioridade igual, mais recentes primeiro
    return new Date(b.criadaEm).getTime() - new Date(a.criadaEm).getTime();
  });
};

export function useTasks() {
  const hoje = getToday();
  const [tarefasRaw, setTarefasRaw] = useLocalStorage<Tarefa[]>(`tarefas-${hoje}`, []);

  // ✅ Sempre retornar tarefas ordenadas
  const tarefas = ordenarPorPrioridade(tarefasRaw);

  const adicionarTarefa = (nome: string, prioridade: Tarefa["prioridade"]) => {
    const hoje = new Date();

    const novaTarefa: Tarefa = {
      id: crypto.randomUUID(),
      nome,
      concluida: false,
      criadaEm: hoje,
      prazoFinal: new Date(hoje.getTime() + 24 * 60 * 60 * 1000), // +1 dia
      prioridade
    };

    // ✅ Adicionar nova tarefa e automaticamente ordenar
    const novasTarefas = [...tarefasRaw, novaTarefa];
    const tarefasOrdenadas = ordenarPorPrioridade(novasTarefas);
    setTarefasRaw(tarefasOrdenadas);
  };

  const concluirTarefa = (tarefa: Tarefa) => {
    const tarefasAtualizadas = tarefasRaw.map(t => 
      t.id === tarefa.id 
        ? { ...t, concluida: !t.concluida }
        : t
    );
    
    // ✅ Reordenar após marcar/desmarcar como concluída
    const tarefasOrdenadas = ordenarPorPrioridade(tarefasAtualizadas);
    setTarefasRaw(tarefasOrdenadas);
  };

  const editarTarefa = (id: string, novoNome: string) => {
    const tarefasAtualizadas = tarefasRaw.map(t => 
      t.id === id ? { ...t, nome: novoNome } : t
    );
    
    // ✅ Reordenar após edição
    const tarefasOrdenadas = ordenarPorPrioridade(tarefasAtualizadas);
    setTarefasRaw(tarefasOrdenadas);
  };

  const excluirTarefa = (id: string) => {
    const tarefasAtualizadas = tarefasRaw.filter(t => t.id !== id);
    setTarefasRaw(tarefasAtualizadas);
  };

  const alterarPrioridade = (id: string, novaPrioridade: Tarefa["prioridade"]) => {
    const tarefasAtualizadas = tarefasRaw.map(t => 
      t.id === id ? { ...t, prioridade: novaPrioridade } : t
    );
    
    // ✅ Reordenar após alterar prioridade
    const tarefasOrdenadas = ordenarPorPrioridade(tarefasAtualizadas);
    setTarefasRaw(tarefasOrdenadas);
  };

  const limparTarefas = () => {
    setTarefasRaw([]);
  };

  // Estatísticas
  const totalTarefas = tarefas.length;
  const tarefasPendentes = tarefas.filter(t => !t.concluida).length;
  const tarefasConcluidas = tarefas.filter(t => t.concluida).length;

  return {
    tarefas, // ✅ Já retorna ordenadas
    adicionarTarefa,
    concluirTarefa,
    editarTarefa,
    excluirTarefa,
    alterarPrioridade,
    limparTarefas,
    totalTarefas,
    tarefasPendentes,
    tarefasConcluidas
  };
}
