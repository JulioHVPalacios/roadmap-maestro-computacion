import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  AdaptiveDpr,
  ContactShadows,
  Html,
  PerformanceMonitor,
  RoundedBox,
  Sky,
  Stars,
} from "@react-three/drei"
import * as THREE from "three"
import {
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  CloudSun,
  Gauge,
  Map,
  Moon,
  Pause,
  Route,
  ShieldCheck,
  Sparkles,
  Sun,
} from "lucide-react"
import type { Stage } from "../roadmap-data"

export type CinematicRoadV45Props = {
  stages: Stage[]
  completedStageCodes: string[]
  currentIndex: number
  focusIndex: number
  onFocusIndex: (index: number) => void
  onSelectStage: (index: number) => void
  onOpenStage: (index: number) => void
  touring: boolean
  onTouringChange: (value: boolean) => void
  mobile?: boolean
}

type RoutePoint = { x: number; z: number }
type Quality = "high" | "balanced" | "lite"
type TimeOfDay = "day" | "sunset" | "night"
type CameraMode = "cinematic" | "overview"

const ROAD_WIDTH = 5.85
const WORLD_CENTER_Z = -31

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return value - Math.floor(value)
}

function buildRoutePoints(count: number): RoutePoint[] {
  const points: RoutePoint[] = []
  for (let index = 0; index < count; index += 1) {
    const lane = Math.floor(index / 4)
    const step = index % 4
    const reverse = lane % 2 === 1
    const lateral = reverse ? 3 - step : step
    const x = (lateral - 1.5) * 7.3 + Math.sin(index * 0.62) * 0.8
    const z = -lane * 12.8 - Math.sin(step * 0.8) * 1.15
    points.push({ x, z })
  }
  return points
}

function makeNoiseTexture(base: string, accents: string[], size = 512) {
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext("2d")
  if (!context) return null
  context.fillStyle = base
  context.fillRect(0, 0, size, size)
  for (let index = 0; index < size * 8; index += 1) {
    const x = pseudoRandom(index * 4 + 1) * size
    const y = pseudoRandom(index * 4 + 2) * size
    const radius = pseudoRandom(index * 4 + 3) * 1.35 + 0.25
    context.globalAlpha = pseudoRandom(index * 4 + 4) * 0.17 + 0.03
    context.fillStyle = accents[index % accents.length]
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }
  context.globalAlpha = 1
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(6, 18)
  texture.anisotropy = 8
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function buildRibbonGeometry(curve: THREE.CatmullRomCurve3, width: number, samples: number, y = 0, offset = 0) {
  const vertices: number[] = []
  const uvs: number[] = []
  const indices: number[] = []
  for (let index = 0; index <= samples; index += 1) {
    const t = index / samples
    const point = curve.getPointAt(t)
    const tangent = curve.getTangentAt(t).normalize()
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
    const center = point.clone().addScaledVector(normal, offset)
    const left = center.clone().addScaledVector(normal, -width / 2)
    const right = center.clone().addScaledVector(normal, width / 2)
    vertices.push(left.x, y, left.z, right.x, y, right.z)
    uvs.push(0, index / 8, 1, index / 8)
    if (index < samples) {
      const base = index * 2
      indices.push(base, base + 2, base + 1, base + 1, base + 2, base + 3)
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}


function CameraRig({
  curve,
  focusIndex,
  stageCount,
  mode,
  touring,
}: {
  curve: THREE.CatmullRomCurve3
  focusIndex: number
  stageCount: number
  mode: CameraMode
  touring: boolean
}) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3())
  const phase = useRef(0)

  useFrame((_, delta) => {
    const t = stageCount <= 1 ? 0 : Math.max(0, Math.min(1, focusIndex / (stageCount - 1)))
    const point = curve.getPointAt(t)
    const tangent = curve.getTangentAt(t).normalize()
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x)
    phase.current += delta * (touring ? 0.38 : 0.13)

    const cinematicSide = Math.sin(phase.current) * 0.9
    const stationSide = focusIndex % 2 === 0 ? 1 : -1
    const desired = mode === "overview"
      ? point.clone().add(new THREE.Vector3(0, 16.5, 13.5)).addScaledVector(side, -stationSide * 3.2)
      : point.clone()
        .addScaledVector(side, -stationSide * (7.4 + cinematicSide))
        .addScaledVector(tangent, -8.8)
        .add(new THREE.Vector3(0, 5.8 + Math.cos(phase.current * 0.7) * 0.25, 0))
    const wantedTarget = point.clone().addScaledVector(tangent, 1.8).addScaledVector(side, stationSide * 2.5).add(new THREE.Vector3(0, 0.95, 0))
    const smoothing = 1 - Math.pow(0.00055, delta)
    camera.position.lerp(desired, smoothing)
    target.current.lerp(wantedTarget, smoothing)
    camera.lookAt(target.current)
  })
  return null
}

