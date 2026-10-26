import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

/**
 * PONTO DE ENTRADA DA APLICAÇÃO
 *
 * Aqui o React "monta" o componente App dentro da div#root do index.html.
 * O BrowserRouter precisa envolver o App para que o React Router
 * funcione em qualquer componente da árvore.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
