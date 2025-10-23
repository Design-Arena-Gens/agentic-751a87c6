"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { defaultAgencyData } from "@/lib/defaultData";
import { useAgencyData } from "@/lib/persistentStore";

const gradients = [
  "from-primary-500/40 to-sky-500/30",
  "from-fuchsia-500/40 to-primary-500/30",
  "from-emerald-500/40 to-primary-500/30",
];

export function ProjectsShowcase() {
  const { data, loading } = useAgencyData();
  const projects = loading ? defaultAgencyData.projects : data.projects;

  return (
    <section id="projects" className="container-grid py-24 sm:py-28">
      <SectionHeading
        eyebrow="Case Studies"
        title="High-impact launches for venture-backed teams"
        description="We ship lovable products with tight feedback loops, measurable outcomes, and zero hand-offs."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_25px_55px_-25px_rgba(15,23,42,0.65)] transition hover:border-primary-400/40 hover:shadow-[0_25px_60px_-20px_rgba(79,70,229,0.65)]"
          >
            <div
              className={`relative flex h-48 w-full items-end overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_60%)] opacity-0 transition group-hover:opacity-100" />
              <span className="relative z-10 w-full bg-black/40 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white">
                {project.name}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-white/40">
                <span>Featured build</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white">{project.name}</h3>
              <p className="mt-3 flex-1 text-sm text-white/70">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-wider text-white/50">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-300 transition hover:text-primary-100"
              >
                Explore case study →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
