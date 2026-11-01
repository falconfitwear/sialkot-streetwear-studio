import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Globe2, Loader2, Mail, MapPin, MessageCircle, Phone, Info } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { PageHero } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { emailLink, hasValue, site, whatsappLink } from "@/config/site";
import { inquirySchema, productCategories, quantityOptions, slugToCategory, type Inquiry } from "@/lib/inquiry";
import { pageHead } from "@/lib/seo";

const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { category?: string | undefined; product?: string | undefined } => ({ category: str(s["category"]), product: str(s["product"]) }),
  head: () => pageHead({
    title: "Contact — Request a Quote",
    description: "Tell us about your apparel requirements. Request a quote for custom t-shirts, hoodies, tracksuits and sweatshirts with worldwide export.",
    path: "/contact",
  }),
  component: ContactPage,
});

type Status = { kind: "idle" } | { kind: "loading" } | { kind: "success" } | { kind: "error"; message: string } | { kind: "unconfigured" };
type Errors = Partial<Record<keyof Inquiry, string>>;

function ContactPage() {
  const { category, product } = Route.useSearch();
  const safeProduct = product?.slice(0, 100);
  const initialCategory = category ? slugToCategory[category] ?? "" : "";
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const wa = whatsappLink(
    safeProduct
      ? `Hello Falcon Fit Wear, I'm interested in pricing for: ${safeProduct}${initialCategory ? ` (${initialCategory})` : ""}.`
      : undefined,
  );
  const mail = emailLink(safeProduct ? `Pricing inquiry: ${safeProduct}` : "Apparel manufacturing inquiry");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = inquirySchema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Inquiry;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      setStatus({ kind: "idle" });
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    if (!hasValue(site.formspreeEndpoint)) { setStatus({ kind: "unconfigured" }); return; }
    setStatus({ kind: "loading" });
    try {
      const res = await fetch(site.formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...parsed.data, product: safeProduct ?? "", _subject: `New inquiry from ${parsed.data.company}` }),
      });
      if (res.ok) {
        setStatus({ kind: "success" });
        formRef.current?.reset();
      } else {
        const body = (await res.json().catch(() => null)) as { errors?: { message: string }[] } | null;
        setStatus({ kind: "error", message: body?.errors?.map((x) => x.message).join(", ") || `Submission failed (status ${res.status}). Please try again.` });
      }
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Check your connection and try again." });
    }
  }

  const field = (name: keyof Inquiry) => ({
    id: name,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    className: "field",
  });

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's Build Something Together." intro="Tell us about your apparel requirements. Our team is ready to discuss your next collection and bulk order." />

      <section className="container-x grid gap-14 py-16 md:py-24 lg:grid-cols-12">
        <aside className="space-y-8 lg:col-span-4">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold">Get in touch</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-4"><MapPin className="mt-0.5 shrink-0" size={20} aria-hidden /><div><p className="font-semibold">Location</p><p className="text-muted-foreground">{site.location}</p></div></li>
              <li className="flex gap-4"><Globe2 className="mt-0.5 shrink-0" size={20} aria-hidden /><div><p className="font-semibold">Market</p><p className="text-muted-foreground">Worldwide export</p></div></li>
              {mail && <li className="flex gap-4"><Mail className="mt-0.5 shrink-0" size={20} aria-hidden /><div><p className="font-semibold">Email</p><a href={mail} className="text-muted-foreground underline-offset-4 hover:text-ink hover:underline">{site.contact.email}</a></div></li>}
              {hasValue(site.contact.phone) && <li className="flex gap-4"><Phone className="mt-0.5 shrink-0" size={20} aria-hidden /><div><p className="font-semibold">Phone</p><a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="text-muted-foreground hover:text-ink">{site.contact.phone}</a></div></li>}
            </ul>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-lime mt-8 w-full"><MessageCircle size={18} aria-hidden /> Chat on WhatsApp</a>
            )}
          </Reveal>
          <Reveal delay={0.1} className="rounded-lg bg-ink p-7 text-paper">
            <Info className="text-lime" size={22} aria-hidden />
            <h3 className="mt-4 font-display text-lg font-bold">Quantities & feasibility</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">Minimum order quantities, pricing and product feasibility depend on garment type, fabric, decoration and specifications. We confirm these after reviewing your inquiry.</p>
          </Reveal>
        </aside>

        <div id="inquiry-form" className="scroll-mt-28 lg:col-span-8">
          <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-lg border bg-card p-6 shadow-card md:p-10" aria-describedby="form-note">
            <h2 className="font-display text-2xl font-extrabold">Project inquiry</h2>
            <p id="form-note" className="mt-2 text-sm text-muted-foreground">Fields marked <span aria-hidden>*</span><span className="sr-only">with an asterisk</span> are required.</p>
            {safeProduct && <p className="mt-4 rounded border-l-2 border-lime bg-secondary px-4 py-3 text-sm">Inquiring about: <strong>{safeProduct}</strong></p>}

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Field label="Full Name" name="fullName" error={errors.fullName} required><input {...field("fullName")} autoComplete="name" maxLength={100} /></Field>
              <Field label="Company / Brand" name="company" error={errors.company} required><input {...field("company")} autoComplete="organization" maxLength={120} /></Field>
              <Field label="Business Email" name="email" error={errors.email} required><input {...field("email")} type="email" autoComplete="email" maxLength={255} /></Field>
              <Field label="Country" name="country" error={errors.country} required><input {...field("country")} autoComplete="country-name" maxLength={80} /></Field>
              <Field label="Product Category" name="category" error={errors["category"]} required>
                <select {...field("category")} defaultValue={initialCategory}>
                  <option value="" disabled>Select a category</option>
                  {productCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Estimated Order Quantity" name="quantity" error={errors.quantity} required>
                <select {...field("quantity")} defaultValue="">
                  <option value="" disabled>Select quantity</option>
                  {quantityOptions.map((q) => <option key={q} value={q}>{q}</option>)}
                </select>
              </Field>
              <div className="md:col-span-2">
                <Field label="Customization Requirements" name="customization" error={errors.customization} required hint="e.g. fabric, fit, colors, printing, embroidery, labels, packaging">
                  <textarea {...field("customization")} rows={3} maxLength={1500} />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Project Description" name="description" error={errors.description} required>
                  <textarea {...field("description")} rows={5} maxLength={3000} defaultValue={safeProduct ? `I'm interested in the ${safeProduct}${initialCategory ? ` (${initialCategory})` : ""}. ` : ""} />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Expected Delivery Timeline" name="timeline" error={errors.timeline} hint="Optional">
                  <input {...field("timeline")} maxLength={200} />
                </Field>
              </div>
            </div>

            <div aria-live="polite" className="mt-6">
              {status.kind === "unconfigured" && (
                <p role="status" className="flex gap-3 rounded border border-input bg-secondary p-4 text-sm"><Info size={18} className="mt-0.5 shrink-0" aria-hidden />Online form submissions are not yet configured. Please use the contact methods when available.</p>
              )}
              {status.kind === "error" && (
                <p role="alert" className="flex gap-3 rounded border border-destructive p-4 text-sm text-destructive"><AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden />{status.message}</p>
              )}
              {status.kind === "success" && (
                <p role="status" className="flex gap-3 rounded border border-ring bg-secondary p-4 text-sm"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ring" aria-hidden />Thank you — your inquiry has been sent. Our team will review your requirements and get back to you.</p>
              )}
            </div>

            <button type="submit" disabled={status.kind === "loading"} className="btn btn-ink mt-6 w-full md:w-auto">
              {status.kind === "loading" ? <><Loader2 size={18} className="animate-spin" aria-hidden /> Sending…</> : "Send Inquiry"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, error, required, hint, children }: { label: string; name: string; error?: string | undefined; required?: boolean; hint?: string | undefined; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold">
        {label}{required && <span className="text-destructive" aria-hidden> *</span>}
        {hint && <span className="ml-2 font-normal text-muted-foreground">{hint}</span>}
      </label>
      {children}
      {error && <p id={`${name}-error`} className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}
