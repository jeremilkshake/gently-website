"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  bookingUrl,
  businessDropdown,
  companyDropdown,
  navCompanyMenu,
  navContactDesc,
  navContactLabel,
  navFamiliesLabel,
  navMobileMenuCloseAria,
  navMobileMenuOpenAria,
  navPartnersMenu,
  navResourcesMenu,
  navSolutionsMenu,
  openExternalTab,
  resourcesDropdown,
} from "@/lib/content";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { NavDropdownItem } from "@/types";

function MobileNavSection({
  title,
  items,
  defaultExpanded = false,
  onNavigate,
}: {
  title: string;
  items: NavDropdownItem[];
  defaultExpanded?: boolean;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-[var(--border-subtle)]">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between py-3.5 text-left font-sans text-[15px] font-medium text-[var(--text)]"
        aria-expanded={expanded}
      >
        {title}
        <ChevronDown
          size={16}
          className={cn("shrink-0 text-[var(--muted)] transition-transform duration-200", expanded && "rotate-180")}
          aria-hidden
        />
      </button>
      {expanded && (
        <ul className="m-0 list-none space-y-0.5 pb-3 pl-1">
          {items.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 no-underline transition-colors hover:bg-[var(--surface-hover)]"
              >
                <span
                  className="text-[14px] font-medium text-[var(--text)]"
                  style={item.color ? { color: item.color } : undefined}
                >
                  {item.title}
                </span>
                {item.desc && (
                  <span className="font-reading text-[12px] leading-[1.4] text-[var(--muted)]">{item.desc}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type Props = {
  open: boolean;
  onClose: () => void;
  solutionsItems: NavDropdownItem[];
  isChooser: boolean;
  bookingCtaLabel: string;
};

export default function MobileNavMenu({ open, onClose, solutionsItems, isChooser, bookingCtaLabel }: Props) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[198] bg-black/30 md:hidden"
        aria-label={navMobileMenuCloseAria}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={navMobileMenuOpenAria}
        className="fixed top-[var(--header-nav-h)] right-0 bottom-0 left-0 z-[199] overflow-y-auto border-t border-[var(--border)] bg-[var(--card)] md:hidden"
      >
        <nav className="flex flex-col px-4 py-3">
          <Link
            href={ROUTES.contact}
            onClick={onClose}
            className="mb-2 flex flex-col gap-0.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3.5 no-underline"
          >
            <span className="font-sans text-[15px] font-semibold text-[var(--text)]">{navContactLabel}</span>
            <span className="font-reading text-[12px] text-[var(--muted)]">{navContactDesc}</span>
          </Link>

          <Link
            href={ROUTES.forYou}
            onClick={onClose}
            className="border-b border-[var(--border-subtle)] py-3.5 font-sans text-[15px] font-medium text-[var(--text)] no-underline"
          >
            {navFamiliesLabel}
          </Link>

          <MobileNavSection title={navPartnersMenu} items={businessDropdown} onNavigate={onClose} />
          <MobileNavSection title={navSolutionsMenu} items={solutionsItems} onNavigate={onClose} />
          <MobileNavSection
            title={navCompanyMenu}
            items={companyDropdown}
            defaultExpanded
            onNavigate={onClose}
          />

          {!isChooser && (
            <MobileNavSection title={navResourcesMenu} items={resourcesDropdown} onNavigate={onClose} />
          )}

          <a
            href={bookingUrl}
            {...openExternalTab}
            onClick={onClose}
            className="font-brand mt-4 mb-2 inline-flex min-h-[3rem] items-center justify-center rounded-xl border-2 border-[var(--text)] bg-[var(--gate-intro-blue)] px-5 py-3 text-sm font-extrabold text-[var(--text)] no-underline shadow-[0_4px_0_0_var(--text)]"
          >
            {bookingCtaLabel}
          </a>
        </nav>
      </div>
    </>
  );
}
