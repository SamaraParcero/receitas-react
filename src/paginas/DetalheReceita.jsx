import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Abas from '../componentes/Abas'
import BarraDeProgresso from '../componentes/BarraDeProgresso'
import IconeReceita from '../componentes/IconeReceita'
import {
  IconeCoracao,
  IconeDificuldade,
  IconeEtapas,
  IconeRelogio,
  IconeSetaEsquerda,
} from '../componentes/Icone'
import { useFavoritos } from '../contextos/ContextoFavoritos'
import { useToast } from '../contextos/ContextoToast'
import { RECEITAS } from '../dados/receitas'

/**
 * PÁGINA DE DETALHE (rota "/receita/:id")
 *
 * useParams lê o ":id" que está na URL e descobre qual receita mostrar.
 * Aqui ficam as ABAS (Ingredientes / Preparo / Dicas) e a BARRA DE
 * PROGRESSO, que avança conforme o usuário marca as etapas feitas.
 */
function DetalheReceita() {
  const { id } = useParams()
  const { mostrarToast } = useToast()
  const { ehFavorito, alternarFavorito } = useFavoritos()

  // O id da URL vem como texto, por isso o Number().
  const receita = RECEITAS.find((item) => item.id === Number(id))

  // Estado: quais etapas do preparo já foram marcadas.
  const [etapasFeitas, setEtapasFeitas] = useState([])

  const totalDeEtapas = receita ? receita.preparo.length : 0
  const progresso = totalDeEtapas ? (etapasFeitas.length / totalDeEtapas) * 100 : 0

  // Se o usuário navegar para outra receita, limpa as marcações.
  useEffect(() => {
    setEtapasFeitas([])
  }, [id])

  // Avisa com um toast quando todas as etapas são concluídas.
  useEffect(() => {
    if (totalDeEtapas > 0 && etapasFeitas.length === totalDeEtapas) {
      mostrarToast('Preparo concluído! Bom apetite.', 'sucesso')
    }
  }, [etapasFeitas.length, totalDeEtapas, mostrarToast])

  // Receita inexistente (ex.: /receita/999)
  if (!receita) {
    return (
      <section className="secao conteiner">
        <h1 className="secao__titulo">Receita não encontrada</h1>
        <p className="secao__subtitulo">
          O endereço acessado não corresponde a nenhuma receita do catálogo.
        </p>
        <Link to="/catalogo" className="botao botao--principal">
          Voltar para o catálogo
        </Link>
      </section>
    )
  }

  function alternarEtapa(indice) {
    setEtapasFeitas((anteriores) =>
      anteriores.includes(indice)
        ? anteriores.filter((item) => item !== indice)
        : [...anteriores, indice],
    )
  }

  // Conteúdo de cada aba, montado como um array de objetos e
  // entregue ao componente Abas por props.
  const abasDaReceita = [
    {
      rotulo: 'Ingredientes',
      conteudo: (
        <ul className="lista-marcada">
          {receita.ingredientes.map((ingrediente) => (
            <li key={ingrediente}>{ingrediente}</li>
          ))}
        </ul>
      ),
    },
    {
      rotulo: 'Modo de preparo',
      conteudo: (
        <ol className="lista-etapas">
          {receita.preparo.map((etapa, indice) => {
            const feita = etapasFeitas.includes(indice)

            return (
              <li key={etapa}>
                <label className={`etapa ${feita ? 'etapa--feita' : ''}`}>
                  <input
                    type="checkbox"
                    checked={feita}
                    onChange={() => alternarEtapa(indice)}
                  />
                  <span>{etapa}</span>
                </label>
              </li>
            )
          })}
        </ol>
      ),
    },
    {
      rotulo: 'Dicas do chef',
      conteudo: (
        <ul className="lista-marcada">
          {receita.dicas.map((dica) => (
            <li key={dica}>{dica}</li>
          ))}
        </ul>
      ),
    },
  ]

  const favoritada = ehFavorito(receita.id)

  return (
    <article className="secao conteiner">
      <Link to="/catalogo" className="voltar">
        <IconeSetaEsquerda tamanho={16} />
        Voltar para o catálogo
      </Link>

      <header className="receita__cabecalho">
        <IconeReceita nome={receita.icone} tamanho={84} />

        <div>
          <span className="etiqueta">{receita.categoria}</span>
          <h1 className="receita__titulo">{receita.nome}</h1>
          <p className="receita__resumo">{receita.resumo}</p>

          <ul className="cartao__meta">
            <li>
              <IconeRelogio tamanho={16} /> {receita.tempo}
            </li>
            <li>
              <IconeDificuldade tamanho={16} /> {receita.dificuldade}
            </li>
            <li>
              <IconeEtapas tamanho={16} /> {totalDeEtapas} etapas
            </li>
          </ul>

          <button
            type="button"
            className={`botao ${favoritada ? 'botao--principal' : 'botao--secundario'}`}
            onClick={() => alternarFavorito(receita)}
            aria-pressed={favoritada}
          >
            <IconeCoracao preenchido={favoritada} tamanho={18} />
            {favoritada ? 'Salva nos favoritos' : 'Salvar nos favoritos'}
          </button>
        </div>
      </header>

      {/* COMPONENTE: barra de progresso das etapas do preparo */}
      <div className="painel">
        <BarraDeProgresso
          valor={progresso}
          rotulo={`Preparo: ${etapasFeitas.length} de ${totalDeEtapas} etapas concluídas`}
        />
      </div>

      {/* COMPONENTE: abas com o conteúdo da receita */}
      <Abas abas={abasDaReceita} />
    </article>
  )
}

export default DetalheReceita
