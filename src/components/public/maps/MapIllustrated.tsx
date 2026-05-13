export function MapIllustrated() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[var(--ocean)]">
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-label="Carte illustrée — Cabane 135, Nieul-sur-Mer"
      >
        <defs>
          <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a1628" />
            <stop offset="100%" stopColor="#163a55" />
          </linearGradient>
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f2035" />
            <stop offset="100%" stopColor="#0d1b30" />
          </linearGradient>
          <pattern
            id="waveTexture"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 20 Q10 16 20 20 T40 20"
              stroke="rgba(0,184,217,0.10)"
              strokeWidth="0.8"
              fill="none"
            />
            <path
              d="M0 32 Q10 28 20 32 T40 32"
              stroke="rgba(0,184,217,0.06)"
              strokeWidth="0.6"
              fill="none"
            />
          </pattern>
        </defs>

        <rect width="800" height="600" fill="url(#seaGradient)" />
        <rect width="800" height="600" fill="url(#waveTexture)" />

        <path
          d="M0 0 L800 0 L800 220 Q650 240 540 260 Q420 280 320 270 Q200 260 100 290 Q40 310 0 320 Z"
          fill="url(#landGradient)"
          opacity="0.95"
        />
        <path
          d="M0 320 Q40 310 100 290 Q200 260 320 270 Q420 280 540 260 Q650 240 800 220"
          stroke="rgba(200,161,90,0.35)"
          strokeWidth="1.2"
          fill="none"
        />

        <g opacity="0.55" fontFamily="serif" fontSize="11" fill="rgba(242,236,224,0.65)" letterSpacing="2">
          <text x="80" y="120">LAUZIÈRES</text>
          <text x="80" y="135" fontSize="9" fill="rgba(242,236,224,0.4)">
            7 km
          </text>

          <text x="430" y="170">L A&nbsp;&nbsp; R O C H E L L E</text>
          <text x="430" y="184" fontSize="9" fill="rgba(242,236,224,0.4)">
            8 km
          </text>

          <text x="660" y="420" textAnchor="middle" fontSize="10" fill="rgba(0,184,217,0.55)">
            ATLANTIQUE
          </text>
        </g>

        <g transform="translate(380, 305)">
          <line
            x1="0"
            y1="-50"
            x2="0"
            y2="-12"
            stroke="rgba(200,161,90,0.4)"
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />
          <text
            x="0"
            y="-58"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="9"
            fill="rgba(200,161,90,0.85)"
            letterSpacing="3"
          >
            NIEUL-SUR-MER
          </text>
          <text
            x="0"
            y="14"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="56"
            fontWeight="500"
            fill="#00b8d9"
            style={{
              filter: "drop-shadow(0 2px 6px rgba(10,22,40,0.6))",
            }}
          >
            135
          </text>
          <text
            x="0"
            y="44"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="10"
            fontStyle="italic"
            fill="rgba(242,236,224,0.7)"
          >
            rue du Port
          </text>
        </g>

        <g opacity="0.4" fontFamily="serif" fontSize="9" fill="rgba(0,184,217,0.5)" letterSpacing="2">
          <text x="600" y="500">↗ océan</text>
          <text x="120" y="490">↙ marais</text>
        </g>
      </svg>
    </div>
  );
}
