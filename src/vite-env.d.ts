/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_PATH: string;
  readonly VITE_API_VERSION: string;
  // 他の環境変数をここに追加できます
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
