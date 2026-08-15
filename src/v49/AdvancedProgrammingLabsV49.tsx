import { useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { Box, Code2, ExternalLink, Lightbulb, MonitorCog, Play, RotateCcw, Sparkles } from "lucide-react"

type LabTab = "shader" | "scene"

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const shaderPresets = [
  {
    name: "Gradiente",
    concept: "Coordenadas UV",
    code: `varying vec2 vUv;
uniform float uTime;

void main() {
  vec3 color = vec3(vUv.x, vUv.y, 0.55 + 0.15 * sin(uTime));
  gl_FragColor = vec4(color, 1.0);
}`,
  },
  {
    name: "Círculo",
    concept: "Distancia y máscaras",
    code: `varying vec2 vUv;
uniform float uTime;

void main() {
  vec2 p = vUv - 0.5;
  float d = length(p);
  float circle = 1.0 - smoothstep(0.22, 0.235, d);
  vec3 bg = vec3(0.02, 0.08, 0.14);
  vec3 ink = vec3(0.55, 0.95, 0.35 + 0.15 * sin(uTime));
  gl_FragColor = vec4(mix(bg, ink, circle), 1.0);
}`,
  },
  {
    name: "Ondas",
    concept: "Funciones periódicas",
    code: `varying vec2 vUv;
uniform float uTime;

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float wave = sin(p.x * 14.0 + uTime * 1.6) * 0.08;
  float line = 1.0 - smoothstep(0.025, 0.055, abs(p.y - wave));
  vec3 color = mix(vec3(0.015, 0.04, 0.08), vec3(0.2, 0.8, 1.0), line);
  gl_FragColor = vec4(color, 1.0);
}`,
  },
]

function ShaderPlane({ fragment }: { fragment: string }) {
  const material = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  useFrame((state) => {
    if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime
  })
  return (
    <mesh>
      <planeGeometry args={[4, 2.6, 1, 1]} />
      <shaderMaterial ref={material} vertexShader={vertexShader} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  )
}

function SceneDemo({ position, rotation, scale, light }: { position: number; rotation: number; scale: number; light: number }) {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (mesh.current) mesh.current.rotation.y += dt * 0.18
  })
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 6]} intensity={light} castShadow />
      <gridHelper args={[12, 12, "#6d7f8c", "#d7dde1"]} position={[0, -1.4, 0]} />
      <mesh ref={mesh} castShadow receiveShadow position={[position, 0, 0]} rotation={[0.25, rotation, 0]} scale={scale}>
        <boxGeometry args={[1.65, 1.65, 1.65]} />
        <meshStandardMaterial color="#7bd389" roughness={0.28} metalness={0.22} />
      </mesh>
      <mesh position={[-2.4, -0.65, -1.2]} castShadow>
        <sphereGeometry args={[0.72, 48, 48]} />
        <meshStandardMaterial color="#5bb8ff" roughness={0.22} metalness={0.12} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.42, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <shadowMaterial opacity={0.18} />
      </mesh>
      <OrbitControls makeDefault enableDamping />
    </>
  )
}

