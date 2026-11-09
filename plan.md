# Estate Pantry — premium launch pass

## Direction

**Chosen style:** cinematic editorial hospitality (0.82 probability). Alternatives: rustic modern estate (0.11), quiet luxury travel journal (0.07).

The site should feel like an award-winning hospitality film while behaving like a practical restaurant landing page. The existing mist, tea-garden, brick-oven, and slow-living story remain the signature moments; no extra decorative animation is added beyond a restrained film grain and responsive micro-interactions.

## Design system

- **Design movement:** contemporary editorial hospitality with Kerala hill-estate warmth.
- **Principles:** cinematic restraint, tactile materials, immediate clarity, and generous rhythm.
- **Color philosophy:** tea green grounds the brand in the estate; cream creates daylight and paper warmth; ember orange marks heat, action, and appetite; charcoal gives the oven and night scenes depth.
- **Layout paradigm:** one continuous scenic journey with offset text blocks, pinned image reels, and a practical visit section that resolves the experience.
- **Signature elements:** mist/film imagery, paper grain, ember accents.
- **Interaction:** scroll reveals story; hover gives small physical lift; CTAs stay clear and never depend on animation.
- **Animation:** GSAP/Lenis remain for the hero, parallax, food reel, and menu; all effects are disabled or simplified under reduced motion.
- **Typography:** Fraunces for expressive food and place headlines; DM Sans for navigation, labels, and actions.
- **Brand essence:** a slow-living wood-fired kitchen in the hills for people who value place, craft, and unhurried time. Personality: warm, considered, elemental.
- **Voice:** “Come in, sit down, and take your time.” / “Good ingredients. Patient hands. Proper heat.”
- **Wordmark:** restrained letter-spaced wordmark; preserve the existing typographic treatment until a supplied logo is available.
- **Ownable color:** ember orange `#D9622B`.

## Implementation

- Preserve the existing Next.js App Router architecture and local assets.
- Add stronger metadata, Open Graph, Twitter card, Restaurant JSON-LD, and the required route manifest.
- Add clear hero CTAs and practical visit facts.
- Make action buttons data-aware so missing client contact data never produces dead controls.
- Fix the React ref lint failure in the rating interaction.
- Keep content data-driven in `data/site.json`; do not invent phone, WhatsApp, hours, map, Instagram, or review values.
- Validate lint, build, and Playwright after edits.
