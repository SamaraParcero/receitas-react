import { createContext, useCallback, useContext, useState } from 'react'
import Toast from '../componentes/Toast'

/**
 * DESAFIO EXTRA - ESTADO GLOBAL COM CONTEXT API (parte 1 de 2)
 *
 * Problema que resolve: qualquer tela da aplicação precisa conseguir
 * disparar uma notificação, sem ter que receber funções por props
 * passando de componente em componente.
 *
 * Como usar em qualquer componente:
 *   const { mostrarToast } = useToast()
 *   mostrarToast('Receita salva!', 'sucesso')
 */
const ContextoToast = createContext(null)

export function ProvedorToast({ children }) {
  // Estado global: a lista de notificações visíveis na tela.
  const [notificacoes, setNotificacoes] = useState([])

  // useCallback mantém a mesma função entre renderizações, evitando
  // que o temporizador do Toast seja reiniciado sem necessidade.
  const mostrarToast = useCallback((mensagem, tipo = 'info') => {
    const id = Date.now() + Math.random() // identificador único
    setNotificacoes((anteriores) => [...anteriores, { id, mensagem, tipo }])
  }, [])

  const removerToast = useCallback((id) => {
    setNotificacoes((anteriores) => anteriores.filter((item) => item.id !== id))
  }, [])

  return (
    <ContextoToast.Provider value={{ mostrarToast }}>
      {children}

      {/* Área fixa na tela onde as notificações são empilhadas */}
      <div className="toast__area" aria-live="polite" aria-atomic="false">
        {notificacoes.map((item) => (
          <Toast
            key={item.id}
            id={item.id}
            mensagem={item.mensagem}
            tipo={item.tipo}
            onFechar={removerToast}
          />
        ))}
      </div>
    </ContextoToast.Provider>
  )
}

// Hook personalizado: deixa o uso do contexto mais curto e seguro.
export function useToast() {
  const contexto = useContext(ContextoToast)

  if (!contexto) {
    throw new Error('useToast precisa ser usado dentro de <ProvedorToast>')
  }

  return contexto
}
