function IconeBase({ tamanho = 20, children, ...resto }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...resto}
    >
      {children}
    </svg>
  )
}

export function IconeSetaBaixo(props) {
  return (
    <IconeBase {...props}>
      <polyline points="6 9 12 15 18 9" />
    </IconeBase>
  )
}

export function IconeSetaEsquerda(props) {
  return (
    <IconeBase {...props}>
      <polyline points="15 18 9 12 15 6" />
    </IconeBase>
  )
}

export function IconeSetaDireita(props) {
  return (
    <IconeBase {...props}>
      <polyline points="9 18 15 12 9 6" />
    </IconeBase>
  )
}

export function IconeCheck(props) {
  return (
    <IconeBase {...props}>
      <polyline points="20 6 9 17 4 12" />
    </IconeBase>
  )
}

export function IconeFechar(props) {
  return (
    <IconeBase {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </IconeBase>
  )
}

export function IconeInfo(props) {
  return (
    <IconeBase {...props}>
      <circle cx="12" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
      <line x1="12" y1="11" x2="12" y2="17" />
    </IconeBase>
  )
}

export function IconeCoracao({ preenchido = false, ...props }) {
  return (
    <IconeBase fill={preenchido ? 'currentColor' : 'none'} {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </IconeBase>
  )
}

export function IconeRelogio(props) {
  return (
    <IconeBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </IconeBase>
  )
}

export function IconeDificuldade(props) {
  return (
    <IconeBase {...props}>
      <line x1="6" y1="19" x2="6" y2="14" />
      <line x1="12" y1="19" x2="12" y2="10" />
      <line x1="18" y1="19" x2="18" y2="5" />
    </IconeBase>
  )
}

export function IconeEtapas(props) {
  return (
    <IconeBase {...props}>
      <circle cx="5" cy="7" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="5" cy="17" r="1.2" fill="currentColor" stroke="none" />
      <line x1="10" y1="7" x2="19" y2="7" />
      <line x1="10" y1="12" x2="19" y2="12" />
      <line x1="10" y1="17" x2="19" y2="17" />
    </IconeBase>
  )
}

export function IconeChef({ tamanho = 28, ...props }) {
  return (
    <IconeBase tamanho={tamanho} {...props}>
      <path d="M17.5 13.5a4.2 4.2 0 0 0 1.2-8.2 3.7 3.7 0 0 0-6.7-2.4 3.7 3.7 0 0 0-6.7 2.4 4.2 4.2 0 0 0 1.2 8.2z" />
      <path d="M7.5 13.5V19a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5v-5.5" />
      <line x1="7.5" y1="17" x2="16.5" y2="17" />
    </IconeBase>
  )
}
