/// <reference types='vitest' />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/ui-components',

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    root: __dirname,
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    deps: {
      // Required for vitest-canvas-mock
      inline: ['vitest-canvas-mock'],
    },
    setupFiles: ['./test-setup.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/libs/ui-components',
      provider: 'v8',
    },
  },
});
