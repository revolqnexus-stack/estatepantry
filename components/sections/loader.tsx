"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { visitKey } from "@/lib/site";

function rememberVisit() {
  document.cookie = `${visitKey}=1; Path=/; SameSite=Lax`;
}

export function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = root.current;
    if (!element) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(element, { opacity: 0 });
      element.style.visibility = "hidden";
      element.style.pointerEvents = "none";
      rememberVisit();
      return;
    }

    gsap.to(element, {
      opacity: 0,
      duration: 0.4,
      delay: 1.1,
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
      aria-label="The Estate Pantry"
      className="fixed inset-0 z-50 flex items-center justify-center bg-mist"
    >
      <div className="flex flex-col items-center gap-8">
        <svg viewBox="0 0 120 150" className="h-36 w-28 text-tea" aria-hidden>
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path className="steam" d="M44 52c6-10 2-14 6-22" />
            <path
              className="steam"
              d="M60 46c6-10 2-14 6-22"
              style={{ animationDelay: "0.28s" }}
            />
            <path
              className="steam"
              d="M76 52c6-10 2-14 6-22"
              style={{ animationDelay: "0.55s" }}
            />
          </g>
          <path
            d="M30 64h60l-5 46a18 18 0 0 1-18 14H53a18 18 0 0 1-18-14z"
            fill="#F4EDE1"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M90 72h6a14 14 0 0 1 0 28h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <ellipse cx="60" cy="64" rx="30" ry="5" fill="#6B4A2F" opacity="0.45" />
        </svg>
        <p className="font-display text-2xl font-light tracking-tight text-tea">
          The Estate Pantry
        </p>
      </div>
    </div>
  );
}
