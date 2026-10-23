type Progress = {
  completedStages: string[]
  completedTracks: string[]
}

// Revocar una evidencia invalida el dominio que dependía de ella, pero conserva
// todas las materias, unidades y demás evidencias para que puedan revisarse.
export function revokeStageCompletion<T extends Progress>(progress: T, code: string, stages: { code: string }[], tracks: { code: string; prerequisites: string }[]): T {
  const index = stages.findIndex((stage) => stage.code === code)
  if (index < 0) return progress
  const invalidStages = new Set(stages.slice(index).map((stage) => stage.code))
  const invalidTracks = new Set(tracks.filter((track) => [...track.prerequisites.matchAll(/S(\d+)/gi)].some((match) => Number(match[1]) >= index)).map((track) => track.code))
  return {
    ...progress,
    completedStages: progress.completedStages.filter((item) => !invalidStages.has(item)),
    completedTracks: progress.completedTracks.filter((item) => !invalidTracks.has(item)),
  }
}

export function revokeTrackCompletion<T extends Progress>(progress: T, code: string): T {
  return { ...progress, completedTracks: progress.completedTracks.filter((item) => item !== code) }
}
