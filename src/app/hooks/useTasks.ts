/**
 * useTasks.ts
 * Hook customizado para gerenciar o estado das tarefas
 * Centraliza toda lógica de CRUD (Create, Read, Update) das tarefas
 * Persiste dados no localStorage com chave única por data
 * Organiza automaticamente tarefas pendentes primeiro, concluídas depois
 */

import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "./useLocalStorage";
import { Tarefa } from "../types";
import { getToday } from "../utils/dateUtils";

/**
 * Hook customizado que encapsula toda lógica de gerenciamento de tarefas
 * Retorna estado das tarefas e funções para manipulá-las
 */
export function useTasks() {
  // Obtém a data atual no formato "YYYY-MM-DD"
  const hoje = getToday(); // Exemplo: "2025-08-21"

  // Hook para persistir tarefas no localStorage com chave única por data
  // Chave exemplo: "tarefas-2025-08-21"
  const [tarefas, setTarefas] = useLocalStorage<Tarefa[]>(
    `tarefas-${hoje}`,
    []
  );

  /**
   * Função para adicionar uma nova tarefa
   * Cria tarefa com dados padrão e adiciona no início da lista
   */
  const adicionarTarefa = (nome: string) => {
    const hoje = new Date(); // Exemplo: Wed Aug 21 2025 14:30:45 GMT-0300

    // Define início do dia atual (00:00:00)
    const inicioDoDia = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
    );
    // Exemplo: Wed Aug 21 2025 00:00:00 GMT-0300

    // Define fim do dia atual (23:59:59.999)
    const fimDoDia = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate(),
      23,
      59,
      59,
      999
    );
    // Exemplo: Wed Aug 21 2025 23:59:59 GMT-0300

    // Cria objeto da nova tarefa com dados padrão
    const novaTarefa: Tarefa = {
      id: uuidv4(), // Gera ID único: "123e4567-e89b-12d3-a456-426614174000"
      nome,
      concluida: false,
      criadaEm: inicioDoDia,
      prazoFinal: fimDoDia,
      prioridade: "media",
    };

    // Adiciona nova tarefa no início da lista (spread operator)
    setTarefas([novaTarefa, ...tarefas]);
  };

  /**
   * Função para alternar status de conclusão de uma tarefa
   * Reorganiza automaticamente: pendentes primeiro, concluídas depois
   */
  const concluirTarefa = (tarefa: Tarefa) => {
    setTarefas(
      tarefas
        .map((t) => {
          // Encontra a tarefa pelo ID e alterna seu status
          if (t.id === tarefa.id) {
            return { ...t, concluida: !t.concluida };
          }
          return t; // Retorna tarefa inalterada se não for a selecionada
        })
        .sort((a, b) => {
          // Organização automática: pendentes ficam no topo
          if (a.concluida === b.concluida) return 0; // Mantém ordem se mesmo status
          return a.concluida ? 1 : -1; // Concluídas vão para baixo
        })
    );
  };

  /**
   * Função para editar o nome de uma tarefa existente
   * @param id - ID da tarefa a ser editada
   * @param novoNome - Novo nome para a tarefa
   */
  const editarTarefa = (id: string, novoNome: string) => {
    setTarefas(
      tarefas.map((t) => (t.id === id ? { ...t, nome: novoNome } : t))
    );
  };

  /**
   * Função para excluir tarefa
   * @param id - ID da tarefa a ser removida
   */
  const excluirTarefa = (id: string) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  /**
   * Função para alterar a prioridade da tarefa
   * @param id - ID da tarefa a ser atualizada
   * @param novaPrioridade - Nova prioridade para a tarefa
   */
  const alterarPrioridade = (
    id: string,
    novaPrioridade: Tarefa["prioridade"]
  ) => {
    setTarefas(
      tarefas.map((t) =>
        t.id === id ? { ...t, prioridade: novaPrioridade } : t
      )
    );
  };

  /**
   * Função para limpar a lista de tarefas
   */
  const limparTarefas = () => {
    setTarefas([])
  }

  // Retorna estado e funções para uso no componente
  return {
    tarefas,
    adicionarTarefa,
    concluirTarefa,
    editarTarefa,
    excluirTarefa,
    alterarPrioridade,
    limparTarefas
  };
}
