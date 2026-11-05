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

function usePathname() {
  const [pathname, setPathname] = useState(() => window.location.pathname.replace(/\/+$/, '') || '/');

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname.replace(/\/+$/, '') || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return pathname;
}

function App() {
  const route = useHashRoute();
  const pathname = usePathname();
  const { session, loading } = useAuth();

  const goSite = () => {
    window.location.href = '/';
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
        {pathname === '/about' ? (
          <AboutPage />
        ) : pathname === '/services' ? (
          <ServicesPage />
        ) : pathname === '/projects' ? (
          <ProjectsPage />
        ) : (
          <HomePage />
        )}

        <div className="section-tone-midnight">
          <GetAQuote sourcePage={pathname} />
        </div>
        <CTA />
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

function HomePage() {
  return (
    <>
      <Hero />
      <TrustTicker />
      <div className="section-tone-slate"><Services /></div>
      <ResultsImpact />
      <GlowDivider accent="blue" />
      <div className="section-tone-midnight"><Projects /></div>
      <GlowDivider accent="blue" />
      <div className="section-tone-midnight"><About /></div>
      <GlowDivider accent="ember" />
      <div className="section-tone-elevated"><WhyChooseUs /></div>
      <GlowDivider accent="blue" />
      <div className="section-tone-slate"><Process /></div>
      <GlowDivider accent="ember" />
      <div className="section-tone-elevated"><Technologies /></div>
      <GlowDivider accent="ember" />
      <div className="section-tone-slate"><Testimonials /></div>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <RouteHeading title="About HM Technologies" />
      <div className="section-tone-midnight pt-20"><About /></div>
      <div className="section-tone-elevated"><WhyChooseUs /></div>
      <div className="section-tone-slate"><Process /></div>
      <div className="section-tone-elevated"><Technologies /></div>
      <div className="section-tone-slate"><Testimonials /></div>
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <RouteHeading title="Our Services" />
      <div className="section-tone-slate pt-20"><Services /></div>
      <ResultsImpact />
      <div className="section-tone-elevated"><Technologies /></div>
      <div className="section-tone-slate"><Process /></div>
      <div className="section-tone-midnight"><Testimonials /></div>
    </>
  );
}

function ProjectsPage() {
  return (
    <>
      <RouteHeading title="Selected Projects" />
      <ResultsImpact />
      <div className="section-tone-midnight pt-20"><Projects /></div>
      <div className="section-tone-slate"><Testimonials /></div>
    </>
  );
}

function RouteHeading({ title }: { title: string }) {
  return (
    <section className="section-padding pb-0 pt-36">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
}

export default App;
