export const routeSections = [
  { id: "recorrido", label: "Mi recorrido", group: "Estudiar", title: "Un paso a la vez.", subtitle: "Tu próximo objetivo y lo que necesitas para avanzar." },
  { id: "plan", label: "Plan de estudios", group: "Estudiar", title: "Una base que conecta todo.", subtitle: "Explora las 20 etapas y entra a estudiar una materia." },
  { id: "especialidades", label: "Especialidades", group: "Estudiar", title: "Elige dónde profundizar.", subtitle: "Doce recorridos de especialización y sus prerrequisitos." },
  { id: "reparacion", label: "Reparación y electrónica", group: "Estudiar", title: "Comprender para reparar.", subtitle: "Del diagnóstico seguro a la práctica por dispositivo." },
  { id: "repaso", label: "Repaso espaciado", group: "Estudiar", title: "Vuelve a lo importante.", subtitle: "Recupera y consolida los conocimientos de tus materias." },
  { id: "fuentes", label: "Fuentes de estudio", group: "Consultar", title: "Pocas fuentes. Bien elegidas.", subtitle: "Compara qué aporta cada recurso, su idioma y sus condiciones." },
  { id: "catalogo", label: "Catálogo completo", group: "Consultar", title: "Todo el plan, a tu alcance.", subtitle: "533 materias en 17 familias para consultar y planificar." },
  { id: "evidencias", label: "Mis evidencias", group: "Consultar", title: "Tu aprendizaje deja huella.", subtitle: "Revisa lo que has registrado y los criterios de dominio." },
  { id: "mapa", label: "Carretera y mapa", group: "Explorar", title: "Una ruta. Dos perspectivas.", subtitle: "Recorre el campus 3D o explora las dependencias del mapa académico." },
  { id: "academia", label: "Atlas y cobertura", group: "Explorar", title: "Descubre las conexiones.", subtitle: "Profesiones, áreas, dependencias y referencias del plan." },
  { id: "investigacion", label: "Investigación", group: "Explorar", title: "De aprender a contribuir.", subtitle: "Profundiza, reproduce resultados y plantea preguntas propias." },
] as const
export type RouteSection = typeof routeSections[number]["id"]
export const isRouteSection = (value: string | null): value is RouteSection => routeSections.some((item) => item.id === value)
export const planBlocks = [
  { title: "Preparación", detail: "Herramientas, hábitos y nivelación", start: 0, end: 0 },
  { title: "Fundamentos", detail: "Matemática y programación", start: 1, end: 3 },
  { title: "Núcleo computacional", detail: "Sistemas, algoritmos e ingeniería", start: 4, end: 6 },
  { title: "Integración profesional", detail: "Software, infraestructura y sistemas", start: 7, end: 10 },
  { title: "Profundización", detail: "Datos, IA, electrónica y otras áreas", start: 11, end: 18 },
  { title: "Investigación y frontera", detail: "Método, contribución y actualización", start: 19, end: 19 },
] as const