function ContinuousRoad({ curve, quality, time }: { curve: THREE.CatmullRomCurve3; quality: Quality; time: TimeOfDay }) {
  const samples = quality === "high" ? 220 : quality === "balanced" ? 150 : 90
  const asphaltGeometry = useMemo(() => buildRibbonGeometry(curve, ROAD_WIDTH, samples, 0.08), [curve, samples])
  const shoulderGeometry = useMemo(() => buildRibbonGeometry(curve, ROAD_WIDTH + 1.05, samples, 0.035), [curve, samples])
  const leftEdgeGeometry = useMemo(() => buildRibbonGeometry(curve, 0.095, samples, 0.12, -(ROAD_WIDTH / 2 - 0.26)), [curve, samples])
  const rightEdgeGeometry = useMemo(() => buildRibbonGeometry(curve, 0.095, samples, 0.12, ROAD_WIDTH / 2 - 0.26), [curve, samples])
  const asphalt = useMemo(() => makeNoiseTexture("#292d2c", ["#505653", "#1d2220", "#777b76"]), [])
  const shoulder = time === "night" ? "#535d5a" : "#aeb8b2"
  const edgeColor = time === "night" ? "#f3f0d2" : "#f7f2dc"

  return (
    <group>
      <mesh geometry={shoulderGeometry} receiveShadow>
        <meshStandardMaterial color={shoulder} roughness={0.92} metalness={0.04} />
      </mesh>
      <mesh geometry={asphaltGeometry} receiveShadow>
        <meshStandardMaterial map={asphalt ?? undefined} color={time === "night" ? "#171b1b" : "#343a38"} roughness={0.83} metalness={0.08} />
      </mesh>
      <mesh geometry={leftEdgeGeometry}>
        <meshStandardMaterial color={edgeColor} roughness={0.55} emissive={time === "night" ? "#6b6a58" : "#000000"} emissiveIntensity={time === "night" ? 0.26 : 0} />
      </mesh>
      <mesh geometry={rightEdgeGeometry}>
        <meshStandardMaterial color={edgeColor} roughness={0.55} emissive={time === "night" ? "#6b6a58" : "#000000"} emissiveIntensity={time === "night" ? 0.26 : 0} />
      </mesh>
      <RoadMarkings curve={curve} quality={quality} time={time} />
      <GuardRails curve={curve} quality={quality} time={time} />
    </group>
  )
}

function RoadMarkings({ curve, quality, time }: { curve: THREE.CatmullRomCurve3; quality: Quality; time: TimeOfDay }) {
  const count = quality === "lite" ? 62 : quality === "balanced" ? 95 : 132
  const marks = useMemo(() => Array.from({ length: count }, (_, index) => {
    const t = (index + 0.5) / count
    const point = curve.getPointAt(t)
    const tangent = curve.getTangentAt(t).normalize()
    return {
      point,
      rotation: Math.atan2(tangent.x, tangent.z),
      visible: index % 2 === 0,
    }
  }), [count, curve])
  return <group>
    {marks.map((mark, index) => mark.visible && (
      <mesh key={index} position={[mark.point.x, 0.135, mark.point.z]} rotation={[0, mark.rotation, 0]}>
        <boxGeometry args={[0.12, 0.025, quality === "high" ? 0.82 : 0.68]} />
        <meshStandardMaterial color="#f4f2e4" emissive={time === "night" ? "#7c7a66" : "#000000"} emissiveIntensity={time === "night" ? 0.24 : 0} roughness={0.5} />
      </mesh>
    ))}
  </group>
}

