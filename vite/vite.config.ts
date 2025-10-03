import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// 共通設定を名前付きエクスポートとして定義
export const baseConfig = defineConfig({
  plugins: [react()],
  assetsInclude: ['**/assets/*.*'],
  envDir: 'env',
  resolve: {
    alias: {
      '@': '/src',
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/shared/test/setup.ts',
    includeSource: ['src/**/*.{tsx,ts}'],
  },

  define: {
    'import.meta.vitest': 'undefined',
  },
});
