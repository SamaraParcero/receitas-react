import { useState } from 'react'
import { IconeSetaBaixo } from './Icone'

/**
 * COMPONENTE 1 - ACORDEÃO
 *
 * Seções de conteúdo que abrem e fecham. Apenas um item fica aberto por vez.
 *
 * Props recebidas:
 *   itens = [{ titulo: string, conteudo: string }]
 *
 * Estado local:
 *   indiceAberto = qual item está aberto (null = todos fechados)
 */
function Acordeao({ itens }) {
  const [indiceAberto, setIndiceAberto] = useState(null)

  // Clicar no item aberto fecha ele; clicar em outro troca o item aberto.
  function alternarItem(indice) {
    setIndiceAberto(indiceAberto === indice ? null : indice)
  }

  return (
    <div className="acordeao">
      {itens.map((item, indice) => {
        const estaAberto = indiceAberto === indice

        return (
          <div className="acordeao__item" key={item.titulo}>
            <h3 className="acordeao__cabecalho">
              <button
                type="button"
                className="acordeao__botao"
                onClick={() => alternarItem(indice)}
                aria-expanded={estaAberto}
                aria-controls={`painel-acordeao-${indice}`}
                id={`botao-acordeao-${indice}`}
              >
                <span>{item.titulo}</span>
                {/* A seta gira 180 graus quando o item está aberto */}
                <span
                  className={`acordeao__seta ${estaAberto ? 'acordeao__seta--aberta' : ''}`}
                >
                  <IconeSetaBaixo tamanho={18} />
                </span>
              </button>
            </h3>

            {/* O conteúdo existe sempre no HTML; a altura é animada pelo CSS */}
            <div
              className={`acordeao__corpo ${estaAberto ? 'acordeao__corpo--aberto' : ''}`}
              id={`painel-acordeao-${indice}`}
              role="region"
              aria-labelledby={`botao-acordeao-${indice}`}
            >
              <p className="acordeao__texto">{item.conteudo}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Acordeao
