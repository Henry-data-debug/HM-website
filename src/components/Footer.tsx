import { useEffect, useRef, useState } from 'react';
import {
  Twitter,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
} from 'lucide-react';
import { navLinks, services } from '../data/content';
import { supabase } from '../lib/supabase';
import { navigateTo } from '../lib/navigation';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [legalNotice, setLegalNotice] = useState<'privacy' | 'cookies' | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.trim() });

    if (error) {
      // Duplicate email still counts as "subscribed" for UX
      if (error.code === '23505') {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 4000);
        return;
      }
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <footer className="relative border-t border-white/10 bg-navy-950/60 pt-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Newsletter banner */}
        <div className="glass-strong mb-14 flex flex-col items-center justify-between gap-6 rounded-3xl p-7 sm:p-9 lg:flex-row">
          <div className="text-center lg:text-left">
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              Subscribe to our newsletter
            </h2>
            <p className="mt-2 text-sm text-silver-300">
              Get insights on technology, automation, and digital growth — straight to your inbox.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-silver-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-full border border-white/10 bg-navy-900/60 py-3 pl-10 pr-4 text-sm text-white placeholder:text-silver-400 focus:border-electric-500/50 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary disabled:opacity-70"
            >
              {status === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* status message */}
        {status === 'success' && (
          <div className="mb-6 flex items-center gap-2 text-sm text-green-300">
            <CheckCircle2 className="h-4 w-4" />
            You&rsquo;re subscribed! Watch your inbox for updates.
          </div>
        )}
        {status === 'error' && (
          <div className="mb-6 text-sm text-red-300">
            Something went wrong. Please try again later.
          </div>
        )}

        {/* Links grid */}
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500 to-electric-700 shadow-glow">
                <span className="font-display text-lg font-extrabold text-white">H</span>
              </span>
              <span className="font-display text-base font-bold text-white">HM Technologies</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver-300">
              Engineering digital excellence — empowering businesses across Africa with innovative
              technology solutions.
            </p>
            <a href="tel:0791371301" className="mt-4 inline-flex items-center text-sm font-semibold text-electric-300 transition-colors hover:text-electric-200">
              0791 371 301
            </a>
            <a href="mailto:info@hmtechnologies.co.ke" className="mt-2 block text-sm text-silver-300 transition-colors hover:text-electric-300">
              info@hmtechnologies.co.ke
            </a>
            <div className="mt-5 flex gap-2.5">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Github, label: 'GitHub' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-silver-300 transition-all hover:-translate-y-0.5 hover:border-electric-500/40 hover:bg-electric-500/10 hover:text-electric-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <FooterCol title="Quick Links">
            {navLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Services */}
          <FooterCol title="Services">
            {services.slice(0, 6).map((s) => (
              <FooterLink key={s.title} href="/services">
                {s.title}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Company */}
          <FooterCol title="Company">
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/projects">Our Work</FooterLink>
            <FooterLink href="/#process">Our Process</FooterLink>
            <FooterLink href="/#testimonials">Testimonials</FooterLink>
            <FooterLink href="#contact">Contact</FooterLink>
          </FooterCol>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-xs text-silver-400">
            &copy; {new Date().getFullYear()} HM Technologies. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-silver-400">
            <button type="button" onClick={() => setLegalNotice('privacy')} className="transition-colors hover:text-electric-300">Privacy Policy</button>
            <button type="button" onClick={() => setLegalNotice('cookies')} className="transition-colors hover:text-electric-300">Cookie Notice</button>
          </div>
        </div>
      </div>
      {legalNotice && (
        <LegalNoticeDialog notice={legalNotice} onClose={() => setLegalNotice(null)} />
      )}
    </footer>
  );
}

function LegalNoticeDialog({
  notice,
  onClose,
}: {
  notice: 'privacy' | 'cookies';
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isPrivacy = notice === 'privacy';

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && dialog?.open) {
        event.preventDefault();
        dialog.querySelector<HTMLButtonElement>('[aria-label="Close notice"]')?.click();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      if (dialog?.open) dialog.close();
    };
  }, []);

  const closeDialog = () => {
    dialogRef.current?.close();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="legal-notice-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
      className="m-auto max-h-[85vh] w-[min(42rem,calc(100%-2rem))] overflow-y-auto rounded-3xl border border-white/10 bg-[#101927] p-0 text-left text-slate-200 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">HM Technologies</p>
            <h2 id="legal-notice-title" className="mt-2 font-display text-2xl font-bold text-white">
              {isPrivacy ? 'Privacy Policy' : 'Cookie Notice'}
            </h2>
          </div>
          <button type="button" onClick={closeDialog} className="btn-secondary px-3 py-2" aria-label="Close notice">
            Close
          </button>
        </div>

        {isPrivacy ? (
          <div className="mt-6 space-y-5 text-sm leading-relaxed text-slate-300">
            <p>We use information you submit to respond to enquiries, prepare project proposals, and deliver requested services.</p>
            <div>
              <h3 className="font-semibold text-white">Information and use</h3>
              <p className="mt-1">Contact and quote forms may collect your name, email, phone number, company, requested service, budget, timeline, and message. Newsletter sign-up collects your email address. Admin sign-in uses Supabase authentication.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Service providers and retention</h3>
              <p className="mt-1">Form submissions may be sent to our notification email provider and stored in Supabase for enquiry handling and administration. We do not sell submitted personal information. We keep it only as needed for these purposes and applicable obligations.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Your choices</h3>
              <p className="mt-1">You may ask us to access, correct, or delete information you submitted by emailing <a className="text-cyan-300 hover:text-cyan-200" href="mailto:info@hmtechnologies.co.ke">info@hmtechnologies.co.ke</a>.</p>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300">
            <p>This site does not intentionally use advertising or analytics cookies.</p>
            <p>Supabase admin authentication may use essential browser storage or session technologies to maintain a signed-in session. Hosting and security providers may also process technical information needed to operate the site.</p>
            <p>You can manage or clear browser storage and cookies in your browser settings. Clearing authentication storage may sign you out of the admin area.</p>
          </div>
        )}

        <p className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-400">
          Questions about this notice? <a className="text-cyan-300 hover:text-cyan-200" href="mailto:info@hmtechnologies.co.ke">Contact HM Technologies</a>.
        </p>
      </div>
    </dialog>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li>
      <a
        href={href}
        onClick={(event) => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          navigateTo(href);
        }}
        className="text-sm text-silver-300 transition-colors hover:text-electric-300"
      >
        {children}
      </a>
    </li>
  );
}
