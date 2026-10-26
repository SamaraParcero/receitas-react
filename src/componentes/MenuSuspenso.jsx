import { useEffect, useRef, useState } from 'react'
import { IconeCheck, IconeSetaBaixo } from './Icone'

/**
 * COMPONENTE 5 - MENU SUSPENSO (DROPDOWN)
 *
 * Botão que revela uma lista de opções. Fecha ao escolher uma opção,
 * ao clicar fora dele ou ao apertar a tecla Esc.
 *
 * Props recebidas:
 *   rotulo       = texto do rótulo acima do botão
 *   opcoes       = array de strings
 *   selecionada  = opção escolhida no momento
 *   onSelecionar = callback chamado com a opção clicada
 *
 * Estado local:
 *   aberto = o menu está visível?
 */
function MenuSuspenso({ rotulo, opcoes, selecionada, onSelecionar }) {
  const [aberto, setAberto] = useState(false)

  // useRef guarda uma referência ao elemento real na tela, para que
  // possamos saber se o clique aconteceu dentro ou fora do menu.
  const referenciaMenu = useRef(null)

  // useEffect: liga os "ouvintes" de evento quando o menu abre
  // e os desliga quando o menu fecha (função de limpeza do return).
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

    // Limpeza: evita vazamento de memória ao desmontar o componente.
    return () => {
      document.removeEventListener('mousedown', tratarCliqueFora)
      document.removeEventListener('keydown', tratarEsc)
    }
  }, [aberto])

  function escolherOpcao(opcao) {
    onSelecionar(opcao)
    setAberto(false) // fecha o menu após a escolha
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

      {/* Renderização condicional: a lista só existe quando aberto = true */}
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
