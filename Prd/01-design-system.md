# PRD: AURELIA SAREES — Design System

- **File:** `SareeX/Prd/01-design-system.md`
- **PDF 2 phase:** Phase 01 — Reference; Phase 03 — Visuals + 3D
- **Owner:** Product Architect + Motion Designer
- **Status:** Draft for review

## Purpose

Define the visual tokens and motion rules used across AURELIA SAREES. This document gives design and implementation work one shared source for color, type, spacing, motifs, motion, reduced-motion behavior, and accessibility.

## Scope

### In scope

- Brand colors and semantic color roles.
- Typography loaded with `next/font`.
- Spacing, radius, shadow, and hairline scales.
- Shared motion tokens and the two required reveal patterns.
- Five traditional SVG motifs and their section mapping.
- Reduced-motion and color-contrast requirements.

### Out of scope

- Page layout and section-specific composition, defined in PRDs 02–03.
- Product data and commerce component states, defined in PRD 05.
- Final authored SVG artwork, photography, and video assets.
- Additional color themes or dark mode unless approved in the open questions.

## Dependencies

- `00-overview.md` for brand, audience, scope, and site-wide quality rules.
- `02-hero-landing.md`, `03-saree-circular-carousel.md`, and `04-animation-and-motion.md` consume these tokens and motion rules.

## Detailed specification

### 1. Token architecture

Use three token layers in the later implementation handoff:

1. **Primitive:** Exact palette values and base measurements.
2. **Semantic:** Purpose aliases such as page background, text, and accent.
3. **Component:** Overrides for buttons, cards, focus indicators, and other components.

Components reference semantic tokens; they should not introduce untracked palette values. This follows the systematic token architecture in the design-system skill.

### 2. Color palette

| Primitive | Value | Intended role |
|---|---|---|
| Base ivory | `#FAF7F2` | Main canvas and light surfaces |
| Blush | `#F3E6E0` | Alternating section background |
| Deep espresso | `#1C1512` | Primary text and dark surfaces |
| Champagne gold | `#C9A24B` | Primary accent, zari details, active-card decoration |
| Zari maroon | `#6B1F2A` | Traditional secondary color named in the brand brief; use is subject to the accent-rule question below |

Semantic roles map page background to ivory, alternate background to blush, primary text to espresso, and primary interactive accent to champagne gold. Do not add per-saree accent colors until the one-accent rule and carousel color behavior are resolved.

Gold on ivory or blush is decorative only. For a gold-filled CTA, use espresso text. Gold text may be used on espresso only. Text on light surfaces uses espresso or maroon with a verified contrast ratio.

### 3. Typography

Load the chosen families through `next/font`:

| Role | Family | Use |
|---|---|---|
| Display | **Fraunces** | Hero and section headlines, saree names, editorial emphasis |
| Body | **Manrope** | Navigation, paragraphs, labels, controls, product metadata |
| Overline | Manrope, uppercase | Eyebrows and section labels at `letter-spacing: 0.3em` |

Fraunces is selected from the permitted display options because the project capabilities brief specifies Fraunces + Manrope. Keep body copy comfortably readable and avoid using wide tracking on paragraph text. Use a serif italic sparingly for editorial emphasis.

Proposed responsive type scale:

| Role | Size / line height |
|---|---|
| Hero display | `clamp(3.5rem, 8vw, 7rem)` / `0.98` |
| Section heading | `clamp(2.5rem, 5vw, 4.5rem)` / `1.05` |
| Subheading | `clamp(1.5rem, 3vw, 2.5rem)` / `1.15` |
| Body | `1rem` / `1.65` |
| Small body | `0.875rem` / `1.5` |
| Overline | `0.75rem` / `1.3`, uppercase, `0.3em` tracking |

### 4. Spacing, radii, shadows, and hairlines

Use a 4px base spacing unit. This scale is a proposal for design review:

| Token | Value |
|---|---:|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 24px |
| `space-6` | 32px |
| `space-7` | 48px |
| `space-8` | 64px |
| `space-9` | 96px |
| `space-10` | 128px |
| `space-11` | 192px |

Use page gutters that scale from 24px on small screens to 64px on wide screens. Section spacing should preserve editorial whitespace and compress on mobile without crowding headings or controls.

