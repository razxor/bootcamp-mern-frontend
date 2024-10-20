import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // optimizeDeps: {
  //   include: ['react-helmet-async']
  // }
  resolve: {
    alias: {
      // Add this to avoid case-sensitive issues or missing deps
      'react-helmet-async': 'react-helmet-async',
    },
  },
})
