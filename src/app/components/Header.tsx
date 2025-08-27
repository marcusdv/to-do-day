/**
 * Header.tsx
 * Componente responsável pelo cabeçalho principal da aplicação
 * Exibe título, data atual formatada, timer de deadline e streak de dias
 * Centraliza informações importantes sobre o estado atual do dia
 */

// Interface que define as props do componente
interface HeaderProps {
  tempoRestante: string; // Tempo restante até meia-noite (ex: "9h 35m 15s")
}

/**
 * Componente Header - Exibe o cabeçalho principal da aplicação
 * Mostra informações contextuais importantes sobre o dia atual
 */
export function Header({ tempoRestante }: HeaderProps) {
  return (
    <header className='text-center mb-8 pt-8'>
      {/* Container do título principal com ícone */}
      <div className='inline-flex items-center gap-3 mb-4'>
        {/* Ícone circular com gradiente */}
        <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
          <span className='text-white text-xl'>📋</span>
        </div>

        {/* Container do título e data */}
        <div>
          {/* Título principal com efeito gradiente */}
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            Tarefas de Hoje
          </h1>
          {/* Data atual formatada em português brasileiro */}
          {/* Exemplo de retorno: "quarta-feira, 21 de agosto de 2025" */}
          <p className='text-sm text-gray-500 mt-1'>
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',    // dia da semana completo
              year: 'numeric',    // ano com 4 dígitos  
              month: 'long',      // mês por extenso
              day: 'numeric'      // dia do mês
            })}
          </p>
        </div>
      </div>

      {/* Seção de estatísticas em tempo real */}
      <div className='flex items-center justify-center gap-6 text-sm text-gray-600'>
        {/* Timer countdown até meia-noite */}
        <div className='flex items-center gap-2'>
          <span>⏰ Deadline:</span>
          <span className='bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold'>
            {tempoRestante} {/* Exemplo: "9h 35m 15s" */}
          </span>
        </div>

        {/* Contador de streak (funcionalidade futura) */}
        <div className='flex items-center gap-2'>
          <span>🔥 Streak:</span>
          <span className='bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold'>0 dias</span>
        </div>
      </div>
    </header>
  );
}
