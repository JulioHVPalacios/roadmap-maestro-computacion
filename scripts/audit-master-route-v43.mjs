import fs from 'node:fs/promises'
import path from 'node:path'

const urls = [
  ['CS2023','https://csed.acm.org/'],
  ['FING 2025','https://www.iie.fing.edu.uy/index.php/en/carrera/grado/ingenier%C3%ADa-en-computaci%C3%B3n'],
  ['FAMAF LCC','https://famaf.unc.edu.ar/academica/grado/licenciatura-en-ciencias-de-la-computaci%C3%B3n/'],
  ['UNLP LI','https://www.info.unlp.edu.ar/licenciatura-en-informatica-plan-2021/'],
  ['SWEBOK','https://www.computer.org/education/bodies-of-knowledge/software-engineering'],
  ['SEBoK','https://sebokwiki.org/wiki/Guide_to_the_Systems_Engineering_Body_of_Knowledge_(SEBoK)'],
  ['NIST NICE','https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/nice-framework-current-versions'],
  ['OpenFING','https://open.fing.edu.uy/courses/'],
  ['FAMAF Resources','https://github.com/FAMAF-resources/Welcome'],
  ['UNLP GitLab','https://gitlab.com/menduinajuan/Licenciatura_en_Informatica_UNLP'],
  ['UBA GitLab','https://gitlab.com/valn/uba'],
  ['UTN GitLab','https://gitlab.com/briancol07/utn'],
  ['FIUBA IA','https://github.com/FIUBA-Posgrado-Inteligencia-Artificial'],
  ['OSSU CS','https://github.com/ossu/computer-science'],
  ['OSSU Math','https://github.com/ossu/math'],
  ['OSSU Data Science','https://github.com/ossu/data-science'],
  ['Full Stack Open','https://fullstackopen.com/es/'],
  ['The Odin Project','https://www.theodinproject.com/'],
  ['freeCodeCamp','https://www.freecodecamp.org/learn/'],
  ['Microsoft Learn','https://learn.microsoft.com/es-es/training/browse/'],
  ['Cisco NetAcad','https://www.netacad.com/'],
  ['roadmap.sh','https://roadmap.sh/'],
  ['UOC repo','https://github.com/HenestrosaDev/uoc-ingenieria-informatica'],
  ['DS Research Peru','https://github.com/DataScienceResearchPeru/OpenSource-RoadMap-DataScience'],
  ['Ingeniería de Datos','https://github.com/caroacostatovany/ingenieria-de-datos'],
]

async function probe([name,url]) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 12000)
  try {
    let response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal, headers: { 'user-agent': 'Campus-Maestro-V43-Auditor/1.0' } })
    if (response.status === 405 || response.status === 403 || response.status >= 500) {
      response = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal, headers: { 'user-agent': 'Campus-Maestro-V43-Auditor/1.0', range: 'bytes=0-1024' } })
    }
    return { name, url, ok: response.ok, status: response.status, finalUrl: response.url }
  } catch (error) {
    return { name, url, ok: false, status: 0, error: error?.name === 'AbortError' ? 'timeout' : String(error?.message ?? error) }
  } finally {
    clearTimeout(timeout)
  }
}

const results = []
for (let i = 0; i < urls.length; i += 5) {
  results.push(...await Promise.all(urls.slice(i, i + 5).map(probe)))
}

const now = new Date().toISOString()
const ok = results.filter(x => x.ok).length
const report = [
  '# Campus Maestro V43 · Auditoría de fuentes',
  '',
  `Fecha: ${now}`,
  `Disponibles: ${ok}/${results.length}`,
  '',
  '| Estado | Fuente | HTTP | URL final |',
  '|---|---|---:|---|',
  ...results.map(r => `| ${r.ok ? '✅' : '⚠️'} | ${r.name} | ${r.status || '-'} | ${r.finalUrl ?? r.url} |`),
  '',
  '> Un fallo puede significar bloqueo de bots, rate-limit o mantenimiento; no implica automáticamente que el recurso haya desaparecido.',
].join('\n')

const reportDir = path.resolve('reports')
await fs.mkdir(reportDir, { recursive: true })
await fs.writeFile(path.join(reportDir, 'v43-source-audit.md'), report, 'utf8')
await fs.writeFile(path.join(reportDir, 'v43-source-audit.json'), JSON.stringify({ generatedAt: now, results }, null, 2), 'utf8')
console.log(report)
