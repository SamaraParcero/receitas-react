import { Link } from 'react-router-dom'
import BarraDeProgresso from '../componentes/BarraDeProgresso'
import CartaoReceita from '../componentes/CartaoReceita'
import { useFavoritos } from '../contextos/ContextoFavoritos'
import { useToast } from '../contextos/ContextoToast'
import { RECEITAS } from '../dados/receitas'

/**
 * PÁGINA INICIAL (rota "/")
 *
 * Mostra a apresentação do site, três receitas em destaque e uma barra
 * de progresso ligada ao estado global de favoritos.
 */
function Inicio() {
  const { totalDeFavoritos } = useFavoritos()
  const { mostrarToast } = useToast()

  const receitasEmDestaque = RECEITAS.slice(0, 3)

  // Meta fictícia: salvar 5 receitas completa a "coleção da semana".
  const META_DE_FAVORITOS = 5
  const progressoDaMeta = (totalDeFavoritos / META_DE_FAVORITOS) * 100

  return (
    <>
      <section className="destaque" aria-labelledby="titulo-destaque">
        <div className="conteiner destaque__interno">
          <span className="etiqueta etiqueta--clara">Receitas caseiras</span>

          <h1 id="titulo-destaque" className="destaque__titulo">
            Comida de verdade, <br />
            explicada passo a passo
          </h1>

          <p className="destaque__texto">
            Um acervo de receitas simples para o dia a dia, com lista de
            ingredientes, modo de preparo marcável e as dicas que fazem
            diferença no resultado final.
          </p>

          <div className="destaque__acoes">
            <Link to="/catalogo" className="botao botao--principal">
              Explorar o catálogo
            </Link>

            <button
              type="button"
              className="botao botao--contorno"
              onClick={() =>
                mostrarToast('Você receberá uma receita nova toda sexta!', 'sucesso')
              }
            >
              Assinar a newsletter
            </button>
          </div>
        </div>
      </section>

      <section className="secao conteiner" aria-labelledby="titulo-meta">
        <h2 id="titulo-meta" className="secao__titulo">
          Sua coleção da semana
        </h2>
        <p className="secao__subtitulo">
          Salve {META_DE_FAVORITOS} receitas nos favoritos para montar o menu
          completo. Já são {totalDeFavoritos} de {META_DE_FAVORITOS}.
        </p>

        {/* COMPONENTE: barra de progresso reagindo ao estado global */}
        <div className="painel">
          <BarraDeProgresso
            valor={progressoDaMeta}
            rotulo="Receitas salvas nos favoritos"
          />
        </div>
      </section>

      <section className="secao conteiner" aria-labelledby="titulo-destaques">
        <h2 id="titulo-destaques" className="secao__titulo">
          Em destaque hoje
        </h2>
        <p className="secao__subtitulo">
          As três receitas mais pedidas pelos leitores neste mês.
        </p>

        <div className="grade">
          {receitasEmDestaque.map((receita) => (
            <CartaoReceita key={receita.id} receita={receita} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Inicio
