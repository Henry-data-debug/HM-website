/** Smooth curved SVG wave between sections. Direction can be flipped. */
export function SectionWave({
  from = 'navy-900',
  to = 'navy-800',
  flip = false,
}: {
  from?: string;
  to?: string;
  flip?: boolean;
}) {
  const fromVar = from === 'navy-800' ? '#0d1f38' : '#081526';
  const toVar   = to   === 'navy-800' ? '#0d1f38' : '#081526';

  return (
    <div
      className={`pointer-events-none -my-px block leading-none ${flip ? 'rotate-180' : ''}`}
      aria-hidden
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="h-14 w-full sm:h-20"
      >
        <defs>
          <linearGradient id={`wave-${from}-${to}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fromVar} />
            <stop offset="100%" stopColor={toVar} />
          </linearGradient>
        </defs>
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
          fill={toVar}
        />
      </svg>
    </div>
  );
}

/** Horizontal glowing divider line with optional label */
export function GlowDivider({ accent = 'blue' }: { accent?: 'blue' | 'ember' }) {
  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8" aria-hidden>
      <div
        className={`h-px w-full ${
          accent === 'blue'
            ? 'bg-gradient-to-r from-transparent via-electric-500/40 to-transparent'
            : 'bg-gradient-to-r from-transparent via-ember-500/35 to-transparent'
        }`}
      />
    </div>
  );
}
