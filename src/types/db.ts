export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  rating: number;
  quote: string;
  initials: string | null;
  gradient: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string;
  budget: string | null;
  timeline: string | null;
  description: string;
  source_page: string | null;
  status: string;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_required: string | null;
  message: string;
  status: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
}
