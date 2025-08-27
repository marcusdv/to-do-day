/**
 * types/index.ts
 * Arquivo central de definições de tipos TypeScript
 * Contém interfaces para Tarefa, dados diários e estatísticas do usuário
 * Serve como contrato de dados para toda a aplicação
 */

/**
 * Interface principal que representa uma tarefa individual
 * Contém todas as propriedades necessárias para gerenciar uma tarefa
 */
export interface Tarefa {
  id: string; // Identificador único da tarefa
  nome: string; // Texto/descrição da tarefa
  concluida: boolean; // Status de conclusão
  criadaEm: Date; // Data/hora de criação - Exemplo: Wed Aug 21 2025 10:30:00 GMT-0300
  concluidaEm?: Date; // Data/hora de conclusão (opcional) - Exemplo: Wed Aug 21 2025 15:45:00 GMT-0300
  prazoFinal: Date; // Deadline da tarefa - Exemplo: Wed Aug 21 2025 23:59:59 GMT-0300
  prioridade: "baixa" | "media" | "alta"; // Nível de prioridade da tarefa
}

/**
 * Interface para dados específicos de cada dia
 * Armazena informações completas sobre um dia de uso da aplicação
 * Cada data tem sua própria entrada no localStorage
 */
export interface DadosDiarios {
  data: string; // Data no formato ISO - Exemplo: "2025-08-21"
  tarefas: Tarefa[]; // Array com todas as tarefas criadas neste dia
  criadaEm: Date; // Timestamp de quando este dia foi iniciado - Exemplo: Wed Aug 21 2025 06:00:00 GMT-0300
  horarioLimiteCriacao: string; // Horário limite para criar tarefas - Exemplo: "10:00"
  prazoFinal: string; // Horário limite para concluir tarefas - Exemplo: "23:59"
  metaAtingida: boolean; // Se atingiu 80% de conclusão das tarefas
  finalizado: boolean; // Se o dia já terminou (passou da meia-noite)
}

/**
 * Interface para estatísticas globais do usuário
 * Dados que persistem entre diferentes dias de uso
 * Permite acompanhar progresso e desempenho ao longo do tempo
 */
export interface EstatisticasDoUsuario {
  streak: number; // Dias consecutivos atingindo a meta de 80%
  melhorStreak: number; // Melhor sequência de dias com meta atingida
  diasTotais: number; // Total de dias que o usuário utilizou a aplicação
  diasComMetaAtingida: number; // Quantos dias conseguiu atingir 80%+ de conclusão
  ultimaDataNoApp: Date; // Última vez que acessou - Exemplo: Tue Aug 20 2025 22:30:00 GMT-0300
  totalTarefasCriadas: number; // Contador global de todas as tarefas já criadas
  totalTarefasConcluidas: number; // Contador global de todas as tarefas concluídas
}
