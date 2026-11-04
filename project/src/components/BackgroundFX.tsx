/** Abstract animated background: floating particles, grid, and glow orbs. */
export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />

      {/* Radial top glow */}
      <div className="absolute inset-0 bg-radial-glow" />

      {/* Floating glow orbs */}
      <div className="glow-orb h-96 w-96 bg-electric-500/20 top-[-10%] left-[-5%] animate-float-slow" />
      <div className="glow-orb h-80 w-80 bg-ember-500/10 top-[40%] right-[-8%] animate-float" />
      <div className="glow-orb h-72 w-72 bg-electric-500/15 bottom-[10%] left-[20%] animate-float-slow" />

      {/* Particles */}
      <Particles />

      {/* Bottom fade into navy */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy-900/70 to-transparent" />
    </div>
  );
}

function Particles() {
  const particles = [
    { left: '8%', top: '20%', size: 3, delay: '0s', dur: '7s' },
    { left: '22%', top: '60%', size: 2, delay: '1s', dur: '9s' },
    { left: '38%', top: '30%', size: 4, delay: '2s', dur: '8s' },
    { left: '52%', top: '75%', size: 2, delay: '0.5s', dur: '10s' },
    { left: '68%', top: '18%', size: 3, delay: '1.5s', dur: '7.5s' },
    { left: '78%', top: '52%', size: 2, delay: '2.5s', dur: '9s' },
    { left: '88%', top: '28%', size: 4, delay: '0.8s', dur: '8.5s' },
    { left: '15%', top: '82%', size: 2, delay: '1.8s', dur: '10s' },
    { left: '45%', top: '12%', size: 3, delay: '2.2s', dur: '7s' },
    { left: '62%', top: '88%', size: 2, delay: '0.3s', dur: '9.5s' },
    { left: '92%', top: '68%', size: 3, delay: '1.2s', dur: '8s' },
    { left: '30%', top: '45%', size: 2, delay: '2.8s', dur: '10s' },
  ];

  return (
    <div className="absolute inset-0">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-electric-300/40 animate-float"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.dur,
            boxShadow: '0 0 8px rgba(0,102,255,0.6)',
          }}
        />
      ))}
    </div>
  );
}
