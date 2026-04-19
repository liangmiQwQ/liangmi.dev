export interface Meteor {
  id: number
  top: number
  left: number
  length: number
  angle: number
  cycle: number
  delay: number
}

export function generateMeteors(count: number): Meteor[] {
  return Array.from({ length: count }, (_, id) => {
    const cycle = rand(15, 25)
    return {
      id,
      top: rand(0, 55),
      left: rand(0, 80),
      length: rand(100, 200),
      angle: rand(45, 60),
      cycle,
      delay: -rand(0, cycle),
    }
  })
}

export type StarKind = 'normal' | 'flash' | 'glow'

export interface Star {
  id: number
  x: number
  y: number
  r: number
  opacity: number
  color: ComputedRef
  duration: number
  delay: number
  kind: StarKind
}

export interface ConstellationLine {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface Constellation {
  lines: ConstellationLine[]
}

export function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function randInt(min: number, max: number): number {
  return Math.floor(rand(min, max + 1))
}

const color = computed(() => isDark.value ? 'white' : 'black')

export function generateNormalStars(count: number): Star[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: rand(0, 100),
    y: rand(0, 100),
    r: rand(0.6, 2.2),
    opacity: rand(0.2, 0.9),
    color,
    duration: rand(10, 30),
    delay: rand(0, 15),
    kind: 'normal' as const,
  }))
}

export function generateFlashStars(count: number, idOffset = 0): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: idOffset + i,
    x: rand(0, 100),
    y: rand(0, 100),
    r: rand(0.6, 1.8),
    opacity: rand(0.4, 1),
    color,
    duration: rand(15, 40),
    delay: rand(0, 10),
    kind: 'flash' as const,
  }))
}

export function generateGlowStars(count: number, idOffset = 0): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: idOffset + i,
    x: rand(0, 100),
    y: rand(0, 100),
    r: rand(2, 4),
    opacity: rand(0.6, 1),
    color,
    duration: rand(12, 28),
    delay: rand(0, 12),
    kind: 'glow' as const,
  }))
}

// Angle-constrained random walk: each segment turns at most maxTurnDeg from the previous direction.
export function generateConstellations(count: number, maxTurnDeg = 55): Constellation[] {
  return Array.from({ length: count }, () => {
    const pointCount = randInt(4, 7)
    const points: [number, number][] = [[rand(15, 85), rand(15, 85)]]
    let angle = rand(0, 360)

    for (let i = 1; i < pointCount; i++) {
      angle += rand(-maxTurnDeg, maxTurnDeg)
      const rad = (angle * Math.PI) / 180
      const len = rand(6, 16)
      const last = points[points.length - 1]!
      points.push([
        Math.max(2, Math.min(98, last[0] + Math.cos(rad) * len)),
        Math.max(2, Math.min(98, last[1] + Math.sin(rad) * len)),
      ])
    }

    return {
      lines: points.slice(0, -1).map((pt, i) => {
        const next = points[i + 1]!
        return { x1: pt[0], y1: pt[1], x2: next[0], y2: next[1] }
      }),
    }
  })
}
