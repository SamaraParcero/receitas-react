import { IconeSetaDireita, IconeSetaEsquerda } from './Icone'

/**
 * COMPONENTE 2 - PAGINAÇÃO
 *
 * Navega entre as páginas da listagem de receitas.
 * Este componente NÃO tem estado próprio: ele apenas recebe a página atual
 * via props e avisa o componente pai quando o usuário clica (callback).
 * Isso é o padrão "componente controlado" do React.
 *
 * Props recebidas:
 *   paginaAtual      = número da página que está sendo exibida
 *   totalDePaginas   = quantidade total de páginas
 *   onMudarPagina    = função chamada com o novo número de página
 */
function Paginacao({ paginaAtual, totalDePaginas, onMudarPagina }) {
  // Com uma página só não faz sentido mostrar a paginação.
  if (totalDePaginas <= 1) return null

  // Monta o array [1, 2, 3, ...] com os números das páginas.
  const numerosDePagina = Array.from(
    { length: totalDePaginas },
    (_, indice) => indice + 1,
  )

  const ehPrimeiraPagina = paginaAtual === 1
  const ehUltimaPagina = paginaAtual === totalDePaginas

  return (
    <nav className="paginacao" aria-label="Navegação entre páginas de receitas">
      <button
        type="button"
        className="paginacao__botao"
        onClick={() => onMudarPagina(paginaAtual - 1)}
        disabled={ehPrimeiraPagina}
        aria-label="Página anterior"
      >
        <IconeSetaEsquerda tamanho={16} />
        Anterior
      </button>

      <ul className="paginacao__lista">
        {numerosDePagina.map((numero) => {
          const ehPaginaAtiva = numero === paginaAtual

          return (
            <li key={numero}>
              <button
                type="button"
                className={`paginacao__numero ${ehPaginaAtiva ? 'paginacao__numero--ativo' : ''}`}
                onClick={() => onMudarPagina(numero)}
                // aria-current avisa o leitor de tela qual é a página atual
                aria-current={ehPaginaAtiva ? 'page' : undefined}
                aria-label={`Ir para a página ${numero}`}
              >
                {numero}
              </button>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        className="paginacao__botao"
        onClick={() => onMudarPagina(paginaAtual + 1)}
        disabled={ehUltimaPagina}
        aria-label="Próxima página"
      >
        Próxima
        <IconeSetaDireita tamanho={16} />
      </button>
    </nav>
  )
}

export default Paginacao
