# PRD: AURELIA SAREES — Saree Circular Carousel

- **File:** `SareeX/Prd/03-saree-circular-carousel.md`
- **PDF 2 phase:** Phase 03 — Visuals + 3D; Phase 04 — Build, Round 2: Motion
- **Owner:** Product Architect + Motion Designer
- **Status:** Draft for review

## Purpose

Specify the signature six-saree showcase: a desktop pinned, right-to-left carousel arranged on a shallow circular arc, with one featured saree brought into focus as the visitor scrolls. On mobile, use native horizontal scrolling.

## Scope

### In scope

- Six featured saree cards with portrait imagery and an arc-based desktop layout.
- Pinned, scroll-linked card movement, focus states, active product information, and accent transitions.
- GSAP Flip transition when a card becomes the center focus.
- Desktop dot navigation, mobile swipe navigation, keyboard access, and reduced-motion behavior.
- Radial glow, low-opacity motif, and zari particle treatment behind the cards.

### Out of scope

- Final product names, SKUs, photography, prices, and card order.
- Cart and wishlist state logic; product actions use PRD 05.
- A 3D carousel or camera rig. The default spec is DOM cards; R3F is not required for this section.
- The floating-saree motion specified in PRD 04.

## Dependencies

- `00-overview.md` for product scope, quality bar, and references.
- `01-design-system.md` for palette, typography, card radii, contrast, motion tokens, and reduced-motion behavior.
- `04-animation-and-motion.md` for Lenis synchronization, particles, and shared motion performance rules.
- `05-commerce-and-components.md` for the carousel product-card variant and product data contract.

## Detailed specification

### 1. Section structure

- Desktop section occupies one viewport (`100svh` where supported) and pins while the featured sarees progress across the arc.
- Provide a concise section heading, the active saree name, a large index (`01/06`), six product cards, and six dot-navigation controls.
- Keep the active name and index outside the moving card track so they remain legible and stable while cards travel.
- Cards are 3:4 portrait images with `rounded-2xl` corners and overflow clipping. Include only approved product metadata and actions from PRD 05.
- The image and product information must reserve space before loading to prevent layout shift. Carousel images are lazy-loaded; only the page hero image receives priority.

### 2. Desktop circular geometry

Cards follow a shallow arc or circle, never a straight row. Use a starting desktop arc radius of approximately `1400px`; tune the exact radius and angular spacing against the viewport and card width during visual review.

For a six-card set, let `i` be the zero-based card index and `p` be normalized scroll progress from `0` to `1`:

- The active track position is `q = p × (6 − 1)`.
- Each card’s signed distance from center is `s = i − q`; its focus distance is `d = |s|`.
- The card’s arc angle is `θ = s × Δθ`, where `Δθ` is the approved per-card angular spacing.
- Place the card on the arc at `x = R × sin(θ)` and `y = R × (1 − cos(θ))`, with `R ≈ 1400px` on desktop. As `q` advances, cards move from right to left across the center.

The focused card sits at the visual center of the arc. Arc shape, card width, and `Δθ` must keep the six-card sequence legible without clipping the active card or obscuring the section heading.

### 3. Card state by focus distance

Use the following states as the source of truth. Interpolate values continuously between adjacent distances as scroll progresses so a card does not jump between styles.

| Focus distance `d` | Scale | Blur | `rotateY` | Opacity | Active ring / visibility |
|---:|---:|---:|---:|---:|---|
| `0` | `1.05` | `0px` | `0°` | `1` | 1px champagne-gold ring with restrained glow |
| `1` | `0.9` | `2px` | `±6°` based on side | `0.75` | No active ring |
| `2` | `0.82` | `4px` | `±8°` based on side | `0.5` | No active ring |
| `≥ 3` | — | — | — | — | Visually hidden and removed from tab order until it approaches the arc |

The active ring remains champagne gold. The section’s background accent may tween per the active product’s `accentColor` as described below. Do not let the card blur or opacity make the active product unreadable.

### 4. Scroll mapping and pinning

