import type { ReactNode, SVGProps } from "react";

export type IconName = "home"|"map"|"library"|"layers"|"shield"|"search"|"moon"|"sun"|"play"|"file"|"lab"|"check"|"note"|"link"|"spark"|"menu"|"close"|"cloud";

type Props = SVGProps<SVGSVGElement> & { name: IconName };

const paths: Record<IconName, ReactNode> = {
  home:<><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-6h5v6"/></>,
  map:<><path d="m3 6 5-2 8 3 5-2v13l-5 2-8-3-5 2Z"/><path d="M8 4v13M16 7v13"/></>,
  library:<><path d="M4 5h5v14H4zM10.5 5h4v14h-4z"/><path d="m16 6 3-1 3 13-3 1Z"/></>,
  layers:<><path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
  shield:<><path d="M12 3 20 6v6c0 5-3.2 8-8 9-4.8-1-8-4-8-9V6Z"/><path d="m9 12 2 2 4-4"/></>,
  search:<><circle cx="11" cy="11" r="6"/><path d="m16 16 5 5"/></>,
  moon:<><path d="M20 15.5A8 8 0 1 1 8.5 4 6.5 6.5 0 0 0 20 15.5Z"/></>,
  sun:<><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></>,
  play:<><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4Z"/></>,
  file:<><path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></>,
  lab:<><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M8 15h8"/></>,
  check:<><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></>,
  note:<><path d="M5 4h14v16H5Z"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
  link:<><path d="M10 13a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5"/><path d="M14 11a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 19.7l1.5-1.5"/></>,
  spark:<><path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8Z"/><path d="m18.5 15 .7 2.1L21 18l-1.8.9-.7 2.1-.7-2.1L16 18l1.8-.9Z"/></>,
  menu:<><path d="M4 7h16M4 12h16M4 17h16"/></>,
  close:<><path d="m6 6 12 12M18 6 6 18"/></>,
  cloud:<><path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 8.5 4.5 4.5 0 0 0 7 18Z"/></>,
};

export default function Icon({name,...props}:Props){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>}
