// Abstract line-art used in place of screenshots. Every drawing uses
// currentColor so it follows the theme, on a 100x100 viewBox.
const polar = (cx, cy, r, deg) => [
  cx + r * Math.cos((deg * Math.PI) / 180),
  cy + r * Math.sin((deg * Math.PI) / 180),
];

const art = {
  // Three frames; the dashed middle one is synthesised.
  interpolate: (
    <>
      <rect x="6" y="28" width="22" height="44" rx="2" />
      <rect x="39" y="28" width="22" height="44" rx="2" strokeDasharray="2 2" opacity="0.6" />
      <rect x="72" y="28" width="22" height="44" rx="2" />
      <circle cx="17" cy="60" r="4" fill="currentColor" opacity="0.7" />
      <circle cx="50" cy="50" r="4" strokeDasharray="1.5 1.5" />
      <circle cx="83" cy="40" r="4" fill="currentColor" opacity="0.7" />
      <path d="M21 60 Q50 20 79 40" strokeDasharray="1 2.5" opacity="0.5" />
    </>
  ),
  // Moon and a dark-to-bright ramp.
  lowlight: (
    <>
      <path d="M62 18a22 22 0 1 0 14 38 18 18 0 0 1-14-38Z" opacity="0.9" />
      <circle cx="26" cy="22" r="1.2" fill="currentColor" />
      <circle cx="40" cy="12" r="0.9" fill="currentColor" opacity="0.6" />
      <circle cx="14" cy="40" r="0.9" fill="currentColor" opacity="0.6" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={12 + i * 10} y="74" width="6" height="14" rx="1" fill="currentColor" opacity={0.08 + i * 0.12} />
      ))}
    </>
  ),
  // Sharp centre, rings that blur outwards, depth lines.
  defocus: (
    <>
      <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.5" />
      <circle cx="50" cy="50" r="8" strokeWidth="1" />
      <circle cx="50" cy="50" r="18" opacity="0.7" strokeDasharray="6 2" />
      <circle cx="50" cy="50" r="28" opacity="0.5" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="38" opacity="0.3" strokeDasharray="1 4" />
      {[45, 135, 225, 315].map((a) => {
        const [x1, y1] = polar(50, 50, 12, a);
        const [x2, y2] = polar(50, 50, 44, a);
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.25" />;
      })}
    </>
  ),
  // Jagged noisy trace resolved into a clean wave.
  denoise: (
    <>
      <polyline
        points="8,26 14,18 20,32 26,14 32,34 38,16 44,30 50,12 56,32 62,18 68,34 74,14 80,30 86,20 92,28"
        opacity="0.45"
      />
      <path d="M50 42v12M44 49l6 6 6-6" strokeWidth="1" />
      <path d="M8 74 Q21 58 33 74 T58 74 T92 74" strokeWidth="1" />
      <circle cx="8" cy="74" r="2.2" fill="currentColor" opacity="0.6" />
      <circle cx="92" cy="74" r="2.2" fill="currentColor" opacity="0.6" />
    </>
  ),
};

export default function Art({ name, className = "" }) {
  return (
    <svg
      className={`art ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {art[name]}
    </svg>
  );
}

// Aperture-style symbol for the hero: a lens that is also a small network.
export function HeroSymbol() {
  const outer = [0, 60, 120, 180, 240, 300].map((a) => polar(100, 100, 60, a));
  const inner = [30, 150, 270].map((a) => polar(100, 100, 34, a));
  return (
    <svg
      className="hero-symbol"
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="86" strokeDasharray="1 5" opacity="0.5" />
      <circle cx="100" cy="100" r="72" strokeDasharray="5 5" opacity="0.3" />
      <polygon className="draw" points={outer.map((p) => p.join(",")).join(" ")} opacity="0.7" />
      {outer.map(([x, y], i) => (
        <g key={i}>
          <line x1="100" y1="100" x2={x} y2={y} opacity="0.18" />
          <circle cx={x} cy={y} r="4" fill="currentColor" opacity="0.45" />
        </g>
      ))}
      <polygon
        className="draw"
        points={inner.map((p) => p.join(",")).join(" ")}
        strokeDasharray="3 3"
        opacity="0.6"
      />
      {inner.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" opacity="0.6" />
          <circle cx={x} cy={y} r="2" fill="currentColor" opacity="0.6" />
        </g>
      ))}
      <circle cx="100" cy="100" r="12" strokeWidth="1" />
      <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.85" />
    </svg>
  );
}
