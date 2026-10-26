import { NavLink } from 'react-router-dom'
import { useFavoritos } from '../contextos/ContextoFavoritos'
import { IconeChef, IconeCoracao } from './Icone'

function MenuNavegacao() {
  const { totalDeFavoritos } = useFavoritos()

  const classeDoLink = ({ isActive }) =>
    `navegacao__link ${isActive ? 'navegacao__link--ativo' : ''}`

  return (
    <header className="cabecalho">
      <div className="conteiner cabecalho__interno">
        <NavLink to="/" className="marca" aria-label="Sabor e Tempero, página inicial">
          <span className="marca__icone">
            <IconeChef tamanho={30} />
          </span>
          <span className="marca__texto">
            Sabor <span className="marca__destaque">&amp; Tempero</span>
          </span>
        </NavLink>

        <nav className="navegacao" aria-label="Navegação principal">
          <NavLink to="/" className={classeDoLink}>
            Início
          </NavLink>
          <NavLink to="/catalogo" className={classeDoLink}>
            Catálogo
          </NavLink>
          <NavLink to="/ajuda" className={classeDoLink}>
            Ajuda
          </NavLink>

          <span className="contador-favoritos">
            <IconeCoracao preenchido tamanho={16} />
            <span className="contador-favoritos__numero">{totalDeFavoritos}</span>
            <span className="apenas-leitor-de-tela">
              receitas salvas nos favoritos
            </span>
          </span>
        </nav>
      </div>
    </header>
  )
}

export default MenuNavegacao
