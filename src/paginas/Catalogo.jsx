import { useState } from 'react'
import CartaoReceita from '../componentes/CartaoReceita'
import MenuSuspenso from '../componentes/MenuSuspenso'
import Paginacao from '../componentes/Paginacao'
import { CATEGORIAS, RECEITAS } from '../dados/receitas'

const ITENS_POR_PAGINA = 6

function Catalogo() {
  const [categoriaEscolhida, setCategoriaEscolhida] = useState('Todas')
  const [paginaAtual, setPaginaAtual] = useState(1)

  const receitasFiltradas =
    categoriaEscolhida === 'Todas'
      ? RECEITAS
      : RECEITAS.filter((receita) => receita.categoria === categoriaEscolhida)

  const totalDePaginas = Math.ceil(receitasFiltradas.length / ITENS_POR_PAGINA)
  const primeiroItem = (paginaAtual - 1) * ITENS_POR_PAGINA
  const receitasDaPagina = receitasFiltradas.slice(
    primeiroItem,
    primeiroItem + ITENS_POR_PAGINA,
  )

  function tratarTrocaDeCategoria(categoria) {
    setCategoriaEscolhida(categoria)
    setPaginaAtual(1)
  }

  return (
    <section className="secao conteiner" aria-labelledby="titulo-catalogo">
      <h1 id="titulo-catalogo" className="secao__titulo">
        Catálogo de receitas
      </h1>
      <p className="secao__subtitulo">
        {receitasFiltradas.length} receita(s) encontrada(s) em
        <strong> {categoriaEscolhida.toLowerCase()}</strong>.
      </p>

      <div className="barra-de-filtros">
        <MenuSuspenso
          rotulo="Filtrar por categoria"
          opcoes={CATEGORIAS}
          selecionada={categoriaEscolhida}
          onSelecionar={tratarTrocaDeCategoria}
        />

        <p className="barra-de-filtros__info" aria-live="polite">
          Página {paginaAtual} de {totalDePaginas || 1}
        </p>
      </div>

      {receitasDaPagina.length > 0 ? (
        <div className="grade">
          {receitasDaPagina.map((receita) => (
            <CartaoReceita key={receita.id} receita={receita} />
          ))}
        </div>
      ) : (
        <p className="aviso">Nenhuma receita encontrada nesta categoria.</p>
      )}

      <Paginacao
        paginaAtual={paginaAtual}
        totalDePaginas={totalDePaginas}
        onMudarPagina={setPaginaAtual}
      />
    </section>
  )
}

export default Catalogo
