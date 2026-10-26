import { useEffect, useRef, useState } from 'react'
import { IconeCheck, IconeSetaBaixo } from './Icone'

function MenuSuspenso({ rotulo, opcoes, selecionada, onSelecionar }) {
  const [aberto, setAberto] = useState(false)

  const referenciaMenu = useRef(null)

  useEffect(() => {
    if (!aberto) return

    function tratarCliqueFora(evento) {
      if (referenciaMenu.current && !referenciaMenu.current.contains(evento.target)) {
        setAberto(false)
      }
    }

    function tratarEsc(evento) {
      if (evento.key === 'Escape') setAberto(false)
    }

    document.addEventListener('mousedown', tratarCliqueFora)
    document.addEventListener('keydown', tratarEsc)

    return () => {
      document.removeEventListener('mousedown', tratarCliqueFora)
      document.removeEventListener('keydown', tratarEsc)
    }
  }, [aberto])

  function escolherOpcao(opcao) {
    onSelecionar(opcao)
    setAberto(false)
  }

  return (
    <div className="dropdown" ref={referenciaMenu}>
      <span className="dropdown__rotulo" id="rotulo-dropdown">
        {rotulo}
      </span>

      <button
        type="button"
        className="dropdown__botao"
        onClick={() => setAberto(!aberto)}
        aria-expanded={aberto}
        aria-haspopup="listbox"
        aria-labelledby="rotulo-dropdown"
      >
        <span>{selecionada}</span>
        <span className={`dropdown__seta ${aberto ? 'dropdown__seta--aberta' : ''}`}>
          <IconeSetaBaixo tamanho={18} />
        </span>
      </button>

      {aberto && (
        <ul className="dropdown__lista" role="listbox" aria-labelledby="rotulo-dropdown">
          {opcoes.map((opcao) => {
            const estaSelecionada = opcao === selecionada

            return (
              <li key={opcao} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={estaSelecionada}
                  className={`dropdown__opcao ${estaSelecionada ? 'dropdown__opcao--ativa' : ''}`}
                  onClick={() => escolherOpcao(opcao)}
                >
                  <span>{opcao}</span>
                  {estaSelecionada && <IconeCheck tamanho={16} />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default MenuSuspenso