export default function AdvancedProgrammingLabsV49() {
  const [tab, setTab] = useState<LabTab>("shader")
  const [shaderCode, setShaderCode] = useState(shaderPresets[0].code)
  const [compiledShader, setCompiledShader] = useState(shaderPresets[0].code)
  const [shaderMessage, setShaderMessage] = useState("Edita el fragment shader y pulsa Aplicar. El resultado se renderiza en tiempo real con Three.js.")
  const [position, setPosition] = useState(0)
  const [rotation, setRotation] = useState(0.55)
  const [scale, setScale] = useState(1)
  const [light, setLight] = useState(2.2)

  const applyShader = () => {
    if (!/void\s+main\s*\(/.test(shaderCode)) {
      setShaderMessage("Falta void main(). Todo fragment shader necesita un punto de entrada.")
      return
    }
    if (!/gl_FragColor/.test(shaderCode)) {
      setShaderMessage("No encuentro gl_FragColor. En este laboratorio WebGL debes asignar el color final del píxel.")
      return
    }
    setCompiledShader(shaderCode)
    setShaderMessage("Shader aplicado. Cambia una constante o una función y observa qué píxeles cambian.")
  }

  return (
    <div className="v49-advanced-labs">
      <div className="v49-advanced-tabs" role="tablist" aria-label="Laboratorios avanzados">
        <button type="button" className={tab === "shader" ? "active" : ""} onClick={() => setTab("shader")}><Code2 />Shaders / GPU</button>
        <button type="button" className={tab === "scene" ? "active" : ""} onClick={() => setTab("scene")}><Box />Escena 3D</button>
      </div>

      {tab === "shader" ? (
        <section className="v49-shader-lab">
          <div className="v49-advanced-teacher">
            <Sparkles />
            <div><b>Profesor · programación gráfica</b><p>Un fragment shader calcula el color de cada píxel. Empieza con coordenadas UV, luego máscaras, funciones periódicas, ruido, iluminación y finalmente raymarching. Aquí editas GLSL real y ves el resultado inmediatamente.</p></div>
          </div>
          <div className="v49-preset-row">{shaderPresets.map((preset) => <button type="button" key={preset.name} onClick={() => { setShaderCode(preset.code); setCompiledShader(preset.code); setShaderMessage(`Preset ${preset.name}: ${preset.concept}. Modifica una constante y vuelve a aplicar.`) }}>{preset.name}<small>{preset.concept}</small></button>)}</div>
          <div className="v49-shader-grid">
            <div className="v49-code-panel"><header><div><b>GLSL Fragment Shader</b><small>Editor integrado</small></div><button type="button" onClick={applyShader}><Play />Aplicar</button></header><textarea value={shaderCode} onChange={(event) => setShaderCode(event.target.value)} spellCheck={false} /></div>
            <div className="v49-render-panel"><Canvas camera={{ position: [0, 0, 3.5], fov: 48 }} dpr={[1, 1.7]}><ShaderPlane fragment={compiledShader} /></Canvas><div className="v49-render-note"><Lightbulb /><p>{shaderMessage}</p></div></div>
          </div>
          <div className="v49-reference-row"><a href="https://github.com/patriciogonzalezvivo/glslEditor" target="_blank" rel="noreferrer">Proyecto de referencia: glslEditor <ExternalLink /></a><a href="https://thebookofshaders.com/" target="_blank" rel="noreferrer">The Book of Shaders <ExternalLink /></a></div>
        </section>
      ) : (
        <section className="v49-scene-lab">
          <div className="v49-advanced-teacher"><MonitorCog /><div><b>Profesor · escena 3D</b><p>Una escena se entiende como jerarquía de objetos + transformaciones + cámara + luz + materiales. Arrastra con el mouse para orbitar, usa la rueda para zoom y cambia los valores para ver qué significa posición, rotación, escala e intensidad.</p></div></div>
          <div className="v49-scene-grid">
            <div className="v49-scene-canvas"><Canvas shadows camera={{ position: [4.5, 3.4, 6.2], fov: 48 }} dpr={[1, 1.7]}><SceneDemo position={position} rotation={rotation} scale={scale} light={light} /></Canvas></div>
            <div className="v49-scene-controls">
              <label>Posición X <b>{position.toFixed(1)}</b><input type="range" min="-2" max="2" step="0.1" value={position} onChange={(e) => setPosition(Number(e.target.value))} /></label>
              <label>Rotación Y <b>{rotation.toFixed(2)} rad</b><input type="range" min="0" max="6.28" step="0.05" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} /></label>
              <label>Escala <b>{scale.toFixed(1)}×</b><input type="range" min="0.4" max="2.2" step="0.1" value={scale} onChange={(e) => setScale(Number(e.target.value))} /></label>
              <label>Luz <b>{light.toFixed(1)}</b><input type="range" min="0.2" max="5" step="0.1" value={light} onChange={(e) => setLight(Number(e.target.value))} /></label>
              <button type="button" onClick={() => { setPosition(0); setRotation(0.55); setScale(1); setLight(2.2) }}><RotateCcw />Restaurar escena</button>
              <div className="v49-scene-concepts"><b>Lo que debes saber explicar</b><span>scene graph</span><span>transform</span><span>camera</span><span>light</span><span>material</span><span>mesh</span><span>GPU pipeline</span></div>
            </div>
          </div>
          <div className="v49-reference-row"><a href="https://threejs.org/editor/" target="_blank" rel="noreferrer">Editor oficial de Three.js <ExternalLink /></a><a href="https://github.com/playcanvas/engine" target="_blank" rel="noreferrer">PlayCanvas Engine <ExternalLink /></a></div>
        </section>
      )}
    </div>
  )
}
