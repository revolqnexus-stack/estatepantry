import CurvedLoop from "@/components/ui/curved-loop";
import { site } from "@/lib/site";

export function Marquee() {
  const marqueeText = site.menu.map((item) => item.name).join("   ·   ");

  return (
    <div className="overflow-hidden bg-char py-3 text-cream md:py-4">
      <CurvedLoop
        marqueeText={marqueeText}
        shape="arc"
        speed={1}
        curveAmount={48}
        direction="left"
        fontSize={28}
        fontWeight={300}
        letterSpacing={1}
        separator="·"
        separatorColor="#D9622B"
        edgeFade={0.18}
        scrollBoost={0.15}
        interactive
        className="font-display"
      />
    </div>
  );
}
