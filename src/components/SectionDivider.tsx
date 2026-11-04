export function GlowDivider({ accent = 'blue' }: { accent?: 'blue' | 'ember' }) {
  const color = accent === 'blue' ? 'from-transparent via-cyan-500/30 to-transparent' : 'from-transparent via-ember-500/25 to-transparent';
  return (
    <div className="relative h-px w-full">
      <div className={`absolute inset-x-0 h-px bg-gradient-to-r ${color}`} />
    </div>
  );
}
