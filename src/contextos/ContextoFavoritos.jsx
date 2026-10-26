import { createContext, useContext, useState } from 'react'
import { useToast } from './ContextoToast'

const ContextoFavoritos = createContext(null)

export function ProvedorFavoritos({ children }) {
  const [idsFavoritos, setIdsFavoritos] = useState([])
  const { mostrarToast } = useToast()

  function ehFavorito(id) {
    return idsFavoritos.includes(id)
  }

  function alternarFavorito(receita) {
    if (ehFavorito(receita.id)) {
      setIdsFavoritos((anteriores) => anteriores.filter((item) => item !== receita.id))
      mostrarToast(`"${receita.nome}" saiu dos favoritos.`, 'info')
    } else {
      setIdsFavoritos((anteriores) => [...anteriores, receita.id])
      mostrarToast(`"${receita.nome}" foi salva nos favoritos!`, 'sucesso')
    }
  }

  const valor = {
    idsFavoritos,
    totalDeFavoritos: idsFavoritos.length,
    ehFavorito,
    alternarFavorito,
  }

  return (
    <ContextoFavoritos.Provider value={valor}>{children}</ContextoFavoritos.Provider>
  )
}

export function useFavoritos() {
  const contexto = useContext(ContextoFavoritos)

  if (!contexto) {
    throw new Error('useFavoritos precisa ser usado dentro de <ProvedorFavoritos>')
  }

  return contexto
}
