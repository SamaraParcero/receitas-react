import { useEffect, useState } from 'react'
import Acordeao from '../componentes/Acordeao'
import BarraDeProgresso from '../componentes/BarraDeProgresso'
import MenuSuspenso from '../componentes/MenuSuspenso'
import { useToast } from '../contextos/ContextoToast'

// Perguntas frequentes entregues ao Acordeão por props.
const PERGUNTAS_FREQUENTES = [
  {
    titulo: 'As receitas servem quantas pessoas?',
    conteudo:
      'Todas as quantidades são calculadas para quatro porções. Para dobrar a receita, multiplique os ingredientes, mas mantenha o mesmo tempo de forno e aumente o tempo de cozimento em cerca de 20%.',
  },
  {
    titulo: 'Posso substituir ingredientes?',
    conteudo:
      'Sim. Cada receita traz uma aba de dicas com as substituições testadas pela nossa cozinha, como trocar o azeite de dendê por azeite comum ou o açúcar refinado por mascavo.',
  },
  {
    titulo: 'Como funciona a lista de favoritos?',
    conteudo:
      'Ao clicar no coração de uma receita, ela é somada ao contador que aparece no topo do site. A lista fica guardada enquanto a página estiver aberta e ajuda a montar o menu da semana.',
  },
  {
    titulo: 'Preciso criar uma conta para acessar?',
    conteudo:
      'Não. Todo o conteúdo é aberto e não pedimos cadastro, e-mail ou qualquer dado pessoal para navegar pelo catálogo de receitas.',
  },
  {
    titulo: 'Posso enviar uma receita de família?',
    conteudo:
      'Pode, e ficamos felizes com isso. Use o formulário logo abaixo escolhendo o assunto "Enviar receita". Nossa equipe testa a receita antes de publicar e credita a autoria.',
  },
]

const ASSUNTOS = ['Dúvida sobre receita', 'Enviar receita', 'Erro no site', 'Elogio']

/**
 * PÁGINA DE AJUDA (rota "/ajuda")
 *
 * Reúne o ACORDEÃO com as perguntas frequentes e um formulário de contato
 * que reaproveita o MENU SUSPENSO e a BARRA DE PROGRESSO — o mesmo
 * componente usado no catálogo, agora com outras props.
 */
function Ajuda() {
  const { mostrarToast } = useToast()

  const [assunto, setAssunto] = useState(ASSUNTOS[0])
  const [mensagem, setMensagem] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [progressoEnvio, setProgressoEnvio] = useState(0)

  // useEffect + setInterval: simula o envio do formulário avançando
  // a barra de progresso de 10 em 10 por cento.
  useEffect(() => {
    if (!enviando) return

    const intervalo = setInterval(() => {
      setProgressoEnvio((anterior) => Math.min(100, anterior + 10))
    }, 180)

    // Limpeza: desliga o cronômetro quando o envio termina.
    return () => clearInterval(intervalo)
  }, [enviando])

  // Quando a barra chega a 100%, encerra o envio e notifica o usuário.
  useEffect(() => {
    if (enviando && progressoEnvio >= 100) {
      setEnviando(false)
      setMensagem('')
      mostrarToast('Mensagem enviada! Respondemos em até 2 dias úteis.', 'sucesso')
    }
  }, [enviando, progressoEnvio, mostrarToast])

  // Manipulação de evento: intercepta o envio do formulário.
  function tratarEnvio(evento) {
    evento.preventDefault()

    if (mensagem.trim().length < 10) {
      mostrarToast('Escreva uma mensagem com pelo menos 10 caracteres.', 'erro')
      return
    }

    setProgressoEnvio(0)
    setEnviando(true)
  }

  return (
    <>
      <section className="secao conteiner" aria-labelledby="titulo-faq">
        <h1 id="titulo-faq" className="secao__titulo">
          Central de ajuda
        </h1>
        <p className="secao__subtitulo">
          Reunimos as dúvidas mais comuns de quem está começando na cozinha.
        </p>

        {/* COMPONENTE: acordeão com as perguntas frequentes */}
        <Acordeao itens={PERGUNTAS_FREQUENTES} />
      </section>

      <section className="secao conteiner" aria-labelledby="titulo-contato">
        <h2 id="titulo-contato" className="secao__titulo">
          Falar com a cozinha
        </h2>
        <p className="secao__subtitulo">
          Não achou sua resposta? Escreva para a nossa equipe.
        </p>

        <form className="painel formulario" onSubmit={tratarEnvio}>
          {/* COMPONENTE: o mesmo menu suspenso do catálogo, com outras props */}
          <MenuSuspenso
            rotulo="Assunto da mensagem"
            opcoes={ASSUNTOS}
            selecionada={assunto}
            onSelecionar={setAssunto}
          />

          <div className="campo">
            <label className="campo__rotulo" htmlFor="mensagem">
              Sua mensagem
            </label>
            <textarea
              id="mensagem"
              className="campo__area"
              rows={5}
              value={mensagem}
              onChange={(evento) => setMensagem(evento.target.value)}
              placeholder="Conte o que você precisa..."
              disabled={enviando}
              required
            />
          </div>

          {/* A barra de progresso só aparece durante o envio */}
          {enviando && (
            <BarraDeProgresso valor={progressoEnvio} rotulo="Enviando mensagem" />
          )}

          <button type="submit" className="botao botao--principal" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Enviar mensagem'}
          </button>
        </form>
      </section>
    </>
  )
}

export default Ajuda
