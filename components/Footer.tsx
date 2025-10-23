"use client";

import { BrandMark } from "@/components/BrandMark";
import { defaultAgencyData } from "@/lib/defaultData";
import { useAgencyData } from "@/lib/persistentStore";

export function Footer({ email }: { email?: string }) {
  const { data, loading } = useAgencyData();
  const contactEmail = email ?? (loading ? defaultAgencyData.contact.email : data.contact.email);

  return (
    <footer className="border-t border-white/10 bg-black/20 py-12">
      <div className="container-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <BrandMark />
          <p className="max-w-xs text-sm text-white/60">
            Full-service product squad specializing in design systems, front-end platforms, and experience optimization.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60">Services</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>Product strategy</li>
            <li>UX research & design</li>
            <li>Full-stack engineering</li>
            <li>Performance optimization</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a className="hover:text-white" href="#projects">
                Case studies
              </a>
            </li>
            <li>
              <a className="hover:text-white" href="#process">
                Engagement model
              </a>
            </li>
            <li>
              <a className="hover:text-white" href="/admin">
                Admin dashboard
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60">Collaborate</h4>
          <p className="mt-3 text-sm text-white/70">
            Prefer email? Reach us directly at
            <br />
            <a
              className="font-semibold text-white hover:underline"
              href={`mailto:${contactEmail}`}
            >
              {contactEmail}
            </a>
          </p>
          <p className="mt-4 text-xs text-white/40">
            © {new Date().getFullYear()} Nebula Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
