# Campus Maestro V25 — Visual research & performance

## Proyectos integrados

- GSAP + ScrollTrigger: reveal editorial, parallax ligero y secuencias ligadas al scroll.
- Lenis: smooth scroll en escritorio; se desactiva en dispositivos de puntero táctil para evitar penalizar móvil.
- Howler.js: reproducción ambiental, fallback Web Audio/HTML5 Audio y auto-unlock en la primera interacción si el navegador bloquea autoplay.
- Motion for React: barra de progreso y animación de componentes React existente.
- React Three Fiber / Three.js: sistema solar original, optimizado para reducir trabajo GPU fuera del viewport.

## Referencias visuales investigadas, no instaladas completas

- React Bits: patrones de backgrounds, blur/reveal y superficies interactivas. Se recrearon de forma local para evitar importar una biblioteca grande.
- Aceternity UI: patrones de parallax, bento y background grid. Se adoptó el lenguaje visual sin copiar bloques que cambiaran la estructura de Campus.
- Canvas UI: descartado como dependencia principal porque su experiencia completa HTML-in-canvas depende de APIs experimentales/origin trial en algunos navegadores.
- r3f-scroll-rig: no se añadió al runtime general porque el Campus ya contiene un Canvas 3D y la prioridad de V25 es reducir trabajo WebGL, especialmente en móvil.
- Tempus: investigado para unificar RAF; no se parchea globalmente porque interferir con el render loop de R3F sería un riesgo innecesario para esta versión.

## Rendimiento

- El Canvas del sistema solar pasa a `frameloop="demand"` cuando sale del viewport.
- DPR máximo del sistema solar reducido de 1.65 a 1.35.
- Geometría de planetas reducida sin cambiar tamaños ni diseño.
- `sun.jpg` optimizado aproximadamente a la mitad del peso.
- `uranus-portrait.png` sustituido por WebP.
- Vídeo de perfil 1080p ~5 MB sustituido por versión 720p optimizada ~0.75 MB.
- Vídeo del perfil se carga solo cuando el usuario se acerca a la sección.
- `content-visibility:auto` en secciones inferiores para no pintar todo el documento al cargar.
- Se eliminan loops de flotación continua en cards secundarias.
- Imágenes externas mantienen lazy loading y async decoding; se añade preconnect a Unsplash.

## Audio

V25 contiene una pista ambiental original en WebM/Opus y MP3. Se intenta reproducir al entrar. Los navegadores que bloquean autoplay con sonido no permiten saltarse esa política: Howler deja el audio armado y lo inicia automáticamente en la primera interacción válida, sin mostrar botón ni pedir confirmación.
