import {auditCourses,auditRoutes,auditSources} from "./audit-world-data";
const ids=new Set(auditCourses.map(x=>x.id));
const sourceIds=new Set(auditSources.map(x=>x.id));
const duplicates=auditCourses.length-ids.size;
const badHours=auditCourses.filter(x=>!Number.isFinite(x.horas)||x.horas<=0).map(x=>x.id);
const brokenPrereqs=auditCourses.flatMap(x=>(x.prerrequisitos.match(/[A-Z]{2,5}-\d{3}/g)||[]).filter(id=>!ids.has(id)).map(id=>`${x.id}→${id}`));
const brokenSources=auditCourses.flatMap(x=>x.fuentes.split(/[;,]/).map(v=>v.trim()).filter(Boolean).filter(id=>!sourceIds.has(id)).map(id=>`${x.id}→${id}`));
const routeMismatches=auditRoutes.flatMap(r=>{const courses=auditCourses.filter(x=>x.ruta===r.ruta);const hours=courses.reduce((n,x)=>n+x.horas,0);return courses.length===r.materias&&hours===r.horas?[]:[`${r.ruta}: ${courses.length}/${r.materias} módulos, ${hours}/${r.horas} h`]});
export const auditIntegrity={duplicates,badHours,brokenPrereqs,brokenSources,routeMismatches,structuralOk:duplicates===0&&badHours.length===0&&brokenPrereqs.length===0&&brokenSources.length===0&&routeMismatches.length===0};
