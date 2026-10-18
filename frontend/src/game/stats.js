const KEY = "wordleoff-stats";

export function loadStats() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && Array.isArray(saved.dist)) return saved;
  } catch {}
  return { played: 0, won: 0, dist: [0, 0, 0, 0, 0, 0] };
}

export function recordGame(won, guessCount) {
  const stats = loadStats();
  stats.played += 1;
  if (won) {
    stats.won += 1;
    stats.dist[guessCount - 1] += 1;
  }
  try {
    localStorage.setItem(KEY, JSON.stringify(stats));
  } catch {}
  return stats;
}