function GuardRails({ curve, quality, time }: { curve: THREE.CatmullRomCurve3; quality: Quality; time: TimeOfDay }) {
  const count = quality === "high" ? 56 : quality === "balanced" ? 38 : 25
  const rails = useMemo(() => Array.from({ length: count }, (_, index) => {
    const t = index / Math.max(1, count - 1)
    const point = curve.getPointAt(t)
    const tangent = curve.getTangentAt(t).normalize()
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
    return { point, tangent, normal, rotation: Math.atan2(tangent.x, tangent.z) }
  }), [count, curve])
  const color = time === "night" ? "#8d9994" : "#a8b1ad"

  return <group>
    {rails.map((rail, index) => index < rails.length - 1 && [ -1, 1 ].map((side) => {
      const current = rail.point.clone().addScaledVector(rail.normal, side * (ROAD_WIDTH / 2 + 0.45))
      const nextRail = rails[index + 1]
      const next = nextRail.point.clone().addScaledVector(nextRail.normal, side * (ROAD_WIDTH / 2 + 0.45))
      const length = current.distanceTo(next)
      const mid = current.clone().lerp(next, 0.5)
      return <group key={`${index}-${side}`}>
        <mesh castShadow position={[current.x, 0.38, current.z]}>
          <cylinderGeometry args={[0.045, 0.055, 0.72, 8]} />
          <meshStandardMaterial color={color} metalness={0.62} roughness={0.32} />
        </mesh>
        <mesh castShadow position={[mid.x, 0.58, mid.z]} rotation={[0, rail.rotation, 0]}>
          <boxGeometry args={[0.12, 0.18, length + 0.05]} />
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.27} />
        </mesh>
      </group>
    }))}
  </group>
}

function StageStation({
  stage,
  index,
  point,
  tangent,
  focusIndex,
  complete,
  current,
  time,
  onSelect,
  onOpen,
}: {
  stage: Stage
  index: number
  point: THREE.Vector3
  tangent: THREE.Vector3
  focusIndex: number
  complete: boolean
  current: boolean
  time: TimeOfDay
  onSelect: () => void
  onOpen: () => void
}) {
  const nearby = Math.abs(index - focusIndex) <= 1
  const side = index % 2 === 0 ? 1 : -1
  const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize()
  const station = point.clone().addScaledVector(normal, side * 6.0)
  const boardColor = complete ? "#e6f7ef" : current ? "#eaff86" : time === "night" ? "#dfe4df" : "#f9f8f3"
  const accent = complete ? "#2f8e69" : current ? "#d8ff4f" : "#d9ddd8"
  const facing = Math.atan2(tangent.x, tangent.z) + (side > 0 ? Math.PI : 0)

  return (
    <group position={[station.x, 0, station.z]} rotation={[0, facing, 0]}>
      <mesh receiveShadow position={[0, 0.08, 0]}>
        <cylinderGeometry args={[2.55, 2.7, 0.16, 48]} />
        <meshStandardMaterial color={time === "night" ? "#5a6460" : "#d4d9d5"} roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, 0.17, 0]}>
        <cylinderGeometry args={[2.15, 2.25, 0.08, 48]} />
        <meshStandardMaterial color={time === "night" ? "#303836" : "#eef0ed"} roughness={0.84} />
      </mesh>
      <RoundedBox castShadow args={[3.3, 0.18, 1.55]} radius={0.08} smoothness={3} position={[0, 2.85, 0]}>
        <meshStandardMaterial color={time === "night" ? "#26302d" : "#dde5e0"} metalness={0.26} roughness={0.48} />
      </RoundedBox>
      <mesh castShadow position={[-1.35, 1.45, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 2.8, 10]} />
        <meshStandardMaterial color="#4f5a55" metalness={0.58} roughness={0.35} />
      </mesh>
      <mesh castShadow position={[1.35, 1.45, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 2.8, 10]} />
        <meshStandardMaterial color="#4f5a55" metalness={0.58} roughness={0.35} />
      </mesh>
      <RoundedBox castShadow args={[2.58, 1.32, 0.18]} radius={0.12} smoothness={4} position={[0, 1.7, 0.4]}>
        <meshStandardMaterial color={boardColor} roughness={0.48} metalness={0.04} emissive={current ? "#687d0e" : complete && time === "night" ? "#114b37" : "#000000"} emissiveIntensity={current ? 0.26 : complete && time === "night" ? 0.23 : 0} />
      </RoundedBox>
      <mesh position={[0, 2.62, 0.42]}>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial color={accent} emissive={current ? "#b5dc29" : complete ? "#1f6549" : "#000000"} emissiveIntensity={current || complete ? 0.78 : 0} />
      </mesh>
      {current && <pointLight position={[0, 2.7, 0.9]} intensity={time === "night" ? 2.4 : 0.55} distance={8} color="#dcff5f" />}

      <Html center position={[0, 1.72, 0.53]} distanceFactor={nearby ? 9 : 11} zIndexRange={[20, 0]} style={{ pointerEvents: "auto" }}>
        <button
          type="button"
          className={`v45-world-stage ${nearby ? "is-near" : "is-far"} ${complete ? "is-complete" : ""} ${current ? "is-current" : ""}`}
          onClick={(event) => {
            event.stopPropagation()
            onSelect()
          }}
          onDoubleClick={(event) => {
            event.stopPropagation()
            onOpen()
          }}
          aria-label={`${stage.code}: ${stage.title}`}
        >
          <span>{stage.code}</span>
          {nearby && <><strong>{stage.title}</strong><small>{stage.year} · {stage.subjects.length} materias · doble clic para entrar</small></>}
        </button>
      </Html>
    </group>
  )
}