| Radius token | Value | Intended role |
|---|---:|---|
| Small | 8px | Inputs and compact controls |
| Medium | 16px | Standard cards |
| Large | 24px | Saree portrait cards |
| Extra large | 32px | Scrolled hero frame and large media panels |
| Pill | 9999px | Pill CTAs and compact status labels |

Use warm, low-opacity espresso shadows only where depth helps identify a surface. Keep resting cards nearly flat. Use one 1px hairline for dividers and card edges; use a gold hairline for active or selected decoration. Do not use heavy borders.

### 5. Motion tokens

All motion stays continuous and must respect reduced-motion preferences.

| Token | Value | Use | Reference |
|---|---|---|---|
| Standard ease | `power3.out` | Supporting reveals and transitions | PDF 1 Prompt 08 storefront pattern |
| Reveal ease | `power4.out` | Silk entrance and masked headline reveal | PDF 1 Prompt 08, Section 1 |
| Travel ease | `power4.inOut` | Scroll-driven showcase transitions | PDF 1 Prompt 03 and Prompt 08, Section 2 |
| Short duration | `0.6s` | Small visual state changes | PDF 1 Prompt 08 e-commerce interactions |
| Medium duration | `0.9s` | Card and section transitions | PDF 1 Prompt 08 storefront pattern |
| Silk duration | `1.1s` | Editorial silk entrance | PDF 1 Prompt 08 storefront pattern |
| Word stagger | `0.05s` | Word-by-word headline reveal | PDF 1 Prompt 08, Section 1 |
| Card stagger | `0.08s` | Editorial card entrance | PDF 1 Prompt 08 storefront pattern |

Do not apply `will-change` as a permanent style. Enable it only for active tweens and remove it when the tween finishes. Pinned sections use numeric scrub (`scrub: 1`) where specified in their PRDs.

### 6. Locked reveal patterns

#### Silk entrance — editorial default

Use for editorial section content and card entrances unless a section PRD specifies otherwise:

- Start: opacity `0`, y `60px`, skewY `4deg`.
- End: opacity `1`, y `0`, skewY `0deg`.
- Duration: `1.1s`.
- Ease: `power4.out`.
- Sibling stagger: `0.08s`; word stagger: `0.05s`.
- Reference: PDF 1 Prompt 08, AURELLE storefront reveal pattern.

#### Flip entrance — mono section only

Reserve this for a specifically approved mono section. The current section list does not define one, so this pattern is inactive until that section is confirmed:

- Start: opacity `0`, y `50px`, rotateX `-40deg`.
- End: opacity `1`, y `0`, rotateX `0deg`.
- Perspective: `1000px`.
- Reference: PDF 1 Prompt 08 storefront reveal pattern; use only for the approved mono section.

#### Masked headline reveal

For the hero and any section headline explicitly assigned the treatment, mask each line and reveal the inner line from y `110%` to `0%`. Reference: PDF 1 Prompt 08, Section 1. Preserve the full text in the accessibility tree; the mask is visual only.

### 7. Traditional motif library

Motifs are decorative SVGs, not content. Keep their opacity between `0.06` and `0.12`; hide them from assistive technology. Parallax movement follows PDF 1 Prompt 02 (scroll-driven movement) and is disabled for reduced motion.

| Motif | Visual form | Use |
|---|---|---|
| Paisley | Scattered paisley / ambi forms | General heritage texture and festive context |
| Lotus | Repeating lotus flowers and stems | Chanderi and light-fabric storytelling |
| Temple border | Repeating South Indian temple geometry | Kanjivaram context |
| Zari grid | Fine diamond grid with small dots | Banarasi and zari-rich context |
| Leheriya wave | Diagonal parallel waves | Leheriya context |

Use one motif family per section background. Keep motif placement, contrast, and scale subordinate to product photography. SVG stroke drawing may be used only when the relevant section PRD specifies it and cites its PDF 1 animation prompt.

### 8. Reduced-motion rules

When `prefers-reduced-motion: reduce` is active:

- Remove pinned and scrubbed behavior; use normal document flow.
- Show the carousel as a static, readable stacked collection as required by PRD 03.
- Stop floating-saree loops, parallax drift, and decorative particle motion.
- Show motifs as static low-opacity artwork.
- Make reveals immediate or use a brief opacity change without spatial movement.
- Keep all text, controls, images, and product information available; motion must not gate content.

