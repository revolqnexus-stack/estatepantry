"use client";

import Image from "next/image";
import { useRef } from "react";
import PeekRating from "@/components/ui/peek-rating";
import {
  googleReviewHref,
  hoursLabel,
  instagramHref,
  mapsHref,
  phoneHref,
  site,
  whatsappHref,
} from "@/lib/site";
import { Prose } from "@/components/ui/prose";
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
  ].filter((action): action is { label: string; href: string } => Boolean(action.href));
  const instagram = instagramHref();

  return (
    <section id="visit" ref={root} className="bg-cream text-tea">
      <div className="grid md:min-h-svh md:grid-cols-[1.05fr_0.95fr]">
        <div className="paper order-2 flex flex-col justify-center px-5 py-24 pb-32 md:order-1 md:py-36 md:pr-16 md:pl-12">
          <p data-reveal className="text-xs tracking-[0.22em] text-bark uppercase">
            {visit.eyebrow}
          </p>
          <h2
            data-reveal
            className="mt-5 max-w-3xl font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.95] font-light tracking-tight"
          >
            {visit.title}
          </h2>
          <Prose paragraphs={[visit.body]} />
          <p
            data-reveal
            className="mt-16 max-w-xl font-display text-[clamp(1.85rem,3.2vw,3.1rem)] leading-[1.15] font-light"
          >
            {site.address}
          </p>
          {hours ? (
            <p data-reveal className="mt-5 max-w-sm text-[1.02rem] leading-[1.8] tracking-[0.012em]">
              {hours}
            </p>
          ) : null}
          {actions.length > 0 || instagram ? (
            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              {actions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className={pill}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {action.label}
                </a>
              ))}
              {instagram ? (
                <a href={instagram} className={pill} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              ) : null}
            </div>
          ) : null}
          <div data-reveal className="mt-16">
            <p className="font-display text-xl font-light tracking-[-0.02em]">{visit.ratingPrompt}</p>
            <div className="mt-3">
              <PeekRating
                count={visit.ratingLabels.length}
                labels={visit.ratingLabels}
                shape="star"
                activeColor="#D9622B"
                idleColor="#6B4A2F"
                tipColor="#1A1714"
                tipTextColor="#F4EDE1"
                size={22}
                ariaLabel="Rate your visit"
                onChange={() => {
                  const href = googleReviewHref();
                  if (href) window.open(href, "_blank", "noopener,noreferrer");
                }}
              />
            </div>
          </div>
        </div>
        <div className="relative order-1 min-h-[64vh] md:order-2 md:min-h-full">
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
