import { createContext, useContext, useState } from 'react'
import { useToast } from './ContextoToast'

/**
 * DESAFIO EXTRA - ESTADO GLOBAL COM CONTEXT API (parte 2 de 2)
 *
 * Guarda os ids das receitas favoritadas. É o exemplo clássico de
 * dois componentes NÃO relacionados compartilhando dados:
 *   - o cartão da receita (no catálogo) marca o favorito;
 *   - o menu de navegação, no topo, mostra o total de favoritos.
 * Eles não são pai e filho, então props não resolveriam.
 */
const ContextoFavoritos = createContext(null)

export function ProvedorFavoritos({ children }) {
  const [idsFavoritos, setIdsFavoritos] = useState([])
  const { mostrarToast } = useToast() // reaproveita o outro contexto

  function ehFavorito(id) {
    return idsFavoritos.includes(id)
  }

  // Adiciona ou remove o favorito e avisa o usuário com um toast.
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
