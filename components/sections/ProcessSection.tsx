"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { defaultAgencyData } from "@/lib/defaultData";
import { useAgencyData } from "@/lib/persistentStore";

export function ProcessSection() {
  const { data, loading } = useAgencyData();
  const process = loading ? defaultAgencyData.process : data.process;

  return (
    <section id="process" className="container-grid py-24">
      <SectionHeading
        eyebrow="Delivery Framework"
        title="Grounded in insight, shaped in iterations, launched with precision"
        description="Our engagement model keeps momentum high while de-risking every phase of the product lifecycle."
        align="center"
      />
      <div className="relative mt-12 grid gap-6 lg:grid-cols-4">
        {process.map((step, index) => (
          <div
            key={step.id}
            className="glass relative rounded-2xl p-6 shadow-[0_20px_50px_-25px_rgba(79,70,229,0.55)]"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-white/30">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-sm text-white/70">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
