"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";
import { useReveal } from "@/components/ui/reveal";

export function Food() {
  const root = useRef<HTMLElement>(null);
  const reel = useRef<HTMLDivElement>(null);
  const { food } = site;
  useReveal(root);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]");
      const frames = gsap.utils.toArray<HTMLElement>("[data-frame]");

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(slides, { opacity: 1 });
        gsap.set(frames, { scale: 1 });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (!reel.current || slides.length < 2) return;

        gsap.set(slides.slice(1), { opacity: 0 });
        gsap.set(frames, { scale: 1.12, willChange: "transform" });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: reel.current,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            end: () => `+=${window.innerHeight * (slides.length - 1)}`,
            onToggle: (self) => {
              gsap.set(frames, { willChange: self.isActive ? "transform" : "auto" });
            },
          },
        });

        frames.forEach((frame, index) => {
          timeline.to(frame, { scale: 1, ease: "none", duration: 1 }, index);
          if (index === 0) return;
          timeline.to(slides[index], { opacity: 1, ease: "none", duration: 0.55 }, index);
        });
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section id="food" ref={root} className="bg-cream text-tea">
      <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-center px-5 pt-28 pb-20 md:min-h-svh md:py-36 md:pr-16 md:pl-12">
        <p data-reveal className="text-xs tracking-[0.22em] text-bark uppercase">
          {food.eyebrow}
        </p>
        <h2
          data-reveal
          className="mt-5 max-w-3xl font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.95] font-light tracking-tight"
        >
          {food.title}
        </h2>
        <div className="mt-10 max-w-xl space-y-6 text-lg leading-relaxed">
          {food.body.map((paragraph) => (
            <p data-reveal key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div ref={reel} data-reel className="relative h-svh overflow-hidden bg-char">
        {food.pillars.map((pillar, index) => (
          <article
            data-slide
            key={pillar.title}
            className={`absolute inset-0 ${index === 0 ? "" : "opacity-0"}`}
            style={{ zIndex: index + 1 }}
          >
            <div data-frame className="absolute inset-0">
              <Image
                src={pillar.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                onLoad={() => ScrollTrigger.refresh()}
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-char/85 via-char/15 to-char/25" />
            <div className="absolute inset-x-0 bottom-0 z-10 max-w-xl px-5 pb-28 md:pb-20 md:pl-12">
              <p className="text-xs tracking-[0.22em] text-cream/70 uppercase">
                {String(index + 1).padStart(2, "0")} / {String(food.pillars.length).padStart(2, "0")}
              </p>
              <h3 className="mt-4 max-w-md font-display text-[clamp(2.75rem,4.5vw,4.5rem)] leading-[0.92] font-light text-cream">
                {pillar.title}
              </h3>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/90">{pillar.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
