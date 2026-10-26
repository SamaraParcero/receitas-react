import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuracao do Vite. O host 0.0.0.0 e necessario para o
// preview funcionar dentro do GitHub Codespaces.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
