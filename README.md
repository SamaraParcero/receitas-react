# Sabor & Tempero — Portal de Receitas em React.js

Aplicação web responsiva desenvolvida com React.js, com 6 componentes visuais
criados do zero (sem biblioteca de UI), React Router e Context API.

**Universidade Católica do Salvador — Escola de Tecnologias**
Curso: Engenharia de Software · Professor: Elton Figueiredo da Silva

---

## Como executar

```bash
npm install
npm run dev
```

Depois abra o endereço que aparecer no terminal (normalmente
`http://localhost:5173`). No GitHub Codespaces, o próprio editor mostra um
aviso "Abrir no navegador" assim que o servidor sobe.

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento |
| `npm run build` | Gera a versão final na pasta `dist/` |
| `npm run preview` | Testa a versão final gerada |

---

## Estrutura de pastas

```
src/
├── main.jsx                  Ponto de entrada: monta o App e liga o Router
├── App.jsx                   Componente principal: provedores + rotas + layout
├── index.css                 Todo o estilo (CSS puro, mobile first)
│
├── componentes/              Componentes reutilizáveis
│   ├── Acordeao.jsx          (1) Acordeão
│   ├── Paginacao.jsx         (2) Paginação
│   ├── BarraDeProgresso.jsx  (3) Barra de progresso
│   ├── Abas.jsx              (4) Abas
│   ├── MenuSuspenso.jsx      (5) Menu suspenso
│   ├── Toast.jsx             (6) Notificação toast
│   ├── CartaoReceita.jsx     Cartão de receita da listagem
│   ├── MenuNavegacao.jsx     Cabeçalho com os links das rotas
│   ├── Icone.jsx             Ícones SVG da interface (setas, coração...)
│   └── IconeReceita.jsx      Ilustrações SVG dos pratos
│
├── paginas/                  Uma pasta por rota
│   ├── Inicio.jsx            Rota "/"
│   ├── Catalogo.jsx          Rota "/catalogo"
│   ├── DetalheReceita.jsx    Rota "/receita/:id"
│   ├── Ajuda.jsx             Rota "/ajuda"
│   └── NaoEncontrada.jsx     Rota "*" (página 404)
│
├── contextos/                Estado global (desafio extra)
│   ├── ContextoToast.jsx     Dispara notificações de qualquer tela
│   └── ContextoFavoritos.jsx Guarda as receitas favoritadas
│
└── dados/
    └── receitas.js           14 receitas fictícias usadas pela aplicação
```

---

## Onde encontrar cada componente obrigatório

| # | Componente | Arquivo | Onde aparece na tela |
|---|---|---|---|
| 1 | **Acordeão** | `componentes/Acordeao.jsx` | Página **Ajuda** → Perguntas frequentes |
| 2 | **Paginação** | `componentes/Paginacao.jsx` | Página **Catálogo** → abaixo dos cartões |
| 3 | **Barra de progresso** | `componentes/BarraDeProgresso.jsx` | **Início** (meta de favoritos), **Detalhe** (etapas do preparo) e **Ajuda** (envio do formulário) |
| 4 | **Abas** | `componentes/Abas.jsx` | **Detalhe da receita** → Ingredientes / Preparo / Dicas |
| 5 | **Menu suspenso** | `componentes/MenuSuspenso.jsx` | **Catálogo** (filtro de categoria) e **Ajuda** (assunto da mensagem) |
| 6 | **Toast** | `componentes/Toast.jsx` | Ao favoritar, ao concluir o preparo e ao enviar o formulário |

Detalhes de implementação exigidos pelo enunciado:

- **Acordeão** — apenas um item aberto por vez, com transição suave de altura.
- **Paginação** — botões anterior/próxima **desabilitados** nas pontas da lista
  e destaque da página atual.
- **Barra de progresso** — recebe o valor de 0 a 100 por props e exibe a
  porcentagem; muda de cor conforme avança.
- **Abas** — guarda a aba ativa no estado e também troca de aba pelas setas
  do teclado.
- **Menu suspenso** — fecha ao escolher uma opção, ao clicar fora e com Esc.
- **Toast** — some sozinho após 4 segundos ou no botão fechar, em três tipos
  (sucesso, erro e informação).

---

## Conceitos de React demonstrados

