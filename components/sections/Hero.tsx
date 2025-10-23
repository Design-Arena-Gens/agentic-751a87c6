"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { defaultAgencyData } from "@/lib/defaultData";
import { useAgencyData } from "@/lib/persistentStore";

export function HeroSection() {
  const { data, loading } = useAgencyData();
  const hero = loading ? defaultAgencyData.hero : data.hero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark via-dark to-black py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-primary-500/20 blur-[120px]" />
      </div>
      <div className="container-grid relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/70">
            <span className="h-2 w-2 rounded-full bg-primary-400" />
            {hero.eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 text-lg text-white/70 sm:text-xl">{hero.subtitle}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={hero.ctaPrimary.href}
              className="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-glow transition hover:bg-primary-400"
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white/80 transition hover:border-white/40 hover:text-white"
            >
              {hero.ctaSecondary.label}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
