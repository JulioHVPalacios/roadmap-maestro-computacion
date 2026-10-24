export default function RouteIllustration() {
  return <svg className="route-campus-art" viewBox="0 0 480 360" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="rm-step-front" x1="70" y1="300" x2="380" y2="70" gradientUnits="userSpaceOnUse"><stop stopColor="#b7d4ac" /><stop offset=".5" stopColor="#518c6d" /><stop offset="1" stopColor="#073f31" /></linearGradient>
      <linearGradient id="rm-step-side" x1="120" y1="300" x2="420" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#95bda1" /><stop offset="1" stopColor="#174c3d" /></linearGradient>
      <radialGradient id="rm-art-ground"><stop stopColor="#bed69c" stopOpacity=".6" /><stop offset="1" stopColor="#fffef9" stopOpacity="0" /></radialGradient>
    </defs>
    <ellipse cx="257" cy="322" rx="210" ry="33" fill="url(#rm-art-ground)" />
    <path d="M81 290V190a73 73 0 01146 0v100" fill="#edf3e4" />
    <path d="M184 280V113a87 87 0 01174 0v167" fill="#edf2e5" opacity=".8" />
    <path d="M344 281V168a45 45 0 0190 0v113" fill="#e0ebce" opacity=".6" />
    {[0, 1, 2, 3, 4, 5].map((index) => {
      const x = 83 + index * 43; const y = 281 - index * 34; const height = 23 + index * 34
      return <g key={index}><path d={`M${x} ${y}l41 -18 33 15 -41 18Z`} fill={index < 2 ? "#dce9bc" : "#a5c5aa"} /><path d={`M${x} ${y}l33 15v${height}l-33 -15Z`} fill="url(#rm-step-front)" /><path d={`M${x + 33} ${y + 15}l41 -18v${height}l-41 18Z`} fill="url(#rm-step-side)" /></g>
    })}
    <path d="M113 277C161 274 143 216 194 211S231 144 278 142 313 95 339 96" stroke="#87c52c" strokeWidth="2.5" />
    {[[113,277],[194,211],[278,142],[339,96]].map(([x,y]) => <g key={x}><circle cx={x} cy={y} r="9" fill="#d7f3a1" /><circle cx={x} cy={y} r="4.5" fill="#164b37" /></g>)}
    <path d="M346 98V41m0 3 34 11-34 12" fill="#205a43" stroke="#205a43" strokeWidth="2" strokeLinejoin="round" />
    <path d="M315 321v-78a39 39 0 0178 0v78" fill="#fffef9" /><path d="M320 321v-78a34 34 0 0168 0v78" stroke="#e0e8d6" />
    <ellipse cx="414" cy="321" rx="28" ry="8" fill="#b3c798" opacity=".4" />
    <path d="M412 306v-67m0 30c-37-3-46-37-45-47 29 0 46 17 45 47m0 13c34-4 44-32 43-43-29 0-44 19-43 43" fill="#729b6b" stroke="#517d59" strokeWidth="1.5" />
    <circle cx="411" cy="306" r="19" fill="#6a936a" />
  </svg>
}
