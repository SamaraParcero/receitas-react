import { Link } from 'react-router-dom'

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
