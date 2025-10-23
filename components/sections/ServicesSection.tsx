"use client";

import { defaultAgencyData } from "@/lib/defaultData";
import { useAgencyData } from "@/lib/persistentStore";
import { SectionHeading } from "@/components/SectionHeading";

export function ServicesSection() {
  const { data, loading } = useAgencyData();
  const services = loading ? defaultAgencyData.services : data.services;

  return (
    <section id="services" className="container-grid py-24 sm:py-28">
      <SectionHeading
        eyebrow="Capabilities"
        title="A multidisciplinary team aligned to outcomes"
        description="From discovery to delivery, we orchestrate strategy, design, and engineering as one high-performance squad."
        align="center"
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <article
            key={service.id}
            className="glass flex flex-col justify-between rounded-2xl p-6 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)] transition hover:border-white/25 hover:shadow-[0_30px_70px_-25px_rgba(79,70,229,0.45)]"
          >
            <div>
              <div className="text-3xl">{service.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-sm text-white/70">{service.description}</p>
            </div>
            <div className="mt-6 text-xs uppercase tracking-widest text-white/40">
              Sprint-aligned delivery
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
