import { Logo } from "@/components/ui/Logo";
import { FooterGateLogout } from "@/components/ui/FooterGateLogout";

export default function Footer() {
  const cols = [
    {
      heading: "Solutions",
      links: ["Estate & Legacy", "Streamlined Admin", "Wellbeing Courses"],
    },
    {
      heading: "Business",
      links: ["For Employers", "For Consultants", "Financial Institutions", "Health Plans"],
    },
    {
      heading: "Company",
      links: ["About", "Blog", "Press", "Careers"],
    },
    {
      heading: "Legal",
      links: ["Privacy", "Terms", "Crisis Resources"],
    },
  ];

  return (
    <footer className="bg-[var(--bg)] border-t border-[var(--border)] pt-10 pb-8 px-6">
      <div className="max-w-content mx-auto flex justify-between items-start flex-wrap gap-6">
        <div>
          <Logo variant="footer" className="mb-1 block" />
          <p className="text-[12px] text-[var(--muted)]">Estate · Admin · Wellbeing</p>
        </div>

        <div className="flex gap-9 flex-wrap">
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[10px] uppercase tracking-[.1em] text-[var(--muted)] mb-3">
                {col.heading}
              </h4>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-[12px] text-[var(--dim)] mb-1.5 hover:text-[var(--text)] transition-colors no-underline"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-content mx-auto mt-6 pt-5 border-t border-[var(--border-subtle)] flex justify-between flex-wrap items-center gap-2 text-[11px] text-[var(--dim)]">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>© 2026 gently</span>
          <FooterGateLogout className="text-[11px] text-[var(--dim)] underline-offset-2 hover:text-[var(--text)] hover:underline" />
        </span>
        <span>Made with care for people carrying something heavy.</span>
      </div>
    </footer>
  );
}
