/**
 * COMPONENTE 3 - BARRA DE PROGRESSO
 *
 * Mostra visualmente o quanto de uma tarefa já foi concluído.
 * Recebe o valor (0 a 100) por props e ajusta a largura do preenchimento.
 *
 * Props recebidas:
 *   valor        = número de 0 a 100
 *   rotulo       = texto exibido acima da barra (opcional)
 *   mostrarValor = exibe a porcentagem ao lado do rótulo (padrão: true)
 */
function BarraDeProgresso({ valor, rotulo, mostrarValor = true }) {
  // Proteção: garante que o valor fique sempre entre 0 e 100.
  const valorSeguro = Math.min(100, Math.max(0, Math.round(valor)))

  // A barra muda de cor conforme o progresso avança.
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

      {/* role="progressbar" + aria-valuenow fazem o leitor de tela
          anunciar o progresso corretamente */}
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
