import { ArrowUpRight, Check, Wifi } from 'lucide-react';
import { services } from '../data/content';
import { SectionHeading } from './About';
import { useRevealGroup } from '../hooks/useRevealGroup';

export function Services() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <section id="services" className="section-padding relative">
      <div ref={ref} className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What We Do"
          title="Services Built for Modern Business"
          description="From strategy to deployment, we deliver end-to-end technology solutions that move your business forward."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  delay,
}: {
  service: (typeof services)[number];
  delay: number;
}) {
  const Icon = service.icon;
  const isEmber = service.accent === 'ember';

  return (
    <article
      className="reveal group relative overflow-hidden rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-2 hover:border-electric-500/40 hover:shadow-glass-hover"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* hover gradient sheen */}
      <div
        className={`absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          isEmber
            ? 'bg-gradient-to-br from-ember-500/10 to-transparent'
            : 'bg-gradient-to-br from-electric-500/10 to-transparent'
        }`}
      />
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-electric-500/10 blur-2xl transition-all duration-500 group-hover:bg-electric-500/20" />

      <div className="flex items-start justify-between">
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
            isEmber
              ? 'bg-ember-500/15 text-ember-400 group-hover:bg-ember-500/25'
              : 'bg-electric-500/15 text-electric-300 group-hover:bg-electric-500/25'
          }`}
        >
          <Icon className="h-7 w-7" />
        </span>
        <ArrowUpRight className="h-5 w-5 text-silver-400 transition-all duration-300 group-hover:text-electric-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-white">{service.title}</h3>
        <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-ember-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ember-400 ring-1 ring-ember-500/20">
          <Wifi className="h-3 w-3" />
          Online
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-silver-300">{service.description}</p>

      <ul className="mt-5 grid gap-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-silver-200">
            <span
              className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${
                isEmber ? 'bg-ember-500/20 text-ember-400' : 'bg-electric-500/20 text-electric-300'
              }`}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}
