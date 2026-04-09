"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  bookingUrl,
  businessDropdown,
  gateAuthUi,
  navBusinessCta,
  navLoginHref,
  openExternalTab,
  resourcesDropdown,
  solutionsDropdown,
} from "@/lib/content";
import { SessionLogout } from "@/components/ui/SessionLogout";
import { Logo } from "@/components/ui/Logo";
import { useGateUnlock } from "@/lib/gateUnlockContext";
import { useAudience } from "@/lib/audienceContext";
import { cn } from "@/lib/utils";
import type { MouseEvent } from "react";
import type { NavDropdownItem } from "@/types";

function Dropdown({
  items,
  hasCta,
  onItemClick,
  onNavigate,
}: {
  items: NavDropdownItem[];
  hasCta?: boolean;
  onItemClick?: (item: NavDropdownItem, e: MouseEvent<HTMLAnchorElement>) => void;
  /** Called after any dropdown link is activated (closes the menu). */
  onNavigate?: () => void;
}) {
  return (
    <div
      className="absolute left-0 z-[999] rounded-[20px] border-2 border-[var(--border)] bg-[var(--card)] p-2 shadow-[0_2px_0_0_var(--border)]"
      style={{
        top: "calc(100% + 8px)",
        minWidth: hasCta ? 380 : 260,
      }}
    >
      <div className={cn("flex", hasCta ? "flex-row" : "flex-col")}>
        <div className="flex flex-1 flex-col gap-0.5 p-1">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={(e) => {
                onItemClick?.(item, e);
                onNavigate?.();
              }}
              className="flex flex-col gap-0.5 rounded-[10px] px-3 py-2.5 no-underline transition-colors hover:bg-[var(--surface-hover)]"
            >
              <span
                className="text-[13px] font-medium text-[var(--text)]"
                style={item.color ? { color: item.color } : undefined}
              >
                {item.title}
              </span>
              {item.desc && (
                <span className="font-reading text-[11px] leading-[1.4] text-[var(--muted)]">{item.desc}</span>
              )}
            </a>
          ))}
        </div>
        {hasCta && (
          <div className="flex min-w-[160px] flex-col justify-center gap-3 rounded-r-[12px] border-l border-[var(--border)] bg-[rgba(119,208,250,0.1)] px-[18px] py-5">
            <p className="font-reading m-0 text-[13px] leading-[1.5] text-[var(--text)]">{navBusinessCta.body}</p>
            <a
              href={bookingUrl}
              {...openExternalTab}
              onClick={() => onNavigate?.()}
              className="flex items-center gap-1 text-[12px] text-[var(--accent)] no-underline transition-all hover:gap-2"
            >
              {navBusinessCta.linkLabel}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Nav() {
  const { gateEnabled, unlocked } = useGateUnlock();
  const { audience, setAudience } = useAudience();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  /** Solid hero sky — must stay opaque so animated clouds in the hero never read through the bar */
  const handleDropdownLink = (item: NavDropdownItem, e: MouseEvent<HTMLAnchorElement>) => {
    if (item.switchAudience && item.switchAudience !== audience) {
      e.preventDefault();
      setOpenMenu(null);
      setAudience(item.switchAudience);
      const id = item.href.startsWith("#") ? item.href.slice(1) : "";
      if (!id) return;
      const scrollToTarget = () => document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToTarget);
      });
    }
  };

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (!(e.target as Element).closest("[data-nav-item]")) setOpenMenu(null);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const toggle = (name: string) => setOpenMenu((prev) => (prev === name ? null : name));

  const menuBtnClass = (key: string) =>
    cn(
      "flex cursor-pointer items-center gap-1 rounded-lg border-0 bg-transparent px-3 py-2 font-sans text-[13px] transition-colors",
      openMenu === key
        ? "text-[var(--text)]"
        : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]",
    );

  return (
    <nav
      className={cn(
        "relative z-[2] flex h-[60px] w-full shrink-0 items-center justify-between px-6",
        "bg-[var(--hero-sky)] border-b border-[rgba(28,25,20,0.06)]",
      )}
    >
      <Logo variant="nav" />

      <div className="hidden min-w-0 items-center gap-0.5 whitespace-nowrap md:flex">
        <div className="relative" data-nav-item>
          <button type="button" className={menuBtnClass("business")} onClick={() => toggle("business")}>
            Business
            <ChevronDown
              size={12}
              className={cn("transition-transform duration-300", openMenu === "business" && "rotate-180")}
            />
          </button>
          {openMenu === "business" && (
            <Dropdown
              items={businessDropdown}
              hasCta
              onItemClick={handleDropdownLink}
              onNavigate={() => setOpenMenu(null)}
            />
          )}
        </div>

        <div className="relative" data-nav-item>
          <button type="button" className={menuBtnClass("solutions")} onClick={() => toggle("solutions")}>
            Solutions
            <ChevronDown
              size={12}
              className={cn("transition-transform duration-300", openMenu === "solutions" && "rotate-180")}
            />
          </button>
          {openMenu === "solutions" && (
            <Dropdown items={solutionsDropdown} onNavigate={() => setOpenMenu(null)} />
          )}
        </div>

        <span className="rounded-lg px-3 py-2 font-sans text-[13px] text-[var(--muted)] cursor-default select-none">
          Customers
        </span>

        <div className="relative" data-nav-item>
          <button type="button" className={menuBtnClass("resources")} onClick={() => toggle("resources")}>
            Resources
            <ChevronDown
              size={12}
              className={cn("transition-transform duration-300", openMenu === "resources" && "rotate-180")}
            />
          </button>
          {openMenu === "resources" && (
            <Dropdown items={resourcesDropdown} onNavigate={() => setOpenMenu(null)} />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {gateEnabled && unlocked === true ? (
          <SessionLogout
            label={gateAuthUi.logout}
            afterLogoutHref="/"
            className="cursor-pointer border-0 bg-transparent p-0 font-sans text-[13px] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
          />
        ) : !gateEnabled ? (
          <a
            href={navLoginHref}
            className="font-sans text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]"
          >
            {gateAuthUi.login}
          </a>
        ) : null}
        <a
          href={bookingUrl}
          {...openExternalTab}
          className="inline-flex min-h-[3rem] items-center rounded-xl border-2 border-[var(--text)] bg-[var(--gate-intro-blue)] px-5 py-2 text-sm font-nunito font-extrabold text-[var(--text)] no-underline shadow-[0_4px_0_0_var(--text)] transition hover:brightness-[0.97] active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]"
        >
          Book a Demo
        </a>
      </div>
    </nav>
  );
}
