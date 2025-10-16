import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If repo is <user>.github.io -> base: '/'.
// If repo is any other name -> base: '/<repo>/'
export default defineConfig({
    base: '/',
    plugins: [react()],
})
