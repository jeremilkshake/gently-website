"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { bookingUrl, navBusinessCta, openExternalTab } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { NavDropdownItem } from "@/types";

type Props = {
  id: string;
  label: string;
  items: NavDropdownItem[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  hasCta?: boolean;
};

function DropdownLink({
  item,
  onClose,
  className,
}: {
  item: NavDropdownItem;
  onClose: () => void;
  className?: string;
}) {
  return (
    <Link
      href={item.href}
      role="menuitem"
      onClick={onClose}
      className={cn(
        "flex flex-col gap-0.5 rounded-[10px] px-3 py-2.5 no-underline transition-colors hover:bg-[var(--surface-hover)]",
        className,
      )}
    >
      <span
        className="text-[13px] font-medium leading-snug text-[var(--text)]"
        style={item.color ? { color: item.color } : undefined}
      >
        {item.title}
      </span>
      {item.desc ? (
        <span className="font-reading text-[12px] leading-[1.45] text-[var(--muted)] text-pretty">
          {item.desc}
        </span>
      ) : null}
    </Link>
  );
}

export default function NavDropdown({ id, label, items, open, onToggle, onClose, hasCta }: Props) {
  return (
    <div className="relative shrink-0" data-nav-item>
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className={cn(
          "flex cursor-pointer items-center gap-1 rounded-lg border-0 bg-transparent px-2.5 py-2 font-sans text-[13px] transition-colors lg:px-3",
          open
            ? "text-[var(--text)]"
            : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]",
        )}
      >
        {label}
        <ChevronDown
          size={12}
          className={cn("transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          id={`${id}-panel`}
          role="menu"
          aria-labelledby={`${id}-trigger`}
          className={cn(
            "absolute top-[calc(100%+6px)] left-0 z-[300] rounded-[20px] border-2 border-[var(--border)] bg-[var(--card)] p-2 shadow-[var(--shadow-dropdown)]",
            hasCta
              ? "w-[min(680px,calc(100vw-2rem))]"
              : "min-w-[280px] max-w-[min(360px,calc(100vw-2rem))]",
          )}
        >
          {hasCta ? (
            <div className="flex items-stretch gap-0">
              <div className="grid min-w-0 flex-1 grid-cols-2 gap-0.5 p-1">
                {items.map((item, index) => (
                  <DropdownLink
                    key={item.title}
                    item={item}
                    onClose={onClose}
                    className={index === 0 ? "col-span-2" : undefined}
                  />
                ))}
              </div>
              <div className="flex w-[min(200px,34%)] shrink-0 flex-col justify-start gap-4 rounded-r-[14px] border-l border-[var(--border)] bg-[var(--bg-2)] px-4 py-4">
                <p className="font-reading m-0 text-[13px] leading-[1.5] text-[var(--text)] text-pretty">
                  {navBusinessCta.body}
                </p>
                <a
                  href={bookingUrl}
                  {...openExternalTab}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--accent)] no-underline transition-all hover:gap-2"
                >
                  {navBusinessCta.linkLabel}
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-0.5 p-1">
              {items.map((item) => (
                <DropdownLink key={item.title} item={item} onClose={onClose} />
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
