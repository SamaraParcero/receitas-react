import { IconeSetaDireita, IconeSetaEsquerda } from './Icone'

function Paginacao({ paginaAtual, totalDePaginas, onMudarPagina }) {
  if (totalDePaginas <= 1) return null

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
