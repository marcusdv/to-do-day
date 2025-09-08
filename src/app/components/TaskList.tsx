/**
 * TaskList.tsx
 * Componente responsável por renderizar a lista de tarefas
 * Exibe estado vazio quando não há tarefas ou lista interativa com checkboxes
 * Permite marcar/desmarcar tarefas como concluídas
 */

import { Tarefa } from '../types';
import { FcCancel, FcEmptyTrash, FcSurvey } from "react-icons/fc";




// Interface que define as props do componente
interface TaskListProps {
  tarefas: Tarefa[]; // Array de tarefas para exibir
  onToggleTask: (tarefa: Tarefa) => void; // Função callback para alternar status da tarefa
  excluirTarefa: (id: string) => void; // Função callback para excluir uma tarefa
  editarTarefa: (id: string, novoNome: string) => void; // Função callback para editar uma tarefa
}

/**
 * Componente que renderiza a lista de tarefas
 * Gerencia a exibição de tarefas e interações do usuário
 */
export function TaskList({ tarefas, onToggleTask, excluirTarefa, editarTarefa }: TaskListProps) {


  const corPelaPrioridade = (prioridade: Tarefa["prioridade"] /* "baixa | media | alta" */) => {
    switch (prioridade) {
      case "baixa":
        return { backgroundColor: "bg-green-100", borderColor: "border-green-200", textColor: "text-green-800" };
      case "media":
        return { backgroundColor: "bg-yellow-100", borderColor: "border-yellow-200", textColor: "text-yellow-800" };
      case "alta":
        return { backgroundColor: "bg-red-100", borderColor: "border-red-200", textColor: "text-red-800" };
    }
  }

  return (
    <div className='bg-white rounded-2xl shadow-lg border border-gray-100'>
      <div className='divide-y divide-gray-100'>
        {tarefas.length === 0 ? (
          // Estado vazio - quando não há tarefas para exibir
          <div className='p-12 text-center text-gray-500 '>
            <div className='text-8xl' ><FcSurvey  className='mx-auto'/></div>
            <p className='text-lg'>Nenhuma tarefa adicionada ainda</p>
            <p className='text-sm '>Comece adicionando uma tarefa acima!</p>
          </div>
        ) : (
          // Mapeia e renderiza cada tarefa da lista
          tarefas.map((tarefa) => {
            const { backgroundColor, borderColor, textColor } = corPelaPrioridade(tarefa.prioridade);

            return (
              <div
                key={tarefa.id}
                className={`p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors group
                ${backgroundColor} 
                ${borderColor} 
                 border-l-8
                ${tarefa.concluida ? 'bg-green-50' : '' // Fundo verde claro para tarefas concluídas
                  }`}
              >
                {/* Botão checkbox customizado para marcar/desmarcar tarefa */}
                <button
                  onClick={() => onToggleTask(tarefa)}
                  className={`h-6 min-w-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${tarefa.concluida
                    ? 'bg-green-500 border-green-500 text-white shadow-lg' // Estado marcado
                    : 'border-gray-300 hover:border-blue-500 hover:shadow-md' // Estado desmarcado
                    }`}
                >
                  {tarefa.concluida && (
                    // Ícone de check SVG exibido quando tarefa está concluída
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* Container do texto da tarefa */}
                <div className='flex-1 select-none overflow-hidden'>
                  <span className={`text-lg ${tarefa.concluida ? 'line-through text-gray-500' : `${textColor}` // Aplica riscado se concluída
                    }`}>
                    {tarefa.nome}
                  </span>
                </div>

                {/* Caixa de opções */}
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => editarTarefa(tarefa.id, prompt('Nova descrição:', tarefa.nome) || tarefa.nome)}
                    className='text-gray-500 hover:text-gray-700 cursor-pointer select-none'>
                    ✏️
                  </button>
                  <button
                    onClick={() => excluirTarefa(tarefa.id)}
                    className='text-red-500 hover:text-red-700 cursor-pointer select-none'>
                    <FcCancel  className='h-6 w-6' />
                  </button>
                </div>

              </div>

            )
          })
        )}
      </div>
    </div>
  );
}
