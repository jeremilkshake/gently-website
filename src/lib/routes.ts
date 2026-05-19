import type { PartnerSlug } from "@/types";

export const ROUTES = {
  home: "/",
  forYou: "/for-you",
  partners: "/partners",
  mission: "/company/mission",
  contact: "/company/contact",
} as const;

export function partnerPath(slug: PartnerSlug): string {
  return `${ROUTES.partners}/${slug}`;
}

/** In-page section link on a marketing route (e.g. `/for-you#solution`). */
export function sectionHref(base: string, sectionId: string): string {
  const id = sectionId.startsWith("#") ? sectionId.slice(1) : sectionId;
  return `${base}#${id}`;
}

export function isPartnerSlug(value: string): value is PartnerSlug {
  return (
    value === "hospice-hospitals" ||
    value === "employers" ||
    value === "consultants" ||
    value === "financial-institutions" ||
    value === "funeral-homes" ||
    value === "education-institutions"
  );
}

/** Base path for Solutions nav anchors on the current marketing route. */
export function solutionsNavBase(pathname: string): string {
  if (pathname.startsWith(ROUTES.partners)) {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length >= 2 && isPartnerSlug(parts[1])) {
      return `${ROUTES.partners}/${parts[1]}`;
    }
    return ROUTES.partners;
  }
  if (pathname.startsWith(ROUTES.forYou)) return ROUTES.forYou;
  return ROUTES.forYou;
}

/** Base path for Company / Resources footer-style links on marketing pages. */
export function contentNavBase(pathname: string): string {
  if (pathname.startsWith(ROUTES.partners)) return ROUTES.partners;
  if (pathname.startsWith(ROUTES.forYou)) return ROUTES.forYou;
  return ROUTES.forYou;
}
