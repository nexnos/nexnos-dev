// .changeset/formatter.js
// Type別にCHANGELOGセクションを分類するカスタムフォーマッター

const SECTIONS = [
  { type: "feat",     title: "### ✨ Added" },
  { type: "fix",      title: "### 🐛 Fixed" },
  { type: "perf",     title: "### ⚡️ Performance" },
  { type: "build",    title: "### 📦 Build" },
  { type: "revert",   title: "### ⏪ Reverted" },
  { type: "docs",     title: "### 📝 Docs" },
  { type: "refactor", title: "### ♻️ Refactored" },
];

// style・test・chore・ci は除外
const EXCLUDE_TYPES = ["style", "test", "chore", "ci"];

/**
 * changesetのsummaryからTypeを抽出する
 * 例）"feat(editor): add markdown shortcuts" → "feat"
 */
function extractType(summary) {
  const match = summary.match(/^(\w+)[\(:]/);
  return match ? match[1] : null;
}

/**
 * PR番号からGitHubリンクを生成する
 */
function getPrLink(pullRequestNumber, repoUrl) {
  if (!pullRequestNumber || !repoUrl) return "";
  return ` ([#${pullRequestNumber}](${repoUrl}/pull/${pullRequestNumber}))`;
}

async function getReleaseLine(changeset, _type, options) {
  const repoUrl = options?.repo
    ? `https://github.com/${options.repo}`
    : "https://github.com/nexnos/nexnos-dev";

  const prLink = getPrLink(changeset.id, repoUrl);
  const summary = changeset.summary.trim();
  const type = extractType(summary);

  // 除外Typeはnullを返す（CHANGELOGに掲載しない）
  if (type && EXCLUDE_TYPES.includes(type)) return null;

  return `- ${summary}${prLink}`;
}

async function getDependencyReleaseLine() {
  return null;
}

/**
 * バージョンのCHANGELOGエントリを生成する
 */
async function getChangelogEntry(changeset, options) {
  const lines = await Promise.all(
    changeset.releases.map((release) =>
      getReleaseLine(
        { ...changeset, summary: changeset.summary },
        release.type,
        options
      )
    )
  );

  const validLines = lines.filter(Boolean);
  if (validLines.length === 0) return "";

  // Typeごとにグループ化
  const groups = {};
  for (const line of validLines) {
    const match = line.match(/^- (\w+)[\(:]/);
    const type = match ? match[1] : "other";
    if (!groups[type]) groups[type] = [];
    groups[type].push(line);
  }

  // セクション順に並べて出力
  const sections = [];
  for (const { type, title } of SECTIONS) {
    if (groups[type]?.length) {
      sections.push(`${title}\n${groups[type].join("\n")}`);
    }
  }

  return sections.join("\n\n");
}

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine,
  getChangelogEntry,
};
