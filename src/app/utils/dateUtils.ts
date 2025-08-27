/**
 * dateUtils.ts
 * Utilitários para manipulação e formatação de datas
 * Contém funções auxiliares para trabalhar com datas na aplicação
 * Inclui validações de horário limite e formatação de datas
 */

/**
 * Obtém a data atual no formato ISO e extrai apenas a parte da data
 * Usado para criar chaves únicas no localStorage por dia
 * @returns String da data atual no formato "YYYY-MM-DD"
 */
export function getToday(): string {
  // new Date().toISOString() → "2025-08-21T14:30:45.123Z"
  // .split('T') → ["2025-08-21", "14:30:45.123Z"] 
  // [0] → "2025-08-21"
  return new Date().toISOString().split('T')[0];
}

/**
 * * Verifica se ainda é possível criar tarefas baseado no horário limite
 * * Define regra de negócio: tarefas só podem ser criadas até às 10:00h
 * @returns true se ainda pode criar tarefas (antes das 10h), false caso contrário
 */
export function podeCriarTarefas(): boolean {
  const agora = new Date(); // Exemplo: Wed Aug 21 2025 09:45:30 GMT-0300
  const limite = new Date();
  limite.setHours(10, 0, 0, 0); // Define limite: Wed Aug 21 2025 10:00:00 GMT-0300
  
  // Retorna true se horário atual < 10:00h
  return agora < limite;
}
