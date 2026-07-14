// Feature-detect WebGL so the hero can fall back to a static gradient when unsupported.
let cached: boolean | null = null

export function isWebGLAvailable(): boolean {
  if (cached !== null) return cached
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    cached = !!gl
  } catch {
    cached = false
  }
  return cached
}

// Coarse device-capability hint used to scale down 3D work on phones / low-core machines.
export function isLowPowerDevice(): boolean {
  if (typeof window === 'undefined') return false
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false
  const fewCores = (navigator.hardwareConcurrency ?? 8) <= 4
  const smallScreen = Math.min(window.innerWidth, window.innerHeight) < 768
  return coarse || fewCores || smallScreen
}
