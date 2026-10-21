import { cookies } from "next/headers";
import { Estate } from "@/components/sections/estate";
import { Food } from "@/components/sections/food";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Loader } from "@/components/sections/loader";
import { Menu } from "@/components/sections/menu";
import { Story } from "@/components/sections/story";
import { Visit } from "@/components/sections/visit";
import { Marquee } from "@/components/ui/marquee";
import { visitKey } from "@/lib/site";

export const instant = false;

export default async function Home() {
  const jar = await cookies();
  const seen = jar.get(visitKey)?.value === "1";

  return (
    <main>
      {seen ? null : <Loader />}
      <Hero seen={seen} />
      <Marquee />
      <Story />
      <Food />
      <Menu />
      <Marquee />
      <Estate />
      <Visit />
      <Footer />
    </main>
  );
}
