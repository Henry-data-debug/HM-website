import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';
import { navLinks } from '../data/content';
import { navigateTo } from '../lib/navigation';

export function Navbar({ activePath }: { activePath?: string } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const currentPath =
    activePath ?? (typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') || '/' : '/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs py-2.5 text-slate-900'
          : 'bg-[#090D16]/80 backdrop-blur-md border-b border-white/10 py-3.5 text-white'
      }`}
    >
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo scrolled={scrolled} />

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.href === currentPath || (link.href !== '/' && currentPath.startsWith(link.href));
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(event) => {
                    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    navigateTo(link.href);
                  }}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    scrolled
                      ? isActive
                        ? 'text-slate-950 font-bold bg-slate-100 ring-1 ring-slate-200'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      : isActive
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {!scrolled && isActive && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-white/[0.08] ring-1 ring-white/[0.12]" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA & Signal Emerald status pill */}
        <div className="hidden items-center gap-3 lg:flex">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold tracking-wide">Available for Q1 Projects</span>
          </div>

          <a
            href="#admin"
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              scrolled ? 'text-slate-400 hover:text-indigo-600' : 'text-slate-400 hover:text-cyan-400'
            }`}
            aria-label="Admin login"
            title="Admin login"
          >
            <Shield className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            onClick={(event) => { event.preventDefault(); navigateTo('#contact'); }}
            className="group btn-primary text-sm px-5 py-2.5"
          >
            <span>Get Started</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className={`rounded-lg p-2 lg:hidden ${scrolled ? 'text-slate-900' : 'text-white'}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 pb-5 pt-3">
          <ul className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={link.href === currentPath ? 'page' : undefined}
                  onClick={(event) => {
                    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    setOpen(false);
                    navigateTo(link.href);
                  }}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 hover:text-slate-950"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-1">
              <a
                href="#admin"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold text-slate-500 transition-colors hover:text-indigo-600"
              >
                <Shield className="h-4 w-4" />
                Admin Login
              </a>
            </li>
            <li className="mt-1">
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  setOpen(false);
                  navigateTo('#contact');
                }}
                className="btn-primary w-full shadow-md"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

function Logo({ scrolled }: { scrolled?: boolean }) {
  return (
    <a
      href="/"
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigateTo('/');
      }}
      className="group flex items-center gap-2.5"
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 shadow-sm transition-transform group-hover:scale-105">
        <span className="font-display text-base font-extrabold text-white">H</span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-cyan-400" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-sm font-bold tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
          HM Technologies
        </span>
        <span className={`text-[10px] font-bold tracking-[0.18em] ${scrolled ? 'text-indigo-600' : 'text-cyan-400'}`}>
          DIGITAL EXCELLENCE
        </span>
      </span>
    </a>
  );
}
