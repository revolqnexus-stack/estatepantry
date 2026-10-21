"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";
import { useReveal } from "@/components/ui/reveal";

const hills = [
  { className: "text-mist", shift: 24, bottom: "18%" },
  { className: "text-bark/80", shift: 48, bottom: "10%" },
  { className: "text-tea/70", shift: 72, bottom: "2%" },
  { className: "text-tea", shift: 100, bottom: "-6%" },
  { className: "text-char", shift: 130, bottom: "-16%" },
];

export function Story() {
  const root = useRef<HTMLElement>(null);
  const { story } = site;
  useReveal(root);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hill]", { y: 0 });
        gsap.set("[data-story-photo]", { yPercent: 0 });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-story-photo]",
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-story-frame]",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );

        gsap.utils.toArray<HTMLElement>("[data-hill]").forEach((layer) => {
          const shift = Number(layer.dataset.shift ?? 40);
          gsap.fromTo(
            layer,
            { y: shift },
            {
              y: -shift,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                onEnter: () => gsap.set(layer, { willChange: "transform" }),
                onEnterBack: () => gsap.set(layer, { willChange: "transform" }),
                onLeave: () => gsap.set(layer, { willChange: "auto" }),
                onLeaveBack: () => gsap.set(layer, { willChange: "auto" }),
              },
            },
          );
        });
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="story"
      ref={root}
      className="relative overflow-hidden bg-mist text-tea"
    >
      <div
        data-hills
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 overflow-hidden md:h-48"
        aria-hidden
      >
        {hills.map((hill) => (
          <svg
            key={hill.bottom}
            data-hill
            data-shift={hill.shift}
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
            className={`absolute left-[-8%] h-40 w-[116%] md:h-56 ${hill.className}`}
            style={{ bottom: hill.bottom }}
          >
            <path
              fill="currentColor"
              d="M0 120C160 70 280 150 460 110C680 60 760 150 980 100C1160 60 1300 130 1440 90V220H0Z"
            />
          </svg>
        ))}
      </div>

      <div data-story-frame className="relative h-svh overflow-hidden bg-tea">
        <div data-story-photo className="absolute -inset-[12%]">
          <Image
            src={story.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-char/80 via-char/30 to-char/15" />
        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-28 md:pb-20 md:pl-12">
          <p data-reveal className="text-xs tracking-[0.22em] text-cream/80 uppercase">
            {story.eyebrow}
          </p>
          <h2
            data-reveal
            className="mt-5 max-w-3xl font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.95] font-light tracking-tight text-cream"
          >
            {story.title}
          </h2>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col justify-center px-5 pt-24 pb-52 md:pt-32 md:pr-16 md:pb-64 md:pl-12">
        <div className="max-w-xl space-y-6 text-lg leading-relaxed">
          {story.body.map((paragraph) => (
            <p data-reveal key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
        <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-tea/20 pt-8">
          {story.stats.map((stat) => (
            <div data-reveal key={stat.label}>
              <dt className="font-display text-[clamp(4rem,9vw,8rem)] leading-none font-light">
                {stat.value}
              </dt>
              <dd className="mt-3 text-xs tracking-[0.16em] uppercase">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
