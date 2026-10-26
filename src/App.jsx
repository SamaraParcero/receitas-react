import { Route, Routes } from 'react-router-dom'
import MenuNavegacao from './componentes/MenuNavegacao'
import { ProvedorFavoritos } from './contextos/ContextoFavoritos'
import { ProvedorToast } from './contextos/ContextoToast'
import Ajuda from './paginas/Ajuda'
import Catalogo from './paginas/Catalogo'
import DetalheReceita from './paginas/DetalheReceita'
import Inicio from './paginas/Inicio'
import NaoEncontrada from './paginas/NaoEncontrada'

/**
 * COMPONENTE PRINCIPAL
 *
 * É ele que organiza toda a aplicação:
 *   1. envolve tudo nos provedores de estado global (Context API);
 *   2. monta a estrutura fixa da página (cabeçalho e rodapé);
 *   3. define quais rotas existem e qual página cada uma renderiza.
 *
 * Observação sobre a ordem: o ProvedorFavoritos usa o toast para avisar
 * quando uma receita é salva, por isso ele fica DENTRO do ProvedorToast.
 */
function App() {
  return (
    <ProvedorToast>
      <ProvedorFavoritos>
        <MenuNavegacao />

        <main id="conteudo-principal">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            {/* ":id" é um parâmetro dinâmico lido com useParams */}
            <Route path="/receita/:id" element={<DetalheReceita />} />
            <Route path="/ajuda" element={<Ajuda />} />
            {/* "*" captura qualquer endereço que não exista */}
            <Route path="*" element={<NaoEncontrada />} />
          </Routes>
        </main>

        <footer className="rodape">
          <div className="conteiner">
            <p>
              Sabor &amp; Tempero — projeto acadêmico desenvolvido em React.js.
            </p>
            <p className="rodape__nota">
              Universidade Católica do Salvador · Engenharia de Software
            </p>
          </div>
        </footer>
      </ProvedorFavoritos>
    </ProvedorToast>
  )
}

export default App
