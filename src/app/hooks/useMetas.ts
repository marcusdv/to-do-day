import { useTasks } from "./useTasks";
import { Tarefa } from "../types";

/**
 * Hook customizado para as metas (editar comentario futuramente)
 * @returns
 */
export function useMetas(tarefas: Tarefa[], metaPercentual: number = 80) {

  const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length;

  /**
   * Calcula o progresso das tarefas concluídas em relação ao total
   * @returns porcentagem de tarefas concluídas. numero inteiro de 0 a 100
   */
  const calcularProgresso = (tarefas: Tarefa[]): number => {
    const totalTarefas = tarefas.length;

    if (totalTarefas === 0) return 0;
    return Math.round((tarefasConcluidas / totalTarefas) * 100);
  };

  /**
   * Calcula a quantidade de tarefas necessárias para atingir a meta
   * @returns quantas tarefas ainda faltam para a meta
   */
  const tarefasParaMeta = (): number => {
    // 1. Calcula quantas tarefas preciso para 80% (arredondando para cima)
    const necessarias = Math.ceil((metaPercentual / 100) * tarefas.length);
    // * 2. Math.max(a, b) retorna o maior valor entre dois números. e Evita números negativos, caso você conclua mais tarefas que o necessário
    // * ex: 6 - 8 = -2 ❌
    const faltam = Math.max(0, necessarias - tarefasConcluidas);
    return faltam;
  };

  const getMensagemMotivacional = () => {
    const progresso = calcularProgresso(tarefas);
    if (progresso === 0) return "🚀 Vamos começar o dia!";
    if (progresso < 25) return "💪 Você consegue! Continue assim!";
    if (progresso < 50) return "⚡ Bom ritmo! Não pare agora!";
    if (progresso < 75) return "🔥 Quase lá! Você está indo bem!";
    if (progresso < metaPercentual) return "🎯 Quase batendo a meta!";
    if (progresso >= metaPercentual) return "🎉 PARABÉNS! Meta atingida!";
    if (progresso === 100) return "👑 PERFEITO! Dia 100% concluído!";
  };

  /**
   * Verifica se a meta de tarefas concluídas foi atingida
   * @returns true se a meta foi atingida, false caso contrário
   */
  const getMetaAtingida = (): boolean => {
    const progresso = calcularProgresso(tarefas);
    return progresso >= metaPercentual;
  };

  return {
    calcularProgresso,
    getMensagemMotivacional,
    tarefasParaMeta,
    getMetaAtingida,
  };
}
