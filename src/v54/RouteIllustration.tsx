export default function RouteIllustration() {
  return <svg className="route-campus-art" viewBox="0 0 560 330" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="campusSky" x1="0" y1="0" x2="560" y2="330" gradientUnits="userSpaceOnUse"><stop stopColor="#e8eee2" /><stop offset="1" stopColor="#c3d8c2" /></linearGradient>
      <linearGradient id="campusGround" x1="0" y1="150" x2="560" y2="330" gradientUnits="userSpaceOnUse"><stop stopColor="#c5d7b9" /><stop offset="1" stopColor="#81a78a" /></linearGradient>
    </defs>
    <rect width="560" height="330" rx="24" fill="url(#campusSky)" />
    <circle cx="455" cy="70" r="40" fill="#fffef9" opacity=".65" />
    <path d="M0 200 118 139 258 196 379 121 560 183V330H0Z" fill="url(#campusGround)" />
    <path d="M-20 304C76 279 177 309 204 254S73 179 157 163 263 222 325 178 377 111 433 134 477 205 580 162" stroke="#7b9982" strokeWidth="51" />
    <path d="M-20 300C76 275 177 305 204 250S73 175 157 159 263 218 325 174 377 107 433 130 477 201 580 158" stroke="#f6f7e9" strokeWidth="37" />
    <path d="M-20 300C76 275 177 305 204 250S73 175 157 159 263 218 325 174 377 107 433 130 477 201 580 158" stroke="#a3b09a" strokeWidth="1.5" strokeDasharray="7 7" />
    {[[106, 210, 44], [265, 115, 57], [430, 79, 68]].map(([x,y,h], i) => <g key={x}>
      <path d={`M${x-22} ${y+47}l44 -22 45 22 -45 23Z`} fill="#71947c" opacity=".3" />
      <path d={`M${x} ${y+32}v-${h}l30 -15v${h}Z`} fill={i === 0 ? "#aaca54" : "#d2decb"} />
      <path d={`M${x+30} ${y+17}l29 15v-${h}l-29 -15Z`} fill={i === 0 ? "#779b43" : "#a4b89f"} />
      <path d={`M${x} ${y+32-h}l30 -15 29 15 -29 15Z`} fill={i === 0 ? "#d8ff4f" : "#fffef9"} />
      {[0,1,2].map(j => <path key={j} d={`M${x+8+j*7} ${y+24}v-${h-14}`} stroke={i === 0 ? "#f1ffc2" : "#fffef9"} strokeWidth="3" />)}
      <path d={`M${x+34} ${y+10}v-${h-15}m8 19v-${h-30}m8 34v-${h-44}`} stroke="#6e927d" strokeWidth="3" />
    </g>)}
    {[[40,214],[67,237],[235,255],[270,253],[348,210],[364,227],[476,229],[510,215],[504,115],[530,127],[191,106],[211,112],[31,264]].map(([x,y]) => <g key={`${x}-${y}`}><ellipse cx={x} cy={y+10} rx="10" ry="5" fill="#60866d" opacity=".3" /><path d={`M${x} ${y+6}v-19`} stroke="#456b54" strokeWidth="3" /><path d={`M${x} ${y-34}l-11 29h22Z`} fill="#467f5b" /><path d={`M${x} ${y-34}v29h11Z`} fill="#2d6346" /></g>)}
    <path d="M53 82h127M53 89h72" stroke="#83a18b" strokeWidth="1" />
    <text x="53" y="64" fill="#43664c" fontFamily="monospace" fontSize="10" letterSpacing="2">UN CAMINO ABIERTO</text>
    <g transform="translate(99 150)"><rect width="36" height="24" rx="7" fill="#183f2e" /><text x="18" y="16" textAnchor="middle" fill="#e1ff8c" fontFamily="monospace" fontSize="11">S0</text></g>
    <g transform="translate(268 34)"><rect width="42" height="24" rx="7" fill="#fffef9" /><text x="21" y="16" textAnchor="middle" fill="#33533d" fontFamily="monospace" fontSize="11">S10</text></g>
    <g transform="translate(439 6)"><rect width="42" height="24" rx="7" fill="#fffef9" /><text x="21" y="16" textAnchor="middle" fill="#33533d" fontFamily="monospace" fontSize="11">S19</text></g>
  </svg>
}
