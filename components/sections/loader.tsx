"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site, visitKey } from "@/lib/site";

function rememberVisit() {
  document.cookie = `${visitKey}=1; Path=/; SameSite=Lax`;
}

export function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = root.current;
    if (!element) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen =
      document.documentElement.dataset.visited === "1" ||
      document.cookie.split(";").some((part) => part.trim() === `${visitKey}=1`);

    if (reduce || seen) {
      gsap.set(element, { opacity: 0 });
      element.style.visibility = "hidden";
      element.style.pointerEvents = "none";
      if (!seen) rememberVisit();
      return;
    }

    gsap.to(element, {
      opacity: 0,
      duration: 0.45,
      delay: 1.05,
      ease: "power2.out",
      onComplete: () => {
        element.style.visibility = "hidden";
        element.style.pointerEvents = "none";
        rememberVisit();
      },
    });
  }, { scope: root });

  return (
    <div
      ref={root}
      data-loader
      role="status"
      aria-live="polite"
      aria-label={site.name}
      className="fixed inset-0 z-50 flex items-center justify-center bg-mist"
    >
      <p className="loader-mark font-display px-6 text-center text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.95] font-light tracking-[-0.03em]">
        {site.name}
      </p>
    </div>
  );
}