function ModernBuilding({ x, z, h, w, d, time, accent }: { x: number; z: number; h: number; w: number; d: number; time: TimeOfDay; accent: string }) {
  const night = time === "night"
  return <group position={[x, 0, z]}>
    <RoundedBox castShadow receiveShadow args={[w, h, d]} radius={0.1} smoothness={2} position={[0, h / 2, 0]}>
      <meshStandardMaterial color={night ? "#26343a" : "#dce5e3"} roughness={0.38} metalness={0.18} />
    </RoundedBox>
    <mesh position={[0, h * 0.58, d / 2 + 0.011]}>
      <planeGeometry args={[w * 0.68, Math.max(0.42, h * 0.42)]} />
      <meshStandardMaterial color={night ? accent : "#8eaaa9"} roughness={0.18} metalness={0.35} emissive={night ? accent : "#000000"} emissiveIntensity={night ? 0.38 : 0} transparent opacity={night ? 0.88 : 0.58} />
    </mesh>
    <mesh position={[0, 0.15, d / 2 + 0.02]}>
      <planeGeometry args={[w * 0.45, 0.23]} />
      <meshStandardMaterial color={accent} emissive={night ? accent : "#000000"} emissiveIntensity={night ? 0.52 : 0.05} />
    </mesh>
  </group>
}

function KnowledgeDistricts({ points, quality, time }: { points: RoutePoint[]; quality: Quality; time: TimeOfDay }) {
  const density = quality === "lite" ? 3 : quality === "balanced" ? 2 : 1
  const towers = useMemo(() => {
    const values: Array<{ x: number; z: number; h: number; w: number; d: number; accent: string }> = []
    points.forEach((point, index) => {
      if (index % density !== 0) return
      const side = index % 2 === 0 ? -1 : 1
      const count = quality === "high" ? 3 : 2
      for (let n = 0; n < count; n += 1) {
        const h = 1.8 + ((index * 17 + n * 11) % 9) * 0.42
        const accents = ["#7dd5c3", "#9bc8ef", "#d8ff4f", "#f0b8d0"]
        values.push({
          x: point.x + side * (7.8 + n * 2.25),
          z: point.z + (n - 1) * 2.6,
          h,
          w: 1.35 + ((index + n) % 3) * 0.42,
          d: 1.45 + ((index * 3 + n) % 4) * 0.32,
          accent: accents[(index + n) % accents.length],
        })
      }
    })
    return values
  }, [density, points, quality])

  return <group>{towers.map((tower, index) => <ModernBuilding key={index} {...tower} time={time} />)}</group>
}

