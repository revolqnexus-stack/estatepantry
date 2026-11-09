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
      <div className="relative overflow-hidden px-5 pt-24 pb-32 md:px-12 md:pt-36 md:pb-16">
        <div className="footer-orbit pointer-events-none absolute -right-24 -top-24 size-96 rounded-full border border-cream/10 md:size-[34rem]" aria-hidden />
        <div className="footer-orbit pointer-events-none absolute -right-8 -top-8 size-64 rounded-full border border-cream/10 md:size-[24rem]" aria-hidden />
        <p data-reveal className="mb-8 text-[0.65rem] tracking-[0.24em] text-ember uppercase">04 · Until next time</p>
        <p
          data-reveal
          className="relative z-10 max-w-5xl font-display text-[clamp(4rem,11vw,11rem)] leading-[0.82] font-light tracking-[-0.05em]"
        >
          Take the<br /><span className="text-cream/55">long way</span> here.
        </p>
        <div className="relative z-10 mt-12 flex flex-wrap items-center gap-4 border-b border-cream/20 pb-16">
          <a href="#visit" className="inline-flex min-h-12 items-center rounded-full bg-cream px-6 text-sm tracking-[0.08em] text-tea transition-transform duration-500 hover:-translate-y-1">Plan your visit ↗</a>
          <span className="text-sm tracking-[0.04em] text-cream/55">Wood-fired · estate-grown · unhurried</span>
        </div>

        <div className="relative z-10 mt-16 grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p data-reveal className="max-w-xs font-display text-[clamp(1.6rem,2vw,2rem)] leading-snug font-light">
              {site.footer.line}
            </p>
            <p data-reveal className="mt-4 max-w-xs text-sm leading-relaxed tracking-[0.02em] text-cream/75">
              {site.footer.credit}
            </p>
          </div>

          <div className="md:col-span-4">
            <p data-reveal className="text-xs tracking-[0.22em] text-cream/60 uppercase">
              Find us
            </p>
            <p data-reveal className="mt-4 max-w-sm font-display text-2xl leading-snug font-light">
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
