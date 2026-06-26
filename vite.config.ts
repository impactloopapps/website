import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project page lives at https://impactloopapps.github.io/website/
export default defineConfig({
  base: '/website/',
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: [
            '@react-three/fiber',
            '@react-three/drei',
            '@react-three/postprocessing',
            'postprocessing',
          ],
          gsap: ['gsap'],
        },
      },
    },
  },
})
