import { useEffect, useState } from 'react';
import { ArrowRight, MapPin, Wifi, ChevronDown, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const heroSlides = [
  { label: 'Software & Web', src: '/hero/software-web.jpg' },
  { label: 'Data & Analytics', src: '/hero/analytics.jpg' },
  { label: 'Cloud & Systems', src: '/hero/cloud-systems.jpg' },
  { label: 'Digital Growth', src: '/hero/digital-growth.jpg' },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 9000);

    return () => window.clearInterval(timer);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-[#060911]"
    >
      {/* ── Ambient Radial Lighting & Subtle Mesh ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full scale-[1.05] object-cover object-center blur-[2px] transition-[opacity,transform] duration-[1800ms] ease-in-out ${
              activeSlide === index ? 'scale-100 opacity-40' : 'scale-[1.04] opacity-0'
            }`}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060911]/80 via-[#060911]/72 to-[#060911]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060911]/25 via-transparent to-[#060911]/90" />
        <div className="absolute -top-[15%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-electric-500/20 via-cyan-500/10 to-transparent blur-3xl" />
        <div className="absolute top-[35%] -left-[10%] h-[400px] w-[500px] rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute top-[25%] -right-[10%] h-[450px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-25" />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#060911] via-[#060911]/80 to-transparent" />
      </div>

      {/* Floating particles */}
      <Particles />

      <div className="absolute right-5 top-24 z-20 flex items-center gap-3 rounded-full border border-white/10 bg-[#0B0F17]/65 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-300 backdrop-blur-md sm:right-8 sm:top-28 sm:text-xs">
        <span className="hidden sm:inline">Service focus</span>
        <span className="text-cyan-300">{heroSlides[activeSlide].label}</span>
        <div className="flex items-center gap-1.5" role="group" aria-label="Choose hero background">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show ${slide.label} background`}
              aria-pressed={activeSlide === index}
              className={`h-1.5 rounded-full transition-all ${
                activeSlide === index ? 'w-5 bg-cyan-300' : 'w-1.5 bg-white/40 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pt-40 pb-20 text-center lg:px-8">

        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
            </span>
            Enterprise Digital Engineering
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 text-electric-400" />
            Nairobi, Kenya
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md">
            <Wifi className="h-3.5 w-3.5 text-ember-400" />
            Global Online Delivery
          </span>
        </div>

        {/* Fluid Bold Headline */}
        <h1 className="mt-8 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
          Engineering Digital Excellence
        </h1>

        <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5rem] leading-[1.08]">
          Automating Operations.{' '}
          <span className="block text-gradient mt-1 sm:mt-2">
            Building High-Scale Software.
          </span>
          <span className="block text-gradient-cyan mt-1 sm:mt-2">
            Driving Data-Led Growth.
          </span>
        </h2>

        {/* Outcome-focused subheadline */}
        <p className="mx-auto mt-7 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl">
          We help enterprises and growing companies build resilient web platforms,
          custom business automation pipelines, and high-converting systems engineered for measurable growth.
        </p>

        {/* Action buttons + Micro-trust */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-primary w-full sm:w-auto text-base px-8 py-3.5 shadow-glow"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollTo('#services')}
              className="btn-secondary w-full sm:w-auto text-base px-8 py-3.5"
            >
              Explore Solutions
            </button>
          </div>

          {/* Micro-trust indicators */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400 sm:gap-6">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" />
              Response within 2 hours
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="h-4 w-4 text-electric-400" />
              Direct access to lead engineers
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <Zap className="h-4 w-4 text-ember-400" />
              Transparent KSh proposals
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-4 sm:gap-8">
          {[
            { value: '400+', label: 'Units & Workflows Managed' },
            { value: '50+', label: 'Projects Delivered' },
            { value: '99.9%', label: 'System Reliability' },
            { value: '7+', label: 'Years Experience' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <span className="font-display text-2xl font-extrabold text-white sm:text-3xl text-gradient-cyan">
                {s.value}
              </span>
              <span className="mt-1 text-xs font-medium text-slate-400">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => scrollTo('#services')}
          aria-label="Scroll down"
          className="mt-10 flex flex-col items-center gap-1 text-slate-500 transition-colors hover:text-cyan-400"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Scroll to Explore</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-slate-400" />
        </button>
      </div>
    </section>
  );
}

function Particles() {
  const ps = [
    { left: '8%',  top: '22%', s: 3, d: '0s',   dur: '7s'  },
    { left: '22%', top: '65%', s: 2, d: '1.2s', dur: '9s'  },
    { left: '38%', top: '18%', s: 4, d: '2s',   dur: '8s'  },
    { left: '58%', top: '78%', s: 2, d: '0.5s', dur: '10s' },
    { left: '72%', top: '14%', s: 3, d: '1.5s', dur: '7.5s'},
    { left: '84%', top: '55%', s: 2, d: '2.5s', dur: '9s'  },
    { left: '92%', top: '28%', s: 4, d: '0.8s', dur: '8.5s'},
    { left: '14%', top: '85%', s: 2, d: '1.8s', dur: '10s' },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {ps.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cyan-400/40 animate-float"
          style={{
            left: p.left, top: p.top,
            width: p.s, height: p.s,
            animationDelay: p.d,
            animationDuration: p.dur,
            boxShadow: '0 0 8px rgba(6,182,212,0.6)',
          }}
        />
      ))}
    </div>
  );
}
