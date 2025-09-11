import { defineConfig } from 'vite';
import { baseConfig } from './vite.config.ts';

// 開発環境用設定
export default defineConfig({
  ...baseConfig,
  server: {
    port: 5173, // 開発サーバーのポート番号
    open: true, // 開発サーバー起動時に自動でブラウザを開く
  },
});
