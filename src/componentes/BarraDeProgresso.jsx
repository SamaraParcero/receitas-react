function BarraDeProgresso({ valor, rotulo, mostrarValor = true }) {
  const valorSeguro = Math.min(100, Math.max(0, Math.round(valor)))

  let cor = 'barra--inicio'
  if (valorSeguro === 100) cor = 'barra--completo'
  else if (valorSeguro >= 50) cor = 'barra--meio'

  return (
    <div className="barra">
      {rotulo && (
        <div className="barra__topo">
          <span className="barra__rotulo">{rotulo}</span>
          {mostrarValor && <span className="barra__valor">{valorSeguro}%</span>}
        </div>
      )}

      <div
        className="barra__trilha"
        role="progressbar"
        aria-valuenow={valorSeguro}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={rotulo || 'Progresso'}
      >
        <div
          className={`barra__preenchimento ${cor}`}
          style={{ width: `${valorSeguro}%` }}
        />
      </div>
    </div>
  )
}

export default BarraDeProgresso
