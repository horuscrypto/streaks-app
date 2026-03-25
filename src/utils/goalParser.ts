export function getGoalFromTitle(title: string): number | null {
  const match = title.match(/\b(\d+)\b/);
  if (match) {
    const num = parseInt(match[1], 10);
    return num > 0 ? num : null;
  }
  return null;
}
