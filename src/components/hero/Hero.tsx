"use client";

import Image from "next/image";
import { useIsBusiness } from "@/lib/audienceContext";
import { bookingUrl, heroBadgeText, heroVisual, openExternalTab } from "@/lib/content";

export default function Hero() {
  const isBiz = useIsBusiness();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-36 pb-20 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="hero-glow absolute w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, var(--glow-wellbeing) 0%, transparent 70%)",
          top: "45%",
          left: "50%",
        }}
      />

      <div className="relative">
        {/* Badge */}
        <div
          className="hero-badge inline-flex items-center gap-2 bg-[var(--bg-3)] border border-[var(--border)] rounded-full px-3.5 py-1.5 mb-6"
        >
          <span className="hero-dot w-1.5 h-1.5 rounded-full bg-[var(--green)]" />
          <span className="text-[12px] text-[var(--muted)]">{heroBadgeText}</span>
        </div>

        {/* Headline */}
        {isBiz ? (
          <>
            <h1
              className="hero-headline font-serif text-[clamp(36px,5.5vw,66px)] font-light leading-[1.08] tracking-[-0.025em] max-w-[780px] mx-auto mb-4"
            >
              Give your people{" "}
              <em className="italic text-[var(--accent)]">complete</em>
              <br />support after loss.
            </h1>
            <p
              className="hero-lede text-[clamp(15px,1.8vw,18px)] text-[var(--muted)] max-w-[460px] mx-auto mb-9 font-light"
            >
              The only platform covering estate, admin, and grief wellbeing — built for employers and institutions.
            </p>
            <div className="flex gap-2.5 justify-center flex-wrap">
              <a
                href={bookingUrl}
                {...openExternalTab}
                className="hero-primary-cta inline-flex items-center justify-center font-nunito font-extrabold min-h-[3rem] rounded-xl px-5 py-3 text-sm border-2 border-[var(--text)] shadow-[0_4px_0_0_var(--text)] bg-[var(--gate-intro-blue)] text-[var(--text)] transition hover:brightness-[0.97] active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]"
              >
                Book a demo
              </a>
              <a
                href="#b2b"
                className="hero-secondary-cta bg-transparent text-[var(--text)] border-2 border-[var(--text)] px-6 py-3 rounded-[9px] text-[14px] shadow-[0_4px_0_0_var(--text)] hover:bg-[var(--surface-hover)] transition-all active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]"
              >
                See solutions
              </a>
            </div>
          </>
        ) : (
          <>
            <h1
              className="hero-headline font-serif text-[clamp(36px,5.5vw,66px)] font-light leading-[1.08] tracking-[-0.025em] max-w-[780px] mx-auto mb-4"
            >
              Everything that comes after loss,
              <br />
              <em className="italic text-[var(--accent)]">handled.</em>
            </h1>
            <p
              className="hero-lede text-[clamp(15px,1.8vw,18px)] text-[var(--muted)] max-w-[460px] mx-auto mb-9 font-light"
            >
              Estate planning, automated admin, and science-based grief support — in one place.
            </p>
            <div className="flex gap-2.5 justify-center flex-wrap">
              <a
                href={bookingUrl}
                {...openExternalTab}
                className="hero-primary-cta inline-flex items-center justify-center font-nunito font-extrabold min-h-[3rem] rounded-xl px-5 py-3 text-sm border-2 border-[var(--text)] shadow-[0_4px_0_0_var(--text)] bg-[var(--gate-intro-blue)] text-[var(--text)] transition hover:brightness-[0.97] active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]"
              >
                Get early access
              </a>
              <a
                href="#solution"
                className="hero-secondary-cta bg-transparent text-[var(--text)] border-2 border-[var(--text)] px-6 py-3 rounded-[9px] text-[14px] shadow-[0_4px_0_0_var(--text)] hover:bg-[var(--surface-hover)] transition-all active:translate-y-px active:shadow-[0_3px_0_0_var(--text)]"
              >
                See how it works
              </a>
            </div>
          </>
        )}

        <div
          className="hero-image mt-28 mx-auto w-[80%] max-w-[784px] overflow-hidden"
        >
          {/* TODO: swap with real screenshot */}
          <Image
            src={heroVisual.src}
            alt={heroVisual.alt}
            width={2048}
            height={1365}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      <style jsx>{`
        .hero-glow { animation: breathe 7s ease-in-out infinite; }
        .hero-badge { animation: fadeIn .95s 5.1s ease both; }
        .hero-dot { animation: pulseDot 2s ease-in-out infinite; }
        .hero-headline { animation: fadeUp 1.3s .2s ease both; }
        .hero-lede { animation: fadeUp 1.3s 1.15s ease both; }
        .hero-primary-cta { animation: fadeUp 1s 3.25s ease both; }
        .hero-secondary-cta { animation: fadeUp 1s 5.1s ease both; }
        .hero-image { animation: fadeUp 1s 5.1s ease both; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes breathe {
          0%,100% { opacity:.5; transform:translate(-50%,-50%) scale(1); }
          50% { opacity:1; transform:translate(-50%,-50%) scale(1.06); }
        }
        @keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:.3} }
      `}</style>
    </section>
  );
}
