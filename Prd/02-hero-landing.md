# PRD: AURELIA SAREES — Hero Landing

- **File:** `SareeX/Prd/02-hero-landing.md`
- **PDF 2 phase:** Phase 04 — Build (Round 1: Structure; Round 2: Motion), dependent on Phase 03 — Visuals + 3D
- **Owner:** Product Architect + Motion Designer
- **Status:** Draft for review

## Purpose

Specify the first viewport and its scroll transition into the storefront. The hero must establish the saree boutique’s editorial identity, make collection and film actions clear, and introduce the site’s continuous motion language.

## Scope

### In scope

- Full-bleed hero media in a pinned, viewport-height section.
- Transparent-to-ivory navbar and its search, wishlist, and cart controls.
- Hero overline, split-line headline, subtext, and two calls to action.
- Scroll-linked image framing, headline drift, and motif parallax.
- Placement of the floating saree layer; its movement is specified in PRD 04.
- Responsive and reduced-motion behavior.

### Out of scope

- Exact film asset and final hero image/video selection.
- Detailed floating-saree animation and particle implementation, specified in PRD 04.
- Search results and search-surface behavior, pending product decisions.
- Cart and wishlist data behavior, specified in PRD 05.

## Dependencies

- `00-overview.md` for brand and site-wide constraints.
- `01-design-system.md` for palette, type, radii, contrast, and shared motion tokens.
- `04-animation-and-motion.md` for Lenis + GSAP synchronization and floating-saree movement.
- `05-commerce-and-components.md` for cart and wishlist interactions.

## Detailed specification

### 1. Hero structure

The hero occupies one viewport (`100svh` where supported) and is pinned during the motion-enabled scroll sequence. Use a full-bleed editorial photograph or video of a model wearing a flowing saree. The media is the dominant visual; copy sits center-left in a legible content-safe area.

| Element | Requirement |
|---|---|
| Media | Full-bleed image or muted, looping, inline video with a reserved poster frame. Maintain the subject focal point across desktop and mobile crops. |
| Overline | Exact text: `HANDWOVEN · HERITAGE '26`. Use the design-system overline style. |
| Headline | Exact copy and line breaks: `Draped in` / `Poetry.`. Fraunces display face, split into two masked lines. |
| Subtext | One concise brand sentence below the headline. Final copy is TBD; do not invent permanent copy in implementation. |
| Primary CTA | `Shop the Collection`, champagne-gold pill with accessible espresso text; leads to the approved collection destination. |
| Secondary CTA | `Watch the Film`, ghost treatment; opens or navigates to the approved film experience. Destination and playback surface are TBD. |
| Floating saree | Place in open hero space opposite the center-left copy, keeping copy, CTAs, and navbar unobstructed. PRD 04 owns the motion and asset treatment. |
| Motif | Subtle traditional SVG texture behind the content and media treatment, opacity between `0.06` and `0.12`. |

The pinned wrapper remains stable; animate its media and content children. Preserve a clear reading order in the document and a visible static composition before scroll begins.

### 2. Navbar

- **Initial state:** Transparent over the hero, with text and icons legible over the selected media.
- **Scrolled state:** Transitions continuously to an ivory surface with espresso text after the hero begins leaving its opening state.
- **Left:** Brand wordmark position. The hero brief spells it `AURELLE`; the project brand is `AURELIA SAREES`. Use the approved spelling after the open question is resolved.
- **Center:** Primary navigation destinations. Their labels and routes are not supplied and must be confirmed before implementation.
- **Right:** Search, wishlist, and cart controls, in that order. Use inline Lucide SVG icons, accessible names, visible keyboard focus, and touch targets suitable for mobile.
- **Cart badge:** Reflects the cart item count through PRD 05’s cart state. Hide the numeric badge when the count is zero unless the commerce PRD specifies otherwise.
- **Wishlist:** Toggle the wishlist state through PRD 05. The icon state must be exposed to assistive technology.
- **Search:** The control is present and keyboard operable; its destination or overlay behavior remains an open question.

Navbar surface and icon/text colors must retain the contrast requirements in PRD 01 over both the hero image and ivory background. If the image makes transparent-state text unreadable, add a subtle contrast treatment to the navbar rather than a hard state cut.

### 3. Responsive composition

- Desktop: retain the left-aligned copy block and reserve opposing negative space for the model or floating-saree layer.
- Mobile: keep the hero to one viewport, account for safe areas, and reflow copy and controls so the headline and both actions remain visible and usable. Crop media around the model’s face and drape focal point.
- At every width, preserve the split headline, CTA order, and semantic reading order. Avoid horizontal overflow.
- The hero image/video reserves its viewport area before media loads to prevent layout shift. Only hero media may receive `next/image` priority in the page.

## Exact animation and interaction specification

All animation is continuous. No hard cuts between the transparent navbar, full-bleed image, and framed image states.

