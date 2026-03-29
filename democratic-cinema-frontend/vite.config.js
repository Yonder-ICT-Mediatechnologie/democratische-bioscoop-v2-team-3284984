import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for a React + Tailwind project.  The react plugin
// provides support for automatic JSX transformation and hot module
// replacement during development.
export default defineConfig({
  plugins: [react()],
});