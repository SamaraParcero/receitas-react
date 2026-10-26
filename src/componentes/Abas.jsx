import { useState } from 'react'

function Abas({ abas }) {
  const [indiceAtivo, setIndiceAtivo] = useState(0)

  function tratarTecla(evento, indice) {
    if (evento.key === 'ArrowRight') {
      setIndiceAtivo((indice + 1) % abas.length)
    } else if (evento.key === 'ArrowLeft') {
      setIndiceAtivo((indice - 1 + abas.length) % abas.length)
    }
  }

  return (
    <div className="abas">
      <div className="abas__lista" role="tablist" aria-label="Detalhes da receita">
        {abas.map((aba, indice) => {
          const estaAtiva = indice === indiceAtivo

          return (
            <button
              key={aba.rotulo}
              type="button"
              role="tab"
              id={`aba-${indice}`}
              className={`abas__botao ${estaAtiva ? 'abas__botao--ativo' : ''}`}
              onClick={() => setIndiceAtivo(indice)}
              onKeyDown={(evento) => tratarTecla(evento, indice)}
              aria-selected={estaAtiva}
              aria-controls={`painel-aba-${indice}`}

              tabIndex={estaAtiva ? 0 : -1}
            >
              {aba.rotulo}
            </button>
          )
        })}
      </div>

      <div
        className="abas__painel"
        role="tabpanel"
        id={`painel-aba-${indiceAtivo}`}
        aria-labelledby={`aba-${indiceAtivo}`}
        tabIndex={0}
      >
        {abas[indiceAtivo].conteudo}
      </div>
    </div>
  )
}

export default Abas
