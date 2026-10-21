"use client";

import { useRef } from "react";
import { VisitActions } from "@/components/ui/sticky-bar";
import { useReveal } from "@/components/ui/reveal";
import { hoursLabel, instagramHref, site } from "@/lib/site";

const pages = [
  { href: "#story", label: site.story.eyebrow },
  { href: "#food", label: site.food.eyebrow },
  { href: "#menu", label: "Menu" },
  { href: "#estate", label: site.estate.eyebrow },
  { href: "#visit", label: site.visit.eyebrow },
];

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const hours = hoursLabel();
  const instagram = instagramHref();
  useReveal(root);

  return (
    <footer id="footer" ref={root} className="bg-tea text-cream">
      <div className="px-5 pt-20 pb-32 md:px-12 md:pt-28 md:pb-16">
        <p
          data-reveal
          className="font-display text-[clamp(3.25rem,8vw,7.5rem)] leading-none font-light tracking-tight"
        >
          {site.name}
        </p>

        <div className="mt-16 grid gap-12 border-t border-cream/20 pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p data-reveal className="max-w-xs text-lg leading-relaxed">
              {site.footer.line}
            </p>
            <p data-reveal className="mt-3 max-w-xs leading-relaxed text-cream/80">
              {site.footer.credit}
            </p>
          </div>

          <div className="md:col-span-4">
            <p data-reveal className="text-xs tracking-[0.22em] text-cream/60 uppercase">
              Find us
            </p>
            <p data-reveal className="mt-4 max-w-sm text-lg leading-relaxed">
              {site.address}
            </p>
            {hours ? (
              <p data-reveal className="mt-3 text-lg">
                {hours}
              </p>
            ) : null}
          </div>

          <div className="md:col-span-2">
            <p data-reveal className="text-xs tracking-[0.22em] text-cream/60 uppercase">
              On this page
            </p>
            <ul data-reveal className="mt-4 space-y-2">
              {pages.map((page) => (
                <li key={page.href}>
                  <a href={page.href} className="inline-flex min-h-11 items-center text-lg">
                    {page.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p data-reveal className="text-xs tracking-[0.22em] text-cream/60 uppercase">
              {site.visit.eyebrow}
            </p>
            <div data-reveal className="mt-4">
              <VisitActions className="flex-col [&_a]:w-full [&_button]:w-full" />
              {instagram ? (
                <a
                  href={instagram}
                  className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-cream/40 px-4 text-sm text-cream"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
