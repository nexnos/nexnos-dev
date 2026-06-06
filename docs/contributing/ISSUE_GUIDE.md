# Issue作成ガイド

Nexnosプロジェクトにおけるissueの作成・管理方法を定めたガイドです。
Issue作成時に必ず従ってください。

## 目次 <!-- omit in toc -->

- [Issueの種類と役割](#issueの種類と役割)
- [階層構造](#階層構造)
- [テンプレートの使い方](#テンプレートの使い方)
- [Projectsフィールドの設定](#projectsフィールドの設定)
- [Milestoneの紐づけ](#milestoneの紐づけ)
- [Sub-issueの設定](#sub-issueの設定)

## Issueの種類と役割

| テンプレート | 概念 | 役割 | ブランチ |
| --- | --- | --- | :---: |
| 🗺️ Epic | テーマ | 複数のFeature/Taskをまとめる管理用Issue | ❌ |
| ✨ Feature | 機能 | 具体的な機能を実現する管理用Issue | ❌ |
| 🔧 Task | 作業 | 実際の実装・対応を行う実装用Issue | ✅ |
| 🐛 Bug | 不具合 | 不具合の記録・追跡用Issue | ❌ |
| 💡 Enhancement | 改善提案 | アイデア・改善提案のメモ用Issue | ❌ |

> ブランチを持つのはTaskのみ。Epic・Feature・Bug・Enhancementは管理用Issue。

## 階層構造

IssueはSub-issue機能で階層を表現する。

```text
Epic（テーマ）
├── Feature（機能）
│     └── Task（作業）← ブランチ・PR
└── Task（作業）← Featureを挟まない場合
```

### 階層ルール

- EpicはFeatureまたはTaskをSub-issueとして持つ
- FeatureはTaskをSub-issueとして持つ
- TaskはSub-issueを持たない（末端の作業単位）
- BugはTaskをSub-issueとして持つ（修正Taskを分割する場合）
- EnhancementはSub-issueを持たない（実装決定後にEpic/Feature/Taskを新規起票）

## テンプレートの使い方

### 🗺️ Epic

大きな開発テーマを起票する際に使用する。

```text
起票タイミング：開発テーマが決まったとき
タイトル例：[Epic] NexDocスキーマ実装
完了条件：配下のFeature/Taskが全て完了したとき
```

### ✨ Feature

Epicを構成する具体的な機能を起票する際に使用する。

```text
起票タイミング：Epicの配下に機能単位を分割するとき
タイトル例：[Feature] commentsコレクション定義
完了条件：配下のTaskが全て完了したとき
```

### 🔧 Task

実際の実装・対応を起票する際に使用する。

```text
起票タイミング：実装作業が明確になったとき
タイトル例：[Task] commentsコレクションを作成する
完了条件：PRがマージされたとき
```

### 🐛 Bug

不具合を発見したときに使用する。

```text
起票タイミング：不具合を発見したとき
タイトル例：[Bug] エディタが空ドキュメントでクラッシュする
小規模：TaskをSub-issueとして登録して修正
大規模：EpicとTaskに分割して管理
```

### 💡 Enhancement

改善アイデアを記録する際に使用する。

```text
起票タイミング：実装するかどうか未定のアイデアが浮かんだとき
タイトル例：[Enhancement] Markdownショートカットに対応したい
実装決定後：新たにEpic/Feature/Taskを起票してこのIssueをクローズ
```

## Projectsフィールドの設定

Issue作成後に必ず以下のフィールドを設定する。

| フィールド | 選択肢 | 対象 |
| --- | --- | --- |
| `Layer` | Epic / Feature / Task | Epic・Feature・Task・Bug |
| `Priority` | High / Medium / Low | 全Issue |
| `Area` | Frontend / Backend / Editor / Infra / Docs / Config | 全Issue |
| `Status` | 自動でBacklogに設定される | 設定不要 |

> IssueラベルのtypeとProjectsのLayerを必ず一致させること。
> EnhancementはLayerの設定不要。

## Milestoneの紐づけ

Issue作成後に該当するMilestoneを紐づける。

- MilestoneはリリースバージョンをそのままMilestone名とする（例：v1.1.0・v1.2.0）
- Milestone完了のタイミングがマイナーアップデートのリリースタイミングとなる
- 未定の場合は設定しなくてよい
- EnhancementはMilestoneの設定不要
- 次期メジャーバージョン移行予定のMilestone開始時に告知が行われる。以降のIssueはリベースが必要になる可能性がある
- メジャーアップデート期間中は積み残しIssueをnext仕様で見直す。詳細は[ブランチ運用規約](./BRANCH_CONVENTION.md)を参照

## Sub-issueの設定

GitHubのSub-issue機能でIssueの階層を表現する。

### 設定手順

```text
1. 親IssueのページでSub-issuesセクションを開く
2. 「Add sub-issue」をクリック
3. 子IssueのURLまたは番号を入力して追加する
```

### 設定タイミング

- Epic起票時：配下のFeature/TaskをSub-issueとして追加
- Feature起票時：親EpicにこのFeatureをSub-issueとして追加
- Task起票時：親Epic/FeatureにこのTaskをSub-issueとして追加
- Bug起票時：修正TaskをSub-issueとして追加
