# ブランチ運用規約

Nexnosプロジェクトにおけるブランチの命名規則・運用フローを定めた規約です。
ブランチ作成時に必ず従ってください。

Nexnosは **LTS Release Branch Flow** を採用しています。
Release Branch Flowをベースに以下の2点を拡張した独自フローです。

- **LTS保守ブランチ**：リリースブランチをメジャーバージョン単位の長期保守ブランチ（`maint/vX`）として運用する
- **次期メジャーバージョン開発**：`next`ブランチで次期メジャーバージョンをmainと並行して開発する

## 目次 <!-- omit in toc -->

- [ブランチ構成](#ブランチ構成)
- [命名規則](#命名規則)
- [運用ルール](#運用ルール)
- [開発フロー](#開発フロー)
- [リリースフロー](#リリースフロー)
- [patchフロー](#patchフロー)
- [次期メジャーバージョン開発フロー](#次期メジャーバージョン開発フロー)
- [hotfix運用](#hotfix運用)
- [保守ポリシー](#保守ポリシー)

## ブランチ構成

| ブランチ | 種別 | 役割 | 直接push |
| --- | --- | --- | :---: |
| `main` | 永続 | 現行マイナーバージョン開発・常にデプロイ可能 | ❌ |
| `maint/vX` | 永続 | メジャーバージョン単位のLTS保守 | ❌ |
| `next` | 一時 | 次期メジャーバージョン開発（開発期間中のみ存在） | ❌ |
| `{type}/{n}-xxx` | 一時 | 作業ブランチ（Typeは[命名規則](#命名規則)を参照） | - |
| `release/vX.X.X` | 一時 | リリース準備（CHANGELOG更新・バージョン番号更新） | - |
| `hotfix/xxx` | 一時 | 緊急修正（Issue番号なし） | - |

> 一時ブランチはPRマージ後に削除する。`next`は次期メジャーバージョン移行完了後に削除する。

## 命名規則

### 通常ブランチ

```text
{type}/{issue番号}-{kebab-case-description}
```

### hotfixブランチ

```text
hotfix/{kebab-case-description}
```

### Type一覧

| Type | 用途 |
| --- | --- |
| `feat` | 新機能 |
| `fix` | バグ修正・セキュリティ修正 |
| `perf` | パフォーマンス改善 |
| `build` | 依存関係・パッケージ・Dockerfile・デプロイ構成の変更 |
| `revert` | 変更の取り消し |
| `docs` | ドキュメントのみの変更 |
| `refactor` | リファクタリング・コード削除 |
| `style` | フォーマット・スタイル変更（動作に影響しない） |
| `test` | テストの追加・修正 |
| `chore` | 設定・ツール・CI/CD・不要ファイル削除 |
| `ci` | CI/CDの設定変更（現在はGitHub Actions） |

> TypeはコミットメッセージのTypeと一致させること。詳細は[コミットメッセージ規約](./COMMIT_CONVENTION.md)を参照。

### 命名例

```text
feat/47-comments-collection
fix/52-editor-crash-on-empty-doc
chore/12-setup-turborepo
docs/8-update-contributing
hotfix/editor-crash
```

### 命名ルール

- `{issue番号}`はTask IssueのIssue番号を使用する
- `{kebab-case-description}`は英語・小文字・ハイフン区切りで簡潔に

## 運用ルール

- `main`・`maint/vX`・`next`への直接pushは禁止する
- 必ずブランチを作成してPRを経由してマージすること
- 1つのTask Issue = 1ブランチ = 1PRに対応させること
- PRマージ後はブランチを削除すること
- `main`は常にデプロイ可能な状態を維持すること

### Milestone運用ルール

- 同時に実行するMilestoneは1つのみとする
- MilestoneはリリースバージョンをそのままMilestone名とする（例：v1.1.0・v1.2.0）
- Milestone完了のタイミングがマイナーアップデートのリリースタイミングとなる
- Milestone外の開発（作業ブランチでの実装）は自由だが`main`へのPRマージは禁止する
- `main`へのマージ対象はMilestoneに含まれるIssueのみとする。Milestone外のIssueはMilestoneに組み込まれてからマージする
- メジャーアップデート後はmainが大幅に変わるため、Milestone外の開発・進行中ブランチはrebaseによる再点検が必要

## 開発フロー

```text
1. mainから作業ブランチを作成する（Typeはコミット内容に合わせて選択する）
   git switch -c feat/47-comments-collection

2. 実装・コミットする（コミットメッセージ規約に従う）

3. mainへPRを作成する

4. セルフレビューを行う

5. Squash mergeする

6. ブランチを削除する
```

## リリースフロー

Actionsを手動実行してリリース準備を自動化する。詳細は[リリース手順](../maintenance/RELEASE.md)を参照。

```text
1. Actionsを手動実行してバージョン番号を入力する（例：v1.1.0）
2. Actionsがrelease/v1.1.0ブランチを自動作成する
3. ActionsがCHANGELOG.md・バージョン番号を自動更新してPRを作成する
4. PRの内容を確認・編集してmaint/vXにマージする
5. PRマージをトリガーにActionsがタグを自動作成する
6. ActionsがGitHub Releasesにリリースノートを自動公開する
7. release/vX.X.Xブランチが自動削除される
```

## patchフロー

Release Branch Flowの原則に従いmainを先にしてmaint/vXに反映する。

```text
1. mainからhotfix/ブランチを作成する
   git switch -c hotfix/editor-crash main

2. 修正・コミットする（コミットTypeはfix）

3. mainへPRを作成してSquash mergeする

4. maint/vXにcherry-pickしてタグを打つ
   git switch maint/v1
   git cherry-pick {fix-sha}
   git tag v1.2.1
   git push origin maint/v1 --tags

5. 他のmaint/vXに影響がある場合はcherry-pickする
   git switch maint/v2
   git cherry-pick {fix-sha}
   git tag v2.0.1
```

## 次期メジャーバージョン開発フロー

`next`ブランチは次期メジャーバージョン開発のための一時ブランチ。
移行完了後に削除する。

### フェーズ1：告知

次期メジャーバージョン移行予定のMilestone（例：v1.3.0）開始時に告知する。

```text
「v1.3.0完了後にv2.0.0メジャーアップデートを予定しています。
 以降のmainへのPRはリベースが必要になる可能性があります。」
```

以降の開発者はリベースの手間が発生する可能性を認識した上で開発を継続する。

### フェーズ2：並行開発

```text
# nextブランチを作成する（mainから分岐）
git switch -c next main

# nextに対して機能開発を行う
git switch -c feat/101-new-schema next
（実装・PR・Squash merge）

# mainの変更を週次でnextに取り込む
git switch next
git merge main
```

### フェーズ3：メジャーアップデート期間

現行Milestone（例：v1.3.0）完了後にメジャーアップデート期間を設ける。

```text
【制約】
  ❌ mainへのPRマージ停止
  ✅ 進行中ブランチの開発は継続可能（mainへのマージは禁止）

【リリース作業】
  1. nextをmainにマージする
  2. v2.0.0をリリースする（maint/v2を作成・タグを打つ）
  3. nextブランチを削除する

【設計・再設計作業】
  4. 積み残しIssueをnext仕様で見直す
     → 既存Issueの仕様書を更新する
     → 必要に応じてIssueを作り直す
     → 優先度・Areaを再設定する
  5. 進行中ブランチをrebaseして再点検する
     → 破壊的変更への対応を確認する
     → API・型定義・依存関係の変更を確認する

【次期Milestone準備】
  6. v2.1.0Milestoneを設計する
  7. 積み残しIssueをv2.1.0Milestoneに組み込む
  8. 開発再開を宣言する（mainへのPRマージ再開）
```

## hotfix運用

本番障害など緊急対応が必要な場合のみ、Issue起票なしでhotfix/ブランチを使用する。

### ブランチTypeとコミットTypeの関係

```text
ブランチ名:         hotfix/editor-crash
コミットメッセージ: 🐛 fix(editor): resolve null reference on empty doc
```

- **ブランチType**（`hotfix`）→ 緊急修正であることを示す識別子
- **コミットType**（`fix`）→ 変更内容の種別・リリースノートに掲載される

### Actionsへの影響と対応策

| 影響 | 対応策 |
| --- | --- |
| Issue番号の自動抽出失敗 | ActionsにIssue番号なしの場合スキップ処理を追加 |
| PRのcloses自動設定なし | PR本文に手動で記載、または事後にIssueを起票してcloses #XXを追記 |
| Projectsへの自動追加なし | 事後にIssueを起票してProjectsに手動追加 |

## 保守ポリシー

| 項目 | 内容 |
| --- | --- |
| 保守単位 | メジャーバージョン単位（maint/v1・maint/v2等） |
| マイナーサポート | 常に最新マイナーバージョンのみ |
| バージョン識別 | Tagで管理（ブランチは増やさない） |
| サポート終了 | maint/vXブランチを削除する |
| LTS期間 | 未定（OSS公開時に明文化する） |

### バージョニングルール

- BREAKING CHANGEはメジャーアップデートに含めること
- マイナーアップデートは後方互換性を維持すること
- patchはバグ修正のみとし機能追加は含めないこと

> 詳細は[リリース手順](../maintenance/RELEASE.md)を参照。
