import { technologies } from '../data/content';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';

/** Brand-style monogram badge for each technology. */
function TechBadge({ name }: { name: string }) {
  const initials = name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="group flex flex-col items-center gap-3">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl glass transition-all duration-500 hover:-translate-y-2 hover:border-electric-500/40 hover:shadow-glow">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-electric-500/0 to-electric-500/0 transition-all duration-500 group-hover:from-electric-500/15 group-hover:to-ember-500/10" />
        <span className="font-display text-xl font-bold text-gradient-silver transition-colors group-hover:text-white">
          {initials}
        </span>
      </div>
      <span className="text-xs font-medium text-silver-300 transition-colors group-hover:text-white">
        {name}
      </span>
    </div>
  );
}

export function Technologies() {
  const ref = useRevealGroup<HTMLDivElement>();

  // Duplicate for seamless marquee
  const loop = [...technologies, ...technologies];

  return (
    <section id="technologies" className="section-padding relative">
      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Stack"
          title="Technologies We Work With"
          description="A modern, battle-tested toolkit spanning frontend, backend, data, cloud, and DevOps."
        />

        {/* Marquee row */}
        <div className="reveal mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max gap-6 animate-marquee">
            {loop.map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="flex h-28 w-36 flex-shrink-0 items-center justify-center"
              >
                <TechBadge name={tech.name} />
              </div>
            ))}
          </div>
        </div>

        {/* Static grid (smaller screens see this clearly too) */}
        <div className="reveal mt-10 grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-8">
          {technologies.map((tech) => (
            <TechBadge key={tech.name} name={tech.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
