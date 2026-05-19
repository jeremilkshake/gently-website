"use client";

import { Logo } from "@/components/ui/Logo";
import { FooterGateLogout } from "@/components/ui/FooterGateLogout";
import { footerColumns } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="font-reading border-t border-[var(--border)] bg-[var(--bg)] px-6 pt-10 pb-8">
      <div className="max-w-content mx-auto flex flex-wrap items-start justify-between gap-6">
        <div>
          <Logo variant="footer" className="mb-1 block" />
          <p className="text-[12px] text-[var(--muted)]">Estate · Admin · Wellbeing</p>
        </div>

        <div className="flex flex-wrap gap-9">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-3 text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">{col.heading}</h4>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="mb-1.5 block text-[12px] text-[var(--dim)] no-underline transition-colors hover:text-[var(--text)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-content mx-auto mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-subtle)] pt-5 text-[11px] text-[var(--dim)]">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>© 2026 gently</span>
          <FooterGateLogout className="text-[11px] text-[var(--dim)] underline-offset-2 hover:text-[var(--text)] hover:underline" />
        </span>
        <span>Made with care for people carrying something heavy.</span>
      </div>
    </footer>
  );
}
