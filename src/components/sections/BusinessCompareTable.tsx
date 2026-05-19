"use client";

import Image from "next/image";
import { businessCompareTable } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="inline-block">
      <circle cx="9" cy="9" r="9" fill="#2BA1FB" />
      <path d="M5 9L7.8 12L13 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dash() {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-[18px] h-[2px] rounded-full bg-[var(--border-hover)] align-middle"
    />
  );
}

function renderCell(value: boolean | string, highlight: boolean) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center" aria-label="Included">
        <Check />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center" aria-label="Not included">
        <Dash />
      </span>
    );
  }
  return (
    <span
      className={
        "font-reading text-[13px] leading-[1.45] " +
        (highlight ? "text-[var(--text)] font-semibold" : "text-[var(--muted)]")
      }
    >
      {value}
    </span>
  );
}

export default function BusinessCompareTable() {
  const ref = useScrollReveal();
  const { kicker, headline, subhead, columns, rows, footnote } = businessCompareTable;

  return (
    <section
      id="b2b-compare"
      className="py-24 bg-[var(--bg-2)] scroll-mt-[120px]"
    >
      <div className="max-w-content mx-auto px-6">
        <p className="text-[10px] uppercase tracking-[.14em] text-[var(--accent)] text-center mb-2">
          {kicker}
        </p>
        <h2
          ref={ref}
          className="fade-up font-serif text-[clamp(26px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-center mb-4 max-w-[760px] mx-auto"
        >
          {headline}
        </h2>
        <p className="fade-up visible font-reading text-[15px] text-[var(--muted)] text-center max-w-[640px] mx-auto mb-12 leading-[1.65] font-light">
          {subhead}
        </p>

        <div className="overflow-x-auto -mx-6 px-6">
          <div className="min-w-[640px] rounded-[20px] border-2 border-[var(--border)] overflow-hidden shadow-card bg-[var(--card)]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th
                    className="text-left text-[11px] uppercase tracking-[0.12em] text-[var(--muted)] font-medium px-5 py-4 bg-[var(--bg-2)] border-b border-[var(--border)]"
                  >
                    Capability
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.name}
                      className={
                        "text-center px-4 py-4 border-b border-[var(--border)] " +
                        (col.highlight
                          ? "bg-[var(--gate-intro-blue)]"
                          : "bg-[var(--bg-2)]")
                      }
                    >
                      {col.highlight ? (
                        <span className="inline-flex items-center justify-center" aria-label={col.name}>
                          <Image
                            src="/images/grievegently-logo.svg"
                            alt={col.name}
                            width={140}
                            height={40}
                            className="h-7 w-auto"
                          />
                        </span>
                      ) : (
                        <div className="font-serif text-[15px] font-extrabold tracking-[-0.01em] text-[var(--text)]">
                          {col.name}
                        </div>
                      )}
                      {col.tagline && (
                        <div className="font-reading text-[11px] text-[var(--muted)] mt-1">
                          {col.tagline}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIdx) => (
                  <tr
                    key={row.feature}
                    className={
                      rowIdx % 2 === 0
                        ? "bg-[var(--card)]"
                        : "bg-[var(--bg-2)]"
                    }
                  >
                    <td className="font-reading text-[13px] text-[var(--text)] font-medium px-5 py-4 border-b border-[var(--border-subtle)]">
                      {row.feature}
                    </td>
                    {row.cells.map((cell, cellIdx) => {
                      const col = columns[cellIdx];
                      return (
                        <td
                          key={`${row.feature}-${cellIdx}`}
                          className={
                            "text-center px-4 py-4 border-b border-[var(--border-subtle)] " +
                            (col?.highlight ? "bg-[var(--gate-intro-blue)]/30" : "")
                          }
                        >
                          {renderCell(cell, !!col?.highlight)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {footnote && (
          <p className="font-reading text-[12.5px] text-[var(--muted)] text-center max-w-[640px] mx-auto mt-6 leading-[1.6]">
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
}
