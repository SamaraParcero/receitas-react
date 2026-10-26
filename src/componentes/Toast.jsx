import { useEffect } from 'react'
import { IconeCheck, IconeFechar, IconeInfo } from './Icone'

const ESTILOS_POR_TIPO = {
  sucesso: { Icone: IconeCheck, titulo: 'Sucesso' },
  erro: { Icone: IconeFechar, titulo: 'Erro' },
  info: { Icone: IconeInfo, titulo: 'Informação' },
}

function Toast({ id, mensagem, tipo = 'info', duracao = 4000, onFechar }) {
  const estilo = ESTILOS_POR_TIPO[tipo] || ESTILOS_POR_TIPO.info
  const Icone = estilo.Icone

  useEffect(() => {
    const temporizador = setTimeout(() => onFechar(id), duracao)
    return () => clearTimeout(temporizador)
  }, [id, duracao, onFechar])

  return (
    <div
      className={`toast toast--${tipo}`}

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
