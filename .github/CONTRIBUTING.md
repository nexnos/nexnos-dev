# 開発参加規程

Nexnosプロジェクトへの参加・貢献に関する規程です。
開発に参加する前に必ず読んでください。

## 目次 <!-- omit in toc -->

- [開発フローの概要](#開発フローの概要)
- [ドキュメント構成](#ドキュメント構成)
- [ドキュメント一覧](#ドキュメント一覧)
- [質問・議論](#質問議論)

## 開発フローの概要

仕様書駆動・AI支援開発を採用しています。
以下のフローに従って開発を進めてください。

| ステップ | 内容 | 区分 |
| --- | --- | :---: |
| [1. 仕様書作成](../docs/contributing/DEVELOPMENT.md) | 実装前に仕様書（`spec.md`）を作成する | 必須 |
| [2. Issue設計](../docs/contributing/ISSUE_GUIDE.md) | Epic / Feature / Task の階層でIssueを設計する | 必須 |
| [3. Issue起票](../docs/contributing/ISSUE_GUIDE.md) | Claude + GitHub MCPによる自動起票を推奨する | 推奨 |
| [4. ブランチ作成](../docs/contributing/BRANCH_CONVENTION.md) | Task IssueのIssue番号をもとにブランチを作成する | 必須 |
| [5. 実装・コミット](../docs/contributing/COMMIT_CONVENTION.md) | Claude Codeを推奨。コミットメッセージ規約に従うこと | 必須/推奨 |
| [6. PR作成](../docs/contributing/PR_GUIDE.md) | Claude Codeを推奨。PRテンプレートに従うこと | 必須/推奨 |
| [7. セルフレビュー](../docs/contributing/PR_GUIDE.md) | PRテンプレートのチェックリストを確認する | 必須 |
| [8. Squash merge](../docs/contributing/PR_GUIDE.md) | Commit messageセクションのみ残してマージする | 必須 |

> 次期メジャーバージョン開発中は上記フローに加えてメジャーアップデート期間が発生します。詳細は[ブランチ運用規約](../docs/contributing/BRANCH_CONVENTION.md)を参照してください。

### 必須・推奨の定義

- **必須**：プロジェクトの品質・一貫性を保つために必ず従うこと
- **推奨**：Claude Codeを使った自動化を推奨するが、手動でも可

## ドキュメント構成

```text
nexnos-dev/
├── .github/
│   ├── ISSUE_TEMPLATE/               # Issueテンプレート
│   │   ├── epic.yml
│   │   ├── feature.yml
│   │   ├── task.yml
│   │   ├── bug.yml
│   │   ├── enhancement.yml
│   │   └── config.yml
│   ├── workflows/                    # GitHub Actionsワークフロー
│   ├── PULL_REQUEST_TEMPLATE.md      # PRテンプレート
│   └── CONTRIBUTING.md               # ★ ハブドキュメント（このファイル）
└── docs/
    ├── contributing/                 # 開発者向けドキュメント
    │   ├── BRANCH_CONVENTION.md      # ブランチ運用規約
    │   ├── COMMIT_CONVENTION.md      # コミットメッセージ規約
    │   ├── ISSUE_GUIDE.md            # Issue作成ガイド
    │   ├── PR_GUIDE.md               # PR作成・マージガイド
    │   ├── DEVELOPMENT.md            # 開発環境セットアップ（作成予定）
    │   └── CODE_STYLE.md             # コードスタイル規約（作成予定）
    └── maintenance/                  # 管理者向けドキュメント
        ├── GITHUB_ACTIONS.md         # ワークフロー・自動化の管理
        ├── PROJECT_MANAGEMENT.md     # Projects・Milestone・ラベルの運用（作成予定）
        ├── RELEASE.md                # リリースフロー・リリースノート生成
        ├── REPOSITORY_SETUP.md       # リポジトリの初期設定・管理（作成予定）
        └── OSS_CHECKLIST.md          # OSS公開前チェックリスト
```

## ドキュメント一覧

### 開発者向け

| ドキュメント | 内容 |
| --- | --- |
| [ブランチ運用規約](../docs/contributing/BRANCH_CONVENTION.md) | ブランチの命名規則・運用フロー |
| [コミットメッセージ規約](../docs/contributing/COMMIT_CONVENTION.md) | コミットメッセージの書き方 |
| [Issue作成ガイド](../docs/contributing/ISSUE_GUIDE.md) | Issueテンプレートの使い方・階層規約 |
| [PR作成・マージガイド](../docs/contributing/PR_GUIDE.md) | PRの作成・Squash mergeの手順 |
| 開発環境セットアップ | 必要なツール・環境構築手順（作成予定） |
| コードスタイル規約 | コードスタイル・テスト方針（作成予定） |

### 管理者向け

| ドキュメント | 内容 |
| --- | --- |
| [GitHub Actions管理](../docs/maintenance/GITHUB_ACTIONS.md) | ワークフロー・自動化の管理 |
| [リリース手順](../docs/maintenance/RELEASE.md) | リリースフロー・リリースノート生成 |
| プロジェクト管理 | Projects・Milestone・ラベルの運用（作成予定） |
| リポジトリ設定 | リポジトリの初期設定・管理（作成予定） |
| [OSS公開前チェックリスト](../docs/maintenance/OSS_CHECKLIST.md) | OSS公開前に確認すべき事項 |

## 質問・議論

質問・提案はIssueを作成してください。

- 機能提案・改善アイデア → [💡 Enhancement テンプレート](../../issues/new?template=enhancement.yml)を使用する
- 不具合報告 → [🐛 Bug テンプレート](../../issues/new?template=bug.yml)を使用する
