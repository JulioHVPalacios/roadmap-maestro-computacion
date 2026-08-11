import type { ReactNode, SVGProps } from "react";

export type IconName = "home"|"map"|"library"|"layers"|"shield"|"search"|"moon"|"sun"|"play"|"file"|"lab"|"check"|"note"|"link"|"spark"|"menu"|"close"|"cloud"|"pause"|"code"|"cpu"|"database"|"brain"|"network"|"robot"|"palette"|"flask"|"settings"|"volume"|"maximize"|"download"|"upload"|"wifi"|"device"|"rotate"|"zoom"|"monitor";

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
  pause:<><circle cx="12" cy="12" r="9"/><path d="M9.5 8.5v7M14.5 8.5v7"/></>,
  code:<><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/></>,
  cpu:<><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3M10 10h4v4h-4z"/></>,
  database:<><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></>,
  brain:<><path d="M9.5 5.5A3 3 0 0 0 4 7a3.5 3.5 0 0 0 1 6.8A3.5 3.5 0 0 0 10 19V5.8M14.5 5.5A3 3 0 0 1 20 7a3.5 3.5 0 0 1-1 6.8A3.5 3.5 0 0 1 14 19V5.8M8 10h2M14 10h2M8 14h2M14 14h2"/></>,
  network:<><circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="m7 11 10-4M7 13l10 4"/></>,
  robot:<><rect x="5" y="7" width="14" height="12" rx="3"/><path d="M9 3h6M12 3v4M9 12h.01M15 12h.01M9 16h6"/></>,
  palette:<><path d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h4a5 5 0 0 0 5-5c0-3-4-5-9-5Z"/><path d="M7.5 9h.01M9.5 6h.01M13 6h.01"/></>,
  flask:<><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8"/></>,
  settings:<><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1A7 7 0 0 0 15 6l-.3-2.5h-4L10.4 6a7 7 0 0 0-1.5 1.1l-2.4-1-2 3.4L6.6 11a7 7 0 0 0 0 2l-2.1 1.5 2 3.4 2.4-1A7 7 0 0 0 10.4 18l.3 2.5h4L15 18a7 7 0 0 0 1.5-1.1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z"/></>,
  volume:<><path d="M5 10v4h3l4 4V6l-4 4Z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></>,
  maximize:<><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/></>,
  download:<><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></>,
  upload:<><path d="M12 21V9M7 14l5-5 5 5"/><path d="M5 3h14"/></>,
  wifi:<><path d="M4 9a12 12 0 0 1 16 0M7 12a8 8 0 0 1 10 0M10 15a4 4 0 0 1 4 0"/><circle cx="12" cy="19" r="1"/></>,
  device:<><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 6h6M10 18h4"/></>,
  rotate:<><path d="M20 7v5h-5"/><path d="M19 12a7 7 0 1 1-2-5l3 3"/></>,
  zoom:<><circle cx="11" cy="11" r="6"/><path d="m16 16 5 5M8 11h6M11 8v6"/></>,
  monitor:<><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></>,
};

export default function Icon({name,...props}:Props){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>}
