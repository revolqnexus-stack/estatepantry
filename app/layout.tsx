import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "lenis/dist/lenis.css";
import { StripCursorRefs } from "@/components/dev/strip-cursor-refs";
import { SmoothScroll } from "@/components/smooth-scroll";
import { StickyBar } from "@/components/ui/sticky-bar";
import { site } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
});

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm",
});

export const metadata: Metadata = {
  title: site.name,
  description: `${site.tagline} ${site.address}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <StripCursorRefs />
        <SmoothScroll>
          {children}
          <StickyBar />
        </SmoothScroll>
      </body>
    </html>
  );
}
