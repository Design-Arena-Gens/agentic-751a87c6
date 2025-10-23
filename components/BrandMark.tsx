"use client";

import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-white"
    >
      <span className="grid h-9 w-9 place-content-center rounded-xl bg-primary-500 font-bold text-white shadow-glow">
        NL
      </span>
      {!compact && (
        <span className="hidden sm:inline-flex flex-col leading-tight">
          <span>Nebula</span>
          <span className="text-sm font-normal text-white/60">Digital Studio</span>
        </span>
      )}
    </Link>
  );
}
