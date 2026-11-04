import { useEffect, useState } from 'react';
import { BackgroundFX } from './components/BackgroundFX';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustTicker } from './components/TrustTicker';
import { ResultsImpact } from './components/ResultsImpact';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Process } from './components/Process';
import { Projects } from './components/Projects';
import { Technologies } from './components/Technologies';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { GetAQuote } from './components/GetAQuote';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { GlowDivider } from './components/SectionDivider';
import { WhatsAppButton } from './components/WhatsAppButton';
import { useAuth } from './lib/auth';

type Route = 'site' | 'admin';

function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    window.location.hash.replace('#', '') === 'admin' ? 'admin' : 'site'
  );

  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash.replace('#', '') === 'admin' ? 'admin' : 'site');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return route;
}

function App() {
  const route = useHashRoute();
  const { session, loading } = useAuth();

  const goSite = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0 });
  };

  if (route === 'admin') {
    return (
      <div className="relative min-h-screen text-slate-200">
        <BackgroundFX />
        {loading ? (
          <div className="flex min-h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
          </div>
        ) : session ? (
          <AdminDashboard onBack={goSite} />
        ) : (
          <AdminLogin onBack={goSite} />
        )}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-200">
      <BackgroundFX />
      <Navbar />
      <main>
        {/* 1. Hero — Full-bleed midnight with ambient glow */}
        <Hero />

        {/* 2. Trust Ticker — Immediately below hero */}
        <TrustTicker />

        {/* 3. Interactive Bento-Grid Services — Slate tone */}
        <div className="section-tone-slate">
          <Services />
        </div>

        {/* Results & Impact — grounded in existing client testimonials */}
        <ResultsImpact />

        <GlowDivider accent="blue" />

        {/* Projects Portfolio — Midnight */}
        <div className="section-tone-midnight">
          <Projects />
        </div>

        <GlowDivider accent="blue" />

        {/* About — Midnight with ambient light */}
        <div className="section-tone-midnight">
          <About />
        </div>

        <GlowDivider accent="ember" />

        {/* Why Choose Us — Elevated */}
        <div className="section-tone-elevated">
          <WhyChooseUs />
        </div>

        <GlowDivider accent="blue" />

        {/* Our Process — Slate */}
        <div className="section-tone-slate">
          <Process />
        </div>

        <GlowDivider accent="ember" />

        {/* Technologies — Elevated */}
        <div className="section-tone-elevated">
          <Technologies />
        </div>

        <GlowDivider accent="ember" />

        {/* Testimonials — Slate */}
        <div className="section-tone-slate">
          <Testimonials />
        </div>

        <GlowDivider accent="blue" />

        {/* Get a Quote — Midnight */}
        <div className="section-tone-midnight">
          <GetAQuote />
        </div>

        {/* CTA — Full ambient section */}
        <CTA />

        {/* Contact — Elevated */}
        <div className="section-tone-elevated">
          <Contact />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      {/* hidden anchor keeps admin route reachable */}
      <span id="admin" className="hidden" aria-hidden />
    </div>
  );
}

export default App;