### 9. Accessibility contrast pass

Ratios below are calculated from the supplied sRGB hex values using the WCAG relative-luminance formula. Text pairings must meet WCAG AA: 4.5:1 for normal text and 3:1 for large text. Meaningful non-text controls and focus indicators must meet 3:1 against adjacent colors.

| Foreground | Background | Contrast | Requirement |
|---|---|---:|---|
| Espresso `#1C1512` | Ivory `#FAF7F2` | 16.86:1 | Passes AAA for text |
| Espresso `#1C1512` | Blush `#F3E6E0` | 14.76:1 | Passes AAA for text |
| Maroon `#6B1F2A` | Ivory `#FAF7F2` | 10.60:1 | Passes AAA for text |
| Maroon `#6B1F2A` | Blush `#F3E6E0` | 9.28:1 | Passes AAA for text |
| Gold `#C9A24B` | Ivory `#FAF7F2` | 2.25:1 | Fails text and 3:1 non-text contrast; decorative only |
| Gold `#C9A24B` | Blush `#F3E6E0` | 1.97:1 | Fails text and 3:1 non-text contrast; decorative only |
| Gold `#C9A24B` | Espresso `#1C1512` | 7.51:1 | Passes text contrast |

On ivory and blush, gold may appear as decorative hairlines, motif strokes, or glow, but not as the only indicator of an interactive state. Use an espresso focus outline on light surfaces and a high-contrast light or gold outline on espresso surfaces. A gold-filled CTA uses espresso text. Confirm contrast again for any opacity, hover, or dynamic carousel color state before implementation.

## Animation and interaction traceability

| System behavior | Governing prompt |
|---|---|
| Silk entrance and masked editorial headline | PDF 1 Prompt 08, Section 1 / storefront pattern |
| Showcase travel and card transition tokens | PDF 1 Prompt 03 and Prompt 08, Section 2 |
| Scroll-linked motif drift | PDF 1 Prompt 02 |
| Flip entrance, if a mono section is approved | PDF 1 Prompt 08 storefront pattern |
| Build and motion review sequence | PDF 2 Phase 04, Round 2 — Motion |

This PRD defines shared visual tokens. Section-specific distances, pin lengths, and card states belong in PRDs 02–04 and must retain their prompt references.

## Acceptance criteria

- [ ] All specified brand colors are represented with semantic roles.
- [ ] Fraunces and Manrope are the font pairing and are assigned through `next/font` in implementation.
- [ ] Spacing, radius, shadow, and hairline scales support responsive editorial layouts.
- [ ] Motion tokens include all required eases, durations, and stagger values.
- [ ] Silk and Flip entrance patterns match their specified values; Flip is limited to an approved mono section.
- [ ] Five motifs are named and mapped to their saree contexts.
- [ ] Reduced-motion behavior keeps all content available without pinned or spatial motion.
- [ ] Text and control states use compliant contrast pairings; gold on light surfaces is not used as text or the sole state indicator.
- [ ] Every animation family in this PRD cites a PDF 1 prompt, and phase use cites PDF 2.

## Open questions

1. The brand brief names zari maroon as a secondary accent while the design rules require one accent color. Should gold remain the only interactive accent, with maroon limited to heritage category treatments?
2. The carousel brief requests a per-saree `accentColor`, which could introduce more than one accent. Should cards use only gold, or may a constrained set of palette colors vary by card?
3. Is a mono section part of the launch scope? The Flip entrance remains unused until confirmed.
4. Are the five motif SVGs supplied brand assets, or must they be commissioned or drawn during implementation?
5. Are the proposed spacing, radius, and responsive type scales approved, or should they remain adjustable during the visual review?

## References

- **PDF 1:** “Scroll Animation & 3D Website — AI Build-Prompt Library v2”; Prompt 08 is the direct storefront reference, Prompt 02 governs scroll-linked motif drift, and Prompt 03 governs showcase transitions.
- **PDF 2:** “The Premium Website Workflow”; this PRD belongs to Phase 01 — Reference and Phase 03 — Visuals + 3D. Motion implementation belongs to Phase 04, Round 2.