function RoadsideDetails({ points, quality, time, focusIndex }: { points: RoutePoint[]; quality: Quality; time: TimeOfDay; focusIndex: number }) {
  const details = useMemo(() => points.flatMap((point, index) => {
    const side = index % 2 === 0 ? -1 : 1
    const treeCount = quality === "high" ? 3 : quality === "balanced" ? 2 : 1
    return Array.from({ length: treeCount }, (_, offset) => ({
      x: point.x + side * (5.4 + offset * 1.55),
      z: point.z + (offset - 0.8) * 2.1,
      scale: 0.78 + ((index + offset) % 5) * 0.07,
      index: index * 4 + offset,
    }))
  }), [points, quality])
  const night = time === "night"

  return <group>
    {details.map((detail) => <group key={detail.index} position={[detail.x, 0, detail.z]} scale={detail.scale}>
      <mesh castShadow position={[0, 0.68, 0]}><cylinderGeometry args={[0.11, 0.16, 1.35, 10]} /><meshStandardMaterial color="#6a4d3c" roughness={0.95} /></mesh>
      <mesh castShadow position={[0, 1.55, 0]}><coneGeometry args={[0.72, 1.75, 14]} /><meshStandardMaterial color={night ? "#24483c" : detail.index % 2 ? "#557b66" : "#426d57"} roughness={0.94} /></mesh>
      {quality === "high" && <mesh castShadow position={[0, 2.02, 0]}><coneGeometry args={[0.5, 1.2, 14]} /><meshStandardMaterial color={night ? "#1f3f35" : "#3e6853"} roughness={0.94} /></mesh>}
    </group>)}
    {points.filter((_, index) => index % 2 === 0).map((point, index) => {
      const stageIndex = index * 2
      const active = Math.abs(stageIndex - focusIndex) <= 1
      return <group key={`lamp-${index}`} position={[point.x - 3.55, 0, point.z + 1.25]}>
        <mesh castShadow position={[0, 1.42, 0]}><cylinderGeometry args={[0.045, 0.068, 2.85, 10]} /><meshStandardMaterial color="#4a5551" metalness={0.62} roughness={0.32} /></mesh>
        <mesh position={[0.24, 2.8, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.035, 0.035, 0.52, 8]} /><meshStandardMaterial color="#4a5551" metalness={0.62} roughness={0.32} /></mesh>
        <mesh position={[0.49, 2.77, 0]}><sphereGeometry args={[0.09, 12, 12]} /><meshStandardMaterial color="#fff2c4" emissive="#ffd66e" emissiveIntensity={night ? 2.7 : 0.4} /></mesh>
        {night && active && <pointLight position={[0.49, 2.7, 0]} intensity={2.1} distance={8.5} decay={2} color="#ffd98a" />}
      </group>
    })}
  </group>
}

function MovingShuttle({ curve, offset, color, time, speed = 1 }: { curve: THREE.CatmullRomCurve3; offset: number; color: string; time: TimeOfDay; speed?: number }) {
  const ref = useRef<THREE.Group | null>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = (clock.elapsedTime * 0.022 * speed + offset) % 1
    const point = curve.getPointAt(t)
    const ahead = curve.getPointAt((t + 0.003) % 1)
    ref.current.position.set(point.x, 0.55, point.z)
    ref.current.rotation.y = Math.atan2(ahead.x - point.x, ahead.z - point.z)
  })
  return (
    <group ref={ref}>
      <RoundedBox args={[0.82, 0.42, 1.42]} radius={0.15} smoothness={3} castShadow>
        <meshStandardMaterial color={color} metalness={0.38} roughness={0.28} emissive={color} emissiveIntensity={time === "night" ? 0.11 : 0.04} />
      </RoundedBox>
      <RoundedBox args={[0.66, 0.19, 0.72]} radius={0.1} smoothness={2} position={[0, 0.28, 0]}>
        <meshStandardMaterial color="#31464e" metalness={0.32} roughness={0.16} />
      </RoundedBox>
      {[-0.31, 0.31].flatMap((x) => [-0.47, 0.47].map((z) => <mesh key={`${x}-${z}`} position={[x, -0.17, z]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.09, 12]} />
        <meshStandardMaterial color="#151817" roughness={0.78} />
      </mesh>))}
      <mesh position={[-0.22, 0.05, -0.73]}><boxGeometry args={[0.18, 0.08, 0.055]} /><meshStandardMaterial color="#fff4ce" emissive="#fff3c5" emissiveIntensity={time === "night" ? 3.5 : 1.2} /></mesh>
      <mesh position={[0.22, 0.05, -0.73]}><boxGeometry args={[0.18, 0.08, 0.055]} /><meshStandardMaterial color="#fff4ce" emissive="#fff3c5" emissiveIntensity={time === "night" ? 3.5 : 1.2} /></mesh>
      <mesh position={[-0.22, 0.04, 0.73]}><boxGeometry args={[0.16, 0.075, 0.055]} /><meshStandardMaterial color="#e45252" emissive="#d62828" emissiveIntensity={time === "night" ? 2.8 : 0.8} /></mesh>
      <mesh position={[0.22, 0.04, 0.73]}><boxGeometry args={[0.16, 0.075, 0.055]} /><meshStandardMaterial color="#e45252" emissive="#d62828" emissiveIntensity={time === "night" ? 2.8 : 0.8} /></mesh>
    </group>
  )
}

