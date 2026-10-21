/** Decorative resource layers: no scores or product interface implied. */
export default function ResourceCube({ variant = 0 }: { variant?: number }) {
  return <svg viewBox="0 0 240 190" fill="none" aria-hidden="true" focusable="false">
    <ellipse cx="120" cy="164" rx="74" ry="13" fill="currentColor" opacity=".08" />
    {[2, 1, 0].map(layer => <g key={layer} transform={`translate(0 ${layer * 23})`}>
      <path d="M120 20 194 59 120 100 46 59Z" fill="currentColor" opacity={.13 + layer * .08} />
      <path d="M46 59 120 100 120 115 46 74Z" fill="currentColor" opacity=".22" />
      <path d="M120 100 194 59 194 74 120 115Z" fill="currentColor" opacity=".4" />
      <path d="M120 20 194 59 120 100 46 59Z" stroke="currentColor" strokeOpacity=".65" />
    </g>)}
    {variant === 1 ? <g stroke="currentColor" strokeWidth="2"><path d="m96 56-15 9 15 9m48-18 15 9-15 9m-16-26-16 33" /></g>
      : variant === 2 ? <g stroke="currentColor" strokeWidth="2"><path d="M101 60a20 11 0 0 1 37-3m0 13a20 11 0 0 1-37 3m37-25v9h-12m-25 25v-9h12" /></g>
      : <g stroke="currentColor" strokeWidth="2"><path d="m104 53 30 16m-40-8 30 16m-20-8 10 6" /></g>}
    <circle cx="194" cy="59" r="4" fill="currentColor" />
    <circle cx="46" cy="105" r="3" fill="currentColor" />
  </svg>;
}
