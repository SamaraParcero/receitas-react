import { Link } from 'react-router-dom'
import { useFavoritos } from '../contextos/ContextoFavoritos'
import IconeReceita from './IconeReceita'
import { IconeCoracao, IconeDificuldade, IconeRelogio } from './Icone'

/**
 * Cartão que resume uma receita na listagem.
 *
 * Props recebidas:
 *   receita = um objeto da lista de receitas
 *
 * Não tem estado próprio: o favorito vem do contexto global.
 */
function CartaoReceita({ receita }) {
  const { ehFavorito, alternarFavorito } = useFavoritos()
  const favoritada = ehFavorito(receita.id)

  return (
    <article className="cartao">
      <div className="cartao__topo">
        <IconeReceita nome={receita.icone} tamanho={46} />

        <button
          type="button"
          className={`cartao__favorito ${favoritada ? 'cartao__favorito--ativo' : ''}`}
          onClick={() => alternarFavorito(receita)}
          // aria-pressed informa se o botão está "ligado" ou "desligado"
          aria-pressed={favoritada}
          aria-label={
            favoritada
              ? `Remover ${receita.nome} dos favoritos`
              : `Salvar ${receita.nome} nos favoritos`
          }
        >
          <IconeCoracao preenchido={favoritada} tamanho={22} />
        </button>
      </div>

      <span className="etiqueta">{receita.categoria}</span>

      <h3 className="cartao__titulo">{receita.nome}</h3>
      <p className="cartao__resumo">{receita.resumo}</p>

      <ul className="cartao__meta">
        <li>
          <IconeRelogio tamanho={16} /> {receita.tempo}
        </li>
        <li>
          <IconeDificuldade tamanho={16} /> {receita.dificuldade}
        </li>
      </ul>

      {/* Link do React Router: troca de página sem recarregar o site */}
      <Link to={`/receita/${receita.id}`} className="botao botao--secundario">
        Ver receita
      </Link>
    </article>
  )
}

export default CartaoReceita
