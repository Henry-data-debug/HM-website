import { useCallback, useEffect, useState } from 'react';
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Star,
  X,
  Loader2,
  CheckCircle2,
  MessageSquare,
  Calculator,
  Inbox,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { supabase } from '../../lib/supabase';
import type { Testimonial, QuoteRequest, ContactSubmission } from '../../types/db';

type Tab = 'testimonials' | 'quotes' | 'messages';

const gradients = [
  'from-electric-500 to-electric-700',
  'from-ember-500 to-ember-600',
  'from-electric-600 to-navy-800',
  'from-electric-500 to-ember-500',
];

export function AdminDashboard({ onBack }: { onBack: () => void }) {
  const { user, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>('testimonials');

  const handleSignOut = async () => {
    await signOut();
    onBack();
  };

  return (
    <div className="relative min-h-screen px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="glass-strong flex flex-col gap-4 rounded-3xl p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500 to-electric-700 shadow-glow">
              <span className="font-display text-lg font-extrabold text-white">H</span>
            </span>
            <div>
              <h1 className="font-display text-lg font-bold text-white">Admin Dashboard</h1>
              <p className="text-xs text-silver-400">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2.5">
            <button onClick={onBack} className="btn-secondary text-sm">
              View Site
            </button>
            <button onClick={handleSignOut} className="btn-secondary text-sm">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="mt-6 flex gap-2">
          <TabButton active={tab === 'testimonials'} onClick={() => setTab('testimonials')} icon={<Star className="h-4 w-4" />}>
            Testimonials
          </TabButton>
          <TabButton active={tab === 'quotes'} onClick={() => setTab('quotes')} icon={<Calculator className="h-4 w-4" />}>
            Quote Requests
          </TabButton>
          <TabButton active={tab === 'messages'} onClick={() => setTab('messages')} icon={<Inbox className="h-4 w-4" />}>
            Messages
          </TabButton>
        </div>

        <div className="mt-6">
          {tab === 'testimonials' && <TestimonialsManager />}
          {tab === 'quotes' && <QuotesList />}
          {tab === 'messages' && <MessagesList />}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
        active
          ? 'bg-electric-500/20 text-white ring-1 ring-electric-500/40'
          : 'text-silver-300 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

/* ---------------- Testimonials manager ---------------- */

function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true });
    setItems((data ?? []) as Testimonial[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial? This cannot be undone.')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    load();
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditing(null);
    load();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-electric-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-white">
          Testimonials <span className="text-silver-400">({items.length})</span>
        </h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="btn-primary text-sm"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      </div>

      {showForm && (
        <TestimonialForm
          existing={editing}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={handleSaved}
        />
      )}

      {items.length === 0 ? (
        <p className="glass rounded-2xl p-8 text-center text-silver-400">
          No testimonials yet. Click &ldquo;Add Testimonial&rdquo; to create one.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((t) => (
            <div key={t.id} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} font-display text-xs font-bold text-white`}>
                    {t.initials || t.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <div className="font-display text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-silver-400">
                      {t.role}{t.company ? ` · ${t.company}` : ''}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      setEditing(t);
                      setShowForm(true);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-silver-300 transition-colors hover:bg-electric-500/20 hover:text-electric-300"
                    aria-label="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-silver-300 transition-colors hover:bg-red-500/20 hover:text-red-300"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-ember-500 text-ember-500" />
                ))}
              </div>

              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-silver-300">{t.quote}</p>

              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    t.is_published
                      ? 'bg-green-500/15 text-green-300'
                      : 'bg-white/5 text-silver-400'
                  }`}
                >
                  {t.is_published ? <CheckCircle2 className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  {t.is_published ? 'Published' : 'Hidden'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TestimonialForm({
  existing,
  onCancel,
  onSaved,
}: {
  existing: Testimonial | null;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    name: existing?.name ?? '',
    role: existing?.role ?? '',
    company: existing?.company ?? '',
    rating: existing?.rating ?? 5,
    quote: existing?.quote ?? '',
    initials: existing?.initials ?? '',
    gradient: existing?.gradient ?? gradients[0],
    is_published: existing?.is_published ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (key: keyof typeof form, value: string | number | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      name: form.name,
      role: form.role || null,
      company: form.company || null,
      rating: form.rating,
      quote: form.quote,
      initials: form.initials || form.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
      gradient: form.gradient,
      is_published: form.is_published,
    };

    let err;
    if (existing) {
      ({ error: err } = await supabase.from('testimonials').update(payload).eq('id', existing.id));
    } else {
      ({ error: err } = await supabase.from('testimonials').insert(payload));
    }

    if (err) {
      setError(err.message);
      setSaving(false);
      return;
    }
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="glass-strong mb-5 rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-white">
          {existing ? 'Edit Testimonial' : 'New Testimonial'}
        </h3>
        <button type="button" onClick={onCancel} className="text-silver-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Name" required>
          <input value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls} required />
        </FormField>
        <FormField label="Role / Title">
          <input value={form.role} onChange={(e) => set('role', e.target.value)} placeholder="e.g. Operations Director" className={inputCls} />
        </FormField>
        <FormField label="Company">
          <input value={form.company} onChange={(e) => set('company', e.target.value)} className={inputCls} />
        </FormField>
        <FormField label="Initials">
          <input value={form.initials} onChange={(e) => set('initials', e.target.value)} placeholder="Auto from name" maxLength={3} className={inputCls} />
        </FormField>
        <FormField label="Rating">
          <select value={form.rating} onChange={(e) => set('rating', Number(e.target.value))} className={inputCls}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n} className="bg-navy-800">{n} stars</option>
            ))}
          </select>
        </FormField>
        <FormField label="Avatar gradient">
          <select value={form.gradient} onChange={(e) => set('gradient', e.target.value)} className={inputCls}>
            {gradients.map((g) => (
              <option key={g} value={g} className="bg-navy-800">{g}</option>
            ))}
          </select>
        </FormField>
        <div className="sm:col-span-2">
          <FormField label="Quote" required>
            <textarea value={form.quote} onChange={(e) => set('quote', e.target.value)} rows={4} className={`${inputCls} resize-none`} required />
          </FormField>
        </div>
        <label className="flex items-center gap-2 sm:col-span-2">
          <input type="checkbox" checked={form.is_published} onChange={(e) => set('is_published', e.target.checked)} className="h-4 w-4 rounded accent-electric-500" />
          <span className="text-sm text-silver-200">Published (visible on site)</span>
        </label>
      </div>

      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

      <div className="mt-5 flex gap-2.5">
        <button type="submit" disabled={saving} className="btn-primary text-sm disabled:opacity-70">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          {existing ? 'Save Changes' : 'Create'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ---------------- Quotes list ---------------- */

function QuotesList() {
  const [items, setItems] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setItems((data ?? []) as QuoteRequest[]);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('quote_requests').update({ status }).eq('id', id);
    setItems((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-electric-400" />
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyState icon={<Calculator className="h-8 w-8" />} text="No quote requests yet." />;
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-white">
        Quote Requests <span className="text-silver-400">({items.length})</span>
      </h2>
      {items.map((q) => (
        <div key={q.id} className="glass rounded-2xl p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="font-display text-sm font-semibold text-white">{q.name}</div>
              <div className="text-xs text-silver-400">
                {q.company ? `${q.company} · ` : ''}{q.email}{q.phone ? ` · ${q.phone}` : ''}
              </div>
            </div>
            <StatusBadge status={q.status} />
          </div>

          <div className="mt-3 grid gap-2 text-xs sm:grid-cols-3">
            <InfoChip label="Service" value={q.service} />
            <InfoChip label="Budget" value={q.budget || '—'} />
            <InfoChip label="Timeline" value={q.timeline || '—'} />
          </div>

          <p className="mt-3 text-sm leading-relaxed text-silver-300">{q.description}</p>
          <div className="mt-2 text-[10px] text-silver-500">
            {new Date(q.created_at).toLocaleString()}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <select
              value={q.status}
              onChange={(e) => updateStatus(q.id, e.target.value)}
              className="rounded-lg border border-white/10 bg-navy-900/60 px-3 py-1.5 text-xs text-white focus:outline-none"
            >
              {['new', 'reviewed', 'quoted', 'closed'].map((s) => (
                <option key={s} value={s} className="bg-navy-800 capitalize">{s}</option>
              ))}
            </select>
            <a
              href={`mailto:${q.email}?subject=Re: Your quote request from HM Technologies`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-electric-500/15 px-3 py-1.5 text-xs font-medium text-electric-300 transition-colors hover:bg-electric-500/25"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Reply
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Messages list ---------------- */

function MessagesList() {
  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setItems((data ?? []) as ContactSubmission[]);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('contact_submissions').update({ status }).eq('id', id);
    setItems((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-electric-400" />
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyState icon={<MessageSquare className="h-8 w-8" />} text="No contact messages yet." />;
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-white">
        Contact Messages <span className="text-silver-400">({items.length})</span>
      </h2>
      {items.map((m) => (
        <div key={m.id} className="glass rounded-2xl p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="font-display text-sm font-semibold text-white">{m.name}</div>
              <div className="text-xs text-silver-400">
                {m.company ? `${m.company} · ` : ''}{m.email}{m.phone ? ` · ${m.phone}` : ''}
              </div>
            </div>
            <StatusBadge status={m.status} />
          </div>

          {m.service_required && (
            <div className="mt-2">
              <InfoChip label="Service" value={m.service_required} />
            </div>
          )}

          <p className="mt-3 text-sm leading-relaxed text-silver-300">{m.message}</p>
          <div className="mt-2 text-[10px] text-silver-500">
            {new Date(m.created_at).toLocaleString()}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <select
              value={m.status}
              onChange={(e) => updateStatus(m.id, e.target.value)}
              className="rounded-lg border border-white/10 bg-navy-900/60 px-3 py-1.5 text-xs text-white focus:outline-none"
            >
              {['new', 'read', 'replied', 'closed'].map((s) => (
                <option key={s} value={s} className="bg-navy-800 capitalize">{s}</option>
              ))}
            </select>
            <a
              href={`mailto:${m.email}?subject=Re: Your message to HM Technologies`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-electric-500/15 px-3 py-1.5 text-xs font-medium text-electric-300 transition-colors hover:bg-electric-500/25"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Reply
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- shared bits ---------------- */

const inputCls =
  'w-full rounded-xl border border-white/10 bg-navy-900/60 px-3.5 py-2.5 text-sm text-white placeholder:text-silver-400 focus:border-electric-500/50 focus:outline-none focus:ring-2 focus:ring-electric-500/20';

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-silver-300">
        {label}{required && <span className="text-ember-400"> *</span>}
      </span>
      {children}
    </label>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: 'bg-electric-500/15 text-electric-300',
    reviewed: 'bg-ember-500/15 text-ember-400',
    quoted: 'bg-purple-500/15 text-purple-300',
    read: 'bg-ember-500/15 text-ember-400',
    replied: 'bg-green-500/15 text-green-300',
    closed: 'bg-white/5 text-silver-400',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${colors[status] ?? colors.new}`}>
      {status}
    </span>
  );
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/5 px-3 py-1.5">
      <span className="text-[10px] uppercase tracking-wider text-silver-400">{label}: </span>
      <span className="font-medium text-silver-200">{value}</span>
    </div>
  );
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="glass flex flex-col items-center gap-3 rounded-2xl p-12 text-center">
      <span className="text-silver-500">{icon}</span>
      <p className="text-sm text-silver-400">{text}</p>
    </div>
  );
}
