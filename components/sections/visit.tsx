"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  hoursLabel,
  instagramHref,
  mapsHref,
  phoneHref,
  site,
  whatsappHref,
} from "@/lib/site";
import { useReveal } from "@/components/ui/reveal";

const pill =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-tea px-5 text-sm text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tea";

export function Visit() {
  const root = useRef<HTMLElement>(null);
  const { visit } = site;
  const hours = hoursLabel();
  useReveal(root);

  const actions = [
    { label: visit.cta[0], href: mapsHref() },
    { label: visit.cta[1], href: whatsappHref() },
    { label: visit.cta[2], href: phoneHref() },
  ];
  const instagram = instagramHref();

  return (
    <section id="visit" ref={root} className="bg-cream text-tea">
      <div className="grid md:min-h-svh md:grid-cols-[1.05fr_0.95fr]">
        <div className="order-2 flex flex-col justify-center px-5 py-20 pb-32 md:order-1 md:py-36 md:pr-12 md:pl-12">
        <p data-reveal className="text-xs tracking-[0.22em] text-bark uppercase">
          {visit.eyebrow}
        </p>
        <h2
          data-reveal
          className="mt-5 max-w-3xl font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.95] font-light tracking-tight"
        >
          {visit.title}
        </h2>
        <p data-reveal className="mt-8 max-w-xl text-lg leading-relaxed">
          {visit.body}
        </p>
        <p
          data-reveal
          className="mt-10 max-w-3xl font-display text-[clamp(1.85rem,3.4vw,3.25rem)] leading-snug font-light"
        >
          {site.address}
        </p>
        {hours ? (
          <p data-reveal className="mt-4 text-lg">
            {hours}
          </p>
        ) : null}
        <div data-reveal className="mt-10 flex flex-wrap gap-3">
          {actions.map((action) =>
            action.href ? (
              <a
                key={action.label}
                href={action.href}
                className={pill}
                target={action.href.startsWith("http") ? "_blank" : undefined}
                rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {action.label}
              </a>
            ) : (
              <button key={action.label} type="button" className={pill} aria-disabled="true">
                {action.label}
              </button>
            ),
          )}
          {instagram ? (
            <a href={instagram} className={pill} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          ) : null}
        </div>
      </div>
      <div className="relative order-1 min-h-[58vh] md:order-2 md:min-h-full">
        <Image
          src={visit.image}
          alt="A table by the green window"
          fill
          sizes="(min-width: 768px) 46vw, 100vw"
          className="object-cover"
        />
      </div>
      </div>
    </section>
  );
}
