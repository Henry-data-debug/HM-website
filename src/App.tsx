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
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { WhatsAppButton } from './components/WhatsAppButton';
import { useAuth } from './lib/auth';

type Route = 'site' | 'admin';

function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    typeof window !== 'undefined' && window.location.hash.replace('#', '') === 'admin' ? 'admin' : 'site'
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

function usePathname(initialPath?: string) {
  const [pathname, setPathname] = useState(() =>
    initialPath ?? (typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') || '/' : '/')
  );

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname.replace(/\/+$/, '') || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return pathname;
}

export interface AppProps {
  initialPath?: string;
}

function App({ initialPath }: AppProps = {}) {
  const route = useHashRoute();
  const pathname = usePathname(initialPath);
  const { session, loading } = useAuth();

  const goSite = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#F8FAFC] text-slate-900">
      <BackgroundFX />
      <Navbar activePath={pathname} />
      <main>
        {pathname === '/about' ? (
          <AboutPage />
        ) : pathname === '/services' ? (
          <ServicesPage />
        ) : pathname === '/projects' || pathname.startsWith('/projects/') ? (
          <ProjectsPage pathname={pathname} />
        ) : (
          <HomePage />
        )}

        <Contact />
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
      <Services />
      <ResultsImpact />
      <Projects />
      <About />
      <WhyChooseUs />
      <Process />
      <Technologies />
      <Testimonials />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <RouteHeading
        title="About HM Technologies — Technology & Engineering in Kenya"
        subtitle="Nairobi-based technology team delivering custom software systems, business automation, and data analytics across East Africa."
      />
      <About />
      <WhyChooseUs />
      <Process />
      <Technologies />
      <Testimonials />
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <RouteHeading
        title="Software Development, Automation & IT Services in Kenya"
        subtitle="Explore enterprise-grade web development, bespoke software systems, business intelligence, Power BI dashboards, and digital growth."
      />
      <Services />
      <ResultsImpact />
      <Technologies />
      <Process />
      <Testimonials />
    </>
  );
}

function ProjectsPage({ pathname }: { pathname?: string }) {
  const slug = pathname && pathname.startsWith('/projects/')
    ? pathname.replace(/^\/projects\//, '').replace(/\/+$/, '')
    : undefined;

  if (slug) {
    return (
      <div className="pt-24 sm:pt-28">
        <Projects initialSlug={slug} />
      </div>
    );
  }

  return (
    <>
      <RouteHeading
        title="Case Studies & Selected Projects — HM Technologies"
        subtitle="Explore real-world software platforms, automated business pipelines, and data dashboards engineered for measurable business impact in Kenya."
      />
      <ResultsImpact />
      <Projects initialSlug={slug} />
      <Testimonials />
    </>
  );
}

function RouteHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="border-b border-slate-200/80 bg-white pb-12 pt-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h1 className="font-display text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export default App;
