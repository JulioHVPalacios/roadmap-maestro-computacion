import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber"
import { Html, OrbitControls, Stars, useTexture } from "@react-three/drei"
import { AnimatePresence, motion } from "motion/react"
import * as THREE from "three"

export type PlanetSpec = {
  planet: string
  domain: string
  texture: string
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
    orbitSpeed: 0.10,
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
    orbitRadius: 10.7,
    size: 0.57,
    orbitSpeed: 0.038,
    rotationSpeed: -0.30,
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
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.006, radius + 0.006, 256]} />
      <meshBasicMaterial
        color="#a6b6d1"
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

function Planet({ spec, onSelect }: { spec: PlanetSpec; onSelect: (spec: PlanetSpec) => void }) {
  const orbitRef = useRef<THREE.Group>(null!)
  const planetRef = useRef<THREE.Mesh>(null!)
  const texture = useTexture(spec.texture)

  useEffect(() => {
    configureTexture(texture)
  }, [texture])

  useFrame((_, delta) => {
    if (orbitRef.current) orbitRef.current.rotation.y += delta * spec.orbitSpeed
    if (planetRef.current) planetRef.current.rotation.y += delta * spec.rotationSpeed
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
        <mesh
          ref={planetRef}
          castShadow
          receiveShadow
          onClick={select}
          onPointerOver={() => { document.body.style.cursor = "pointer" }}
          onPointerOut={() => { document.body.style.cursor = "default" }}
        >
          <sphereGeometry args={[spec.size, 96, 96]} />
          <meshStandardMaterial map={texture} roughness={0.94} metalness={0} />
        </mesh>

        {spec.rings && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} onClick={select}>
            <ringGeometry args={[spec.size * 1.28, spec.size * 2.15, 192]} />
            <meshStandardMaterial
              color="#c5b690"
              transparent
              opacity={0.74}
              roughness={1}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        )}

        <Html
          position={[0, spec.size + 0.45, 0]}
          center
          distanceFactor={11}
          style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
        >
          <div className="select-none text-center">
            <div className="font-mono text-[7px] uppercase tracking-[0.28em] text-white/35">{spec.planet}</div>
            <div className="mt-1 text-[10px] font-semibold text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">{spec.domain}</div>
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
        <sphereGeometry args={[1.45, 128, 128]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <mesh scale={1.12}>
        <sphereGeometry args={[1.45, 96, 96]} />
        <meshBasicMaterial
          color="#ffc85e"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <pointLight color="#fff0cb" intensity={145} distance={48} decay={1.65} />
      <Html position={[0, -2.0, 0]} center distanceFactor={11} style={{ pointerEvents: "none", whiteSpace: "nowrap" }}>
        <div className="select-none text-center">
          <div className="font-mono text-[7px] uppercase tracking-[0.30em] text-amber-200/55">Núcleo</div>
          <div className="mt-1 text-xs font-black tracking-tight text-white">COMPUTACIÓN</div>
        </div>
      </Html>
    </group>
  )
}

function SolarScene({ onSelect }: { onSelect: (spec: PlanetSpec) => void }) {
  return (
    <>
      <color attach="background" args={["#020610"]} />
      <fog attach="fog" args={["#020610", 22, 58]} />
      <ambientLight intensity={0.12} />
      <Stars radius={90} depth={50} count={3000} factor={3.2} saturation={0} fade speed={0.16} />

      <group rotation={[THREE.MathUtils.degToRad(-7), 0, THREE.MathUtils.degToRad(2)]}>
        <Sun />
        {PLANETS.map((planet) => <OrbitRing key={`orbit-${planet.planet}`} radius={planet.orbitRadius} />)}
        {PLANETS.map((planet) => <Planet key={planet.planet} spec={planet} onSelect={onSelect} />)}
      </group>

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.055}
        enablePan={false}
        minDistance={8}
        maxDistance={30}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI - 0.35}
        autoRotate
        autoRotateSpeed={0.12}
      />
    </>
  )
}

export default function SolarKnowledgeHero() {
  const [selected, setSelected] = useState<PlanetSpec | null>(null)

  const goDown = () => document.querySelector("#campus")?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <section className="hero-shell">
      <div className="hero-copy">
        <div className="hero-eyebrow"><span /> Arquitectura del conocimiento</div>
        <h1 className="hero-v13-title">
          Domina<br />
          computación
          <em>como un sistema.</em>
        </h1>
        <p className="hero-lead">
          Matemática, programación, sistemas, software, redes, datos, inteligencia artificial,
          seguridad, hardware e investigación conectados en una sola arquitectura de aprendizaje.
        </p>
        <div className="hero-actions">
          <button type="button" onClick={goDown} className="hero-primary">Entrar al campus <span>↘</span></button>
          <div className="hero-meta">20 etapas · 89 materias · 12 maestrías · 2.247 profesiones</div>
        </div>
      </div>

      <div className="solar-stage" aria-label="Mapa orbital interactivo de áreas de computación">
        <div className="solar-stage-top">
          <span>MAPA VIVO / 3D · V14</span>
          <span>Haz clic en un planeta</span>
        </div>
        <Canvas
          className="solar-canvas"
          dpr={[1, 1.65]}
          camera={{ position: [0, 8.4, 20.5], fov: 40, near: 0.1, far: 160 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.outputColorSpace = THREE.SRGBColorSpace
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 1.03
          }}
        >
          <Suspense fallback={null}>
            <SolarScene onSelect={setSelected} />
          </Suspense>
        </Canvas>
        <div className="solar-hint">Arrastra · zoom · selecciona</div>

        <AnimatePresence>
          {selected && (
            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.28 }}
              className="planet-panel"
            >
              <button type="button" className="planet-close" onClick={() => setSelected(null)} aria-label="Cerrar">×</button>
              <div className="planet-code">{selected.code} / {selected.planet}</div>
              <h2>{selected.domain}</h2>
              <p>{selected.summary}</p>
              <div className="planet-learn-title">Lo que vas a aprender</div>
              <ul>{selected.learn.map((item) => <li key={item}>{item}</li>)}</ul>
              <a href="#plan" onClick={() => setSelected(null)}>Explorar esta ruta <span>→</span></a>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