function AmbientParticles({ time, quality }: { time: TimeOfDay; quality: Quality }) {
  const count = quality === "high" ? 320 : quality === "balanced" ? 180 : 90
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (pseudoRandom(index * 3 + 11) - 0.5) * 80
      values[index * 3 + 1] = pseudoRandom(index * 3 + 12) * 14 + 0.5
      values[index * 3 + 2] = WORLD_CENTER_Z + (pseudoRandom(index * 3 + 13) - 0.5) * 88
    }
    return values
  }, [count])
  if (time === "day" && quality === "lite") return null
  return <points>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial size={time === "night" ? 0.045 : 0.025} color={time === "night" ? "#dcecff" : "#ffffff"} opacity={time === "night" ? 0.32 : 0.14} transparent depthWrite={false} />
  </points>
}

function WorldGround({ time }: { time: TimeOfDay }) {
  const ground = useMemo(() => makeNoiseTexture("#89998b", ["#718173", "#9aa79b", "#667568"]), [])
  return <>
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, WORLD_CENTER_Z]}>
      <planeGeometry args={[90, 108, 1, 1]} />
      <meshStandardMaterial map={ground ?? undefined} color={time === "night" ? "#35443d" : "#9aaa9b"} roughness={1} />
    </mesh>
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.105, WORLD_CENTER_Z]}>
      <ringGeometry args={[33, 53, 64]} />
      <meshStandardMaterial color={time === "night" ? "#26352e" : "#80937f"} roughness={1} transparent opacity={0.55} />
    </mesh>
  </>
}

