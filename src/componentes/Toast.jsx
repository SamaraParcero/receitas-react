import { useEffect } from 'react'
import { IconeCheck, IconeFechar, IconeInfo } from './Icone'

// Ícone e texto de apoio para cada tipo de notificação.
// "Icone" começa com letra maiúscula porque guarda um componente React.
const ESTILOS_POR_TIPO = {
  sucesso: { Icone: IconeCheck, titulo: 'Sucesso' },
  erro: { Icone: IconeFechar, titulo: 'Erro' },
  info: { Icone: IconeInfo, titulo: 'Informação' },
}

/**
 * COMPONENTE 6 - NOTIFICAÇÃO TOAST
 *
 * Mensagem temporária de feedback. Desaparece sozinha depois de alguns
 * segundos ou quando o usuário clica no botão de fechar.
 *
 * Props recebidas:
 *   id       = identificador usado para remover a notificação
 *   mensagem = texto exibido
 *   tipo     = 'sucesso' | 'erro' | 'info'
 *   duracao  = tempo em milissegundos até fechar sozinha
 *   onFechar = callback que remove esta notificação da lista
 */
function Toast({ id, mensagem, tipo = 'info', duracao = 4000, onFechar }) {
  const estilo = ESTILOS_POR_TIPO[tipo] || ESTILOS_POR_TIPO.info
  const Icone = estilo.Icone

  // useEffect com setTimeout: agenda o fechamento automático.
  // A função de limpeza cancela o timer se a notificação for
  // fechada antes pelo usuário (evita erro de atualização).
  useEffect(() => {
    const temporizador = setTimeout(() => onFechar(id), duracao)
    return () => clearTimeout(temporizador)
  }, [id, duracao, onFechar])

  return (
    <div
      className={`toast toast--${tipo}`}
      // role="alert" para erros (interrompe o leitor de tela)
      // e role="status" para os demais (anuncia sem interromper)
      role={tipo === 'erro' ? 'alert' : 'status'}
      aria-live={tipo === 'erro' ? 'assertive' : 'polite'}
    >
      <span className="toast__icone">
        <Icone tamanho={15} />
      </span>

      <div className="toast__texto">
        <strong className="toast__titulo">{estilo.titulo}</strong>
        <p className="toast__mensagem">{mensagem}</p>
      </div>

      <button
        type="button"
        className="toast__fechar"
        onClick={() => onFechar(id)}
        aria-label="Fechar notificação"
      >
        <IconeFechar tamanho={16} />
      </button>
    </div>
  )
}

export default Toast
