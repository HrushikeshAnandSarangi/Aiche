// app/contact/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Loader2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
} from "lucide-react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  // honeypot field (should remain empty)
  website: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
    website: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  // simple validators
  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (!form.subject.trim()) e.subject = "Please add a subject.";
    if (!form.message.trim()) e.message = "Please write a message.";
    else if (form.message.length < 10) e.message = "Message should be at least 10 characters.";
    // honeypot
    if (form.website.trim()) e.website = "Spam detected.";
    return e;
  }, [form]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);
  const remaining = 1000 - form.message.length;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
      website: touched.website,
    });
    if (!isValid) return;

    try {
      setSubmitting(true);
      setStatus(null);

      // Example: call your API route /api/contact (implement separately)
      // const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      // const json = await res.json();
      // if (!res.ok) throw new Error(json?.message || "Failed to send.");
      // Simulated delay/success (remove in production)
      await new Promise((r) => setTimeout(r, 900));

      setStatus({ ok: true, msg: "Thanks! Your message has been sent." });
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
      setTouched({ name: false, email: false, subject: false, message: false, website: false });
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message ?? "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <main className="bg-slate-50 min-h-screen py-20 ">
      {/* Hero */}
      <section className="bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-6 animate-reveal-down">
            <Image src="/Aiche-logo.svg" alt="AIChE logo" width={56} height={56} />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Contact AIChE NIT Rourkela</h1>
              <p className="text-gray-300 mt-1">We’d love to hear from you.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-blue-200">
            <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: contact info cards */}
          <div className="space-y-4 lg:order-2">
            <Card className="animate-reveal-up">
              <CardRow icon={<Mail className="w-5 h-5" />} title="Email">
                <a href="mailto:aiche@nitrkl.ac.in" className="underline underline-offset-4 hover:text-blue-700 transition-colors">
                  aiche@nitrkl.ac.in
                </a>
              </CardRow>
            </Card>

            <Card className="animate-reveal-up" style={{ animationDelay: "120ms" }}>
              <CardRow icon={<Phone className="w-5 h-5" />} title="Phone">
                <a href="tel:+910000000000" className="hover:text-blue-700 transition-colors">+91 00000 00000</a>
              </CardRow>
            </Card>

            <Card className="animate-reveal-up" style={{ animationDelay: "220ms" }}>
              <CardRow icon={<MapPin className="w-5 h-5" />} title="Address">
                <p>NIT Rourkela, Odisha, India</p>
              </CardRow>
            </Card>

            {/* Social */}
            <Card className="animate-reveal-up" style={{ animationDelay: "320ms" }}>
              <h3 className="font-semibold mb-3">Connect with us</h3>
              <div className="flex gap-3">
                <SocialLink href="https://facebook.com/aichenitrourkela" label="Facebook">
                  <Facebook className="w-5 h-5" />
                </SocialLink>
                <SocialLink href="https://twitter.com/aichenitrourkela" label="Twitter/X">
                  <Twitter className="w-5 h-5" />
                </SocialLink>
                <SocialLink href="https://instagram.com/aichenitrourkela" label="Instagram">
                  <Instagram className="w-5 h-5" />
                </SocialLink>
                <SocialLink href="https://linkedin.com/company/aichenitrourkela" label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </SocialLink>
              </div>
            </Card>

            {/* Map */}
            <Card className="overflow-hidden animate-reveal-up" style={{ animationDelay: "420ms" }}>
              <h3 className="font-semibold mb-3">Find us on the map</h3>
              <div className="rounded-lg overflow-hidden aspect-[16/10] bg-slate-200">
                <iframe
                  title="AIChE NIT Rourkela location map"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3695.317171129661!2d84.901!3d22.250!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1f3fa2b7b3d7df%3A0x0!2sNIT%20Rourkela!5e0!3m2!1sen!2sin!4v1700000000000"
                />
              </div>
            </Card>
          </div>

          {/* Right: form + faq */}
          <div className="lg:col-span-2 space-y-8 lg:order-1">
            {/* Form */}
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 animate-reveal-up"
              aria-describedby="form-status"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-1">Send us a message</h2>
              <p className="text-sm text-slate-500 mb-6">We usually reply within 1–2 working days.</p>

              {/* name + email grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  label="Your name"
                  id="name"
                  value={form.name}
                  onChange={(v) => set("name", v)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  error={touched.name ? errors.name : undefined}
                  placeholder="Jane Doe"
                />

                <Field
                  label="Email address"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(v) => set("email", v)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  error={touched.email ? errors.email : undefined}
                  placeholder="jane.doe@example.com"
                />
              </div>

              <Field
                className="mt-4"
                label="Subject"
                id="subject"
                value={form.subject}
                onChange={(v) => set("subject", v)}
                onBlur={() => setTouched((t) => ({ ...t, subject: true }))}
                error={touched.subject ? errors.subject : undefined}
                placeholder="I’d like to collaborate…"
              />

              {/* Message */}
              <div className="mt-4">
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className={`mt-1 block w-full rounded-xl border bg-white px-3 py-2 leading-6 outline-none
                      transition-all ease-minor-spring
                      focus:ring-4 focus:ring-blue-100 focus:border-blue-600
                      ${touched.message && errors.message ? "border-red-400" : "border-slate-300"}`}
                    rows={6}
                    maxLength={1000}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    aria-invalid={!!(touched.message && errors.message)}
                    aria-describedby="message-help"
                  />
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span id="message-help" className="text-slate-500">
                      Be as detailed as possible.
                    </span>
                    <span className={`tabular-nums ${remaining < 0 ? "text-red-500" : "text-slate-500"}`}>
                      {remaining} chars left
                    </span>
                  </div>
                </div>
                {touched.message && errors.message && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot (hidden) */}
              <div className="hidden">
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  type="text"
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, website: true }))}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              {/* Status */}
              <div id="form-status" aria-live="polite" className="min-h-6 mt-3">
                {status && (
                  <p
                    className={`text-sm ${status.ok ? "text-green-700" : "text-red-700"} animate-content-blur`}
                  >
                    {status.msg}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={submitting || !isValid}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium text-white
                    transition-all ease-minor-spring
                    ${submitting || !isValid ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                    focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100`}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send message
                    </>
                  )}
                </button>

                {/* fallback mailto */}
                <a
                  href={`mailto:aiche@nitrkl.ac.in?subject=${encodeURIComponent(form.subject || "Hello from AIChE site")}&body=${encodeURIComponent(
                    `From: ${form.name} <${form.email}>\n\n${form.message}`
                  )}`}
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium border border-slate-300 bg-white hover:bg-slate-50 transition-all ease-minor-spring"
                >
                  Use Email Client
                </a>
              </div>
            </form>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 animate-reveal-up">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Frequently asked questions</h2>
              <Accordion
                items={[
                  {
                    q: "How soon will I get a reply?",
                    a: "We typically respond within 1–2 working days. During events, replies may take a bit longer.",
                  },
                  {
                    q: "Can we collaborate with AIChE NIT Rourkela?",
                    a: "Absolutely! Share a brief of your idea, expected timeline, and outcomes—our team will reach out to discuss.",
                  },
                  {
                    q: "Do you offer workshops or talks?",
                    a: "Yes. We love hosting workshops, guest lectures, and industry interactions. Tell us your topic preferences in the message.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------- Small components -------------------- */

function Card({
  children,
  className = "",
  style,
}: React.PropsWithChildren<{ className?: string; style?: React.CSSProperties }>) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all ease-minor-spring hover:shadow-md ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function CardRow({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-lg bg-blue-50 text-blue-700 p-2">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <div className="text-sm text-slate-600">{children}</div>
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: React.PropsWithChildren<{ href: string; label: string }>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 bg-slate-900/80 hover:bg-yellow-500 text-white rounded-lg flex items-center justify-center transition-all ease-minor-spring"
    >
      {children}
    </a>
  );
}

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  className = "",
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-xl border bg-white px-3 py-2 leading-6 outline-none
          transition-all ease-minor-spring
          focus:ring-4 focus:ring-blue-100 focus:border-blue-600
          ${error ? "border-red-400" : "border-slate-300"}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete={id === "name" ? "name" : id === "email" ? "email" : "on"}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <ul className="divide-y divide-slate-200">
      {items.map((item, idx) => (
        <li key={idx}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-medium">
              <span>{item.q}</span>
              <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
            </summary>
            <p className="pb-3 text-slate-600 animate-content-blur">{item.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
