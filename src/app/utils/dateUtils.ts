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