- **Desktop trigger:** Start when the showcase reaches `top top`.
- **Pin:** `pin: true` for the showcase viewport.
- **Scrub:** `scrub: 1` for the arc rotation and continuous per-card state interpolation.
- **End distance:** six current viewport heights (`6 × viewport height`), recalculated on resize.
- **Progress:** normalized `p = 0` starts with featured item 01 centered; `p = 1` ends with item 06 centered. Intermediate card centers are spaced evenly through the scroll range.
- **Active index:** nearest card center based on `q`. Update the visible index as `01/06` through `06/06` as the active item changes.
- **Refresh:** refresh trigger positions after fonts, card imagery, or layout dimensions change. Create and refresh triggers in document order.

The pinned section animates its inner track and card children; do not transform the pinned wrapper itself. The transition remains continuous and has no hard cuts.

### 5. Focus snap and product identity

When a new card becomes the nearest center item at a segment boundary:

- Use GSAP Flip to capture the prior card layout, promote the incoming card to the center-focus layout, and animate the layout change continuously.
- Flip controls the discrete layout promotion; the scroll-progress arc remains the source of truth for overall direction and progress. Do not apply competing transforms to the same card property at the same time.
- Keep the incoming card’s center state aligned to the arc’s center point. The selected card is sharp and fully opaque.
- Reveal the large index and saree name on each active-item change. Mask the incoming name and move its words from y `110%` to `0%`, stagger `0.05s`, `power4.out`. Preserve the full name for assistive technology.
- Announce the selected item to assistive technology only after the active segment settles; do not emit an announcement for every scrub frame.

**Animation reference:** PDF 1 Prompt 03 (pinned product swaps) and Prompt 08, Section 2 (dress showcase). The name reveal follows Prompt 08’s editorial reveal pattern.

### 6. Accent and background transitions

- Each product provides an `accentColor` through the PRD 05 product model.
- As the active card changes, tween the showcase CSS custom property `--accent` from the previous product color to the next product color. Use the same normalized segment progress as the card transition; avoid a discrete color cut.
- Apply `--accent` to restrained background tint, radial glow, and approved active-section decoration. The card focus ring remains champagne gold per the state table.
- Keep text and controls on verified high-contrast foregrounds; do not use a dynamic accent as body text unless the color pair passes the PRD 01 contrast requirements.

Exact six color values are not defined here. They must come from the approved palette and product data; see Open Questions for the single-accent conflict.

### 7. Radial glow, motifs, and zari particles

- Place a soft radial glow behind the arc. It follows the active `--accent` at low opacity and remains subordinate to product imagery.
- Use one low-opacity traditional motif behind the showcase, selected to fit the active collection. Stay within the PRD 01 motif opacity range of `0.06–0.12`.
- Provide 40 decorative zari particles. Use DOM spans as the default; an instanced R3F implementation is optional only if a 3D path is selected elsewhere.
- Particles drift at distinct relative scroll speeds behind the cards. Keep them decorative, `aria-hidden`, and outside pointer interaction.
- Scroll-linked motif/particle drift adapts PDF 1 Prompt 02; the showcase transition adapts Prompt 03 and Prompt 08, Section 2.

### 8. Navigation and responsive behavior

#### Desktop

- Six dot controls show the active item and allow direct navigation to a card’s scroll segment.
- A dot click calls `lenis.scrollTo()` for the matching segment position within the pinned range. Keep the active dot synchronized with scroll progress.
- Provide keyboard left/right navigation across the six items using the same segment mapping. Keep focus visible and do not trap keyboard focus in the pinned section.

#### Mobile

- Replace the desktop arc and vertical pin with a native horizontal scroll container containing the six 3:4 cards.
- Use horizontal scroll snapping and preserve native touch scrolling; do not hijack the gesture with vertical pinning.
- Keep active item identity and dot/step controls synchronized with the currently centered card.
- The mobile card track is not a pinned horizontal scroll simulation; the user swipes it directly.

## Exact animation and interaction traceability

