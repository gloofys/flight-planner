import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 5175,
        proxy: {
            '/api': 'http://localhost:8080',
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react')) return 'vendor-react'
                        if (id.includes('@mui')) return 'vendor-mui'
                        return 'vendor-other'
                    }
                },
            },
        },
    },
})
