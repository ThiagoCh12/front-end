import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base precisa bater com o caminho onde o Pages serve o build:
// https://thiagoch12.github.io/front-end/termo/
export default defineConfig({
  base: '/front-end/termo/',
  plugins: [react()],
})
