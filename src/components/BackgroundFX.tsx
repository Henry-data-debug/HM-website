/** Ambient background: subtle light pearl grid and soft accent orbs. */
export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#F8FAFC]">
      {/* Subtle architectural dot grid */}
      <div className="absolute inset-0 bg-dot-pattern bg-dot opacity-[0.25]" />

      {/* Subtle ambient accent orbs */}
      <div className="glow-orb h-[600px] w-[600px] bg-indigo-500/[0.03] top-[-15%] left-[-10%] blur-[120px]" />
      <div className="glow-orb h-[500px] w-[500px] bg-sky-500/[0.03] top-[35%] right-[-10%] blur-[120px]" />
      <div className="glow-orb h-[450px] w-[450px] bg-emerald-500/[0.02] bottom-[5%] left-[10%] blur-[100px]" />
    </div>
  );
}
