/**
 * useTimer.ts
 * Hook customizado para gerenciar o timer de countdown até meia-noite
 * Calcula em tempo real o tempo restante e atualiza a cada segundo
 * Usado para mostrar deadline das tarefas do dia atual
 */

import { useState, useEffect } from 'react';

/**
 * Hook que calcula e retorna o tempo restante até meia-noite
 * Atualiza automaticamente a cada segundo usando setInterval
 */
export function useTimer() {
  // Estado para armazenar o tempo restante formatado
  const [tempoRestante, setTempoRestante] = useState('');

  useEffect(() => {
    /**
     * Função interna que calcula o tempo restante até meia-noite
     * Executada imediatamente e depois a cada segundo
     */
    const atualizarTimer = () => {
      const agora = new Date(); // Exemplo: Wed Aug 21 2025 14:30:45 GMT-0300
      const amanha = new Date(agora);
      amanha.setDate(agora.getDate() + 1); // Adiciona 1 dia
      amanha.setHours(0, 0, 0, 0); // Define para meia-noite: Thu Aug 22 2025 00:00:00 GMT-0300

      // Calcula diferença em milissegundos entre agora e meia-noite
      const diferenca = amanha.getTime() - agora.getTime(); // Exemplo: 34515000ms (≈ 9h 35m 15s)

      // Se chegou ou passou da meia-noite
      if (diferenca <= 0) {
        setTempoRestante('Deadline chegou!');
        return;
      }

      // Converte milissegundos para horas, minutos e segundos
      const horas = Math.floor(diferenca / (1000 * 60 * 60)); // Exemplo: 9
      const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60)); // Exemplo: 35  
      const segundos = Math.floor((diferenca % (1000 * 60)) / 1000); // Exemplo: 15

      // Formata o tempo como string legível
      setTempoRestante(`${horas}h ${minutos}m ${segundos}s`); // Resultado: "9h 35m 15s"
    };

    // Executa imediatamente quando o hook é montado
    atualizarTimer();
    
    // Configura interval para atualizar a cada segundo (1000ms)
    const interval = setInterval(atualizarTimer, 1000);

    // Cleanup: remove o interval quando o componente é desmontado
    return () => clearInterval(interval);
  }, []); // Array vazio = executa apenas uma vez

  // Retorna o tempo restante formatado
  return tempoRestante;
}
