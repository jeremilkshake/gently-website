"use client";

import { useState, useEffect } from "react";
import { pillars } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Pillar } from "@/types";

const accentColors: Record<Pillar, string> = {
  estate: "var(--accent)",
  admin: "var(--blue)",
  wellbeing: "var(--green)",
};

const pillarDotColor: Record<Pillar, string> = {
  estate: "bg-[var(--accent)]",
  admin: "bg-[var(--blue)]",
  wellbeing: "bg-[var(--green)]",
};

const activeBorder: Record<Pillar, string> = {
  estate: "border-[rgba(184,168,120,0.3)]",
  admin: "border-[rgba(123,159,191,0.3)]",
  wellbeing: "border-[rgba(107,155,138,0.3)]",
};

function pillarFromHash(): Pillar | null {
  if (typeof window === "undefined") return null;
  const raw = window.location.hash.slice(1);
  const id = raw.startsWith("pillar-") ? raw.replace("pillar-", "") : raw;
  if (id === "estate" || id === "admin" || id === "wellbeing") return id;
  return null;
}

export default function Solution() {
  const [active, setActive] = useState<Pillar>("estate");
  const pillar = pillars.find((p) => p.id === active)!;

  useEffect(() => {
    const apply = () => {
      const p = pillarFromHash();
      if (p) setActive(p);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  return (
    <section id="solution" className="py-20 bg-[var(--bg)] scroll-mt-[120px]">
      <div className="max-w-content mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] mb-2">The solution</p>
          <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] font-light tracking-[-0.02em] mb-3">
            One platform. Every step, handled.
          </h2>
          <p className="text-[15px] text-[var(--muted)] max-w-[480px] mx-auto">
            Estate planning, automated admin, and guided wellbeing — all in one place.
          </p>
        </div>

        {/* Pillar tabs */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {pillars.map((p) => (
            <button
              key={p.id}
              id={`pillar-${p.id}`}
              type="button"
              onClick={() => setActive(p.id)}
              className={cn(
                "scroll-mt-[120px] bg-[var(--card)] border rounded-[20px] p-6 text-left flex items-start gap-3.5 transition-all",
                active === p.id
                  ? cn("bg-[var(--card-active)]", activeBorder[p.id])
                  : "border-[var(--border)] hover:border-[var(--border-hover)]"
              )}
            >
              <span className="text-[22px] flex-shrink-0 mt-0.5">{p.icon}</span>
              <div>
                <div className="text-[10px] text-[var(--muted)] uppercase tracking-[.1em] mb-1">{p.num}</div>
                <div
                  className="text-[15px] font-medium mb-1"
                  style={{ color: active === p.id ? accentColors[p.id] : "var(--text)" }}
                >
                  {p.name}
                </div>
                <div className="text-[12px] text-[var(--muted)] leading-[1.5]">{p.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="grid grid-cols-2 gap-6 items-start">
          {/* Left */}
          <div>
            <p
              className="text-[10px] uppercase tracking-[.14em] mb-2"
              style={{ color: accentColors[active] }}
            >
              {pillar.name}
            </p>
            <h3 className="font-serif text-[clamp(22px,2.5vw,32px)] font-light tracking-[-0.02em] mb-3">
              {pillar.headline}
            </h3>
            <p className="text-[14px] text-[var(--muted)] leading-[1.7] mb-5 max-w-[420px]">
              {pillar.lede}
            </p>
            <div className="text-[11px] text-[var(--muted)] uppercase tracking-[.1em] mb-2.5">What it does</div>
            <div className="flex flex-col gap-2.5 mb-6">
              {pillar.features.map((f) => (
                <div key={f} className="flex items-start gap-2.5">
                  <div
                    className={cn("w-px h-4 flex-shrink-0 mt-[2px]", pillarDotColor[active])}
                    style={{ background: accentColors[active] }}
                  />
                  <span className="text-[13px] text-[var(--text)] leading-[1.5]">{f}</span>
                </div>
              ))}
            </div>
            <div
              className="inline-flex items-center gap-3 bg-[var(--bg-3)] rounded-[10px] px-4 py-3"
            >
              <span
                className="font-serif text-[26px] font-light"
                style={{ color: accentColors[active] }}
              >
                {pillar.impactNum}
              </span>
              <span className="text-[12px] text-[var(--muted)] leading-[1.4] whitespace-pre-line">
                {pillar.impactLabel}
              </span>
            </div>
          </div>

          {/* Right — mock */}
          <PillarMock pillar={active} />
        </div>
      </div>
    </section>
  );
}

function PillarMock({ pillar }: { pillar: Pillar }) {
  if (pillar === "estate") {
    return (
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-[20px] p-5 shadow-card">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[13px] font-medium">Estate Overview</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(184,168,120,0.15)] text-[var(--accent)]">AI mapped</span>
        </div>
        {[
          { label: "Property", val: "£380,000", w: "85%" },
          { label: "Savings & ISAs", val: "£42,300", w: "30%" },
          { label: "Life Insurance", val: "£150,000", w: "55%" },
        ].map((row) => (
          <div key={row.label}>
            <div className="flex justify-between text-[12px] py-1.5">
              <span className="text-[var(--muted)]">{row.label}</span>
              <span className="text-[var(--text)]">{row.val}</span>
            </div>
            <div className="h-1 bg-[var(--bg-3)] rounded-sm overflow-hidden mb-2">
              <div className="h-full bg-[var(--accent)] rounded-sm" style={{ width: row.w }} />
            </div>
          </div>
        ))}
        <div className="h-px bg-[var(--border)] my-3" />
        <div className="flex justify-between text-[12px]">
          <span className="text-[var(--muted)]">Outstanding mortgage</span>
          <span className="text-[var(--muted)]">−£87,200</span>
        </div>
        <div className="h-px bg-[var(--border)] my-3" />
        <div className="text-[11px] text-[var(--muted)] mb-2">Documents vault</div>
        <div className="flex flex-wrap gap-1.5">
          {["✓ Will uploaded", "✓ Life policy", "⚠ Probate pending"].map((tag, i) => (
            <span key={tag} className={cn("text-[11px] px-2.5 py-0.5 rounded-full", i < 2 ? "bg-[rgba(184,168,120,0.1)] text-[var(--accent)]" : "bg-[var(--bg-3)] text-[var(--muted)]")}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (pillar === "admin") {
    return (
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-[20px] p-5 shadow-card">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[13px] font-medium">Your action plan</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(123,159,191,0.15)] text-[var(--blue)]">7 tasks active</span>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { label: "Register the death", status: "✓ Done", done: true },
            { label: "Notify HMRC", status: "In progress →", active: true },
            { label: "Cancel direct debits", status: "Next", dim: true },
            { label: "Pension claim", status: "Upcoming", dimmer: true },
          ].map((task) => (
            <div
              key={task.label}
              className={cn(
                "rounded-[8px] px-3 py-2.5 flex justify-between text-[12px]",
                task.done ? "bg-[rgba(123,159,191,0.08)] border border-[rgba(123,159,191,0.2)]" : "bg-[var(--bg-3)]",
                task.dimmer ? "opacity-40" : task.dim ? "opacity-60" : ""
              )}
            >
              <span className="text-[var(--text)]">{task.label}</span>
              <span className={task.done || task.active ? "text-[var(--blue)]" : "text-[var(--muted)]"}>{task.status}</span>
            </div>
          ))}
        </div>
        <div className="h-px bg-[var(--border)] my-3" />
        <div className="text-[11px] text-[var(--muted)] mb-1.5">AI Concierge drafted</div>
        <div className="bg-[var(--bg-3)] rounded-[8px] px-3 py-2.5 text-[11px] text-[var(--muted)] italic">
          Letter to HMRC ready. Tap to review and send →
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-[20px] p-5 shadow-card">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[13px] font-medium">Your courses</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(107,155,138,0.15)] text-[var(--green)]">3 active</span>
      </div>
      <div className="flex flex-col gap-2 mb-3">
        {[
          { name: "Morning Grief", progress: 60, done: "4 of 6", active: true },
          { name: "Sleep Grief", progress: 20, done: "1 of 6" },
        ].map((course) => (
          <div
            key={course.name}
            className={cn(
              "rounded-[8px] p-3",
              course.active ? "bg-[rgba(107,155,138,0.08)] border border-[rgba(107,155,138,0.2)]" : "bg-[var(--bg-3)]"
            )}
          >
            <div className={cn("text-[12px] mb-1.5", course.active ? "text-[var(--green)]" : "text-[var(--text)]")}>
              {course.name}
            </div>
            <div className="h-1 bg-[var(--bg)] rounded-sm overflow-hidden mb-1">
              <div className="h-full bg-[var(--green)] rounded-sm" style={{ width: `${course.progress}%` }} />
            </div>
            <div className="text-[10px] text-[var(--muted)]">{course.done} lessons complete</div>
          </div>
        ))}
      </div>
      <div className="h-px bg-[var(--border)] mb-3" />
      <div className="text-[11px] text-[var(--muted)] mb-1.5">Skill unlocked today</div>
      <div className="bg-[rgba(107,155,138,0.08)] border border-[rgba(107,155,138,0.15)] rounded-[8px] px-3 py-2.5">
        <div className="text-[12px] text-[var(--green)] mb-1">The Worry Dump</div>
        <div className="text-[11px] text-[var(--muted)]">For 3am wakeups — write it, close the notebook.</div>
      </div>
    </div>
  );
}
