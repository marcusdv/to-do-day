import { useTasks } from "./useTasks";
import { Tarefa } from "../types";

/**
 * Hook customizado para as metas (editar comentario futuramente)
 * @returns
 */
export function useMetas(tarefas: Tarefa[], metaPercentual: number = 80) {

  const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  const tarefasPrioridadeAltaConcluidas = tarefas.filter((tarefa) => tarefa.prioridade === 'alta' && tarefa.concluida).length;
  const totalTarefasPrioridadeAlta = tarefas.filter((tarefa) => tarefa.prioridade === 'alta').length;

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
   * Verifica se todas as tarefas de prioridade alta foram concluídas
   * @returns true se todas as tarefas de alta prioridade estão concluídas
   */
  const todasPrioridadeAltaConcluidas = (): boolean => {
    if (totalTarefasPrioridadeAlta === 0) return true; // Se não há tarefas de alta prioridade, considera como atendido
    return tarefasPrioridadeAltaConcluidas === totalTarefasPrioridadeAlta;
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
    const todasAltasConcluidas = todasPrioridadeAltaConcluidas();
    
    // Se não atingiu 80% ainda
    if (progresso < metaPercentual) {
      if (progresso === 0) return "🚀 Vamos começar o dia!";
      if (progresso < 25) return "💪 Você consegue! Continue assim!";
      if (progresso < 50) return "⚡ Bom ritmo! Não pare agora!";
      if (progresso < 75) return "🔥 Quase lá! Você está indo bem!";
      return "🎯 Quase batendo a meta!";
    }
    
    // Se atingiu 80% mas ainda tem prioridades altas pendentes
    if (progresso >= metaPercentual && !todasAltasConcluidas) {
      return "🟡 Atingiu 80%, mas ainda há tarefas ALTA pendentes!";
    }
    
    // Se atingiu 80% E todas as altas estão concluídas
    if (progresso >= metaPercentual && todasAltasConcluidas) {
      if (progresso === 100) return "👑 PERFEITO! Dia 100% concluído!";
      return "🎉 PARABÉNS! Meta completa atingida!";
    }
    
    return "📈 Continue o ótimo trabalho!";
  };

  /**
   * Verifica se a meta de tarefas concluídas foi atingida
   * Para a meta ser atingida, duas condições devem ser atendidas:
   * 1. Pelo menos metaPercentual% das tarefas estão concluídas
   * 2. TODAS as tarefas de prioridade alta estão concluídas
   * @returns true se AMBAS as condições forem atendidas, false caso contrário
   */
  const getMetaAtingida = (): boolean => {
    const progresso = calcularProgresso(tarefas);
    const todasAltasConcluidas = todasPrioridadeAltaConcluidas();
    
    // Meta só é atingida se AMBAS condições forem verdadeiras
    return progresso >= metaPercentual && todasAltasConcluidas;
  };

  return {
    calcularProgresso,
    getMensagemMotivacional,
    tarefasParaMeta,
    getMetaAtingida,
    // Adicionar informações úteis sobre prioridades altas
    totalTarefasPrioridadeAlta,
    tarefasPrioridadeAltaConcluidas,
    todasPrioridadeAltaConcluidas,
  };
}
