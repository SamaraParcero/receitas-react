import { useState } from 'react'
import { IconeSetaBaixo } from './Icone'

function Acordeao({ itens }) {
  const [indiceAberto, setIndiceAberto] = useState(null)

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

                <span
                  className={`acordeao__seta ${estaAberto ? 'acordeao__seta--aberta' : ''}`}
                >
                  <IconeSetaBaixo tamanho={18} />
                </span>
              </button>
            </h3>

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