function RoadWorld({
  stages,
  completedStageCodes,
  currentIndex,
  focusIndex,
  onFocusIndex,
  onSelectStage,
  onOpenStage,
  quality,
  time,
  cameraMode,
  touring,
}: Omit<CinematicRoadV45Props, "onTouringChange" | "mobile"> & { quality: Quality; time: TimeOfDay; cameraMode: CameraMode }) {
  const points = useMemo(() => buildRoutePoints(stages.length), [stages.length])
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(point.x, 0.1, point.z)), false, "catmullrom", 0.34), [points])
  const completed = useMemo(() => new Set(completedStageCodes), [completedStageCodes])
  const night = time === "night"
  const sunset = time === "sunset"
  const bg = night ? "#07121b" : sunset ? "#e9b998" : "#dceaf0"
  const fogColor = night ? "#0b1720" : sunset ? "#e9c4aa" : "#e2ece8"
  const sunPosition: [number, number, number] = sunset ? [42, 5.5, 10] : [34, 24, 28]
  const lightColor = sunset ? "#ffd0a2" : night ? "#9fc7ff" : "#fff5d8"

  return (
    <>
      <color attach="background" args={[bg]} />
      <fog attach="fog" args={[fogColor, night ? 24 : 35, night ? 92 : 120]} />
      {!night && <Sky distance={450000} sunPosition={sunPosition} inclination={sunset ? 0.46 : 0.54} azimuth={sunset ? 0.1 : 0.18} turbidity={sunset ? 9 : 5.5} rayleigh={sunset ? 2.2 : 1.15} mieCoefficient={0.004} mieDirectionalG={0.82} />}
      {night && <Stars radius={95} depth={40} count={quality === "high" ? 1700 : 850} factor={2.5} saturation={0.1} fade speed={0.3} />}
      <ambientLight intensity={night ? 0.28 : sunset ? 0.78 : 1.05} />
      <hemisphereLight args={[night ? "#537da7" : "#e8f6ff", night ? "#182b25" : "#7d8b80", night ? 0.45 : 1.15]} />
      <directionalLight
        castShadow={quality !== "lite"}
        position={sunPosition}
        intensity={night ? 0.5 : sunset ? 2.15 : 2.45}
        color={lightColor}
        shadow-mapSize-width={quality === "high" ? 2048 : 1024}
        shadow-mapSize-height={quality === "high" ? 2048 : 1024}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-left={-44}
        shadow-camera-right={44}
        shadow-camera-top={44}
        shadow-camera-bottom={-44}
      />
      <directionalLight position={[-24, 14, -18]} intensity={night ? 0.32 : 0.52} color={night ? "#6b96c8" : "#b8e0ef"} />

      <WorldGround time={time} />
      <KnowledgeDistricts points={points} quality={quality} time={time} />
      <RoadsideDetails points={points} quality={quality} time={time} focusIndex={focusIndex} />
      <ContinuousRoad curve={curve} quality={quality} time={time} />
      <AmbientParticles time={time} quality={quality} />

      {stages.map((stage, index) => {
        const t = stages.length <= 1 ? 0 : index / (stages.length - 1)
        const point = curve.getPointAt(t)
        const tangent = curve.getTangentAt(t).normalize()
        return <StageStation
          key={stage.code}
          stage={stage}
          index={index}
          point={point}
          tangent={tangent}
          focusIndex={focusIndex}
          complete={completed.has(stage.code)}
          current={index === currentIndex}
          time={time}
          onSelect={() => {
            onFocusIndex(index)
            onSelectStage(index)
          }}
          onOpen={() => {
            onFocusIndex(index)
            onSelectStage(index)
            onOpenStage(index)
          }}
        />
      })}

      {quality !== "lite" && <>
        <MovingShuttle curve={curve} offset={0.03} color="#d8ff4f" time={time} speed={1.04} />
        <MovingShuttle curve={curve} offset={0.39} color="#f1f4f2" time={time} speed={0.93} />
        {quality === "high" && <>
          <MovingShuttle curve={curve} offset={0.68} color="#8fd8f5" time={time} speed={1.12} />
          <MovingShuttle curve={curve} offset={0.83} color="#e8b9cf" time={time} speed={0.86} />
        </>}
      </>}

      {quality === "high" && <ContactShadows position={[0, 0.02, WORLD_CENTER_Z]} opacity={night ? 0.12 : 0.2} scale={78} blur={2.8} far={23} resolution={512} />}
      <CameraRig curve={curve} focusIndex={focusIndex} stageCount={stages.length} mode={cameraMode} touring={touring} />
      <AdaptiveDpr pixelated />
    </>
  )
}

function MobileCinematicRoad({ stages, completedStageCodes, currentIndex, focusIndex, onFocusIndex, onSelectStage, onOpenStage }: CinematicRoadV45Props) {
  const completed = new Set(completedStageCodes)
  return (
    <div className="v45-mobile-world">
      <div className="v45-mobile-premium-head"><span><Sparkles /> Ruta Premium</span><strong>20 estaciones. Un recorrido continuo.</strong></div>
      <div className="v45-mobile-road-line" aria-hidden="true"><i /></div>
      {stages.map((stage, index) => (
        <button
          key={stage.code}
          type="button"
          className={`v45-mobile-stop ${completed.has(stage.code) ? "is-complete" : ""} ${index === currentIndex ? "is-current" : ""} ${index === focusIndex ? "is-focus" : ""}`}
          onClick={() => {
            onFocusIndex(index)
            onSelectStage(index)
          }}
          onDoubleClick={() => onOpenStage(index)}
        >
          <span className="v45-mobile-marker">{stage.code}</span>
          <span className="v45-mobile-stop-copy"><small>{stage.year} · {stage.subjects.length} materias</small><strong>{stage.title}</strong><em>{stage.duration} · doble toque para entrar</em></span>
          <ChevronRight />
        </button>
      ))}
    </div>
  )
}

