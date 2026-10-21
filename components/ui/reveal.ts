"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-reveal]", { opacity: 0, y: 28 });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1.15,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
            },
          });
        });
      });

      return () => media.revert();
    },
    { scope },
  );
}
