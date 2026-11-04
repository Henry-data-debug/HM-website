/** Ambient background: floating particles, dot grid, and glow orbs. */
export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Deep midnight base */}
      <div className="absolute inset-0 bg-[#060911]" />

      {/* Dot grid pattern */}
      <div className="absolute inset-0 bg-dot-pattern bg-dot opacity-30" />

      {/* Ambient glow orbs */}
      <div className="glow-orb h-[500px] w-[500px] bg-electric-500/[0.08] top-[-12%] left-[-8%] animate-float-slow" />
      <div className="glow-orb h-[400px] w-[400px] bg-cyan-500/[0.06] top-[35%] right-[-10%] animate-float" />
      <div className="glow-orb h-[350px] w-[350px] bg-indigo-500/[0.05] bottom-[8%] left-[15%] animate-float-slow" />

      {/* Subtle noise-like texture overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#060911]/90 to-transparent" />
    </div>
  );
}
