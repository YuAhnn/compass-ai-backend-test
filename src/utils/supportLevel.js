const SUPPORT_LEVELS = [
  { maxRatio: 0.25, level: "light check-in" },
  { maxRatio: 0.60, level: "gentle support" },
  { maxRatio: Infinity, level: "extra care" },
]

export function getSupportLevel(score, maxScore = 10) {
  if (score == null) return "light check-in"

  const ratio = score / maxScore
  return SUPPORT_LEVELS.find(({ maxRatio }) => ratio <= maxRatio).level
}
