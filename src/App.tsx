import { useEffect, useState } from 'react';
import { BackgroundFX } from './components/BackgroundFX';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
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
      <div className="relative min-h-screen text-silver-200">
        <BackgroundFX />
        {loading ? (
          <div className="flex min-h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-electric-500 border-t-transparent" />
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
    <div className="relative min-h-screen overflow-x-hidden text-silver-200">
      <BackgroundFX />
      <Navbar />
      <main>
        {/* Hero — full-bleed image background, centered text */}
        <Hero />

        {/* About — mid tone */}
        <div className="section-tone-mid">
          <About />
        </div>

        <GlowDivider accent="blue" />

        {/* Services — dark base tone */}
        <div className="section-tone-dark">
          <Services />
        </div>

        <GlowDivider accent="ember" />

        {/* Why Choose Us — accent gradient tone */}
        <div className="section-tone-accent">
          <WhyChooseUs />
        </div>

        <GlowDivider accent="blue" />

        {/* Process — mid tone */}
        <div className="section-tone-mid">
          <Process />
        </div>

        <GlowDivider accent="ember" />

        {/* Projects — dark base tone */}
        <div className="section-tone-dark">
          <Projects />
        </div>

        <GlowDivider accent="blue" />

        {/* Technologies — accent gradient tone */}
        <div className="section-tone-accent">
          <Technologies />
        </div>

        <GlowDivider accent="ember" />

        {/* Testimonials — mid tone */}
        <div className="section-tone-mid">
          <Testimonials />
        </div>

        <GlowDivider accent="blue" />

        {/* Get a Quote — dark base tone */}
        <div className="section-tone-dark">
          <GetAQuote />
        </div>

        {/* CTA — accent gradient tone (flows into footer) */}
        <div className="section-tone-accent">
          <CTA />
        </div>

        {/* Contact — mid tone */}
        <div className="section-tone-mid">
          <Contact />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      {/* hidden anchor keeps admin route reachable via footer/nav without scroll target */}
      <span id="admin" className="hidden" aria-hidden />
    </div>
  );
}

export default App;
