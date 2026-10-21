import data from "@/data/site.json";

export const visitKey = "estate-pantry-visited";

export const site = data;

function ready(value: string) {
  return value.trim().toUpperCase() !== "TODO";
}

export function phoneHref(): string | null {
  if (!ready(site.phone)) return null;
  return `tel:${site.phone.replace(/\s/g, "")}`;
}

export function whatsappHref(): string | null {
  if (!ready(site.whatsapp)) return null;
  const digits = site.whatsapp.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

/** Opens Google's own review form. A widget cannot post a rating into a Business Profile. */
export function googleReviewHref(): string | null {
  if (!ready(site.googlePlaceId)) return null;
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(site.googlePlaceId)}`;
}

export function mapsHref(): string | null {
  return ready(site.mapsUrl) ? site.mapsUrl : null;
}

export function instagramHref(): string | null {
  if (!ready(site.instagram)) return null;
  if (site.instagram.startsWith("http")) return site.instagram;
  return `https://instagram.com/${site.instagram.replace(/^@/, "")}`;
}

export function hoursLabel(): string | null {
  return ready(site.hours) ? site.hours : null;
}
