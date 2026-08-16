import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber"
import { Html, OrbitControls, useTexture } from "@react-three/drei"
import { AnimatePresence, motion } from "motion/react"
import * as THREE from "three"

export type PlanetSpec = {
  planet: string
  domain: string
  texture: string
  portrait?: string
  orbitRadius: number
  size: number
  orbitSpeed: number
  rotationSpeed: number
  phase: number
  axialTilt: number
  rings?: boolean
  code: string
  summary: string
  learn: string[]
}

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`

const PLANETS: PlanetSpec[] = [
  {
    planet: "Mercurio",
    domain: "Fundamentos",
    texture: asset("/planets/mercury.jpg"),
    portrait: asset("/planets/mercury-portrait.jpg"),
    orbitRadius: 3.0,
    size: 0.27,
    orbitSpeed: 0.19,
    rotationSpeed: 0.14,
    phase: 0.3,
    axialTilt: 0,
    code: "S0–S1",
    summary: "La base formal y técnica sobre la que se apoya todo el campus.",
    learn: ["Matemática discreta", "Lógica", "Método universitario", "Linux y Git"],
  },
  {
    planet: "Venus",
    domain: "Programación",
    texture: asset("/planets/venus.jpg"),
    orbitRadius: 4.0,
    size: 0.42,
    orbitSpeed: 0.15,
    rotationSpeed: -0.055,
    phase: 1.3,
    axialTilt: 177,
    code: "S2",
    summary: "Pensamiento algorítmico y construcción de software desde principios sólidos.",
    learn: ["Algoritmos", "Estructuras de datos", "Paradigmas", "Testing y depuración"],
  },
  {
    planet: "Tierra",
    domain: "Sistemas",
    texture: asset("/planets/earth.jpg"),
    orbitRadius: 5.1,
    size: 0.46,
    orbitSpeed: 0.12,
    rotationSpeed: 0.32,
    phase: 2.3,
    axialTilt: 23.4,
    code: "S3",
    summary: "Cómo funciona realmente un computador, un sistema operativo y una infraestructura.",
    learn: ["Arquitectura", "Sistemas operativos", "Procesos y memoria", "Administración Linux"],
  },
  {
    planet: "Marte",
    domain: "Redes",
    texture: asset("/planets/mars.jpg"),
    orbitRadius: 6.2,
    size: 0.35,
    orbitSpeed: 0.1,
    rotationSpeed: 0.29,
    phase: 3.2,
    axialTilt: 25.2,
    code: "S3–S4",
    summary: "Comunicación entre sistemas: desde protocolos hasta arquitecturas distribuidas.",
    learn: ["TCP/IP", "Routing y switching", "Servicios de red", "Sistemas distribuidos"],
  },
  {
    planet: "Júpiter",
    domain: "Datos",
    texture: asset("/planets/jupiter.jpg"),
    orbitRadius: 7.7,
    size: 0.84,
    orbitSpeed: 0.065,
    rotationSpeed: 0.5,
    phase: 4.1,
    axialTilt: 3.1,
    code: "S6",
    summary: "Modelar, transformar, analizar y operar datos de forma profesional.",
    learn: ["SQL", "Modelado", "BI y visualización", "Ingeniería de datos"],
  },
  {
    planet: "Saturno",
    domain: "Inteligencia Artificial",
    texture: asset("/planets/saturn.jpg"),
    orbitRadius: 9.25,
    size: 0.7,
    orbitSpeed: 0.052,
    rotationSpeed: 0.43,
    phase: 5.2,
    axialTilt: 26.7,
    rings: true,
    code: "S7",
    summary: "Modelos, aprendizaje automático y sistemas inteligentes evaluados con rigor.",
    learn: ["Machine learning", "Deep learning", "Agentes", "MLOps e IA responsable"],
  },
  {
    planet: "Urano",
    domain: "Ciberseguridad",
    texture: asset("/planets/uranus.jpg"),
    portrait: asset("/planets/uranus-portrait.png"),
    orbitRadius: 10.7,
    size: 0.57,
    orbitSpeed: 0.038,
    rotationSpeed: -0.3,
    phase: 0.9,
    axialTilt: 97.8,
    code: "S5",
    summary: "Diseñar, atacar, defender y auditar sistemas entendiendo el riesgo real.",
    learn: ["Hardening", "Red team", "Blue team", "Criptografía y respuesta"],
  },
  {
    planet: "Neptuno",
    domain: "Investigación",
    texture: asset("/planets/neptune.jpg"),
    orbitRadius: 12.1,
    size: 0.55,
    orbitSpeed: 0.031,
    rotationSpeed: 0.28,
    phase: 2.0,
    axialTilt: 28.3,
    code: "FRONTERA",
    summary: "La capa que mantiene el campus vivo y conectado con la frontera científica.",
    learn: ["Lectura de papers", "Reproducibilidad", "Experimentación", "Frontera tecnológica"],
  },
]

function configureTexture(texture: THREE.Texture) {
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  texture.wrapS = THREE.RepeatWrapping
  texture.needsUpdate = true
}

function OrbitRing({ radius }: { radius: number }) {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <ringGeometry args={[radius - 0.036, radius + 0.036, 320]} />
        <meshBasicMaterial
          color="#dcfff0"
          transparent
          opacity={0.88}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <ringGeometry args={[radius - 0.012, radius + 0.012, 320]} />
        <meshBasicMaterial
          color="#f5fff9"
          transparent
          opacity={0.42}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function createUranusBands() {
  const canvas = document.createElement("canvas")
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext("2d")!
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, "rgba(110,215,230,0)")
  gradient.addColorStop(0.18, "rgba(185,245,246,.18)")
  gradient.addColorStop(0.35, "rgba(65,176,208,.22)")
  gradient.addColorStop(0.52, "rgba(225,255,250,.16)")
  gradient.addColorStop(0.68, "rgba(49,151,190,.20)")
  gradient.addColorStop(0.86, "rgba(182,241,244,.16)")
  gradient.addColorStop(1, "rgba(88,192,215,0)")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let y = 45; y < canvas.height; y += 42) {
    ctx.fillStyle = `rgba(255,255,255,${y % 84 === 0 ? 0.055 : 0.028})`
    ctx.fillRect(0, y, canvas.width, 3)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.RepeatWrapping
  texture.needsUpdate = true
  return texture
}

function Planet({
  spec,
  selected,
  onSelect,
}: {
  spec: PlanetSpec
  selected: boolean
  onSelect: (spec: PlanetSpec) => void
}) {
  const orbitRef = useRef<THREE.Group>(null!)
  const visualRef = useRef<THREE.Group>(null!)
  const planetRef = useRef<THREE.Mesh>(null!)
  const texture = useTexture(spec.texture)
  const uranusBands = useMemo(() => createUranusBands(), [])

  useEffect(() => {
    configureTexture(texture)
  }, [texture])

  useEffect(() => () => uranusBands.dispose(), [uranusBands])

  useFrame((_, delta) => {
    if (orbitRef.current && !selected) orbitRef.current.rotation.y += delta * spec.orbitSpeed
    if (planetRef.current) planetRef.current.rotation.y += delta * spec.rotationSpeed
    if (visualRef.current) {
      const target = selected ? 1.8 : 1
      const next = THREE.MathUtils.damp(visualRef.current.scale.x, target, 6.5, delta)
      visualRef.current.scale.setScalar(next)
    }
  })

  const select = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onSelect(spec)
  }

  return (
    <group ref={orbitRef} rotation={[0, spec.phase, 0]}>
      <group
        position={[spec.orbitRadius, 0, 0]}
        rotation={[0, 0, THREE.MathUtils.degToRad(spec.axialTilt)]}
      >
        <group ref={visualRef}>
          {selected && (
            <mesh scale={1.22}>
              <sphereGeometry args={[spec.size, 80, 80]} />
              <meshBasicMaterial
                color="#d8ff4f"
                transparent
                opacity={0.18}
                side={THREE.BackSide}
                depthWrite={false}
              />
            </mesh>
          )}

          <mesh
            ref={planetRef}
            castShadow
            receiveShadow
            onClick={select}
            onPointerOver={() => { document.body.style.cursor = "pointer" }}
            onPointerOut={() => { document.body.style.cursor = "default" }}
          >
            <sphereGeometry args={[spec.size, 80, 80]} />
            <meshStandardMaterial map={texture} roughness={0.92} metalness={0} />
          </mesh>

          {spec.planet === "Urano" && (
            <mesh scale={1.008}>
              <sphereGeometry args={[spec.size, 80, 80]} />
              <meshBasicMaterial
                map={uranusBands}
                transparent
                opacity={0.68}
                depthWrite={false}
                blending={THREE.NormalBlending}
              />
            </mesh>
          )}

          {spec.rings && (
            <mesh rotation={[-Math.PI / 2, 0, 0]} onClick={select}>
              <ringGeometry args={[spec.size * 1.28, spec.size * 2.15, 192]} />
              <meshStandardMaterial
                color="#c5b690"
                transparent
                opacity={0.82}
                roughness={1}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
          )}
        </group>

        <Html
          position={[0, spec.size + (selected ? 0.8 : 0.48), 0]}
          center
          distanceFactor={11}
          style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
        >
          <div className={`planet-label-v15 ${selected ? "is-selected" : ""}`}>
            <small>{spec.planet}</small>
            <b>{spec.domain}</b>
          </div>
        </Html>
      </group>
    </group>
  )
}

function Sun() {
  const sunRef = useRef<THREE.Mesh>(null!)
  const texture = useTexture(asset("/space/sun.jpg"))

  useEffect(() => {
    configureTexture(texture)
  }, [texture])

  useFrame((_, delta) => {
    if (sunRef.current) sunRef.current.rotation.y += delta * 0.03
  })

  return (
    <group>
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.45, 96, 96]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <mesh scale={1.11}>
        <sphereGeometry args={[1.45, 96, 96]} />
        <meshBasicMaterial
          color="#fff0a0"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <pointLight color="#fff0cb" intensity={110} distance={52} decay={1.55} />
      <Html position={[0, -2.0, 0]} center distanceFactor={11} style={{ pointerEvents: "none", whiteSpace: "nowrap" }}>
        <div className="solar-sun-label-v15">
          <small>Núcleo</small>
          <b>COMPUTACIÓN</b>
        </div>
      </Html>
    </group>
  )
}

function SolarScene({
  selected,
  onSelect,
}: {
  selected: PlanetSpec | null
  onSelect: (spec: PlanetSpec) => void
}) {
  return (
    <>
      <ambientLight intensity={0.72} />

      <group rotation={[THREE.MathUtils.degToRad(-7), 0, THREE.MathUtils.degToRad(2)]}>
        <Sun />
        {PLANETS.map((planet) => <OrbitRing key={`orbit-${planet.planet}`} radius={planet.orbitRadius} />)}
        {PLANETS.map((planet) => (
          <Planet
            key={planet.planet}
            spec={planet}
            selected={selected?.planet === planet.planet}
            onSelect={onSelect}
          />
        ))}
      </group>

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.055}
        enablePan={false}
        minDistance={12.5}
        maxDistance={34}
        zoomSpeed={0.78}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI - 0.35}
        autoRotate={!selected}
        autoRotateSpeed={0.1}
      />
    </>
  )
}

export default function SolarKnowledgeHero() {
  const [selected, setSelected] = useState<PlanetSpec | null>(null)
  const shellRef = useRef<HTMLElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const element = shellRef.current
    if (!element || typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(([entry]) => setIsVisible(Boolean(entry?.isIntersecting)), { rootMargin: "180px 0px 180px 0px", threshold: 0.01 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const keepWheelInSolar = (event: WheelEvent) => {
      const target = event.target as Element | null
      if (target?.closest?.(".planet-panel")) return
      event.preventDefault()
    }
    stage.addEventListener("wheel", keepWheelInSolar, { passive: false, capture: true })
    return () => stage.removeEventListener("wheel", keepWheelInSolar, true)
  }, [])

  return (
    <section ref={shellRef} className="hero-shell">
      <div className="hero-copy" aria-hidden="true" />

      <div
        ref={stageRef}
        className="solar-stage"
        data-lenis-prevent
        data-lenis-prevent-wheel
        aria-label="Mapa orbital interactivo de áreas de computación"
      >
        <div className="solar-stage-top">
          <span>MAPA VIVO / 3D · V15</span>
          <span>{selected ? `${selected.planet} seleccionado` : "Haz clic en un planeta"}</span>
        </div>

        <Canvas
          className="solar-canvas"
          frameloop={isVisible ? "always" : "demand"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 8.4, 24], fov: 42, near: 0.1, far: 160 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.outputColorSpace = THREE.SRGBColorSpace
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 1.12
            gl.setClearColor(0x000000, 0)
          }}
        >
          <Suspense fallback={null}>
            <SolarScene selected={selected} onSelect={setSelected} />
          </Suspense>
        </Canvas>

        <div className="solar-hint">
          {selected ? "Planeta fijado · selecciona otro o cierra la ficha" : "Arrastra · zoom · selecciona"}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.aside
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.24 }}
              className="planet-panel"
            >
              <button type="button" className="planet-close" onClick={() => setSelected(null)} aria-label="Cerrar">×</button>

              <div className="planet-panel-orb">
                <img src={selected.portrait ?? selected.texture} alt={`Vista de ${selected.planet}`} />
              </div>

              <div className="planet-code">{selected.code} / {selected.planet}</div>
              <h2>{selected.domain}</h2>
              <p>{selected.summary}</p>

              <div className="planet-learn-title">Lo que vas a aprender</div>
              <ul>{selected.learn.map((item) => <li key={item}>{item}</li>)}</ul>

              <a href="/ruta" onClick={() => setSelected(null)}>Explorar esta ruta <span>→</span></a>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

