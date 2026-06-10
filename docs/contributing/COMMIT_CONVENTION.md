# コミットメッセージ規約

Nexnosプロジェクトにおけるコミットメッセージの書き方を定めた規約です。
コミット作成時・レビュー時に必ず従ってください。

## 目次 <!-- omit in toc -->

- [フォーマット](#フォーマット)
- [Type・Gitmoji対応表](#typegitmoji対応表)
- [Scope](#scope)
- [Subject](#subject)
- [Body](#body)
- [Footer](#footer)
- [記述例](#記述例)

## フォーマット

```text
{gitmoji} {type}({scope}): {subject}

{body}

refs #{issue番号}

BREAKING CHANGE: {説明}
  {詳細}
```

### 必須・任意

| 要素 | 必須・任意 |
| --- | --- |
| `{gitmoji}` | ✅ 必須 |
| `{type}` | ✅ 必須 |
| `({scope})` | 🔺 任意 |
| `{subject}` | ✅ 必須 |
| `{body}` | 🔺 任意 |
| `refs #{issue番号}` | 🔺 任意（hotfixはIssueなしのため省略可） |
| `BREAKING CHANGE` | 🔺 任意（破壊的変更がある場合のみ） |

### BREAKING CHANGEの表記について

BREAKING CHANGEはフッターの `BREAKING CHANGE:` のみで表現する。
コミットタイトルへの `!` 付与は**禁止**する。

```text
✅ ✨ feat(core): remove legacy adapter API
❌ ✨ feat(core)!: remove legacy adapter API
```

## Type・Gitmoji対応表

| Gitmoji | Type | 用途 | リリースノート |
| :---: | --- | --- | --- |
| ✨ | `feat` | 新機能 | ✅ 掲載 |
| 🐛 | `fix` | バグ修正・セキュリティ修正 | ✅ 掲載 |
| ⚡️ | `perf` | パフォーマンス改善 | ✅ 掲載 |
| 📦 | `build` | 依存関係・パッケージ・Dockerfile・デプロイ構成の変更 | ✅ 掲載 |
| ⏪ | `revert` | 変更の取り消し | ✅ 掲載 |
| 📝 | `docs` | ドキュメントのみの変更 | 🔺 任意 |
| ♻️ | `refactor` | リファクタリング・コード削除 | 🔺 任意 |
| 💄 | `style` | フォーマット・スタイル変更（動作に影響しない） | ❌ 除外 |
| ✅ | `test` | テストの追加・修正 | ❌ 除外 |
| 🔧 | `chore` | 設定・ツール・CI/CD・不要ファイル削除 | ❌ 除外 |
| 👷 | `ci` | CI/CDの設定変更（現在はGitHub Actions） | ❌ 除外 |

> `build`と`chore`の判断基準：リリース成果物や依存関係に影響するなら`build`、それ以外の内部作業なら`chore`。

## Scope

変更したパッケージ・領域を示す。**任意**。

| Scope | 対象 |
| --- | --- |
| `editor` | Plate・EditorAdapter |
| `cms` | Payload CMS・コレクション・API |
| `theme` | Astroテーマ・UI・スタイル |
| `infra` | Docker・デプロイ構成 |
| `deps` | 依存関係の更新 |
| `docs` | 仕様書・README |
| `config` | モノレポ設定・Turborepo |

## Subject

- **命令形**で書く
- **英語**で書く
- 短く簡潔に
- 末尾にピリオドをつけない

### よく使う動詞

| 動詞 | 用途 |
| --- | --- |
| `add` | 新しいファイル・機能・依存関係を追加 |
| `remove` | ファイル・機能・依存関係を削除 |
| `update` | 既存のものを更新・変更 |
| `fix` | バグ・誤り・問題を修正 |
| `refactor` | 動作を変えずにコードを整理 |
| `improve` | 品質・パフォーマンスを改善 |
| `rename` | ファイル・変数・関数を改名 |
| `move` | ファイル・コードを移動 |
| `implement` | 機能・インターフェースを実装 |
| `migrate` | バージョン・構成を移行 |

```text
✅ add markdown shortcuts to editor
✅ fix null check in PlateAdapter
❌ added markdown shortcuts
❌ fixed the null check issue in PlateAdapter.
```

## Body

**任意**。理由が自明な場合は省略してよい。

- **なぜ**変更したかを書く（何をしたかはdiffで分かる）
- Squash mergeのコミットには「なぜ」＋変更サマリーも追加する

### 通常のコミット（なぜのみ）

```text
✨ feat(editor): add markdown shortcuts

Markdownに慣れたユーザーがエディタでも同じショートカットを使えるようにするため。

refs #47
```

### Squash mergeのコミット（なぜ＋変更サマリー）

```text
✨ feat(editor): add markdown shortcuts

Markdownに慣れたユーザーがエディタでも同じショートカットを使えるようにするため。

- @udecode/plate-markdown プラグインを追加
- **bold** や # heading のリアルタイム変換に対応
- Markdownショートカットのユニットテストを追加

refs #47
```

## Footer

### refs

**任意**。関連Issueへの参照を記載する。hotfixはIssueなしのため省略可。

```text
refs #47
```

> コミットメッセージでは`closes`を使わない。`closes`はPR本文でのみ使用する。

### BREAKING CHANGE

**任意**。破壊的変更がある場合のみ記載する。`refs`の後に記載する。
詳細は2スペースインデントで複数行に書く。

```text
✨ feat(core): remove legacy adapter API

旧アダプターはNexDocスキーマとの混同を招くため削除する。

refs #12

BREAKING CHANGE: LegacyAdapterを削除した。
  移行方法：NexDocAdapterに置き換えること。
  変更前：new LegacyAdapter(config)
  変更後：new NexDocAdapter({ schema: config.schema })
  参照：docs/migration/v2.md
```

## 記述例

### 通常のコミット

```text
✨ feat(editor): add markdown shortcuts

Markdownに慣れたユーザーがエディタでも同じショートカットを使えるようにするため。

refs #47
```

### Squash mergeのコミット

```text
🐛 fix(cms): resolve null reference in comments collection

空のコメント本文がPOST /api/commentsでサーバークラッシュを引き起こしていたため。

- CommentsCollection.beforeChangeフックにnullチェックを追加
- bodyフィールドのバリデーションを追加
- 空bodyのリグレッションテストを追加

refs #52
```

### Bodyを省略するケース

```text
🔧 chore(config): update eslint rules
```

### Scopeを省略するケース

```text
🐛 fix: resolve null reference on empty doc
```

### BREAKING CHANGEあり

```text
📦 build(deps): upgrade payload to v3

v3はv2と互換性のない新しい設定フォーマットを採用しているため。

refs #30

BREAKING CHANGE: payload.config.tsをv3形式に更新する必要がある。
  移行方法：`npx payload migrate-config`を実行して自動変換する。
  参照：docs/migration/payload-v3.md
```
