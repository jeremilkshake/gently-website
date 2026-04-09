"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import {
  bookingUrl,
  businessDropdown,
  gateAuthUi,
  navBusinessCta,
  navCustomersHref,
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
import type { CSSProperties, MouseEvent } from "react";
import type { NavDropdownItem } from "@/types";

function Dropdown({
  items,
  hasCta,
  onItemClick,
}: {
  items: NavDropdownItem[];
  hasCta?: boolean;
  onItemClick?: (item: NavDropdownItem, e: MouseEvent<HTMLAnchorElement>) => void;
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
              onClick={(e) => onItemClick?.(item, e)}
              className="flex flex-col gap-0.5 rounded-[10px] px-3 py-2.5 no-underline transition-colors hover:bg-[var(--surface-hover)]"
            >
              <span
                className="text-[13px] font-medium text-[var(--text)]"
                style={item.color ? { color: item.color } : undefined}
              >
                {item.title}
              </span>
              {item.desc && (
                <span className="text-[11px] leading-[1.4] text-[var(--muted)]">{item.desc}</span>
              )}
            </a>
          ))}
        </div>
        {hasCta && (
          <div className="flex min-w-[160px] flex-col justify-center gap-3 rounded-r-[12px] border-l border-[var(--border)] bg-[rgba(119,208,250,0.1)] px-[18px] py-5">
            <p className="m-0 text-[13px] leading-[1.5] text-[var(--text)]">{navBusinessCta.body}</p>
            <a
              href={bookingUrl}
              {...openExternalTab}
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
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

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

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 20);
  });

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (!(e.target as Element).closest("[data-nav-item]")) setOpenMenu(null);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 5100);
    return () => window.clearTimeout(timer);
  }, []);

  const toggle = (name: string) => setOpenMenu((prev) => (prev === name ? null : name));

  const navStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 200,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    background: scrolled ? "var(--nav-glass-bg)" : "transparent",
    backdropFilter: scrolled ? "blur(16px)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
    borderBottom: scrolled ? "1px solid var(--border)" : "none",
    transition: "background 0.3s, backdrop-filter 0.3s, border-color 0.3s",
  };

  const menuBtnClass = (key: string) =>
    cn(
      "flex cursor-pointer items-center gap-1 rounded-lg border-0 bg-transparent px-3 py-2 font-sans text-[13px] transition-colors",
      openMenu === key
        ? "text-[var(--text)]"
        : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]",
    );

  return (
    <nav
      style={navStyle}
      className={cn("transition-opacity duration-700", isVisible ? "opacity-100" : "pointer-events-none opacity-0")}
    >
      <Logo variant="nav" />

      <div className="hidden items-center gap-0.5 md:flex">
        <div className="relative" data-nav-item>
          <button type="button" className={menuBtnClass("business")} onClick={() => toggle("business")}>
            Business
            <ChevronDown
              size={12}
              className={cn("transition-transform duration-300", openMenu === "business" && "rotate-180")}
            />
          </button>
          {openMenu === "business" && (
            <Dropdown items={businessDropdown} hasCta onItemClick={handleDropdownLink} />
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
          {openMenu === "solutions" && <Dropdown items={solutionsDropdown} />}
        </div>

        <a
          href={navCustomersHref}
          className="rounded-lg px-3 py-2 font-sans text-[13px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--text)]"
        >
          Customers
        </a>

        <div className="relative" data-nav-item>
          <button type="button" className={menuBtnClass("resources")} onClick={() => toggle("resources")}>
            Resources
            <ChevronDown
              size={12}
              className={cn("transition-transform duration-300", openMenu === "resources" && "rotate-180")}
            />
          </button>
          {openMenu === "resources" && <Dropdown items={resourcesDropdown} />}
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
