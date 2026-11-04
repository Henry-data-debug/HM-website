import { ArrowRight, MapPin, Wifi, ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/da99b81f-2151-438b-840e-cb91cf9ac852.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        {/* Deep overlay so text is always legible */}
        <div className="absolute inset-0 bg-navy-900/95" />
        {/* Radial blue spotlight from top-centre */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(0,102,255,0.22),transparent)]" />
        {/* Bottom gradient merges into the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-navy-900 to-transparent" />
      </div>

      {/* ── Floating particles ── */}
      <Particles />

      {/* ── Centered content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pt-28 pb-24 text-center lg:px-8">

        {/* Badge row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-electric-500/35 bg-electric-500/15 px-4 py-1.5 text-xs font-semibold text-electric-200 backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5" />
            Nairobi, Kenya
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold text-silver-200 backdrop-blur-sm">
            <Wifi className="h-3.5 w-3.5 text-ember-400" />
            Online services worldwide
          </span>
        </div>

        {/* Main headline — one word / phrase per line for dramatic effect */}
        <h1 className="mt-8 font-display font-extrabold leading-[1.08] tracking-tight text-white">
          <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">Engineering</span>
          <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-gradient mt-1">
            Digital
          </span>
          <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-gradient mt-1">
            Excellence.
          </span>
        </h1>

        {/* Sub-heading */}
        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-silver-300 sm:text-lg md:text-xl">
          Helping businesses grow through innovative technology,
          <br className="hidden sm:block" />
          software development, data analytics, digital marketing,
          <br className="hidden sm:block" />
          automation, and IT support.
        </p>

        {/* CTA buttons */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button onClick={() => scrollTo('#quote')} className="btn-primary w-full sm:w-auto">
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </button>
          <button onClick={() => scrollTo('#services')} className="btn-secondary w-full sm:w-auto">
            Our Services
          </button>
        </div>

        {/* Stats strip */}
        <div className="mt-14 grid grid-cols-3 gap-8 border-t border-white/12 pt-8 sm:gap-14">
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '30+', label: 'Happy Clients' },
            { value: '7+', label: 'Years Experience' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                {s.value}
              </span>
              <span className="mt-1.5 text-xs font-medium text-silver-400 sm:text-sm">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => scrollTo('#about')}
          aria-label="Scroll down"
          className="mt-12 flex flex-col items-center gap-1.5 text-silver-500 transition-colors hover:text-electric-300"
        >
          <span className="text-[10px] font-medium uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}

function Particles() {
  const ps = [
    { left: '6%',  top: '22%', s: 3, d: '0s',   dur: '7s'  },
    { left: '20%', top: '65%', s: 2, d: '1.2s',  dur: '9s'  },
    { left: '35%', top: '18%', s: 4, d: '2s',    dur: '8s'  },
    { left: '55%', top: '78%', s: 2, d: '0.5s',  dur: '10s' },
    { left: '70%', top: '12%', s: 3, d: '1.5s',  dur: '7.5s'},
    { left: '80%', top: '55%', s: 2, d: '2.5s',  dur: '9s'  },
    { left: '90%', top: '30%', s: 4, d: '0.8s',  dur: '8.5s'},
    { left: '12%', top: '85%', s: 2, d: '1.8s',  dur: '10s' },
    { left: '48%', top: '8%',  s: 3, d: '2.2s',  dur: '7s'  },
    { left: '63%', top: '90%', s: 2, d: '0.3s',  dur: '9.5s'},
    { left: '93%', top: '70%', s: 3, d: '1.2s',  dur: '8s'  },
    { left: '28%', top: '42%', s: 2, d: '2.8s',  dur: '10s' },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {ps.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-electric-300/50 animate-float"
          style={{
            left: p.left, top: p.top,
            width: p.s, height: p.s,
            animationDelay: p.d,
            animationDuration: p.dur,
            boxShadow: '0 0 6px rgba(0,102,255,0.7)',
          }}
        />
      ))}
    </div>
  );
}
