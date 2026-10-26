import { Route, Routes } from 'react-router-dom'
import MenuNavegacao from './componentes/MenuNavegacao'
import { ProvedorFavoritos } from './contextos/ContextoFavoritos'
import { ProvedorToast } from './contextos/ContextoToast'
import Ajuda from './paginas/Ajuda'
import Catalogo from './paginas/Catalogo'
import DetalheReceita from './paginas/DetalheReceita'
import Inicio from './paginas/Inicio'
import NaoEncontrada from './paginas/NaoEncontrada'

function App() {
  return (
    <ProvedorToast>
      <ProvedorFavoritos>
        <MenuNavegacao />

        <main id="conteudo-principal">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />

            <Route path="/receita/:id" element={<DetalheReceita />} />
            <Route path="/ajuda" element={<Ajuda />} />

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
