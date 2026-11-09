import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "lenis/dist/lenis.css";
import { StripCursorRefs } from "@/components/dev/strip-cursor-refs";
import { SmoothScroll } from "@/components/smooth-scroll";
import { StickyBar } from "@/components/ui/sticky-bar";
import { site, visitKey } from "@/lib/site";
import "./globals.css";

const visitedMark = `if(document.cookie.split(';').some(function(part){return part.trim()==='${visitKey}=1'}))document.documentElement.dataset.visited='1'`;

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
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: `Wood-fired pizza, estate tea, and slow afternoons at ${site.place}. ${site.address}.`,
  keywords: ["Vagamon restaurant", "wood-fired pizza Vagamon", "Pullikanam Tea Estate", "Kerala cafe"],
  category: "restaurant",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: `Wood-fired pizza, estate tea, and slow afternoons at ${site.place}.`,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/hero-poster.jpg", width: 1600, height: 1000, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: `Wood-fired pizza and estate tea in the hills of Vagamon.`,
    images: ["/images/hero-poster.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{ __html: visitedMark }}
        />
        <StripCursorRefs />
        <SmoothScroll>
          {children}
          <StickyBar />
        </SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: site.name,
              description: `${site.tagline} ${site.address}`,
              image: ["/images/hero-poster.jpg", "/images/interior-table.jpg"],
              address: {
                "@type": "PostalAddress",
                streetAddress: site.address,
                addressLocality: "Vagamon",
                addressRegion: "Kerala",
                addressCountry: "IN",
              },
              servesCuisine: ["Pizza", "Bakery", "Indian"],
              priceRange: "₹₹",
              url: "/",
            }),
          }}
        />
      </body>
    </html>
  );
}
