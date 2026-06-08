// .changeset/formatter.js
// Type別セクション分類・Issueリンク付与のカスタムフォーマッター
// summaryの末尾に (#Issue番号) を記載することでIssueリンクを自動生成する
// 例）✨ feat(cms): add comments collection (#47)
// hotfixなどIssueなしの場合はリンクなしでそのまま出力される

const SECTIONS = [
  { type: "feat",     title: "### ✨ Added" },
  { type: "fix",      title: "### 🐛 Fixed" },
  { type: "perf",     title: "### ⚡️ Performance" },
  { type: "build",    title: "### 📦 Build" },
  { type: "revert",   title: "### ⏪ Reverted" },
  { type: "docs",     title: "### 📝 Docs" },
  { type: "refactor", title: "### ♻️ Refactored" },
];

const EXCLUDE_TYPES = ["style", "test", "chore", "ci"];

/**
 * summaryからTypeを抽出する
 * 例）"✨ feat(editor): add markdown shortcuts" → "feat"
 */
function extractType(summary) {
  const match = summary.match(/^(?:\S+\s+)?(\w+)[\(:]/);
  return match ? match[1] : null;
}

async function getReleaseLine(changeset, type, options) {
  const summary = changeset.summary.trim();
  const commitType = extractType(summary);

  // 除外Typeはnullを返す
  if (commitType && EXCLUDE_TYPES.includes(commitType)) return null;

  // summaryの末尾からIssue番号を抽出してIssueリンクに変換する
  // ブランチ名規約 feat/#47-xxx からClaude Codeがsummaryに (#47) を付与する
  // hotfixなどIssueなしの場合はそのまま（リンクなし）
  const issueMatch = summary.match(/\(#(\d+)\)$/);
  const repo = options && options.repo ? options.repo : "nexnos/nexnos-dev";
  const issueLink = issueMatch
    ? ` ([#${issueMatch[1]}](https://github.com/${repo}/issues/${issueMatch[1]}))`
    : "";
  const cleanSummary = summary.replace(/\s*\(#\d+\)$/, "");

  return `- ${cleanSummary}${issueLink}`;
}

async function getDependencyReleaseLine() {
  return null;
}

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine,
};
