import CurvedLoop from "@/components/ui/curved-loop";
import { site } from "@/lib/site";

export function Marquee() {
  const marqueeText = `SLOW LIVING   ·   WOOD-FIRED   ·   ${site.place.toUpperCase()}   ·   TAKE YOUR TIME   ·   `;

  return (
    <div className="menu-loop relative overflow-hidden bg-char text-cream">
      <span className="pointer-events-none absolute inset-y-0 left-5 z-10 flex items-center text-[0.6rem] tracking-[0.2em] text-ember uppercase md:left-12">Estate Pantry</span>
      <CurvedLoop
        marqueeText={marqueeText}
        shape="line"
        speed={0.7}
        direction="left"
        fontSize={36}
        fontWeight={300}
        letterSpacing={1.5}
        edgeFade={0.32}
        interactive={false}
        className="font-display"
      />
    </div>
  );
}
