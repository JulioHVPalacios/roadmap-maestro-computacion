import { useMemo, useState } from "react";
import { auditCourses, auditRoutes, auditSources } from "./audit-world-data";
import { auditSummary } from "./audit-meta";
import Icon from "./Icon";

function normalized(value: string) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }

const sourceById = new Map(auditSources.map(source => [source.id, source]));

function resolveSources(raw: string) {
  return raw.split(/[;,]/).map(value => value.trim()).filter(Boolean).map(id => ({ id, source: sourceById.get(id) }));
}

export default function AuditSection(){
  const [query,setQuery]=useState("");
  const [route,setRoute]=useState("todas");
  const filtered=useMemo(()=>{
    const q=normalized(query.trim());
    return auditCourses.filter(item=>{
      const routeOk=route==="todas"||item.ruta===route;
      const queryOk=!q||normalized(`${item.id} ${item.materia} ${item.temas} ${item.area} ${item.ruta} ${item.evidencia} ${item.vigencia2026} ${item.horizonte}`).includes(q);
      return routeOk&&queryOk;
    });
  },[query,route]);

  return <section id="auditoria" className="audit-section page-section reveal-section">
    <div className="audit-ambient" aria-hidden="true"><i/><i/><i/></div>
    <div className="section-head"><span>06 · AUDITORÍA CURRICULAR MUNDIAL</span><h2>No basta con decir “completo”.<br/><em>Hay que poder demostrarlo.</em></h2><p>La auditoría se carga solo cuando llegas a esta sección para mantener rápido el campus. Conserva el catálogo mundial sin obligarte a cursar literalmente los 533 módulos: se usa como control de pérdidas al normalizar la ruta principal.</p></div>
    <div className="audit-kpis">
      <article><span>MÓDULOS NORMALIZADOS</span><strong>{auditSummary.modules}</strong><small>catálogo maestro</small></article>
      <article><span>HORAS CATALOGADAS</span><strong>{auditSummary.hours.toLocaleString("es-PE")}</strong><small>teoría + laboratorio + proyecto</small></article>
      <article><span>RUTAS MUNDIALES</span><strong>{auditSummary.routes}</strong><small>familias curriculares</small></article>
      <article><span>FUENTES REGISTRADAS</span><strong>{auditSummary.sources}</strong><small>marcos, universidades y referencias</small></article>
      <article><span>INSTITUCIONES AUDITADAS</span><strong>{auditSummary.institutionsAudited}</strong><small>{auditSummary.leaders} líderes · {auditSummary.specialists} especialistas · {auditSummary.regional} regionales</small></article>
    </div>
    <div className="audit-layout">
      <aside className="audit-routes">
        <div><span>MAPA DE COBERTURA</span><h3>17 rutas auditadas</h3><p>Selecciona una ruta para inspeccionar los módulos que respaldan su cobertura.</p></div>
        <button className={route==="todas"?"active":""} onClick={()=>setRoute("todas")}><b>Todas</b><small>{auditSummary.modules} módulos</small></button>
        {auditRoutes.map(r=><button key={r.ruta} className={route===r.ruta?"active":""} onClick={()=>setRoute(r.ruta)}><b>{r.ruta}</b><small>{r.materias} módulos · {Number(r.horas).toLocaleString("es-PE")} h</small></button>)}
      </aside>
      <div className="audit-browser">
        <div className="audit-toolbar">
          <label className="search"><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar: compiladores, Excel, 6G, bioinformática, quantum…"/></label>
          <div className="audit-result"><strong>{filtered.length}</strong><span>resultados</span></div>
        </div>
        <div className="audit-courses">
          {filtered.slice(0,36).map(item=><article key={item.id} className="audit-course">
            <header><code>{item.id}</code><span>{item.fase}</span><b>P{item.prioridad}</b></header>
            <h3>{item.materia}</h3><p>{item.temas}</p>
            <div className="audit-tags"><span>{item.ruta}</span><span>{item.area}</span><span>{item.horas} h</span><span>{item.radar2026}</span></div>
            <details><summary>Ver trazabilidad</summary><div className="trace-details"><b>Prerrequisitos</b><p>{item.prerrequisitos||"No especificados en el catálogo."}</p><b>Evidencia mínima</b><p>{item.evidencia}</p><b>Vigencia / horizonte</b><p>{item.vigencia2026} · {item.horizonte}</p><b>Señal futura</b><p>{item.senalFutura}</p><b>Fuentes registradas</b><div className="trace-sources">{resolveSources(item.fuentes).map(({id,source})=>source?<a key={id} href={source.url} target="_blank" rel="noreferrer"><span><code>{id}</code><small>{source.tipo}</small></span><strong>{source.entidad}</strong><p>{source.documento}</p><em>{source.cobertura}</em><footer><span>Snapshot: {auditSummary.snapshot}</span><span>Licencia/ubicación exacta: por verificar antes de incorporar</span><b>Abrir fuente <Icon name="link"/></b></footer></a>:<div className="trace-source-missing" key={id}><code>{id}</code><span>ID conservado, ficha humana pendiente de resolver.</span></div>)}</div></div></details>
          </article>)}
        </div>
        {filtered.length>36&&<p className="audit-more">Mostrando 36 de {filtered.length}. Usa la búsqueda o una ruta para acotar sin perder ningún registro.</p>}
      </div>
    </div>
    <div className="source-registry">
      <div className="section-head compact"><span>REGISTRO MAESTRO DE FUENTES</span><h2>{auditSummary.sources} referencias <em>con procedencia.</em></h2><p>El registro distingue “fuente catalogada” de “material legalmente incorporable”. La licencia y la ubicación exacta se verifican antes de copiar cualquier recurso al campus.</p></div>
      <div className="source-registry-grid">{auditSources.map(s=><a href={s.url} target="_blank" rel="noreferrer" key={s.id}><code>{s.id}</code><small>{s.tipo}</small><h3>{s.entidad}</h3><p>{s.documento}</p><span>{s.cobertura}</span><b>Fuente original <Icon name="link"/></b></a>)}</div>
    </div>
    <div className="gap-policy"><span>POLÍTICA DE HUECOS</span><div><b>Un nombre no cuenta como cobertura.</b><p>Un área se considera completa solo cuando queda mapeada a contenido, procedencia, práctica, evaluación y evidencia. Lo que falte seguirá visible como pendiente; no se rellena con texto inventado.</p></div></div>
  </section>;
}