| Conceito | Exemplo no projeto |
|---|---|
| Componentes funcionais | Todos os arquivos `.jsx` |
| **Props** | `<Acordeao itens={PERGUNTAS_FREQUENTES} />` em `paginas/Ajuda.jsx` |
| **Estado local** (`useState`) | `indiceAtivo` em `Abas.jsx`, `paginaAtual` em `Catalogo.jsx` |
| **`useEffect`** | Fechar o dropdown ao clicar fora (`MenuSuspenso.jsx`), fechar o toast sozinho (`Toast.jsx`), simular o envio do formulário (`Ajuda.jsx`) |
| **Manipulação de eventos** | `onClick`, `onChange`, `onKeyDown` e `onSubmit` com `preventDefault()` |
| Renderização condicional | Lista do dropdown, barra de progresso durante o envio |
| Listas com `key` | `RECEITAS.map(...)` no catálogo |
| Componente controlado | `Paginacao` não tem estado: recebe tudo por props e devolve o clique por callback |
| Hook personalizado | `useToast()` e `useFavoritos()` |

---

## Desafio extra (implementado)

**1. Estado global com Context API**

- `ContextoToast` — qualquer componente chama `useToast().mostrarToast(...)`
  sem receber nada por props.
- `ContextoFavoritos` — o cartão da receita marca o favorito e o **contador no
  cabeçalho** atualiza na hora. Os dois componentes não são pai e filho, então
  props não resolveriam o problema.

**2. React Router**

| Rota | Página |
|---|---|
| `/` | Início |
| `/catalogo` | Catálogo com filtro e paginação |
| `/receita/:id` | Detalhe da receita (o `:id` é lido com `useParams`) |
| `/ajuda` | Central de ajuda e formulário |
| `*` | Página 404 |

---

## Responsividade

Escrita em CSS puro na abordagem **mobile first**: os estilos base valem para
o celular e as media queries acrescentam os ajustes das telas maiores.

| Tela | Comportamento |
|---|---|
| Celular (até 639px) | 1 coluna de cartões, cabeçalho empilhado, abas divididas igualmente, toasts ocupando a largura da tela |
| Tablet (640px+) | 2 colunas, cabeçalho em linha, filtro e contador lado a lado |
| Desktop (1024px+) | 3 colunas, espaçamentos maiores, toasts no canto inferior direito |

---

## Acessibilidade

- Tags semânticas: `header`, `nav`, `main`, `section`, `article`, `footer`.
- ARIA nos componentes: `aria-expanded` e `aria-controls` no acordeão,
  `role="tablist"/"tab"/"tabpanel"` nas abas, `role="progressbar"` com
  `aria-valuenow` na barra, `aria-current="page"` na paginação,
  `role="listbox"/"option"` no menu suspenso e `role="status"/"alert"` nos toasts.
- Navegação completa por teclado, com contorno de foco visível.
- Ícones em SVG inline, todos marcados como `aria-hidden="true"` por serem
  decorativos — o leitor de tela anuncia o texto ao lado, não o desenho.
- Texto exclusivo para leitores de tela na classe `.apenas-leitor-de-tela`.
- Respeita `prefers-reduced-motion` para quem desativou animações.

---

## Roteiro sugerido para o vídeo

1. **Abrir o site e mostrar a navegação** — clicar em Início, Catálogo e Ajuda,
   observando que a página não recarrega (React Router).
2. **Catálogo** — abrir o menu suspenso, filtrar por "Sobremesa", mostrar que a
   contagem muda e que a paginação some; voltar para "Todas" e navegar entre as
   páginas 1, 2 e 3 mostrando os botões desabilitados nas pontas.
3. **Favoritar uma receita** — mostrar o toast aparecendo e o contador do topo
   subindo (este é o momento de explicar a Context API).
4. **Abrir uma receita** — trocar entre as abas e ir marcando as etapas do
   preparo para a barra de progresso encher; ao chegar em 100% aparece o toast.
5. **Ajuda** — abrir e fechar as perguntas do acordeão; enviar o formulário com
   menos de 10 caracteres (toast de erro) e depois com um texto válido (barra de
   progresso + toast de sucesso).
6. **Responsividade** — abrir o DevTools (F12), ativar o modo dispositivo e
   mostrar o layout em celular, tablet e desktop.
7. **Código** — abrir `App.jsx` (rotas e provedores), depois um componente
   simples como `BarraDeProgresso.jsx` (só props), um com estado como
   `Abas.jsx` (useState) e um com `useEffect` como `MenuSuspenso.jsx`.