| Beat | Start → end | Trigger and behavior | Reference |
|---|---|---|---|
| Headline reveal | Each line moves from masked y `110%` to `0%`; overflow is hidden by its line mask | Runs on hero entrance. Word treatment follows PRD 01 tokens where used. Keep full copy available to assistive technology. | PDF 1 Prompt 08, Section 1 |
| Hero pin and image frame | Full-bleed media → smaller image inside a `rounded-3xl` frame | Pin the hero at `top top`; tie the media transform and corner radius to scroll with `scrub: 1`. Animate children of the pinned wrapper, not the pinned element itself. The exact end inset and scale await visual review. | PDF 1 Prompt 08, Section 1; PDF 2 Phase 04, Round 2 |
| Headline parallax | Headline drifts upward more slowly than the hero image transition | Link progress to the same pinned scroll range with `scrub: 1`; maintain readable separation from the subject and navbar. | PDF 1 Prompt 08, Section 1; Prompt 02 |
| Motif drift | Motif moves at `0.3x` the page scroll rate; opacity remains `0.06–0.12` | Scroll-linked parallax behind the hero. It must not compete with the model or text. | PDF 1 Prompt 02 |
| Navbar surface change | Transparent → ivory with corresponding icon/text color change | Transition with hero scroll state; avoid an abrupt color cut. | PDF 1 Prompt 08 storefront pattern |
| Floating saree | Placement only in this PRD; movement is owned by PRD 04 | If a scroll-driven 3D path is selected, use the motion rules and prompt trace recorded in PRD 04. | PDF 1 Prompt 02; Prompt 05 or 06 only if their rig/camera patterns are selected |

The scroll range length and exact media end scale are intentionally not fixed here; they require visual review against the selected hero asset and viewport sizes. Every pinned state uses `scrub: 1`, never boolean scrub.

### 4. Media behavior

- If video is selected for the background, it is muted, inline, and looping; provide a poster image and retain the static poster when autoplay is unavailable.
- The `Watch the Film` action provides the deliberate film-viewing experience. If the film includes meaningful speech or sound, provide captions and playback controls in that experience.
- Provide meaningful alt text for informative hero photography. Treat purely decorative overlay layers as decorative for assistive technology.
- Use an image crop that keeps the model and saree drape visible at common desktop and mobile aspect ratios.

### 5. Reduced-motion behavior

When `prefers-reduced-motion: reduce` is active:

- Do not pin or scrub the hero. Render the media, copy, navbar, and CTAs in normal document flow.
- Show the still poster or a static hero image; stop background video autoplay and floating-saree movement.
- Keep the motif static at low opacity.
- Show the headline fully visible without a masked reveal.
- Preserve both CTAs and all navbar actions; no interaction may depend on motion.

## Acceptance criteria

- [ ] Hero fills one viewport and presents full-bleed editorial saree media.
- [ ] Overline, exact split headline, subtext slot, and two required CTAs appear in the specified order.
- [ ] Navbar starts transparent and transitions continuously to ivory on scroll.
- [ ] Search, wishlist, and cart controls are accessible by keyboard and have accessible names; cart badge reflects PRD 05 state.
- [ ] Scroll-enabled hero pins at the top and uses `scrub: 1` for the image-frame transition and slower headline drift.
- [ ] Image transitions from full bleed to a rounded-3xl frame without a hard cut.
- [ ] Motif parallax uses `0.3x` movement and opacity stays within `0.06–0.12`.
- [ ] Hero remains responsive, readable, and free of horizontal overflow on mobile.
- [ ] Reduced-motion mode disables pinning, scrubbing, autoplay, and decorative movement while preserving all content and controls.
- [ ] Hero media reserves its area; `next/image` priority is limited to the hero image/poster.
- [ ] Each animation beat cites a PDF 1 prompt and the motion round references PDF 2 Phase 04.

## Open questions

1. Should the displayed wordmark be **AURELIA** or **AURELLE**? The project brand and hero instructions differ.
2. What exact copy should appear in the subtext?
3. What are the center navigation labels and their destinations?
4. Does `Watch the Film` open an in-page player, a dialog, or a separate film page?
5. What search surface should the navbar control open?
6. Which hero photograph or video, poster, focal point, and usage rights are available?
7. What are the approved end inset, scale, and pin duration for the image-frame transition? Finalize after reviewing the chosen media at desktop and mobile sizes.
8. Is a distinct floating-saree layer required in addition to the model/media already visible in the hero?

## References

- **PDF 1:** “Scroll Animation & 3D Website — AI Build-Prompt Library v2”; direct adaptation from Prompt 08, Section 1. Scroll-driven movement references Prompt 02. Prompt 05 or 06 applies only if a curve-follow rig or cinematic camera path is selected.
- **PDF 2:** “The Premium Website Workflow”; Phase 04 — Build, Round 1 (Structure) and Round 2 (Motion). Visual assets and direction depend on Phase 03.
