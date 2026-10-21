"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { mapsHref, phoneHref, whatsappHref } from "@/lib/site";

const solidPill =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-tea px-4 text-sm whitespace-nowrap text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream";

const ghostPill =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-current bg-transparent px-4 text-sm whitespace-nowrap text-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current";

export function VisitActions({
  className = "",
  tone = "solid",
}: {
  className?: string;
  tone?: "solid" | "ghost";
}) {
  const call = phoneHref();
  const whatsapp = whatsappHref();
  const pill = tone === "ghost" ? ghostPill : solidPill;

  return (
    <div className={`flex gap-2 ${className}`}>
      <Action href={whatsapp} external className={`${pill} flex-1`}>
        WhatsApp
      </Action>
      <Action href={call} className={`${pill} flex-1`}>
        Call
      </Action>
      <Action href={mapsHref()} external className={`${pill} flex-1`}>
        Directions
      </Action>
    </div>
  );
}

export function StickyBar() {
  return (
    <nav
      aria-label="Visit"
      className="glass-nav glass-light fixed inset-x-3 z-40 rounded-full px-2 py-2 text-tea md:hidden bottom-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <VisitActions />
    </nav>
  );
}

function Action({
  href,
  external,
  className,
  children,
}: {
  href: string | null;
  external?: boolean;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    const element = ref.current;
    return () => {
      if (element) gsap.killTweensOf(element);
    };
  }, []);

  const onMove = (event: React.PointerEvent<HTMLElement>) => {
    const element = ref.current;
    if (!element || event.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
    gsap.to(element, { x, y, duration: 0.6, ease: "power2.out" });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: "power2.out" });
  };

  if (!href) {
    return (
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        type="button"
        className={className}
        aria-disabled="true"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </a>
  );
}
