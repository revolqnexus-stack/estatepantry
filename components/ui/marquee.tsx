import { site } from "@/lib/site";

export function Marquee() {
  const names = site.menu.map((item) => item.name);
  const loop = [...names, ...names];

  return (
    <div className="overflow-hidden bg-char text-cream" aria-hidden>
      <div className="marquee-track flex w-max items-center py-6 md:py-8">
        {loop.map((name, index) => (
          <span key={`${name}-${index}`} className="flex items-center">
            <span className="px-8 font-display text-[clamp(1.5rem,2.4vw,2.15rem)] font-light tracking-[0.08em] whitespace-nowrap md:px-12">
              {name}
            </span>
            <span className="text-ember" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
