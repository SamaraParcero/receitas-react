import { useState } from 'react'
import CartaoReceita from '../componentes/CartaoReceita'
import MenuSuspenso from '../componentes/MenuSuspenso'
import Paginacao from '../componentes/Paginacao'
import { CATEGORIAS, RECEITAS } from '../dados/receitas'

// Quantas receitas aparecem por página.
const ITENS_POR_PAGINA = 6

/**
 * PÁGINA DO CATÁLOGO (rota "/catalogo")
 *
 * Esta página é a "dona" do estado do filtro e da página atual.
 * Ela entrega esses valores para o MenuSuspenso e para a Paginacao
 * via props, e recebe de volta as mudanças via callbacks.
 */
function Catalogo() {
  const [categoriaEscolhida, setCategoriaEscolhida] = useState('Todas')
  const [paginaAtual, setPaginaAtual] = useState(1)

  // 1) Filtra a lista conforme a categoria escolhida no menu suspenso.
  const receitasFiltradas =
    categoriaEscolhida === 'Todas'
      ? RECEITAS
      : RECEITAS.filter((receita) => receita.categoria === categoriaEscolhida)

  // 2) Calcula quantas páginas existem e corta a lista para a página atual.
  const totalDePaginas = Math.ceil(receitasFiltradas.length / ITENS_POR_PAGINA)
  const primeiroItem = (paginaAtual - 1) * ITENS_POR_PAGINA
  const receitasDaPagina = receitasFiltradas.slice(
    primeiroItem,
    primeiroItem + ITENS_POR_PAGINA,
  )

  // Ao trocar o filtro, volta para a página 1 (senão a lista pode ficar vazia).
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
        {/* COMPONENTE: menu suspenso usado como filtro */}
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

      {/* COMPONENTE: paginação controlada por esta página */}
      <Paginacao
        paginaAtual={paginaAtual}
        totalDePaginas={totalDePaginas}
        onMudarPagina={setPaginaAtual}
      />
    </section>
  )
}

export default Catalogo
