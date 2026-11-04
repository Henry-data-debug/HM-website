import { MessageCircle } from 'lucide-react';

const whatsappUrl =
  'https://wa.me/254791371301?text=Hello%20HM%20Technologies%2C%20I%20would%20like%20to%20make%20an%20inquiry.';

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with HM Technologies on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_14px_36px_rgba(37,211,102,0.45)] sm:bottom-7 sm:right-7"
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/20" />
        <MessageCircle className="relative h-5 w-5" fill="currentColor" />
      </span>
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
