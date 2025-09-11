# フロントエンド開発ガイド

## 目次

- [開発環境セットアップ](#開発環境セットアップ)
  - [データベース環境（PostgreSQL）](#データベース環境postgresql)
  - [Visual Studio Code 設定](#visual-studio-code-設定)
  - [推奨拡張機能](#推奨拡張機能)
  - [パッケージのインストール](#パッケージのインストール)
- [開発ワークフロー](#開発ワークフロー)
  - [コマンド一覧](#コマンド一覧)
  - [Lint と品質管理](#lint-と品質管理)
  - [テスト](#テスト)
  - [ストーリーブック](#ストーリーブック)
- [コーディング規約](#コーディング規約)
  - [命名規則](#命名規則)
  - [カスタムフックの命名](#カスタムフックの命名)
  - [命名のベストプラクティス](#命名のベストプラクティス)
  - [リンクの実装](#リンクの実装)
  - [データ編集状態の管理](#データ編集状態の管理)
- [URL 設計](#url-設計)
  - [基本ルール](#基本ルール)
  - [階層構造のある画面](#階層構造のある画面)
- [フォルダ構成](#フォルダ構成)
  - [概要](#概要)
  - [詳細構成](#詳細構成)
  - [モジュール参照パス](#モジュール参照パス)
- [テスト戦略](#テスト戦略)
  - [テストの観点](#テストの観点)
  - [テストファイルの配置](#テストファイルの配置)
- [デバッグ](#デバッグ)

## 開発環境セットアップ

### データベース環境（PostgreSQL）

プロジェクトには、PostgreSQLデータベースをDockerで簡単に構築するための設定が含まれています。

#### 前提条件

- Docker と Docker Compose がインストールされていること

#### データベース環境の起動

```bash
cd docker
docker-compose up -d
```

これにより、PostgreSQLデータベースが起動し、ER図に基づいたテーブルが自動的に作成されます。

#### データベース接続情報

- ホスト: `localhost`
- ポート: `5432`
- データベース名: `sukima_study_english`
- ユーザー名: `postgres`
- パスワード: `postgres`

詳細な情報は `docker/README.md` を参照してください。

### Visual Studio Code 設定

プロジェクトのコード品質と一貫性を保つため、以下の設定をプロジェクトルートの `.vscode/settings.json` に追加してください。

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "eslint.experimental.useFlatConfig": true
}
```

この設定により、ファイル保存時に Prettier によるコードフォーマットが自動的に適用されます。

### 推奨拡張機能

以下の拡張機能をインストールしてください（Ctrl+P でコマンドを実行）：

- `ext install esbenp.prettier-vscode` - コードフォーマット
- `ext install dbaeumer.vscode-eslint` - JavaScript/TypeScript の静的解析
- `ext install stylelint.vscode-stylelint` - CSS の静的解析
- `ext install simonsiefke.svg-preview` - SVG プレビュー

### パッケージのインストール

プロジェクトルートで以下のコマンドを実行し、必要なパッケージをインストールします：

```bash
npm install
```

## 開発ワークフロー

### コマンド一覧

#### 開発・テスト用コマンド

- **`npm run dev`**
  バックエンド API と連携した開発サーバーを起動します。

- **`npm run dev:mock`**
  モックデータを使用した開発サーバーを起動します。バックエンドに依存せず開発できます。

#### 品質管理コマンド

- **`npm run lint`**
  ESLint による静的解析を実行します。

- **`npm run style`**
  Stylelint による CSS の静的解析を実行します。

#### ビルド用コマンド

- **`npm run build`**
  本番環境用のビルドを生成します。TypeScript のコンパイルと Vite によるバンドルが実行されます。

### Lint と品質管理

Pull Request を作成する前に、以下のコマンドを実行してエラーがないことを確認してください：

```bash
npm run lint
npm run style
```

### テスト

テストの実行には以下のコマンドを使用します：

```bash
npm run test
```

### ストーリーブック

コンポーネントカタログを表示するには以下のコマンドを実行します：

```bash
npm run storybook
```

## コーディング規約

### 命名規則

| 対象                   | 命名規則       | 例                    |
| ---------------------- | -------------- | --------------------- |
| フォルダ名             | ケバブケース   | `main-page`           |
| コンポーネントファイル | パスカルケース | `MainPage.tsx`        |
| その他のファイル       | キャメルケース | `mainPage.module.css` |

### ケースの使い分け

#### パスカルケース (PascalCase)

- **コンポーネント**

  ```tsx
  export default function OrderSearchPage() {
    /* ... */
  }
  ```

- **Enum とそのプロパティ**
  ```typescript
  enum FetchActionType {
    Init,
    PreLoading,
    Success,
    Failure,
  }
  ```

#### キャメルケース (camelCase)

- **関数**

  ```typescript
  function getUserName() {
    /* ... */
  }
  ```

- **変数**

  ```typescript
  const userFirstName = '太郎';
  ```

- **オブジェクトプロパティ**

  ```typescript
  const user = {
    firstName: '太郎',
    lastName: '山田',
  };
  ```

- **CSS クラス**

  ```css
  .userName {
    /* ... */
  }
  ```

- **カスタムフック**
  ```typescript
  function useLocalStorage() {
    /* ... */
  }
  ```

#### スクリーミングスネークケース (SCREAMING_SNAKE_CASE)

- **グローバル変数**

  ```typescript
  const BASE_URL = 'https://api.example.com/';
  ```

- **定数**
  ```typescript
  const MAX_RETRY_COUNT = 10;
  ```

### カスタムフックの命名

React の規約に従い、すべてのカスタムフックは `use` プレフィックスで始めてください：

```typescript
useInputForm();
useUserProfile();
```

### 命名のベストプラクティス

- **単語を省略しない**

  - 悪い例: `usr`, `nm`, `sel`
  - 良い例: `user`, `name`, `selected`

- **具体的で説明的な名前を使用する**

  - 悪い例: `myData`, `getData`, `onClick`
  - 良い例: `getSelectedProductInfo()`, `appendOrderToReservedList()`

- **複数形と単数形を適切に使い分ける**
  - 配列やコレクションには複数形を使用する
    ```typescript
    const userList = [];
    ```

### データ編集状態の管理

データ編集状態は明示的に管理し、ユーザーが意図せずにデータを失うことを防止してください。編集中のデータがある場合は、ページ遷移前に確認ダイアログを表示するなどの対策を実装してください。

## URL 設計

### 基本ルール

- 基本フォーマット: `#/リソース名/{リソースID}`
- 一覧表示: `#/リソース名/list`
- 新規作成: `#/リソース名`

### 階層構造のある画面

1. **リスト画面**

   - URL: `#/リソース名/list`

2. **編集画面**

   - URL: `#/リソース1名/{リソース1ID}/.../リソースN名/{リソースNID}`

3. **追加画面（新規データ作成）**

   - URL: `#/リソース名`
   - 作成後は自動的に編集画面に遷移: `#/リソース名/{発番したID}`

4. **階層構造のある編集画面**

   - URL: `#/親リソース名/{親リソースID}/子リソース名/{子リソースID}`

5. **階層構造のある追加画面**
   - URL: `#/親リソース名/{親リソースID}/子リソース名`

## フォルダ構成

### 概要

プロジェクトは「機能ベース」と「共通コンポーネント」の 2 つの主要な構成で整理されています。

### 詳細構成

```
├─ public                    # 静的ファイル
│
└─ src                       # ソースコード
    ├─ main.tsx              # エントリーポイント
    │
    ├─ pages                 # 機能/ページごとのモジュール
    │   ├─ main-page         # メインページ機能
    │   │   ├─ MainPage.tsx              # メインページコンポーネント
    │   │   ├─ mainPage.module.css       # スタイル
    │   │   │
    │   │   ├─ components                # ページ専用コンポーネント
    │   │   │   ├─ FeatureCard.tsx
    │   │   │   └─ featureCard.module.css
    │   │   │
    │   │   ├─ hooks                     # ページ専用フック
    │   │   │   └─ useMainPageData.ts
    │   │   │
    │   │   ├─ utils                     # ページ専用ユーティリティ
    │   │   │   ├─ constants.ts
    │   │   │   ├─ types.ts
    │   │   │   └─ helpers.ts
    │   │   │
    │   │   └─ tests                     # テスト
    │   │       └─ MainPage.test.tsx
    │   │
    │   └─ other-page        # 他のページ機能
    │
    └─ shared                # 共通リソース
        ├─ api               # API関連
        │   ├─ clients       # APIクライアント
        │   └─ hooks         # APIフック
        │
        ├─ assets            # 画像、フォントなど
        │
        ├─ components        # 共通コンポーネント
        │   ├─ Button
        │   │   ├─ Button.tsx
        │   │   ├─ button.module.css
        │   │   ├─ Button.stories.ts
        │   │   └─ Button.test.tsx
        │   │
        │   ├─ Form
        │   └─ Layout
        │
        ├─ hooks             # 共通フック
        │
        ├─ providers         # コンテキストプロバイダー
        │
        ├─ styles            # グローバルスタイル
        │   ├─ variables.css
        │   └─ global.css
        │
        ├─ utils             # 共通ユーティリティ
        │   ├─ date.ts
        │   ├─ validation.ts
        │   └─ formatting.ts
        │
        └─ mock              # モックデータ
```

### モジュール参照パス

`tsconfig.json` にパスエイリアスが設定されているため、以下のルールに従ってモジュールを参照してください：

- **別フォルダのモジュールを参照する場合**：絶対パスを使用

  ```typescript
  // 良い例
  import Button from '@/shared/components/Button/Button';

  // 悪い例
  import Button from '../../shared/components/Button/Button';
  ```

- **同じフォルダ内または子フォルダのモジュールを参照する場合**：相対パスを使用
  ```typescript
  // 良い例
  import { useFormState } from './hooks/useFormState';
  ```

## テスト戦略

### テストの観点

テストは以下の 3 つの観点から実施します：

1. **初期表示テスト**

   - 初期レンダリングの検証
   - API データの表示検証
   - クエリパラメータの処理
   - エラーケースの処理

2. **インタラクションテスト**

   - ユーザー操作の検証
   - フォームバリデーション
   - API 連携（POST/PUT など）
   - エラーハンドリング

3. **パフォーマンステスト**
   - 重い画面のみ実施
   - レンダリング時間の測定
   - データロード時間の測定

### テストファイルの配置

テストファイルはテスト対象のファイルの近くに配置します：

- 共通コンポーネントのテスト: コンポーネントと同じディレクトリに配置
- ページ単位のテスト: ページのディレクトリ内の `tests` フォルダに配置

## デバッグ

デバッグには Visual Studio Code の組み込み機能を使用します。`launch.json` が既に設定されているため、デバッグペインからデバッグを開始し、ブレークポイントを設定できます。
