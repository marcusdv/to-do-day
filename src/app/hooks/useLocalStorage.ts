/**
 * useLocalStorage.ts
 * Hook customizado para persistir estado no localStorage do navegador
 * Implementa padrão similar ao useState mas com persistência automática
 * Inclui proteções para SSR (Server-Side Rendering) e tratamento de erros
 */

import { useState } from "react";

/**
 * Hook customizado que sincroniza estado com localStorage
 * @param key - Chave para identificar o item no localStorage
 * @param defaultValue - Valor padrão caso não exista no localStorage
 * @returns Tupla com [valor, setValor] similar ao useState
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  // Estado inicial que tenta recuperar valor do localStorage
  const [value, setValue] = useState<T>(() => {
    // Proteção para SSR: se não está no navegador, usa valor padrão
    if (typeof window === "undefined") {
      return defaultValue;
    }

    try {
      // Tenta recuperar item do localStorage
      const item = localStorage.getItem(key);

      // Se existe, faz parse JSON; se não, usa valor padrão
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      // Em caso de erro (JSON inválido, etc), usa valor padrão
      console.error(`Erro ao ler localStorage [${key}]`, error);
      return defaultValue;
    }
  });

  /**
   * Função para atualizar valor no estado e localStorage // (meio que simula um useState)
   * Aceita valor direto ou função callback (como setState)
   *
   * RESUMO DO PARÂMETRO:
   * - T: Valor direto → setTodos(["A", "B"])  // Já atualiza com o valor passado
   * - ((prev: T) => T): Função callback → setTodos(prev => [...prev, "C"]) // Atualiza com novo valor executando função
   *
   * FUNCIONAMENTO:
   * 1. Verifica se newValue é função ou valor direto
   * 2. Se função: executa passando estado atual → newValue(value)
   * 3. Se valor: usa direto → newValue
   * 4. Atualiza estado React + localStorage simultaneamente
   *
   * OBJETIVO: Simular useState + persistência automática no localStorage
   * É um "super useState" que mantém dados entre recarregamentos de página
   *
   * OBJETIVO:
   * - Simular useState + persistência automática no localStorage
   *
   * Quando eu uso esse hook, eu atualizo o valor de tarefas e atualizo o valor no localStorage
   * Ex de dados no localStorage:
   * {
   *   "tarefas-2025-08-21": [
   *     {
   *       "id": "123e4567-e89b-12d3-a456-426614174000",
   *       "nome": "Nova Tarefa",
   *       "concluida": false,
   *       "criadaEm": "2025-08-21T00:00:00.000Z",
   *       "prazoFinal": "2025-08-21T23:59:59.999Z",
   *       "prioridade": "media"
   *     },
   *    {
   *       "id": "123e4567-e89b-12d3-a456-426614174001",
   *       "nome": "Outra Tarefa",
   *       "concluida": true,
   *       "criadaEm": "2025-08-21T00:00:00.000Z",
   *       "prazoFinal": "2025-08-21T23:59:59.999Z",
   *       "prioridade": "alta"
   *     }
   *   ]
   * }
   */
  const setStoredValue = (newValue: T | ((prev: T) => T)) => {
    try {
      // Resolve o valor final (se for função, executa com valor atual)
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;

      // Atualiza o estado local
      setValue(valueToStore);

      // Persiste no localStorage apenas se estiver no navegador
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Erro ao salvar localStorage [${key}]`, error);
    }
  };

  /**
   * Função para remover o item do localStorage
   * @return void
   */
  const removeStoredValue = () => {
    try {
      // Remove o item do localStorage apenas se estiver no navegador
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Erro ao remover localStorage [${key}]`, error);
    }
  };

  // Retorna tupla no formato [valor, setter] como useState
  return [value, setStoredValue, removeStoredValue] as const;
}
