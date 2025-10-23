"use client";

import { useEffect, useMemo, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { Footer } from "@/components/Footer";
import { defaultAgencyData } from "@/lib/defaultData";
import { persistData, resetData, useAgencyData } from "@/lib/persistentStore";
import type { AgencyData, Metric, Project, Service, Testimonial } from "@/lib/types";

type TabKey =
  | "hero"
  | "services"
  | "projects"
  | "process"
  | "testimonials"
  | "metrics"
  | "contact";

const tabs: Array<{ key: TabKey; label: string; description: string }> = [
  { key: "hero", label: "Landing Hero", description: "Headline, sub-copy, and CTA links" },
  { key: "services", label: "Services", description: "Capabilities grid content" },
  { key: "projects", label: "Case Studies", description: "Highlighted launches and tags" },
  { key: "process", label: "Process", description: "Engagement phases" },
  { key: "testimonials", label: "Testimonials", description: "Client quotes" },
  { key: "metrics", label: "Metrics", description: "Key impact stats" },
  { key: "contact", label: "Contact", description: "Team availability and channels" },
];

const inputBase =
  "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-400";

const textAreaBase =
  "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-primary-400";

const randomId = () => (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random()}`);

export default function AdminPage() {
  const { data, setData, loading } = useAgencyData();
  const [draft, setDraft] = useState<AgencyData>(structuredClone(defaultAgencyData));
  const [activeTab, setActiveTab] = useState<TabKey>("hero");
  const [status, setStatus] = useState<"idle" | "saved">("idle");

  useEffect(() => {
    if (!loading) {
      setDraft(structuredClone(data));
    }
  }, [data, loading]);

  const hasChanges = useMemo(() => JSON.stringify(draft) !== JSON.stringify(data), [draft, data]);

  const handleHeroChange = (field: "eyebrow" | "title" | "subtitle" | "ctaPrimary" | "ctaSecondary", value: string) => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      if (field === "ctaPrimary" || field === "ctaSecondary") {
        next.hero[field].label = value;
      } else {
        next.hero[field] = value;
      }
      return next;
    });
  };

  const handleHeroLinkChange = (field: "ctaPrimary" | "ctaSecondary", value: string) => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.hero[field].href = value;
      return next;
    });
  };

  const handleServiceChange = (index: number, patch: Partial<Service>) => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.services[index] = { ...next.services[index], ...patch };
      return next;
    });
  };

  const handleProjectChange = (index: number, patch: Partial<Project>) => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.projects[index] = { ...next.projects[index], ...patch };
      return next;
    });
  };

  const handleProcessChange = (index: number, field: "title" | "description", value: string) => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.process[index][field] = value;
      return next;
    });
  };

  const handleTestimonialChange = (index: number, patch: Partial<Testimonial>) => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.testimonials[index] = { ...next.testimonials[index], ...patch };
      return next;
    });
  };

  const handleMetricChange = (index: number, patch: Partial<Metric>) => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.metrics[index] = { ...next.metrics[index], ...patch };
      return next;
    });
  };

  const handleContactChange = (field: keyof AgencyData["contact"], value: string) => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.contact[field] = value;
      return next;
    });
  };

  const addService = () => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.services.push({ id: randomId(), title: "New service", description: "Describe the value proposition.", icon: "✨" });
      return next;
    });
  };

  const removeService = (index: number) => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.services.splice(index, 1);
      return next;
    });
  };

  const addProject = () => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.projects.push({
        id: randomId(),
        name: "New project",
        description: "Summarize the engagement and outcomes.",
        image: "",
        link: "https://",
        tags: ["Design", "Development"],
      });
      return next;
    });
  };

  const removeProject = (index: number) => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.projects.splice(index, 1);
      return next;
    });
  };

  const addProcessStep = () => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.process.push({ id: randomId(), title: "New phase", description: "Describe how you collaborate." });
      return next;
    });
  };

  const removeProcessStep = (index: number) => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.process.splice(index, 1);
      return next;
    });
  };

  const addTestimonial = () => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.testimonials.push({
        id: randomId(),
        name: "New client",
        role: "Role",
        company: "Company",
        quote: "Add the testimonial messaging here.",
      });
      return next;
    });
  };

  const removeTestimonial = (index: number) => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.testimonials.splice(index, 1);
      return next;
    });
  };

  const addMetric = () => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.metrics.push({ id: randomId(), label: "New metric", value: "0%" });
      return next;
    });
  };

  const removeMetric = (index: number) => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.metrics.splice(index, 1);
      return next;
    });
  };

  const handleProjectTagsChange = (index: number, value: string) => {
    setDraft((prev) => {
      const next = structuredClone(prev);
      next.projects[index].tags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      return next;
    });
  };

  const saveChanges = () => {
    const next = structuredClone(draft);
    persistData(next);
    setData(next);
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  };

  const restoreDefaults = () => {
    resetData();
    setDraft(structuredClone(defaultAgencyData));
    setData(structuredClone(defaultAgencyData));
  };

  const renderHero = () => (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <label className="text-sm text-white/60" htmlFor="hero-eyebrow">
            Hero eyebrow
          </label>
          <input
            id="hero-eyebrow"
            className={inputBase}
            value={draft.hero.eyebrow}
            onChange={(event) => handleHeroChange("eyebrow", event.target.value)}
          />
        </div>
        <div>
          <label className="text-sm text-white/60" htmlFor="hero-primary-label">
            Primary CTA label
          </label>
          <input
            id="hero-primary-label"
            className={inputBase}
            value={draft.hero.ctaPrimary.label}
            onChange={(event) => handleHeroChange("ctaPrimary", event.target.value)}
          />
        </div>
        <div className="lg:col-span-2">
          <label className="text-sm text-white/60" htmlFor="hero-title">
            Headline
          </label>
          <input
            id="hero-title"
            className={inputBase}
            value={draft.hero.title}
            onChange={(event) => handleHeroChange("title", event.target.value)}
          />
        </div>
        <div className="lg:col-span-2">
          <label className="text-sm text-white/60" htmlFor="hero-subtitle">
            Supporting copy
          </label>
          <textarea
            id="hero-subtitle"
            className={textAreaBase}
            value={draft.hero.subtitle}
            onChange={(event) => handleHeroChange("subtitle", event.target.value)}
            rows={4}
          />
        </div>
        <div>
          <label className="text-sm text-white/60" htmlFor="hero-primary-link">
            Primary CTA link
          </label>
          <input
            id="hero-primary-link"
            className={inputBase}
            value={draft.hero.ctaPrimary.href}
            onChange={(event) => handleHeroLinkChange("ctaPrimary", event.target.value)}
          />
        </div>
        <div>
          <label className="text-sm text-white/60" htmlFor="hero-secondary-label">
            Secondary CTA label
          </label>
          <input
            id="hero-secondary-label"
            className={inputBase}
            value={draft.hero.ctaSecondary.label}
            onChange={(event) => handleHeroChange("ctaSecondary", event.target.value)}
          />
        </div>
        <div>
          <label className="text-sm text-white/60" htmlFor="hero-secondary-link">
            Secondary CTA link
          </label>
          <input
            id="hero-secondary-link"
            className={inputBase}
            value={draft.hero.ctaSecondary.href}
            onChange={(event) => handleHeroLinkChange("ctaSecondary", event.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-4">
      {draft.services.map((service, index) => (
        <div key={service.id} className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{service.icon}</span>
              <input
                className="w-full rounded-lg bg-transparent text-lg font-semibold outline-none"
                value={service.title}
                onChange={(event) => handleServiceChange(index, { title: event.target.value })}
              />
            </div>
            <div className="flex gap-2 text-xs">
              <button
                type="button"
                className="rounded-full border border-white/15 px-3 py-1 text-white/70 transition hover:border-white/40 hover:text-white"
                onClick={() => handleServiceChange(index, { icon: service.icon === "✨" ? "⚡" : "✨" })}
              >
                Toggle icon
              </button>
              <button
                type="button"
                className="rounded-full border border-red-400/50 px-3 py-1 text-red-300 transition hover:border-red-400 hover:text-red-100"
                onClick={() => removeService(index)}
              >
                Remove
              </button>
            </div>
          </div>
          <textarea
            className={`${textAreaBase} mt-4`}
            rows={3}
            value={service.description}
            onChange={(event) => handleServiceChange(index, { description: event.target.value })}
          />
        </div>
      ))}
      <button
        type="button"
        className="rounded-full border border-dashed border-white/20 px-5 py-3 text-sm font-semibold text-white/70 transition hover:border-white/40 hover:text-white"
        onClick={addService}
      >
        + Add service
      </button>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4">
      {draft.projects.map((project, index) => (
        <div key={project.id} className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <input
              className="w-full rounded-lg bg-transparent text-lg font-semibold outline-none"
              value={project.name}
              onChange={(event) => handleProjectChange(index, { name: event.target.value })}
            />
            <button
              type="button"
              className="rounded-full border border-red-400/50 px-3 py-1 text-xs text-red-300 transition hover:border-red-400 hover:text-red-100"
              onClick={() => removeProject(index)}
            >
              Remove
            </button>
          </div>
          <textarea
            className={`${textAreaBase} mt-4`}
            rows={3}
            value={project.description}
            onChange={(event) => handleProjectChange(index, { description: event.target.value })}
          />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-white/50" htmlFor={`project-link-${project.id}`}>
                Case study link
              </label>
              <input
                id={`project-link-${project.id}`}
                className={inputBase}
                value={project.link}
                onChange={(event) => handleProjectChange(index, { link: event.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-white/50" htmlFor={`project-tags-${project.id}`}>
                Tags (comma-separated)
              </label>
              <input
                id={`project-tags-${project.id}`}
                className={inputBase}
                value={project.tags.join(", ")}
                onChange={(event) => handleProjectTagsChange(index, event.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="rounded-full border border-dashed border-white/20 px-5 py-3 text-sm font-semibold text-white/70 transition hover:border-white/40 hover:text-white"
        onClick={addProject}
      >
        + Add project
      </button>
    </div>
  );

  const renderProcess = () => (
    <div className="space-y-4">
      {draft.process.map((step, index) => (
        <div key={step.id} className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <div className="flex items-start justify-between gap-4">
            <input
              className="w-full rounded-lg bg-transparent text-lg font-semibold outline-none"
              value={step.title}
              onChange={(event) => handleProcessChange(index, "title", event.target.value)}
            />
            <button
              type="button"
              className="rounded-full border border-red-400/50 px-3 py-1 text-xs text-red-300 transition hover:border-red-400 hover:text-red-100"
              onClick={() => removeProcessStep(index)}
            >
              Remove
            </button>
          </div>
          <textarea
            className={`${textAreaBase} mt-4`}
            rows={3}
            value={step.description}
            onChange={(event) => handleProcessChange(index, "description", event.target.value)}
          />
        </div>
      ))}
      <button
        type="button"
        className="rounded-full border border-dashed border-white/20 px-5 py-3 text-sm font-semibold text-white/70 transition hover:border-white/40 hover:text-white"
        onClick={addProcessStep}
      >
        + Add phase
      </button>
    </div>
  );

  const renderTestimonials = () => (
    <div className="space-y-4">
      {draft.testimonials.map((testimonial, index) => (
        <div key={testimonial.id} className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className={inputBase}
              value={testimonial.name}
              onChange={(event) => handleTestimonialChange(index, { name: event.target.value })}
              placeholder="Client name"
            />
            <input
              className={inputBase}
              value={testimonial.company}
              onChange={(event) => handleTestimonialChange(index, { company: event.target.value })}
              placeholder="Company"
            />
            <input
              className={inputBase}
              value={testimonial.role}
              onChange={(event) => handleTestimonialChange(index, { role: event.target.value })}
              placeholder="Role"
            />
            <button
              type="button"
              className="justify-self-end rounded-full border border-red-400/50 px-3 py-1 text-xs text-red-300 transition hover:border-red-400 hover:text-red-100"
              onClick={() => removeTestimonial(index)}
            >
              Remove
            </button>
          </div>
          <textarea
            className={`${textAreaBase} mt-4`}
            rows={3}
            value={testimonial.quote}
            onChange={(event) => handleTestimonialChange(index, { quote: event.target.value })}
          />
        </div>
      ))}
      <button
        type="button"
        className="rounded-full border border-dashed border-white/20 px-5 py-3 text-sm font-semibold text-white/70 transition hover:border-white/40 hover:text-white"
        onClick={addTestimonial}
      >
        + Add testimonial
      </button>
    </div>
  );

  const renderMetrics = () => (
    <div className="space-y-4">
      {draft.metrics.map((metric, index) => (
        <div key={metric.id} className="grid gap-4 rounded-2xl border border-white/15 bg-white/5 p-6 sm:grid-cols-[1fr_auto]">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className={inputBase}
              value={metric.value}
              onChange={(event) => handleMetricChange(index, { value: event.target.value })}
              placeholder="Value"
            />
            <input
              className={inputBase}
              value={metric.label}
              onChange={(event) => handleMetricChange(index, { label: event.target.value })}
              placeholder="Label"
            />
          </div>
          <button
            type="button"
            className="h-10 rounded-full border border-red-400/50 px-3 text-xs text-red-300 transition hover:border-red-400 hover:text-red-100"
            onClick={() => removeMetric(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="rounded-full border border-dashed border-white/20 px-5 py-3 text-sm font-semibold text-white/70 transition hover:border-white/40 hover:text-white"
        onClick={addMetric}
      >
        + Add metric
      </button>
    </div>
  );

  const renderContact = () => (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <label className="text-sm text-white/60" htmlFor="contact-email">
          Primary email
        </label>
        <input
          id="contact-email"
          className={inputBase}
          value={draft.contact.email}
          onChange={(event) => handleContactChange("email", event.target.value)}
        />
      </div>
      <div>
        <label className="text-sm text-white/60" htmlFor="contact-phone">
          Phone
        </label>
        <input
          id="contact-phone"
          className={inputBase}
          value={draft.contact.phone}
          onChange={(event) => handleContactChange("phone", event.target.value)}
        />
      </div>
      <div className="sm:col-span-2">
        <label className="text-sm text-white/60" htmlFor="contact-location">
          Location
        </label>
        <input
          id="contact-location"
          className={inputBase}
          value={draft.contact.location}
          onChange={(event) => handleContactChange("location", event.target.value)}
        />
      </div>
      <div className="sm:col-span-2">
        <label className="text-sm text-white/60" htmlFor="contact-availability">
          Availability
        </label>
        <input
          id="contact-availability"
          className={inputBase}
          value={draft.contact.availability}
          onChange={(event) => handleContactChange("availability", event.target.value)}
        />
      </div>
    </div>
  );

  const contentByTab: Record<TabKey, JSX.Element> = {
    hero: renderHero(),
    services: renderServices(),
    projects: renderProjects(),
    process: renderProcess(),
    testimonials: renderTestimonials(),
    metrics: renderMetrics(),
    contact: renderContact(),
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <header className="border-b border-white/10 bg-black/40">
        <div className="container-grid flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <BrandMark />
            <div>
              <h1 className="text-xl font-semibold">Admin Control Center</h1>
              <p className="text-sm text-white/60">Manage your agency site content and publish updates instantly.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:border-white/40 hover:text-white"
              onClick={restoreDefaults}
            >
              Reset to defaults
            </button>
            <button
              type="button"
              disabled={!hasChanges}
              className="rounded-full bg-primary-500 px-5 py-2 text-sm font-semibold text-white shadow-glow transition disabled:cursor-not-allowed disabled:bg-white/20"
              onClick={saveChanges}
            >
              {hasChanges ? "Save changes" : "Saved"}
            </button>
            {status === "saved" && (
              <span className="text-xs text-emerald-300">Published ✔</span>
            )}
          </div>
        </div>
      </header>

      <main className="container-grid py-12">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`w-full rounded-xl px-4 py-3 text-left transition ${
                  activeTab === tab.key
                    ? "bg-primary-500/20 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="font-medium">{tab.label}</div>
                <div className="text-xs text-white/50">{tab.description}</div>
              </button>
            ))}
          </aside>

          <section className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">
                  {tabs.find((tab) => tab.key === activeTab)?.label}
                </h2>
                <p className="mt-2 text-sm text-white/60">
                  {tabs.find((tab) => tab.key === activeTab)?.description}
                </p>
              </div>
              {contentByTab[activeTab]}
            </div>
            <p className="text-xs text-white/40">
              Changes are stored locally in your browser. Publish updates to sync the marketing site instantly.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
