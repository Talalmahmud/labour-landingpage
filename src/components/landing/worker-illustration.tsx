export function WorkerIllustration() {
  return (
    <svg
      viewBox="0 0 360 460"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of a construction worker wearing a hard hat, arms crossed, holding a wrench"
    >
      <defs>
        <clipPath id="skylineClip">
          <rect x="0" y="0" width="360" height="460" rx="24" />
        </clipPath>
      </defs>

      <g clipPath="url(#skylineClip)">
        <circle cx="180" cy="170" r="170" className="fill-blue-950" />
        <g className="fill-blue-800/40">
          <rect x="0" y="330" width="46" height="130" />
          <rect x="52" y="300" width="40" height="160" />
          <rect x="270" y="310" width="42" height="150" />
          <rect x="318" y="280" width="42" height="180" />
        </g>
        <g className="fill-blue-700/30">
          <rect x="6" y="345" width="8" height="10" />
          <rect x="20" y="345" width="8" height="10" />
          <rect x="6" y="365" width="8" height="10" />
          <rect x="20" y="365" width="8" height="10" />
          <rect x="60" y="315" width="8" height="10" />
          <rect x="74" y="315" width="8" height="10" />
          <rect x="60" y="335" width="8" height="10" />
          <rect x="74" y="335" width="8" height="10" />
          <rect x="278" y="325" width="8" height="10" />
          <rect x="292" y="325" width="8" height="10" />
          <rect x="326" y="295" width="8" height="10" />
          <rect x="340" y="295" width="8" height="10" />
        </g>
      </g>

      {/* legs */}
      <path d="M140 330 L136 452 Q136 460 144 460 L166 460 Q172 460 172 452 L172 340 Z" className="fill-blue-950" />
      <path d="M220 330 L224 452 Q224 460 216 460 L194 460 Q188 460 188 452 L188 340 Z" className="fill-blue-950" />
      <rect x="132" y="440" width="44" height="20" rx="6" className="fill-slate-800" />
      <rect x="184" y="440" width="44" height="20" rx="6" className="fill-slate-800" />

      {/* torso */}
      <path
        d="M124 220 Q120 320 140 340 L220 340 Q240 320 236 220 Q230 190 180 186 Q130 190 124 220 Z"
        className="fill-blue-900"
      />
      {/* overall straps */}
      <rect x="150" y="200" width="12" height="90" rx="4" className="fill-blue-950/70" />
      <rect x="198" y="200" width="12" height="90" rx="4" className="fill-blue-950/70" />
      <rect x="150" y="270" width="60" height="14" rx="4" className="fill-blue-950/70" />
      {/* pocket */}
      <rect x="196" y="250" width="26" height="20" rx="3" className="fill-blue-950/50" />

      {/* back arm (behind torso, crossed) */}
      <path
        d="M132 230 Q100 250 108 285 Q112 300 140 302 L172 292 Q160 270 150 250 Z"
        className="fill-blue-900"
      />

      {/* neck */}
      <rect x="164" y="150" width="32" height="34" rx="10" className="fill-amber-800/80" />

      {/* head */}
      <circle cx="180" cy="128" r="34" className="fill-amber-700" />

      {/* hard hat */}
      <path d="M144 118 Q180 78 216 118 L216 122 L144 122 Z" className="fill-amber-400" />
      <rect x="138" y="118" width="84" height="10" rx="5" className="fill-amber-500" />
      <rect x="174" y="96" width="12" height="10" rx="2" className="fill-amber-500" />

      {/* front arm crossed with wrench */}
      <path
        d="M226 232 Q262 248 258 282 Q254 300 224 300 L188 292 Q206 262 214 240 Z"
        className="fill-blue-900"
      />
      <circle cx="228" cy="296" r="15" className="fill-amber-700" />
      <circle cx="150" cy="298" r="15" className="fill-amber-700" />

      {/* wrench */}
      <g transform="translate(196 300) rotate(-28)">
        <rect x="-8" y="-46" width="16" height="70" rx="4" className="fill-slate-300" />
        <circle cx="0" cy="-46" r="12" className="fill-slate-300" />
        <circle cx="0" cy="-46" r="5" className="fill-blue-950" />
      </g>

      {/* smile */}
      <path d="M168 138 Q180 146 192 138" stroke="#3b2412" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="167" cy="122" r="3" className="fill-blue-950" />
      <circle cx="193" cy="122" r="3" className="fill-blue-950" />
    </svg>
  );
}
