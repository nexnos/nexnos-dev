# リリース手順

Nexnosプロジェクトにおけるリリースフローと管理方針を定めたドキュメントです。
リリース作業時に必ず従ってください。

## 目次 <!-- omit in toc -->

- [バージョニングポリシー](#バージョニングポリシー)
- [リリースフロー](#リリースフロー)
- [CHANGELOG・リリースノートの自動化](#changelogリリースノートの自動化)

## バージョニングポリシー

Semantic Versioning（`v{major}.{minor}.{patch}`）に従う。

| バージョン | 更新タイミング | 例 |
| --- | --- | --- |
| `major` | BREAKING CHANGEを含むリリース | `v1.x.x` → `v2.0.0` |
| `minor` | 後方互換性のある機能追加 | `v1.0.x` → `v1.1.0` |
| `patch` | 後方互換性のあるバグ修正（hotfixのみ） | `v1.0.0` → `v1.0.1` |

### 重要なルール

- **BREAKING CHANGEはメジャーアップデートに含めること**
- **マイナーアップデートは後方互換性を維持すること**
- **patchはhotfixによるバグ修正のみとし機能追加は含めないこと**
- **hotfixは即時パッチリリースとし、ため込まないこと**

### バージョン管理方法

- バージョンはTagで管理する（ブランチは増やさない）
- Tagは`maint/vX`ブランチ上に打つ
- 詳細は[ブランチ運用規約](../contributing/BRANCH_CONVENTION.md)を参照

### リリースブランチの起点

| bump | 起点 | 理由 |
| --- | --- | --- |
| `major` | `main` | next→mainマージ後の全変更を含む |
| `minor` | `main` | Milestoneルールにより未リリースコードはmainに入らない |
| `patch` | `maint/vX` | hotfix cherry-pick済みのmaint/vXからのみ作成することでhotfixだけを含むリリースを保証 |

### maintブランチの役割

`maint/vX` はそのメジャーバージョン系の最新リリース状態を常に反映する。

| bump | maintの更新方法 |
| --- | --- |
| `major` | 新しい `maint/vX` をmainから作成する |
| `minor` | 既存の `maint/vX` をmainにfast-forwardする |
| `patch` | hotfixコミットをmaintにcherry-pickする |

> patchリリース後、`maint/vX` ブランチに「X commits ahead/behind main」と表示されるが正常な状態。`maint/vX` → `main` へのPRは作成しないこと。

## リリースフロー

リリース作業はGitHub Actionsで自動化する。

### ワークフロー構成

```text
.github/
├── workflows/
│   └── release.yml              ← リリースの唯一の窓口（手動・自動両対応）
└── actions/
    ├── release-prep/            ← フェーズ1共通処理（minor/major/patch）
    ├── release-core/            ← 本体リリース処理
    ├── release-plugin/          ← プラグインリリース処理
    └── release-theme/           ← テーマリリース処理
```

`release.yml` はトリガーを判断して適切なアクションを呼び出す窓口として機能する。

### トリガーの種類

| トリガー | 種別 | 処理 |
| --- | --- | --- |
| `workflow_dispatch` | 手動実行 | minor/majorリリースのフェーズ1 |
| `hotfix/`ブランチのPRがmainにマージ | 自動 | patchリリースのフェーズ1（自動起動） |
| `release/nexnos-`ブランチのPRがmainまたはmaint/**にマージ | 自動 | フェーズ2：本体リリース |
| `release/plugin-`ブランチのPRがmainにマージ | 自動 | フェーズ2：プラグインリリース |
| `release/theme-`ブランチのPRがmainにマージ | 自動 | フェーズ2：テーマリリース |

### マイナーリリース（v1.0.x → v1.1.0）

#### フェーズ1：リリース準備（手動トリガー）

```text
1. release.yml を手動実行する
   - パッケージを選択する（nexnos / plugin/seo / theme/default）
   - アップデート種別を選択する（minor）
   - 製品リポジトリをPR経由で同期するか選択する（デフォルト：ON）
2. Actionsが自動で以下を実行する：
   a. mainからrelease/ブランチを作成する
   b. pnpm changeset version でバージョン番号を自動採番する
   c. CHANGELOG.mdを自動更新する
   d. package.jsonのバージョン番号を自動更新する
   e. 変更をコミットしてmainへのPRを自動作成する
3. PRの内容（変更内容・バージョン）を確認する
4. PRをmainにマージする
```

#### フェーズ2：リリース（PRマージ自動トリガー）

```text
release/ブランチのPRがmainにマージされると自動で以下を実行する：
  1. maint/vXをmainにfast-forwardする
  2. maint/vX上にタグを作成する（例：nexnos@1.1.0）
  3. 製品リポジトリへソースコードを同期する
     - PR経由（デフォルト）またはmainへ直接push
  4. 製品リポジトリにGitHub Releasesをドラフト状態で作成する
```

PR経由同期の場合、以下の順序で作業を行う：

```text
① Actionsが製品リポジトリへのPRとGitHub Releasesドラフトを自動作成する
② 製品リポジトリのPRの内容を確認してmainにマージする
③ GitHub Releasesドラフトの内容を確認して公開する
   → 公開時点で製品リポジトリのmainにタグが作成される
```

> **注意：** ②（製品リポジトリのPRマージ）の前に③（ドラフト公開）をしてはいけない。
> ドラフト公開時点のmainにタグが作成されるため、PRマージ前に公開すると旧バージョンのmainにタグが打たれてしまう。

### パッチリリース（v1.0.0 → v1.0.1）

hotfix専用のリリースフローで、即時リリースを原則とする。

#### フェーズ1：リリース準備（hotfix PRマージ自動トリガー）

```text
1. mainからhotfix/ブランチを作成して修正する
2. changesetファイルを作成する（Claude Codeが自動生成）
3. PRをmainにマージする
4. Actionsが自動で以下を実行する：
   a. hotfixコミットをmaint/vXにcherry-pickする
   b. maint/vXからrelease/ブランチを作成する
   c. pnpm changeset version でバージョン番号を自動採番する
   d. CHANGELOG.mdを自動更新する
   e. package.jsonのバージョン番号を自動更新する
   f. 変更をコミットしてmaint/vXへのPRを自動作成する
5. PRの内容を確認してmaint/vXにマージする
```

#### フェーズ2：リリース（PRマージ自動トリガー）

```text
release/ブランチのPRがmaint/vXにマージされると自動で以下を実行する：
  1. リリース作業コミット（CHANGELOG・バージョン更新）をmainにもcherry-pickする
  2. maint/vX上にタグを作成する（例：nexnos@1.0.1）
  3. 製品リポジトリへソースコードを同期する
  4. 製品リポジトリにGitHub Releasesをドラフト状態で作成する
```

> patchは製品リポジトリへの直接pushを推奨する。PR経由の場合はマイナーリリースと同様の順序に従うこと。

> ため込まず即時リリースを原則とする。複数hotfixが発生した場合も個別にパッチリリースを行う。

### メジャーリリース（v1.x.x → v2.0.0）

```text
1. メジャーアップデート期間の作業を完了する（BRANCH_CONVENTION.md参照）
2. nextをmainにマージする
3. release.yml を手動実行する
   - パッケージを選択する
   - アップデート種別：major
4. PRの内容を確認・編集してmainにマージする
5. フェーズ2が自動実行される
   - 新しい maint/v2 がmainから作成される
   - maint/v2 上にタグ nexnos@2.0.0 が作成される
   - 製品リポジトリへ同期される
6. nextブランチを削除する
7. 旧maint/v1のサポート終了を告知する（OSS公開後）
```

## CHANGELOG・リリースノートの自動化

Changesetsを採用する。

### 採用方式の選定理由

| 方式 | 採用 | 理由 |
| --- | :---: | --- |
| Changesets | ✅ | モノレポ対応・パッケージ別CHANGELOG・Claude Codeとの相性良好 |
| PRタイトル収集（GitHub Actions） | ❌ | モノレポでのパッケージ別フィルタリングが複雑 |
| semantic-release | ❌ | LTS Release Branch Flowとの相性が悪い |

### changesetファイルの作成

コード変更のたびにchangesetファイルを作成する。Claude Codeが自動生成する。

summaryにはコミットタイトルをそのまま記載する（絵文字・Typeを含む）。

```markdown
---
"nexnos": minor
---

✨ feat(editor): add markdown shortcuts to editor
```

### CHANGELOG.mdのフォーマット

```markdown
## 1.1.0

### Minor Changes

- ✨ feat(editor): add markdown shortcuts to editor ([#47](https://github.com/nexnos/nexnos-dev/pull/47))

### Patch Changes

- 🐛 fix(cms): resolve null reference in comments collection ([#52](https://github.com/nexnos/nexnos-dev/pull/52))
```

### Type別の掲載ルール

changesetのsummaryに記載したTypeでセクションを判断する。

| Type | リリースノート | セクション名 |
| --- | :---: | --- |
| `feat` | ✅ 掲載 | ✨ Added |
| `fix` | ✅ 掲載 | 🐛 Fixed |
| `perf` | ✅ 掲載 | ⚡️ Performance |
| `build` | ✅ 掲載 | 📦 Build |
| `revert` | ✅ 掲載 | ⏪ Reverted |
| `docs` | 🔺 任意 | 📝 Docs |
| `refactor` | 🔺 任意 | ♻️ Refactored |
| `style` | ❌ 除外 | - |
| `test` | ❌ 除外 | - |
| `chore` | ❌ 除外 | - |
| `ci` | ❌ 除外 | - |
