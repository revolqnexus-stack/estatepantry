"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";
import { useReveal } from "@/components/ui/reveal";

export function Menu() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      const film = (trigger: HTMLElement, track: HTMLElement, pane: HTMLElement) => {
        const plates = gsap.utils.toArray<HTMLElement>("[data-plate]");
        const distance = () => Math.max(track.scrollWidth - pane.clientWidth, 0);
        gsap.set(plates, { scale: 1.14 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              end: () => `+=${distance()}`,
              onToggle: (self) => {
                gsap.set([track, ...plates], { willChange: self.isActive ? "transform" : "auto" });
              },
            },
          })
          .to(track, { x: () => -distance(), ease: "none" }, 0)
          .to(plates, { xPercent: -7, ease: "none" }, 0);
      };

      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current?.querySelector<HTMLElement>("[data-track]");
        const pane = track?.parentElement;
        if (!track || !pane || !root.current) return;
        film(root.current, track, pane);
      });

      media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current?.querySelector<HTMLElement>("[data-track]");
        const pane = track?.parentElement;
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        if (!track || !pane || cards.length === 0) return;

        const fit = () => {
          pane.style.height = "100svh";
          pane.style.overflow = "hidden";
          track.style.flexDirection = "row";
          track.style.height = "100%";
          track.style.width = "max-content";
          const width = pane.clientWidth;
          cards.forEach((card) => {
            card.style.width = `${width}px`;
            card.style.height = "100svh";
          });
        };

        ScrollTrigger.addEventListener("refreshInit", fit);
        fit();
        film(pane, track, pane);

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", fit);
          pane.style.height = "";
          pane.style.overflow = "";
          track.style.flexDirection = "";
          track.style.height = "";
          track.style.width = "";
          cards.forEach((card) => {
            card.style.width = "";
            card.style.height = "";
          });
        };
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section id="menu" ref={root} className="bg-char text-cream md:h-svh md:overflow-hidden">
      <div className="md:flex md:h-svh">
        <header className="flex max-w-md shrink-0 flex-col justify-center px-5 py-24 md:w-[28rem] md:px-0 md:py-0 md:pl-12 md:pr-10">
          <p data-reveal className="text-xs tracking-[0.22em] text-cream/70 uppercase">
            Menu
          </p>
          <h2
            data-reveal
            className="mt-5 max-w-xs font-display text-3xl leading-snug font-light tracking-tight md:text-4xl"
          >
            {site.menuNote}
          </h2>
        </header>
        <div className="min-w-0 md:flex-1 md:overflow-hidden">
          <div data-track className="flex flex-col md:h-svh md:w-max md:flex-row">
        {site.menu.map((item, index) => (
          <article
            key={item.name}
            data-card
            className="relative h-[82vh] w-full shrink-0 overflow-hidden md:h-svh md:w-[68vw]"
          >
            <div data-plate className="absolute -inset-[8%]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(min-width: 768px) 68vw, 100vw"
                className="object-cover"
                onLoad={() => ScrollTrigger.refresh()}
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-char/70 via-transparent to-transparent" />
            <p
              className="pointer-events-none absolute top-24 right-6 font-display text-[clamp(4rem,8vw,7rem)] leading-none font-light text-cream/30 md:top-28 md:right-12"
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </p>
            <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-32 md:px-12 md:pb-14">
              <p className="text-xs tracking-[0.18em] text-cream/75 uppercase">{item.category}</p>
              <h3 className="mt-3 max-w-lg font-display text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.95] font-light">
                {item.name}
              </h3>
              {"tag" in item && item.tag ? (
                <p className="mt-4 text-[0.72rem] tracking-[0.22em] text-ember uppercase">{item.tag}</p>
              ) : null}
              <p className="menu-detail mt-5 max-w-sm text-[0.95rem] leading-[1.7] tracking-[0.012em] text-cream/85">
                {item.description}
              </p>
            </div>
          </article>
        ))}
          </div>
        </div>
      </div>
    </section>
  );
}
