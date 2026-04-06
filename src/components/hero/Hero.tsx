"use client";

import { useIsBusiness } from "@/lib/audienceContext";
import { bookingUrl, openExternalTab } from "@/lib/content";

export default function Hero() {
  const isBiz = useIsBusiness();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-36 pb-20 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, var(--glow-wellbeing) 0%, transparent 70%)",
          top: "45%",
          left: "50%",
          animation: "breathe 7s ease-in-out infinite",
        }}
      />

      <div className="relative">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[var(--bg-3)] border border-[var(--border)] rounded-full px-3.5 py-1.5 mb-6"
          style={{ animation: "fadeIn .8s ease both" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]"
            style={{ animation: "pulseDot 2s ease-in-out infinite" }} />
          <span className="text-[12px] text-[var(--muted)]">Estate · Admin · Wellbeing — one platform</span>
        </div>

        {/* Headline */}
        {isBiz ? (
          <>
            <h1 className="font-serif text-[clamp(36px,5.5vw,66px)] font-light leading-[1.08] tracking-[-0.025em] max-w-[780px] mx-auto mb-4"
              style={{ animation: "fadeUp .9s .1s ease both" }}>
              Give your people{" "}
              <em className="italic text-[var(--accent)]">complete</em>
              <br />support after loss.
            </h1>
            <p className="text-[clamp(15px,1.8vw,18px)] text-[var(--muted)] max-w-[460px] mx-auto mb-9 font-light"
              style={{ animation: "fadeUp .9s .18s ease both" }}>
              The only platform covering estate, admin, and grief wellbeing — built for employers and institutions.
            </p>
            <div className="flex gap-2.5 justify-center flex-wrap" style={{ animation: "fadeUp .9s .26s ease both" }}>
              <a
                href={bookingUrl}
                {...openExternalTab}
                className="bg-[var(--text)] text-[var(--bg)] px-6 py-3 rounded-[9px] text-[14px] font-medium hover:opacity-90 hover:-translate-y-0.5 transition-all"
              >
                Book a demo
              </a>
              <a href="#b2b" className="bg-transparent text-[var(--text)] border border-[var(--border)] px-6 py-3 rounded-[9px] text-[14px] hover:border-[var(--muted)] hover:-translate-y-0.5 transition-all">
                See solutions
              </a>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-serif text-[clamp(36px,5.5vw,66px)] font-light leading-[1.08] tracking-[-0.025em] max-w-[780px] mx-auto mb-4"
              style={{ animation: "fadeUp .9s .1s ease both" }}>
              Everything that comes after loss,
              <br />
              <em className="italic text-[var(--accent)]">handled.</em>
            </h1>
            <p className="text-[clamp(15px,1.8vw,18px)] text-[var(--muted)] max-w-[460px] mx-auto mb-9 font-light"
              style={{ animation: "fadeUp .9s .18s ease both" }}>
              Estate planning, automated admin, and science-based grief support — in one place.
            </p>
            <div className="flex gap-2.5 justify-center flex-wrap" style={{ animation: "fadeUp .9s .26s ease both" }}>
              <a
                href={bookingUrl}
                {...openExternalTab}
                className="bg-[var(--text)] text-[var(--bg)] px-6 py-3 rounded-[9px] text-[14px] font-medium hover:opacity-90 hover:-translate-y-0.5 transition-all"
              >
                Get early access
              </a>
              <a href="#solution" className="bg-transparent text-[var(--text)] border border-[var(--border)] px-6 py-3 rounded-[9px] text-[14px] hover:border-[var(--muted)] hover:-translate-y-0.5 transition-all">
                See how it works
              </a>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
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
