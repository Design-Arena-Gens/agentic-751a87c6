"use client";

import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#projects", label: "Work" },
  { href: "#testimonials", label: "Clients" },
  { href: "#contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-dark/80 backdrop-blur-xl">
      <nav className="container-grid flex items-center justify-between py-4">
        <BrandMark />
        <button
          aria-label="Toggle navigation"
          className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-white/80 transition sm:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Menu</span>
          {open ? "✕" : "☰"}
        </button>
        <div className="hidden items-center gap-8 text-sm font-medium sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/80 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-primary-400"
          >
            Start a project
          </a>
        </div>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-dark/95 sm:hidden">
          <div className="container-grid flex flex-col gap-2 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-white/80 transition hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
