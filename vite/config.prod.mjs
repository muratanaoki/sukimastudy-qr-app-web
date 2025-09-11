import { defineConfig } from 'vite';
import { baseConfig } from './vite.config.ts';

// カスタムプラグイン: ビルド時のメッセージを表示
const buildMessages = () => ({
  name: 'build-messages',
  buildStart() {
    console.log(`🚀 Starting production build...`);
  },
  buildEnd() {
    console.log(`✨ Production build finished successfully!`);
  },
});

// 本番環境用設定
export default defineConfig({
  ...baseConfig,
  plugins: [buildMessages()],
  logLevel: 'warning', // 警告以上のログのみ表示
  build: {
    target: 'es2015', // 対象のブラウザ互換性
    cssCodeSplit: true, // CSSを複数のファイルに分割
    reportCompressedSize: false, // 圧縮サイズのレポートを無効化（ビルド速度向上）
    chunkSizeWarningLimit: 1000, // チャンクサイズ警告の閾値を上げる
    rollupOptions: {
      output: {
        // コード分割の最適化
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // 必要に応じて他のチャンクを追加
        },
      },
    },
    minify: 'terser', // コードを圧縮
    terserOptions: {
      compress: {
        passes: 2, // 圧縮処理を2回実行
        drop_console: true, // console.*の呼び出しを削除
        drop_debugger: true, // debugger文を削除
      },
      mangle: {
        safari10: true, // Safari 10互換性を確保
      },
      format: {
        comments: false, // コメントを削除
      },
    },
    // ソースマップの生成（必要に応じてコメントアウト解除）
    // sourcemap: true,
  },
});
