# OSS公開前チェックリスト

OSS公開前に見直すべき事項をまとめたチェックリストです。
公開前に必ず確認してください。随時追加・編集してください。

## 目次 <!-- omit in toc -->

- [ブランチ戦略](#ブランチ戦略)
- [コミット・PR](#コミットpr)
- [Issue管理](#issue管理)
- [リリース](#リリース)
- [セキュリティ](#セキュリティ)
- [ドキュメント](#ドキュメント)

## ブランチ戦略

- [ ] リリース準備Actionsワークフロー（release-prep.yml）をOSS向けに見直す
- [ ] next/ブランチのmain取り込みフローを正式化する
- [ ] コントリビューター向けのブランチ運用ルールを整備する

## コミット・PR

- [ ] PRレビュープロセスを整備する（Required reviewers等）
- [ ] コミットメッセージの自動検証（commitlint等）を導入する
- [ ] PRのSquash merge以外のマージ戦略を再検討する
- [ ] 製品リポジトリへの直接PRを受け付けない方針をCONTRIBUTING.mdとREADMEに明記する（コントリビューションの受け入れ先は開発リポジトリのみ）

## Issue管理

- [ ] Issue管理方針を整備する（needs triageラベル・Discussionsの導入検討）
- [ ] ユーザー向けの窓口を整備する（不具合報告・改善提案・質問の受付方法を検討する。製品リポジトリのIssue・GitHub Discussionsの活用を含む）
- [ ] IssueテンプレートをOSS向けに英語化する
- [ ] CONTRIBUTINGをOSS向けに英語化する
- [ ] コントリビューター向けのIssueラベルを追加する（`good first issue`・`help wanted`等）

## リリース

- [ ] サポートポリシー（LTSの期間等）を明文化する
- [ ] hotfixの対象バージョン特定フローを整備する（特定の旧バージョンのみ・サポート中の全バージョン・最新バージョンのみ等のケースに対応）
- [ ] GitHub Apps（nexnos-bot）をPATからGitHub Appsに移行する（現在はFine-grained PATで代用）
- [ ] GitHub Releasesの自動生成フローを実装する
- [ ] 製品リポジトリへの同期をPR経由（C案）から直接push（B案）に切り替えるタイミングを判断する
- [ ] rsyncの除外ファイル設定を本番向けに整備する（.github/・.gitignore等）

## セキュリティ

- [x] SECURITY.mdを作成する（脆弱性報告窓口）
- [ ] Dependabotを有効化する
- [ ] Protected branch rulesを設定する（Teamプランに移行後）

## ドキュメント

- [ ] READMEを英語で充実させる
- [ ] docs/を英語化する
- [ ] ライセンスを確定する
