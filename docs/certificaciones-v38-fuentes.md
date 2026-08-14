# Campus Maestro V38 · política de Certificaciones y Cursos

## Objetivo
Mantener un catálogo vivo que priorice español y gratuidad real, sin confundir formación gratuita con exámenes profesionales de pago.

## Fuentes oficiales integradas
IBM SkillsBuild, HP LIFE, Santander Open Academy, HubSpot Academy, Google Skillshop, Microsoft Learn / Applied Skills, Cisco Networking Academy, AWS Skill Builder, CAPACÍTA-T (MTPE Perú), Empleos Perú, Fundación Carlos Slim, OpenLearn, MongoDB University, Saylor University, Fortinet Training Institute, SAP Learning, freeCodeCamp, Platzi, Neo4j GraphAcademy, Kaggle Learn, GitLab University, GitHub Skills, Fazt, MoureDev, midudev, The Odin Project, HolaMundo (contenido abierto) y Meta Blueprint.

## Repositorios usados como motores de descubrimiento
- PanXProject/awesome-certificates
- ArslanYM/Free-Certifications
- munchy-bytes/FreeDevCertifications

Estos repositorios NO son autoridad final. Campus Maestro extrae candidatos y solo publica un candidato comunitario después de:
1. resolver su URL oficial;
2. comprobar que responde y no está archivada/cerrada;
3. detectar en la página oficial evidencia de gratuidad;
4. detectar evidencia de certificado, certificación, credencial o badge;
5. deduplicar por URL y por título/proveedor.

## Etiquetado honesto
- `credentialFree=true`: la credencial/certificado está marcado como gratuito.
- `courseFree=true, credentialFree=false`: el aprendizaje es gratuito, pero la certificación profesional no se afirma gratuita.

Ejemplos: The Odin Project no expide certificado; MoureDev ofrece cursos públicos gratuitos pero su certificado pertenece a MoureDev Pro; GitLab University tiene formación self-paced gratuita y exámenes profesionales de pago; Meta Blueprint ofrece materiales gratuitos y la certificación profesional se trata aparte.

## Actualización
El workflow `.github/workflows/update-certifications.yml` ejecuta diariamente la auditoría, vuelve a descubrir opciones, elimina ofertas claramente inactivas, regenera imágenes/capturas y publica el nuevo build de GitHub Pages.
