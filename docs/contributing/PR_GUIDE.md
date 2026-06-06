# PR作成・マージガイド

Nexnosプロジェクトにおけるプルリクエストの作成・マージ手順を定めたガイドです。
PR作成時に必ず従ってください。

## 目次 <!-- omit in toc -->

- [PRの作成](#prの作成)
- [PRタイトルの書き方](#prタイトルの書き方)
- [PRテンプレートの使い方](#prテンプレートの使い方)
- [セルフレビュー](#セルフレビュー)
- [Squash mergeの手順](#squash-mergeの手順)
- [PRマージ後の作業](#prマージ後の作業)

## PRの作成

- PRは必ずPRテンプレートに従って作成する
- PRの作成はClaude Codeによる自動生成を推奨する（手動作成も可）
- マージ先は原則`main`とする
- Milestoneに含まれるIssueのみPRをマージする（Milestone外はドラフトPRとして保留する）
- 1つのTask Issue = 1ブランチ = 1PRに対応させること

## PRタイトルの書き方

PRタイトルはSquash merge時のコミットメッセージタイトルになる。
コミットメッセージ規約に従って英語で記載する。

```text
{gitmoji} {type}({scope}): {subject}
```

### タイトル例

```text
✨ feat(editor): add markdown shortcuts
🐛 fix(cms): resolve null reference in comments collection
🔧 chore(config): update eslint rules
```

> 詳細は[コミットメッセージ規約](./COMMIT_CONVENTION.md)を参照。

## PRテンプレートの使い方

各セクションの記載方針は以下の通り。

| セクション | 言語 | 内容 |
| --- | :---: | --- |
| 🎯 概要 | 日本語 | このPRで何をしたか・なぜしたかを簡潔に |
| 🔧 変更内容 | 日本語 | 主な変更のサマリーをリスト形式で |
| 🔗 関連Issue | - | `closes #XX` の形式で記載 |
| ⚠️ BREAKING CHANGE | 英語 | ある場合のみ記載・ない場合はセクションを削除 |
| 📝 レビューメモ | 日本語 | レビュアーへの補足・確認事項（任意） |
| ✅ セルフレビュー | - | チェックリストを確認 |
| ✍️ Commit message | 英語 | Squash merge時のコミットメッセージbody |

### 関連Issueの記載

```text
closes #47
```

> コミットメッセージでは`closes`を使わない。PR本文でのみ使用する。
> PRマージ時にIssueが自動クローズされる。

## セルフレビュー

PRテンプレートのセルフレビューチェックリストを全て確認してからマージする。

```text
- [ ] コミットメッセージ規約に従っているか
- [ ] 不要なコード・デバッグログが残っていないか
- [ ] テストが必要な変更の場合、テストを追加・更新したか
- [ ] 仕様書との整合性を確認したか
- [ ] BREAKING CHANGEがある場合、Commit messageセクションに記載したか
```

## Squash mergeの手順

1. PRページを開く
2. セルフレビューチェックリストを全て確認する
3. 「Squash and merge」ボタンをクリックする
4. タイトル欄を確認する（PRタイトルが自動入力される）
5. 本文欄を編集する
   - `✍️ Commit message`セクションの内容のみ残す
   - それ以外のセクションは全て削除する
6. 「Confirm squash and merge」をクリックする

### Squash merge後のコミットメッセージ構成

```text
{PRタイトル} (#{PR番号})   ← タイトル（自動）

{Commit messageセクションの内容}   ← body（手動で残す）

refs #{Issue番号}   ← footer
```

## PRマージ後の作業

```text
1. ローカルブランチを削除する
   git branch -d feat/47-comments-collection
2. mainをpullする
   git switch main
   git pull origin main
```

> リモートの作業ブランチはPRマージ時に自動削除される。
> リポジトリ設定の「Automatically delete head branches」を有効にすること。
> 詳細は[リポジトリ設定](../maintenance/REPOSITORY_SETUP.md)を参照。
