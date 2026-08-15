import { Bug, ExternalLink, HelpCircle, Mail, MessageCircle, ShieldCheck } from "lucide-react"
import { IconBrandGithub } from "@tabler/icons-react"
import ProceduralBackdrop from "./ProceduralBackdrop"

const faqs = [
  ["¿Campus Maestro es gratuito?", "La plataforma está diseñada para priorizar recursos y herramientas sin costo obligatorio."],
  ["¿Dónde reporto un error?", "Usa GitHub Issues para que el problema quede documentado, pueda reproducirse y se pueda cerrar cuando esté resuelto."],
  ["¿Puedo sugerir una mejora?", "Sí. Describe el problema que resolvería, la sección afectada y el comportamiento que esperas."],
  ["¿Puedo estudiar desde celular?", "Sí. La interfaz se mantiene responsive y las nuevas prácticas evitan depender de un editor exclusivo de escritorio."],
]

export default function SupportHubV41() {
  return (
    <main className="v41-learning-page v41-support-page">
      <section className="v41-learning-hero compact-support">
        <ProceduralBackdrop variant="green" />
        <div className="v41-learning-hero-copy"><span>SOPORTE · CONTACTO · CONTRIBUCIONES</span><h1>¿Algo falló?<br /><em>Déjalo rastreable.</em></h1><p>Un punto único para reportar errores, proponer mejoras, consultar dudas y contactar al proyecto sin mezclar soporte con el contenido académico.</p></div>
      </section>

      <section className="v41-section">
        <div className="v41-support-grid">
          <a href="https://github.com/JulioHVPalacios/roadmap-maestro-computacion/issues" target="_blank" rel="noreferrer"><Bug /><span>ERRORES</span><h2>Reportar un problema</h2><p>Capturas, pasos para reproducir, dispositivo y resultado esperado.</p><b>Abrir GitHub Issues <ExternalLink /></b></a>
          <a href="https://github.com/JulioHVPalacios/roadmap-maestro-computacion" target="_blank" rel="noreferrer"><IconBrandGithub /><span>PROYECTO</span><h2>Repositorio</h2><p>Código, historial, versiones, automatizaciones y contribuciones.</p><b>Abrir GitHub <ExternalLink /></b></a>
          <a href="mailto:juliopalacios9814@gmail.com"><Mail /><span>CONTACTO</span><h2>Correo</h2><p>Para consultas que no correspondan a un issue técnico público.</p><b>Escribir correo</b></a>
          <a href="https://wa.me/51900375447" target="_blank" rel="noreferrer"><MessageCircle /><span>CONTACTO DIRECTO</span><h2>WhatsApp</h2><p>Canal de contacto del perfil del proyecto.</p><b>Abrir WhatsApp <ExternalLink /></b></a>
        </div>
      </section>

      <section className="v41-section v41-faq">
        <div className="v41-section-head"><div><span>FAQ</span><h2>Antes de preguntar,<br />revisa esto.</h2></div><p>Preguntas frecuentes del Campus y del flujo de soporte.</p></div>
        <div className="v41-faq-grid">{faqs.map(([question, answer]) => <details key={question}><summary><HelpCircle />{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
        <div className="v41-support-note"><ShieldCheck /><div><b>Privacidad y seguridad</b><p>No publiques contraseñas, tokens, claves API, datos personales sensibles ni credenciales dentro de un Issue público.</p></div></div>
      </section>
    </main>
  )
}
