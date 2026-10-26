import { Link } from 'react-router-dom'

/**
 * PÁGINA 404 (rota "*")
 *
 * Exibida quando a URL digitada não corresponde a nenhuma rota.
 */
function NaoEncontrada() {
  return (
    <section className="secao conteiner centralizado">
      <p className="erro404" aria-hidden="true">
        404
      </p>
      <h1 className="secao__titulo">Esta página saiu do menu</h1>
      <p className="secao__subtitulo">
        O endereço que você tentou abrir não existe no site.
      </p>
      <Link to="/" className="botao botao--principal">
        Voltar para o início
      </Link>
    </section>
  )
}

export default NaoEncontrada
