import { createContext, useCallback, useContext, useState } from 'react'
import Toast from '../componentes/Toast'

const ContextoToast = createContext(null)

export function ProvedorToast({ children }) {
  const [notificacoes, setNotificacoes] = useState([])

  const mostrarToast = useCallback((mensagem, tipo = 'info') => {
    const id = Date.now() + Math.random()
    setNotificacoes((anteriores) => [...anteriores, { id, mensagem, tipo }])
  }, [])

  const removerToast = useCallback((id) => {
    setNotificacoes((anteriores) => anteriores.filter((item) => item.id !== id))
  }, [])

  return (
    <ContextoToast.Provider value={{ mostrarToast }}>
      {children}

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

export function useToast() {
  const contexto = useContext(ContextoToast)

  if (!contexto) {
    throw new Error('useToast precisa ser usado dentro de <ProvedorToast>')
  }

  return contexto
}
