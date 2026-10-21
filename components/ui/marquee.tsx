import CurvedLoop from "@/components/ui/curved-loop";
import { site } from "@/lib/site";

export function Marquee() {
  const marqueeText = site.menu.map((item) => item.name).join("   ·   ");

  return (
    <div className="menu-loop overflow-hidden bg-char text-cream">
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
