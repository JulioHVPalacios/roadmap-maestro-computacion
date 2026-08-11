import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const required=[
  'src/App.tsx','src/PerformanceRuntime.tsx','src/RealtimeUniverse.tsx','src/CinematicMap.tsx',
  'src/InteractiveVideo.tsx','src/DocumentViewer.tsx','src/EducationalViz.tsx','src/SyncCenter.tsx',
  'src/audit-world-data.ts','src/audit-integrity.ts','public/sw.js','public/site.webmanifest','docs/CAMPUS_V6_FINAL_RC.md'
];
const results=[];
const check=(name,ok,detail='')=>results.push({name,ok,detail});
for(const rel of required)check(`archivo:${rel}`,fs.existsSync(path.join(root,rel)),rel);
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
check('version-6',pkg.version==='6.0.0',pkg.version);
const sw=fs.readFileSync(path.join(root,'public/sw.js'),'utf8');
check('service-worker-v6',sw.includes('campus-maestro-v6'));
const app=fs.readFileSync(path.join(root,'src/App.tsx'),'utf8');
for(const marker of ['RealtimeUniverse','PerformanceRuntime','InteractiveVideo','DocumentViewer','EducationalViz','SyncCenter','AuditSection'])check(`app:${marker}`,app.includes(marker));
const styles=fs.readFileSync(path.join(root,'src/styles.css'),'utf8');
check('content-visibility',styles.includes('content-visibility:auto'));
check('quality-adaptive',styles.includes('[data-quality="lite"]'));
check('scroll-css-var',styles.includes('--scroll-progress'));
const audit=fs.readFileSync(path.join(root,'src/audit-world-data.ts'),'utf8');
check('audit-533-marker',audit.includes('533')||audit.match(/id:/g)?.length>500,'catálogo presente');
const failed=results.filter(r=>!r.ok);
const report={generatedAt:new Date().toISOString(),version:pkg.version,total:results.length,passed:results.length-failed.length,failed:failed.length,results};
fs.writeFileSync(path.join(root,'qa-report.json'),JSON.stringify(report,null,2));
console.log(`Campus Maestro QA: ${report.passed}/${report.total} checks PASS`);
if(failed.length){for(const item of failed)console.error('FAIL',item.name,item.detail);process.exit(1)}