| Behavior | Specification | PDF 1 prompt |
|---|---|---|
| Arc track moves right to left | Scroll progress `0→1` advances `q` through the six card centers; `scrub: 1` | Prompt 03; Prompt 08, Section 2 |
| Center focus changes | Interpolated distance state drives scale, blur, rotation, opacity, and gold ring | Prompt 03; Prompt 08, Section 2 |
| Card promotion | GSAP Flip animates the active layout change at the segment boundary | Prompt 03 |
| Product name reveal | Masked words move y `110%→0%`, stagger `0.05s`, `power4.out` | Prompt 08, Section 2 |
| Accent/background change | `--accent` tweens with active card progress | Prompt 03; Prompt 08, Section 2 |
| Motif and particles | Low-opacity background elements drift at different scroll speeds | Prompt 02 |
| Mobile and reduced-motion fallback | Unpinned native horizontal scroll on mobile; static stacked cards for reduced motion | PDF 2 Phase 04, Round 2; PDF 1 Prompt 03 |

## Reduced-motion behavior

When `prefers-reduced-motion: reduce` is active:

- Disable the desktop pin and scrub; show the six cards as a vertical stack in document flow.
- Remove arc rotation, blur, card scaling, card rotation, Flip transitions, parallax, radial-glow movement, and particles.
- Show all six names, images, and product actions without requiring scroll animation or dot selection.
- Keep dot controls as in-page links to the corresponding stacked card, not Lenis-driven animation.

## Accessibility and performance

- Mark the section as a labeled carousel region. Give each card an accessible name based on its approved product name and expose which item is currently selected.
- Visually hidden cards must not be keyboard-focusable. Dot and arrow navigation must provide a path to every featured item.
- Use descriptive alt text for product images. Decorative motifs, glow, and particles are hidden from assistive technology.
- Provide visible focus states that meet PRD 01 contrast requirements. Do not rely on gold-on-ivory alone to indicate selection.
- Keep image aspect ratios reserved and lazy-load carousel images.
- Keep the particle count capped at 40; disable it under reduced motion. Keep animated transforms on compositor-friendly properties where practical.
- Target smooth 60fps on supported devices; verify the pinned desktop sequence and mobile swipe layout in the Round 2 verification pass.

## Acceptance criteria

- [ ] Six featured saree cards appear as 3:4 portraits with rounded-2xl corners.
- [ ] Desktop cards follow a visible shallow arc using an approximately 1400px starting radius; the track is not a straight row.
- [ ] Scroll progress `0→1` moves cards right to left, with items 01 through 06 reaching center in order.
- [ ] Desktop section pins for six viewport heights with `pin: true` and `scrub: 1`.
- [ ] Per-card state matches the distance table and interpolates continuously between distances.
- [ ] GSAP Flip promotes the next centered card without a hard cut or conflicting transform ownership.
- [ ] Active name uses a masked word reveal; index updates from `01/06` through `06/06`.
- [ ] The background `--accent` transitions with the active product while the active ring remains gold.
- [ ] Radial glow and 40 zari particles stay behind card content; particles use different relative scroll speeds.
- [ ] Desktop dot navigation calls Lenis to the correct segment; keyboard navigation reaches all six cards.
- [ ] Mobile uses native horizontal swipe and snap without desktop pinning.
- [ ] Reduced motion unpins the section and presents all six cards in a static vertical stack.
- [ ] Hidden cards cannot take focus, and active product changes are announced without scrub-frame chatter.
- [ ] All motion behaviors cite PDF 1 prompts and build work maps to PDF 2 Phase 04, Round 2.

## Open questions

1. Which six sarees, names, images, prices, and ordering are featured at launch?
2. What are the approved `accentColor` values? How should they coexist with the one-accent rule and PRD 01 palette?
3. What card width and angular spacing `Δθ` best fit the approved desktop art direction?
4. At what viewport breakpoint should the layout switch from pinned arc to native horizontal scrolling?
5. Should the carousel card expose add-to-bag directly, or link to product detail only?
6. Should the active card remain centered at both ends of the pinned range, or should the first card enter from offscreen right before settling at center?
7. What reduced-motion card spacing and section heading treatment are approved for the vertical stack?

## References

- **PDF 1:** “Scroll Animation & 3D Website — AI Build-Prompt Library v2”; Prompt 03 is the canonical pinned product-swap pattern, Prompt 08 Section 2 is the direct showcase template, and Prompt 02 governs scroll-driven background drift.
- **PDF 2:** “The Premium Website Workflow”; Phase 03 — Visuals + 3D and Phase 04 — Build, Round 2: Motion.
