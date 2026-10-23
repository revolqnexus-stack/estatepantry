"use client";

import { useRef } from "react";
import { estatePoster, estateVideo } from "@/lib/assets";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";
import { Prose } from "@/components/ui/prose";
import { useReveal } from "@/components/ui/reveal";

export function Estate() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { estate } = site;
  useReveal(root);

  useGSAP(
    () => {
      const video = videoRef.current;
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        video?.pause();
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (!video) return;
        const play = () => {
          video.play().catch(() => undefined);
        };
        const pause = () => video.pause();
        ScrollTrigger.create({
          trigger: root.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: play,
          onEnterBack: play,
          onLeave: pause,
          onLeaveBack: pause,
        });
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section id="estate" ref={root} className="relative min-h-svh overflow-hidden bg-char text-cream">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={estateVideo}
        poster={estatePoster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
      />
      <div className="absolute inset-0 bg-char/40" />
      <div className="relative z-10 mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-5 pt-28 pb-36 md:py-36 md:pr-16 md:pl-12">
        <p data-reveal className="text-xs tracking-[0.22em] text-cream/80 uppercase">
          {estate.eyebrow}
        </p>
        <h2
          data-reveal
          className="mt-5 max-w-3xl font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.95] font-light tracking-tight"
        >
          {estate.title}
        </h2>
        <Prose paragraphs={estate.body} />
        <ul className="mt-14 max-w-md md:ml-14">
          {estate.points.map((point, index) => (
            <li
              data-reveal
              key={point}
              className="flex items-baseline gap-5 border-t border-cream/20 py-3.5 text-sm tracking-[0.04em]"
            >
              <span className="font-display text-lg leading-none font-light text-cream/45">
                {String(index + 1).padStart(2, "0")}
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
