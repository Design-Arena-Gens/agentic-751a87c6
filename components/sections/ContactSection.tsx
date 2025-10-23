"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { defaultAgencyData } from "@/lib/defaultData";
import { useAgencyData } from "@/lib/persistentStore";

export function ContactSection() {
  const { data, loading } = useAgencyData();
  const contact = loading ? defaultAgencyData.contact : data.contact;
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName");
    setStatus("success");
    window.setTimeout(() => setStatus("idle"), 4000);
    event.currentTarget.reset();
    console.info("Discovery call request", Object.fromEntries(formData.entries()), firstName);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-primary-500/10 via-transparent to-sky-500/10 py-24"
    >
      <div className="pointer-events-none absolute -left-32 top-12 h-80 w-80 rounded-full bg-primary-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-[100px]" />
      <div className="container-grid relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading
            eyebrow="Start a project"
            title="Let’s build the web experience your users can’t stop talking about"
            description="We work with product teams ready to ship ambitious digital products. Share a few details and we’ll reach out within one business day."
          />
          <dl className="mt-8 space-y-4 text-sm text-white/70">
            <div>
              <dt className="font-semibold text-white">Email</dt>
              <dd>
                <a className="hover:text-white" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Phone</dt>
              <dd>{contact.phone}</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Location</dt>
              <dd>{contact.location}</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Availability</dt>
              <dd>{contact.availability}</dd>
            </div>
          </dl>
        </div>
        <div className="glass relative rounded-3xl p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-white/70" htmlFor="firstName">
                  First name
                </label>
                <input
                  required
                  id="firstName"
                  name="firstName"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-400"
                  placeholder="Alex"
                  autoComplete="given-name"
                />
              </div>
              <div>
                <label className="text-sm text-white/70" htmlFor="lastName">
                  Last name
                </label>
                <input
                  required
                  id="lastName"
                  name="lastName"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-400"
                  placeholder="Morgan"
                  autoComplete="family-name"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/70" htmlFor="email">
                Work email
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-400"
                placeholder="alex@company.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="text-sm text-white/70" htmlFor="company">
                Company
              </label>
              <input
                required
                id="company"
                name="company"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-400"
                placeholder="Acme Corp"
                autoComplete="organization"
              />
            </div>
            <div>
              <label className="text-sm text-white/70" htmlFor="budget">
                Estimated budget
              </label>
              <select
                id="budget"
                name="budget"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-400"
                defaultValue="$50k-$100k"
              >
                <option className="bg-dark" value="$25k-$50k">
                  $25k-$50k
                </option>
                <option className="bg-dark" value="$50k-$100k">
                  $50k-$100k
                </option>
                <option className="bg-dark" value="$100k-$250k">
                  $100k-$250k
                </option>
                <option className="bg-dark" value="$250k+">
                  $250k+
                </option>
              </select>
            </div>
            <div>
              <label className="text-sm text-white/70" htmlFor="timeline">
                Desired timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-400"
                defaultValue="3 months"
              >
                <option className="bg-dark" value="6 weeks">
                  6 weeks
                </option>
                <option className="bg-dark" value="3 months">
                  3 months
                </option>
                <option className="bg-dark" value="6 months">
                  6 months
                </option>
                <option className="bg-dark" value="Flexible">
                  Flexible
                </option>
              </select>
            </div>
            <div>
              <label className="text-sm text-white/70" htmlFor="goals">
                What are you building?
              </label>
              <textarea
                required
                id="goals"
                name="goals"
                className="mt-2 min-h-[120px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-400"
                placeholder="Share a quick overview of the challenge, goals, and success metrics."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-glow transition hover:bg-primary-400"
            >
              Submit request
            </button>
            {status === "success" && (
              <p className="text-center text-sm font-medium text-emerald-300">
                Success! We’ll reach out shortly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
