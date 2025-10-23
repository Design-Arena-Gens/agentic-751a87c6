"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { defaultAgencyData } from "@/lib/defaultData";
import { useAgencyData } from "@/lib/persistentStore";

export function TestimonialsSection() {
  const { data, loading } = useAgencyData();
  const testimonials = loading ? defaultAgencyData.testimonials : data.testimonials;

  return (
    <section id="testimonials" className="container-grid py-24">
      <SectionHeading
        eyebrow="Client Signals"
        title="Partnerships that fuel product-market fit"
        description="We embed with founders and product leaders who value velocity, craft, and measurable impact."
        align="center"
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.id}
            className="glass flex h-full flex-col justify-between rounded-3xl p-6 text-left shadow-[0_25px_50px_-30px_rgba(79,70,229,0.55)]"
          >
            <blockquote className="text-lg text-white/80">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-6 space-y-1 text-sm text-white/60">
              <p className="text-white">{testimonial.name}</p>
              <p>
                {testimonial.role} · {testimonial.company}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