export default function CinematicRoadV45(props: CinematicRoadV45Props) {
  const { stages, focusIndex, onFocusIndex, touring, onTouringChange, mobile } = props
  const [quality, setQuality] = useState<Quality>("high")
  const [time, setTime] = useState<TimeOfDay>("day")
  const [cameraMode, setCameraMode] = useState<CameraMode>("cinematic")

  useEffect(() => {
    if (!touring || mobile) return
    const timer = window.setInterval(() => onFocusIndex((focusIndex + 1) % stages.length), 3400)
    return () => window.clearInterval(timer)
  }, [focusIndex, mobile, onFocusIndex, stages.length, touring])

  const focused = stages[focusIndex] ?? stages[0]

  if (mobile) return <MobileCinematicRoad {...props} />

  return (
    <div className={`v45-cinematic-shell time-${time}`} aria-label="Ruta Maestra Premium en vista inmersiva">
      <div className="v45-world-topbar">
        <div className="v45-world-readout">
          <span><Route /> Ruta Maestra Premium</span>
          <strong>{focused.code} · {focused.title}</strong>
          <small>{focused.year} · {focused.duration} · {focused.subjects.length} materias</small>
        </div>
        <div className="v45-world-control-stack">
          <div className="v45-world-controls">
            <button type="button" onClick={() => onFocusIndex(Math.max(0, focusIndex - 1))} disabled={focusIndex === 0}><ChevronLeft /> Anterior</button>
            <button type="button" className={touring ? "is-active" : ""} onClick={() => onTouringChange(!touring)}>{touring ? <Pause /> : <CirclePlay />}{touring ? "Pausar" : "Recorrer"}</button>
            <button type="button" onClick={() => onFocusIndex(Math.min(stages.length - 1, focusIndex + 1))} disabled={focusIndex === stages.length - 1}>Siguiente <ChevronRight /></button>
          </div>
          <div className="v45-world-controls v45-atmosphere-controls" aria-label="Ambiente y cámara">
            <button type="button" className={time === "day" ? "is-active" : ""} onClick={() => setTime("day")} title="Día"><Sun /> Día</button>
            <button type="button" className={time === "sunset" ? "is-active" : ""} onClick={() => setTime("sunset")} title="Atardecer"><CloudSun /> Atardecer</button>
            <button type="button" className={time === "night" ? "is-active" : ""} onClick={() => setTime("night")} title="Noche"><Moon /> Noche</button>
            <button type="button" className={cameraMode === "overview" ? "is-active" : ""} onClick={() => setCameraMode((mode) => mode === "cinematic" ? "overview" : "cinematic")}><Map /> {cameraMode === "overview" ? "Cercana" : "Vista aérea"}</button>
          </div>
        </div>
      </div>

      <div className="v45-canvas-wrap">
        <Canvas
          shadows
          camera={{ position: [8.8, 7.2, 10.8], fov: 42, near: 0.1, far: 210 }}
          dpr={[1, 1.7]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance", stencil: false }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 1.03
            gl.outputColorSpace = THREE.SRGBColorSpace
            gl.shadowMap.type = THREE.PCFSoftShadowMap
          }}
        >
          <PerformanceMonitor
            onIncline={() => setQuality("high")}
            onDecline={() => setQuality((current) => current === "high" ? "balanced" : "lite")}
            onFallback={() => setQuality("lite")}
          >
            <RoadWorld {...props} quality={quality} time={time} cameraMode={cameraMode} />
          </PerformanceMonitor>
        </Canvas>

        <div className="v45-cinematic-watermark" aria-hidden="true"><Sparkles /> EXPERIENCIA INMERSIVA</div>
        <aside className="v45-world-legend" aria-label="Ayuda de la vista inmersiva">
          <span><i className="is-current" /> Etapa actual</span>
          <span><i className="is-complete" /> Dominada</span>
          <span><ShieldCheck /> Doble clic: abrir aula</span>
          <span><Gauge /> Calidad {quality === "high" ? "alta" : quality === "balanced" ? "adaptativa" : "ligera"}</span>
        </aside>
      </div>

      <div className="v45-world-progress" role="navigation" aria-label="Etapas de la Ruta Maestra">
        {stages.map((stage, index) => (
          <button
            key={stage.code}
            type="button"
            className={`${index === focusIndex ? "is-focus" : ""} ${props.completedStageCodes.includes(stage.code) ? "is-complete" : ""} ${index === props.currentIndex ? "is-current" : ""}`}
            onClick={() => {
              onFocusIndex(index)
              props.onSelectStage(index)
            }}
          >
            <span>{stage.code}</span><small>{stage.year}</small>
          </button>
        ))}
      </div>
    </div>
  )
}
