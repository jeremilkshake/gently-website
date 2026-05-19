"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  bookingUrl,
  businessDropdown,
  companyDropdown,
  gateAuthUi,
  gateLogoutHref,
  heroBookingCta,
  navBookingCta,
  navCompanyMenu,
  navContactLabel,
  navFamiliesLabel,
  navMobileMenuCloseAria,
  navMobileMenuOpenAria,
  navPartnersMenu,
  navResourcesMenu,
  navSolutionsMenu,
  openExternalTab,
  resourcesDropdown,
  solutionsDropdown,
} from "@/lib/content";
import { ROUTES, solutionsNavBase } from "@/lib/routes";
import NavDropdown from "@/components/nav/NavDropdown";
import MobileNavMenu from "@/components/nav/MobileNavMenu";
import { SessionLogout } from "@/components/ui/SessionLogout";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import type { NavDropdownItem } from "@/types";

function withSolutionsBase(items: NavDropdownItem[], base: string): NavDropdownItem[] {
  return items.map((item) => {
    const hashIndex = item.href.indexOf("#");
    if (hashIndex === -1) return item;
    return { ...item, href: `${base}${item.href.slice(hashIndex)}` };
  });
}

export default function Nav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const solutionsItems = useMemo(
    () => withSolutionsBase(solutionsDropdown, solutionsNavBase(pathname)),
    [pathname],
  );

  const isChooser = pathname === ROUTES.home;
  const bookingCtaLabel = pathname.startsWith(ROUTES.forYou) ? heroBookingCta : navBookingCta;
  const isContact = pathname.startsWith(ROUTES.contact);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest("[data-nav-root]")) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const setMenu = (key: string) => setOpenMenu((prev) => (prev === key ? null : key));

  const linkClass = (active?: boolean) =>
    cn(
      "shrink-0 rounded-lg px-2.5 py-2 font-sans text-[13px] no-underline transition-colors lg:px-3",
      active
        ? "bg-[var(--surface-hover)] font-semibold text-[var(--text)]"
        : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]",
    );

  return (
    <header
      data-nav-root
      className="relative z-[2] border-b border-[rgba(28,25,20,0.06)] bg-[var(--hero-sky)]"
    >
      <div className="mx-auto grid h-[var(--header-nav-h)] max-w-[1280px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <Logo variant="nav" />

        <nav
          className="hidden items-center justify-center gap-0.5 overflow-visible md:flex"
          aria-label="Main"
        >
          <Link href={ROUTES.forYou} className={linkClass(pathname.startsWith(ROUTES.forYou))}>
            {navFamiliesLabel}
          </Link>

          <NavDropdown
            id="nav-partners"
            label={navPartnersMenu}
            items={businessDropdown}
            open={openMenu === "business"}
            onToggle={() => setMenu("business")}
            onClose={() => setOpenMenu(null)}
            hasCta
          />

          <NavDropdown
            id="nav-solutions"
            label={navSolutionsMenu}
            items={solutionsItems}
            open={openMenu === "solutions"}
            onToggle={() => setMenu("solutions")}
            onClose={() => setOpenMenu(null)}
          />

          <NavDropdown
            id="nav-company"
            label={navCompanyMenu}
            items={companyDropdown}
            open={openMenu === "company"}
            onToggle={() => setMenu("company")}
            onClose={() => setOpenMenu(null)}
          />

          <Link href={ROUTES.contact} className={linkClass(isContact)}>
            {navContactLabel}
          </Link>

          {!isChooser && (
            <NavDropdown
              id="nav-resources"
              label={navResourcesMenu}
              items={resourcesDropdown}
              open={openMenu === "resources"}
              onToggle={() => setMenu("resources")}
              onClose={() => setOpenMenu(null)}
            />
          )}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Link href={ROUTES.contact} className={cn(linkClass(isContact), "md:hidden")}>
            {navContactLabel}
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-0 bg-transparent text-[var(--text)] transition-colors hover:bg-[var(--surface-hover)] md:hidden"
            aria-label={mobileOpen ? navMobileMenuCloseAria : navMobileMenuOpenAria}
            aria-expanded={mobileOpen}
            onClick={() => {
              setOpenMenu(null);
              setMobileOpen((v) => !v);
            }}
          >
            {mobileOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>

          <SessionLogout
            label={gateAuthUi.logout}
            afterLogoutHref={gateLogoutHref}
            className="hidden shrink-0 cursor-pointer border-0 bg-transparent p-0 font-sans text-[13px] text-[var(--muted)] transition-colors hover:text-[var(--text)] lg:inline"
          />

          <a
            href={bookingUrl}
            {...openExternalTab}
            className="font-brand inline-flex min-h-[2.5rem] shrink-0 items-center rounded-xl border-2 border-[var(--text)] bg-[var(--gate-intro-blue)] px-3 py-2 text-xs font-extrabold text-[var(--text)] no-underline shadow-[0_4px_0_0_var(--text)] transition hover:brightness-[0.97] active:translate-y-px sm:min-h-[3rem] sm:px-5 sm:text-sm"
          >
            {bookingCtaLabel}
          </a>
        </div>
      </div>

      <MobileNavMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        solutionsItems={solutionsItems}
        isChooser={isChooser}
        bookingCtaLabel={bookingCtaLabel}
      />
    </header>
  );
}
