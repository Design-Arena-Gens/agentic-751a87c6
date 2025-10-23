"use client";

import { defaultAgencyData } from "@/lib/defaultData";
import { useAgencyData } from "@/lib/persistentStore";

export function MetricsSection() {
  const { data, loading } = useAgencyData();
  const metrics = loading ? defaultAgencyData.metrics : data.metrics;

  return (
    <section className="container-grid py-20">
      <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_25px_60px_-30px_rgba(79,70,229,0.65)] sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="space-y-2">
            <div className="text-3xl font-semibold text-primary-200">{metric.value}</div>
            <p className="text-sm text-white/65">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
