"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { useAudience } from "@/lib/audienceContext";
import { ROUTES } from "@/lib/routes";

/** Keeps chat widget and audience-aware sections aligned with the current route. */
export default function PathnameAudienceSync() {
  const pathname = usePathname();
  const { setAudience } = useAudience();

  useLayoutEffect(() => {
    if (pathname.startsWith(ROUTES.partners)) {
      setAudience("business");
    } else if (pathname.startsWith(ROUTES.forYou)) {
      setAudience("individual");
    }
  }, [pathname, setAudience]);

  return null;
}
