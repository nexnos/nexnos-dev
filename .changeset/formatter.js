// .changeset/formatter.js
// @changesets/changelog-github をベースにType別セクション分類・絵文字付きタイトルを実装

const githubChangelog = require("@changesets/changelog-github");

const SECTIONS = [
  { type: "feat",     emoji: "✨", title: "### ✨ Added" },
  { type: "fix",      emoji: "🐛", title: "### 🐛 Fixed" },
  { type: "perf",     emoji: "⚡️", title: "### ⚡️ Performance" },
  { type: "build",    emoji: "📦", title: "### 📦 Build" },
  { type: "revert",   emoji: "⏪", title: "### ⏪ Reverted" },
  { type: "docs",     emoji: "📝", title: "### 📝 Docs" },
  { type: "refactor", emoji: "♻️", title: "### ♻️ Refactored" },
];

const EXCLUDE_TYPES = ["style", "test", "chore", "ci"];

/**
 * summaryからTypeを抽出する
 * 例）"feat(editor): add markdown shortcuts" → "feat"
 */
function extractType(summary) {
  const match = summary.match(/^(\w+)[\(:]/);
  return match ? match[1] : null;
}

/**
 * TypeからGitmojiを取得する
 */
function getEmoji(type) {
  const section = SECTIONS.find((s) => s.type === type);
  return section ? section.emoji : "";
}

async function getReleaseLine(changeset, type, options) {
  // @changesets/changelog-github からPR番号リンクを取得
  const githubLine = await githubChangelog.default.getReleaseLine(
    changeset,
    type,
    options
  );

  if (!githubLine) return null;

  const summary = changeset.summary.trim();
  const commitType = extractType(summary);

  // 除外Typeはnullを返す
  if (commitType && EXCLUDE_TYPES.includes(commitType)) return null;

  // githubLineからコミットハッシュを除去してPR番号リンクを抽出
  // githubLineの形式: "- abcd123: summary ([#47](url))"
  // または: "- summary ([#47](url))"
  const prLinkMatch = githubLine.match(/(\[#\d+\]\(https:\/\/[^)]+\))/);
  const prLink = prLinkMatch ? ` (${prLinkMatch[1]})` : "";

  // 絵文字を付与
  const emoji = getEmoji(commitType);
  const emojiPrefix = emoji ? `${emoji} ` : "";

  return `- ${emojiPrefix}${summary}${prLink}`;
}

async function getDependencyReleaseLine(changesets, dependenciesUpdated, options) {
  return null;
}

/**
 * Type別にグループ化してCHANGELOGセクションを生成する
 */
async function getChangelogEntry(changeset, options) {
  const lines = await Promise.all(
    changeset.releases.map(() =>
      getReleaseLine(changeset, changeset.releases[0]?.type, options)
    )
  );

  const validLines = lines.filter(Boolean);
  if (validLines.length === 0) return "";

  return validLines.join("\n");
}

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine,
};
