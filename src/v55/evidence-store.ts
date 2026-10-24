export function normalizeCourseChecks(value: unknown): number[] {
  if (!Array.isArray(value)) return []
  return [...new Set(value.filter((item): item is number => typeof item === "number" && Number.isInteger(item) && item >= 0 && item < 3))].sort()
}
