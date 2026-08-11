export type MediaAsset = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  image: string;
  sourcePage: string;
  license: string;
  credit: string;
  accent: string;
};

export const mediaAssets: MediaAsset[] = [
  {
    id: "historia",
    kicker: "PASADO · FUNDAMENTOS",
    title: "De ENIAC a la computación moderna",
    description: "La historia se usa como contexto técnico: arquitectura, programación, automatización y evolución de paradigmas.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Reprogramming_ENIAC.png/960px-Reprogramming_ENIAC.png",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Reprogramming_ENIAC.png",
    license: "Dominio público · Gobierno de EE. UU.",
    credit: "U.S. Army / ARL Technical Library",
    accent: "#7d8cff",
  },
  {
    id: "infraestructura",
    kicker: "PRESENTE · INFRAESTRUCTURA",
    title: "Supercomputación e infraestructura real",
    description: "El campus conecta teoría con sistemas reales: servidores, redes, almacenamiento, HPC, cloud, observabilidad y operación.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Pleiades_supercomputer.jpg/1280px-Pleiades_supercomputer.jpg",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Pleiades_supercomputer.jpg",
    license: "Dominio público · NASA",
    credit: "Marco Librero / NASA Ames Research Center",
    accent: "#2bd0ff",
  },
  {
    id: "sistemas",
    kicker: "OPERACIÓN · SISTEMAS",
    title: "Del rack al servicio distribuido",
    description: "Cada etapa profesional debe terminar en evidencia reproducible: arquitectura, despliegue, pruebas, diagnóstico y documentación.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Datacenter.jpg/960px-Datacenter.jpg",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Datacenter.jpg",
    license: "Dominio público",
    credit: "Wil Weterings",
    accent: "#5a7dff",
  },
  {
    id: "frontera",
    kicker: "FRONTERA · ROBÓTICA",
    title: "Computación que toca el mundo físico",
    description: "Robótica, embebidos, control, visión, telecom, computación científica y sistemas ciberfísicos extienden la ruta hacia investigación.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Robotic_Arm.jpg",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Robotic_Arm.jpg",
    license: "Dominio público · NASA",
    credit: "NASA/JPL/UA/Lockheed Martin",
    accent: "#b66cff",
  },
];
