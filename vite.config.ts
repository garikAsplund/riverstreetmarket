import { enhancedImages } from '@sveltejs/enhanced-img';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        enhancedImages(),
        tailwindcss(),
        sveltekit({
            compilerOptions: {
                runes: ({ filename }) =>
                    filename.split(/[/\\]/).includes('node_modules') ? undefined : true
            },
            adapter: adapter(),
            csp: {
                mode: 'auto',
                directives: {
                    // Include 'data:' here so Turnstile's script blobs can execute
                    'script-src': ['self', 'data:', 'https://challenges.cloudflare.com'],
                    // Include 'data:' here so Turnstile's telemetry / internal workers can connect
                    'connect-src': ['self', 'data:', 'https://challenges.cloudflare.com', 'https://*.cloudflare.com'],
                    'frame-src': ['self', 'https://challenges.cloudflare.com']
                }
            }
        })
    ]
});