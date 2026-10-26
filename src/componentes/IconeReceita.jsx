/**
 * ILUSTRAÇÕES DAS RECEITAS
 *
 * Substituem os emojis que identificavam cada prato. São desenhos simples,
 * em duas cores, usando as MESMAS variáveis de cor do index.css
 * (var(--cor-rosa-bebe) e var(--cor-marca)). Ou seja: se a paleta do site
 * mudar, as ilustrações mudam junto, sem precisar editar nada aqui.
 *
 * Props recebidas:
 *   nome    = chave do desenho (campo "icone" de cada receita)
 *   tamanho = largura e altura em pixels
 */

// Cada chave guarda apenas as formas internas do SVG.
const DESENHOS = {
  // Panela com tampa: pratos principais cozidos
  panela: (
    <>
      <path d="M10 21h28v11a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5z" />
      <path d="M10 25H6a3 3 0 0 1 0-6h4" />
      <path d="M38 25h4a3 3 0 0 0 0-6h-4" />
      <rect x="7" y="15" width="34" height="5" rx="2.5" fill="var(--cor-marca)" />
      <circle cx="24" cy="11" r="2.5" fill="var(--cor-marca)" />
    </>
  ),

  // Bolo com cobertura e cereja
  bolo: (
    <>
      <path d="M11 26h26v9a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3z" />
      <path
        d="M11 26v-1.5a4.5 4.5 0 0 1 4.5-4.5h17a4.5 4.5 0 0 1 4.5 4.5V26z"
        fill="var(--cor-marca)"
      />
      <circle cx="24" cy="17" r="2.4" fill="var(--cor-marca)" />
      <line x1="11" y1="32" x2="37" y2="32" />
    </>
  ),

  // Triângulo de queijo com furinhos
  queijo: (
    <>
      <path d="M9 34 36 15a3 3 0 0 1 3 3v16z" />
      <circle cx="31" cy="27" r="2.4" fill="var(--cor-marca)" stroke="none" />
      <circle cx="24" cy="30" r="1.6" fill="var(--cor-marca)" stroke="none" />
      <circle cx="33" cy="20" r="1.4" fill="var(--cor-marca)" stroke="none" />
    </>
  ),

  // Tigela cheia: entradas e saladas
  salada: (
    <>
      <circle cx="17" cy="22" r="4.5" fill="var(--cor-marca)" stroke="none" />
      <circle cx="24.5" cy="19.5" r="5.5" fill="var(--cor-marca)" stroke="none" />
      <circle cx="32" cy="22" r="4.5" fill="var(--cor-marca)" stroke="none" />
      <path d="M7 26h34a17 17 0 0 1-34 0z" />
      <line x1="5" y1="26" x2="43" y2="26" />
    </>
  ),

  // Copo alto com canudo: bebidas geladas
  copo: (
    <>
      <path d="M16 16h16l-2.2 20.5a2.5 2.5 0 0 1-2.5 2.2h-6.6a2.5 2.5 0 0 1-2.5-2.2z" />
      <line x1="16.6" y1="22" x2="31.4" y2="22" />
      <path d="M27 10 23 22" stroke="var(--cor-marca)" strokeWidth="3" />
    </>
  ),

  // Doce redondo no forminha: brigadeiro e companhia
  doce: (
    <>
      <path d="M14 26h20l-2.5 10.5a2 2 0 0 1-2 1.5h-11a2 2 0 0 1-2-1.5z" />
      <circle cx="24" cy="21" r="7.5" fill="var(--cor-marca)" />
      <line x1="21" y1="18" x2="22.5" y2="19" stroke="var(--cor-rosa-bebe)" />
      <line x1="25" y1="17" x2="26.5" y2="18" stroke="var(--cor-rosa-bebe)" />
      <line x1="24" y1="22" x2="25.5" y2="23" stroke="var(--cor-rosa-bebe)" />
    </>
  ),

  // Massa dobrada ao meio: tapioca e lanches
  tapioca: (
    <>
      <path d="M9 34a15 15 0 0 1 30 0z" />
      <path d="M15 34a9 9 0 0 1 18 0z" fill="var(--cor-marca)" stroke="none" />
      <line x1="7" y1="34" x2="41" y2="34" />
    </>
  ),

  // Tigela fumegante: caldos e sopas
  sopa: (
    <>
      <path d="M8 25h32a16 16 0 0 1-32 0z" />
      <line x1="6" y1="25" x2="42" y2="25" />
      <path d="M19 17c-2-2 2-4 0-6.5" stroke="var(--cor-marca)" />
      <path d="M29 17c-2-2 2-4 0-6.5" stroke="var(--cor-marca)" />
    </>
  ),

  // Biscoito com gotas de chocolate
  cookie: (
    <>
      <circle cx="24" cy="25" r="13" />
      <circle cx="20" cy="21" r="2.2" fill="var(--cor-marca)" stroke="none" />
      <circle cx="28" cy="24" r="2.6" fill="var(--cor-marca)" stroke="none" />
      <circle cx="21" cy="30" r="2" fill="var(--cor-marca)" stroke="none" />
    </>
  ),

  // Fatia de pão com tomates por cima: bruschetta
  pao: (
    <>
      <path d="M10 26h28v8a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3z" />
      <path d="M10 26a14 8 0 0 1 28 0z" />
      <circle cx="18" cy="23" r="2.6" fill="var(--cor-marca)" stroke="none" />
      <circle cx="25" cy="20.5" r="3" fill="var(--cor-marca)" stroke="none" />
      <circle cx="32" cy="23" r="2.4" fill="var(--cor-marca)" stroke="none" />
    </>
  ),

  // Xícara com pires e vapor
  cafe: (
    <>
      <path d="M12 19h19v8a9.5 9.5 0 0 1-19 0z" />
      <path d="M31 21.5a4 4 0 0 1 0 8" fill="none" />
      <line x1="8" y1="37" x2="36" y2="37" />
      <path d="M19 14c-1.5-1.5 1.5-3 0-5" stroke="var(--cor-marca)" />
      <path d="M26 14c-1.5-1.5 1.5-3 0-5" stroke="var(--cor-marca)" />
    </>
  ),
}

function IconeReceita({ nome, tamanho = 44 }) {
  // Se a receita trouxer uma chave desconhecida, cai no desenho da panela.
  const desenho = DESENHOS[nome] || DESENHOS.panela

  return (
    <svg
      className="icone-receita"
      width={tamanho}
      height={tamanho}
      viewBox="0 0 48 48"
      fill="var(--cor-rosa-bebe)"
      stroke="var(--cor-marca)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {desenho}
    </svg>
  )
}

export default IconeReceita
