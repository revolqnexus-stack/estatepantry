"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { heroMobilePoster, heroMobileVideo, heroPoster, heroVideo } from "@/lib/assets";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";
import { VisitActions } from "@/components/ui/sticky-bar";

const headline = site.tagline.split(",")[0]?.trim() || site.tagline;
const words = headline.split(/\s+/);
const taglineRest = site.tagline.slice(headline.length).replace(/^,\s*/, "");

export function Hero({ seen = false }: { seen?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const update = () => setSolid(window.scrollY > window.innerHeight * 0.72);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useGSAP(() => {
    const videos = gsap.utils.toArray<HTMLVideoElement>("video");
    const delay = seen ? 0.15 : 1.15;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: reduce)", () => {
      const stop = () => videos.forEach((video) => video.pause());
      videos.forEach((video) => {
        video.autoplay = false;
        video.addEventListener("play", stop);
      });
      stop();
      gsap.set("[data-word]", { yPercent: 0, opacity: 1 });
      gsap.set("[data-reveal]", { opacity: 1 });
      return () => videos.forEach((video) => video.removeEventListener("play", stop));
    });

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set("[data-word]", { yPercent: 110, opacity: 0 });
      gsap.to("[data-word]", {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        delay,
        ease: "power3.inOut",
        onStart: () => {
          gsap.set("[data-word]", { willChange: "transform" });
        },
        onComplete: () => {
          gsap.set("[data-word]", { willChange: "auto" });
        },
      });
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: delay + 0.45, ease: "power2.out" },
      );
      gsap.fromTo(
        "[data-cue-line]",
        { y: 0 },
        {
          y: 8,
          duration: 1.4,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        },
      );

      const film = root.current?.querySelector("[data-hero-film]");
      if (film) {
        gsap.fromTo(
          film,
          { scale: 1.08 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              onToggle: (self) => {
                gsap.set(film, { willChange: self.isActive ? "transform" : "auto" });
              },
            },
          },
        );
      }
    });

    return () => media.revert();
  }, { scope: root, dependencies: [seen], revertOnUpdate: true });

  return (
    <section id="hero" ref={root} className="relative h-svh overflow-hidden bg-tea">
      <div data-hero-film className="absolute inset-0 origin-center">
        <Image
          src={heroMobilePoster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover md:hidden"
          onLoad={() => ScrollTrigger.refresh()}
        />
        <Image
          src={heroPoster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover md:block"
          onLoad={() => ScrollTrigger.refresh()}
        />
        <video
          className="absolute inset-0 h-full w-full object-cover md:hidden"
          poster={heroMobilePoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source src={heroMobileVideo} type="video/mp4" media="(max-width: 767px)" />
        </video>
        <video
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source src={heroVideo} type="video/mp4" media="(min-width: 768px)" />
        </video>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-char/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-linear-to-t from-char/80 via-char/30 to-transparent" />

      <header
        className={`glass-nav fixed inset-x-3 top-3 z-40 flex items-center justify-between gap-3 rounded-full px-4 py-2 transition-colors duration-500 md:inset-x-6 md:px-6 ${
          solid ? "glass-light text-tea" : "glass-dark text-cream"
        }`}
      >
        <Link
          href="/"
          data-reveal
          className="font-display text-[0.72rem] leading-none tracking-[0.28em] md:text-sm"
        >
          ESTATE PANTRY
        </Link>
        <div data-reveal className="flex items-center gap-2 md:gap-4">
          <nav aria-label="Site" className="flex items-center">
            <a
              href="#menu"
              className="inline-flex min-h-11 items-center px-3 text-xs tracking-[0.16em] uppercase"
            >
              Menu
            </a>
            <a
              href="#visit"
              className="inline-flex min-h-11 items-center px-3 text-xs tracking-[0.16em] uppercase"
            >
              Visit
            </a>
          </nav>
          <nav aria-label="Visit" className="hidden md:block">
            <VisitActions tone={solid ? "solid" : "ghost"} />
          </nav>
        </div>
      </header>

      <div className="relative flex h-full flex-col justify-end px-5 pt-24 pb-36 md:px-12 md:pt-28 md:pb-16">
        <p
          data-reveal
          className="mb-6 flex items-center gap-3 text-[0.7rem] tracking-[0.22em] text-cream uppercase"
        >
          <span className="size-1.5 rounded-full bg-ember" aria-hidden />
          Now open
        </p>
        <h1 className="font-display text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.88] font-light tracking-tight text-cream">
          {words.map((word) => (
            <span key={word} className="block overflow-hidden py-[0.08em]">
              <span data-word className="block">
                {word}
              </span>
            </span>
          ))}
        </h1>
        <p
          data-reveal
          className="mt-5 font-display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none font-light tracking-[0.04em] text-cream"
        >
          {taglineRest}
        </p>
        <p
          data-reveal
          className="mt-8 max-w-lg text-xs leading-relaxed tracking-[0.14em] text-cream/85 uppercase"
        >
          {site.address}
        </p>
      </div>

      <div
        data-reveal
        className="absolute right-12 bottom-10 hidden flex-col items-center gap-3 md:flex"
      >
        <span className="text-[0.7rem] tracking-[0.22em] text-cream uppercase">
          Scroll
        </span>
        <span className="block h-10 overflow-hidden">
          <span data-cue-line className="block h-10 w-px bg-cream" />
        </span>
      </div>
    </section>
  );
}
