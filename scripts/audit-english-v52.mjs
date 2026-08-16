import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()

function check(title, fn) {
  try {
    fn()
    console.log(`[PASS] ${title}`)
  } catch (err) {
    console.error(`[FAIL] ${title}`)
    console.error(`       ${err.message}`)
    process.exit(1)
  }
}

console.log("==================================================")
console.log(" AUDITORÍA EXHAUSTIVA DE INGLÉS IT V52")
console.log("==================================================")

// 1. Archivos requeridos
check("Archivos estructurales de Inglés IT V52", () => {
  const requiredFiles = [
    'src/v41/EnglishHubV41.tsx',
    'src/v51/english-curriculum-v51.ts',
    'src/v51/english-sources-v51.ts',
    'src/v52/EnglishAcademyHubV52.tsx',
    'src/v52/EnglishClassroomV52.tsx',
    'src/v52/EnglishWritingStudioV52.tsx',
    'src/v52/english-v52.css'
  ]

  for (const rel of requiredFiles) {
    const full = path.join(projectRoot, rel)
    if (!fs.existsSync(full)) {
      throw new Error(`Archivo faltante: ${rel}`)
    }
  }
})

// 2. Contenido curricular y 48 niveles
check("Validación curricular E00 a E47 y Cero Absoluto", () => {
  const currPath = path.join(projectRoot, 'src/v51/english-curriculum-v51.ts')
  const content = fs.readFileSync(currPath, 'utf8')

  // Verificar presencia de los 48 niveles E00 a E47
  for (let i = 0; i < 48; i++) {
    const code = `E${String(i).padStart(2, '0')}`
    if (!content.includes(`code: "${code}"`) && !content.includes(`code = \`E\${String(i).padStart(2, "0")}\``)) {
      throw new Error(`Nivel no encontrado o mal codificado: ${code}`)
    }
  }

  // Verificar fases CEFR
  const requiredPhases = ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  for (const phase of requiredPhases) {
    if (!content.includes(phase)) {
      throw new Error(`Fase CEFR faltante: ${phase}`)
    }
  }

  // Verificar fundamentos desde cero absoluto en primeros niveles
  if (!content.includes("Cero Absoluto") || !content.includes("Alfabeto") || !content.includes("TO BE")) {
    throw new Error("El currículo no contiene fundamentos explícitos de Cero Absoluto.")
  }

  // Verificar presencia de orientación docente
  if (!content.includes("todayLearn") || !content.includes("spanishAnalogy") || !content.includes("spanishTrap")) {
    throw new Error("El currículo no contiene la estructura pedagógica de Orientación Docente.")
  }

  // Verificar presencia de ejercicios interactivos
  if (!content.includes("pedagogicalFeedback") || !content.includes("ruleReminder")) {
    throw new Error("El currículo no contiene retroalimentación pedagógica en los ejercicios.")
  }
})

// 3. Auditoría Fonética e IPA
check("Auditoría Fonética de IPA Unicode y consistencia", () => {
  const currPath = path.join(projectRoot, 'src/v51/english-curriculum-v51.ts')
  const content = fs.readFileSync(currPath, 'utf8')

  // Extraer valores de campos ipa: "/.../"
  const ipaRegex = /ipa[A-Za-z0-9_]*:\s*"\/([^"\n]+)\/"/g
  let match
  let count = 0
  while ((match = ipaRegex.exec(content)) !== null) {
    count++
    const ipa = match[1]
    if (ipa.includes("i:") || ipa.includes("u:") || ipa.includes("a:") || ipa.includes("o:") || ipa.includes("e:")) {
      throw new Error(`Transcripción IPA con ':' ASCII en vez de 'ː' Unicode: /${ipa}/`)
    }
  }

  if (count < 30) {
    throw new Error(`Se encontraron muy pocas transcripciones IPA (${count}).`)
  }

  // Verificar que "curly braces" no use la transcripción errónea /bræks/
  if (content.includes("/bræks/")) {
    throw new Error("Error fonético crítico detectado: 'braces' contiene /bræks/ en lugar de /breɪ.sɪz/.")
  }
})

// 4. Ausencia de textos meta sobre IA o parches
check("Ausencia de textos meta (IA, parches, prompts)", () => {
  const filesToCheck = [
    'src/v51/english-curriculum-v51.ts',
    'src/v52/EnglishAcademyHubV52.tsx',
    'src/v52/EnglishClassroomV52.tsx',
    'src/v52/EnglishWritingStudioV52.tsx'
  ]

  const forbiddenTerms = [
    'este componente fue generado por ia',
    'as an ai language model',
    'como modelo de lenguaje',
    'parche temporal v52',
    'código autogenerado por antigravity'
  ]

  for (const rel of filesToCheck) {
    const full = path.join(projectRoot, rel)
    const content = fs.readFileSync(full, 'utf8').toLowerCase()
    for (const term of forbiddenTerms) {
      if (content.includes(term)) {
        throw new Error(`Texto meta prohibido '${term}' detectado en: ${rel}`)
      }
    }
  }
})

console.log("\n==================================================")
console.log(" AUDITORÍA INGLÉS IT V52 COMPLETADA CON ÉXITO")
console.log("==================================================")
