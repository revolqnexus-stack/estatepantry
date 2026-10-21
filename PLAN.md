# The Estate Pantry: Site Plan

Artisanal pizzeria + bakery, Pullikanam Tea Estate, Vagamon. Restored 70-year-old colonial Field Officers' Quarters. Brick oven, slow-fermented wood-fired pizza, estate-grown ingredients. Concept: SLOW LIVING.

## Goal
Feel like a film, convert like a booking page. Primary CTAs: WhatsApp, Call, Directions.

## Story (one continuous scroll)
mist -> tea rows -> colonial quarters -> dough -> fire -> pizza -> menu -> visit

Background shifts with scroll: misty green/cream -> warm ember dark -> cream again at footer.

## Sections
1. Loader: steam rising off a tea cup, 1.5s max, skips on repeat visit
2. Hero: fullscreen tea-garden video, mist shader clearing on load, split-text headline, scroll cue
3. Story: colonial quarters, layered parallax (4-5 depth layers of tea hills)
4. Pizza scrub: pinned canvas, 120 frames, dough -> toppings -> oven -> baked, copy fades in per stage
5. Oven glow: dark background, ember particles, brick oven + slow-fermentation text
6. Menu: horizontal pinned scroll, cards with hover reveal (vertical stack on mobile)
7. Estate: tea, pet friendly, slow living gallery
8. Visit: map, hours, Directions, WhatsApp, Instagram
9. Sticky bar: WhatsApp / Call / Directions, always visible

## Signature moments (do not add more)
Mist hero, pizza scrub, parallax hills, oven glow, horizontal menu.

## Content (placeholder until client confirms)
- Menu: spiced chicken pizza, rosemary herb garlic bread, pasta, spaghetti, baked treats, estate tea, mango juice, peach/lemon iced tea
- Hours, phone, WhatsApp number, GPS pin: TODO from client

## Assets needed
- Drone: tea gardens + building
- Macro: dough, fire, cheese pull (slow-mo)
- Locked-off pizza sequence -> 120 frames
- Logo, brand fonts if any
- Placeholder AI b-roll allowed in dev, replace before launch

## Build order
1. Scaffold + Lenis/GSAP sync + tokens
2. Loader + hero + sticky bar
3. Pizza scrub
4. Story parallax
5. Oven glow
6. Menu
7. Estate + Visit + footer
8. Mobile pass (390px)
9. Performance pass (LCP < 2.5s)
10. SEO + schema + deploy

## Definition of done per section
- Looks right at 390px and 1440px (check with Playwright)
- 60fps scroll, no layout shift
- Works with prefers-reduced-motion
- Committed
