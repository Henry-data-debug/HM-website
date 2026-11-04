import { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';

const whatsappUrl =
  'https://wa.me/254791371301?text=Hello%20HM%20Technologies%2C%20I%20would%20like%20to%20make%20an%20inquiry.';

export function WhatsAppButton() {
  const [isUnobstructed, setIsUnobstructed] = useState(true);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateVisibility = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const button = buttonRef.current;
        if (!button) return;

        const buttonRect = button.getBoundingClientRect();
        const pageContent = document.querySelectorAll(
          'main button, main a, main input, main select, main textarea, main label, main p, main h1, main h2, main h3'
        );
        const isObstructed = Array.from(pageContent).some((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 &&
            rect.left < buttonRect.right && rect.right > buttonRect.left &&
            rect.top < buttonRect.bottom && rect.bottom > buttonRect.top;
        });

        setIsUnobstructed(!isObstructed);
      });
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  return (
    <a
      ref={buttonRef}
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with HM Technologies on WhatsApp"
      className={`group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_14px_36px_rgba(37,211,102,0.45)] sm:bottom-7 sm:right-7 ${isUnobstructed ? 'visible opacity-100' : 'invisible opacity-0'}`}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/20" />
        <MessageCircle className="relative h-5 w-5" fill="currentColor" />
      </span>
      <span className="hidden sm:inline">Talk with an Expert</span>

      {/* Micro-tooltip on mobile */}
      <span className="pointer-events-none absolute -top-10 right-0 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:hidden">
        Talk with an Expert
      </span>
    </a>
  );
}
