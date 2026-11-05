import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';
import { navLinks } from '../data/content';
import { navigateTo } from '../lib/navigation';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#060911]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-glass py-2.5'
          : 'bg-transparent py-5'
      }`}
    >
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.href === currentPath;
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
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-white/[0.06] ring-1 ring-white/[0.1]" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <a href="#admin" className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:text-cyan-400" aria-label="Admin login" title="Admin login">
            <Shield className="h-4 w-4" />
          </a>
          <a href="#contact" onClick={(event) => { event.preventDefault(); navigateTo('#contact'); }} className="btn-primary text-sm px-5 py-2.5">
            Get Started
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-white lg:hidden"
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
          <ul className="glass-strong flex flex-col gap-1 rounded-2xl p-3">
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
                  className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-200 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-1">
              <a href="#admin" className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-slate-400 transition-colors hover:text-cyan-400">
                <Shield className="h-4 w-4" />
                Admin Login
              </a>
            </li>
            <li className="mt-1">
              <a href="#contact" onClick={(event) => { event.preventDefault(); setOpen(false); navigateTo('#contact'); }} className="btn-primary w-full">
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

function Logo() {
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
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500 to-cyan-500 shadow-glow transition-transform group-hover:scale-105">
        <span className="font-display text-base font-extrabold text-white">H</span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-cyan-400 shadow-glow-cyan" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-sm font-bold text-white tracking-tight">HM Technologies</span>
        <span className="text-[10px] font-semibold tracking-[0.18em] text-cyan-400">
          DIGITAL EXCELLENCE
        </span>
      </span>
    </a>
  );
}
