import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		allowedHosts: ['*', '3e36-197-210-54-112.ngrok-free.app'],
		cors: true,
	},
});
