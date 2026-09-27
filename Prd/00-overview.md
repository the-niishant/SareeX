# AURELIA SAREES — PRD 00: Project Overview

| Field | Value |
|---|---|
| **File** | `prd/00-overview.md` |
| **Phase** | PDF 2 — Phase 01 (Reference) + Phase 02 (Stack) |
| **Owner** | Product Architect + Motion Designer |
| **Status** | Draft v1 — pending stakeholder sign-off |

---

## 1. Vision

AURELIA SAREES is a luxury Indian saree e-commerce experience that treats every scroll like a draping ceremony — fabric, motion, and heritage woven into a single cinematic page. The site is not a catalog; it is a **digital boutique** where the product is felt before it is seen.

**Brand essence:** Handwoven heritage meets editorial luxury. Warm ivory canvas, zari gold hairlines, deep espresso typography, and silk that moves.

**Target user:**
- **Primary:** Women 28–45, urban India + diaspora, purchasing for weddings, festivals, and elevated daily wear. Aesthetic-driven; expects editorial quality.
- **Secondary:** Groom's family buying bridal trousseau; NRIs gifting to family in India; boutique resellers looking for authentic craft.

**Success metrics (post-launch):**
| Metric | Target | Measurement |
|---|---|---|
| Avg. session duration | ≥ 3:30 | GA4 |
| Add-to-cart rate | ≥ 6% of sessions | GA4 / Plausible |
| Cart abandonment | ≤ 65% | GA4 funnel |
| Mobile conversion rate | ≥ 1.2% | GA4 |
| Lighthouse Performance (mobile) | ≥ 85 | Lighthouse CI |
| CLS | ≤ 0.05 | Lighthouse CI |

---

## 2. Style Statement (one sentence)

Warm ivory editorial canvas, silk-textured motion, zari gold hairlines, and traditional motifs at whisper opacity — every pixel whispers handwoven heritage.

---

## 3. Reference Documents & Prompt Mapping

### PDF 1 — "Scroll Animation & 3D Website — AI Build-Prompt Library v2"

| Prompt | Name | Where Used | PRD |
|---|---|---|---|
| Prompt 02 | Scroll-driven 3D | Hero scale-down, floating saree | 02, 04 |
| Prompt 03 | Pinned product swaps | RTL circular carousel (signature) | 03, 04 |
| Prompt 04 | Canvas sequences | Zari particle system, lookbook | 04, 05 |
| Prompt 05 | Curve-follow rigs | Circular arc geometry | 03 |
| Prompt 06 | Cinematic camera moves | Hero scroll, lookbook horizontal | 02, 05 |
| Prompt 08 | AURELLE — Women's Dress Shop | Direct template for all sections | 02, 03, 05, 06 |

### PDF 2 — "The Premium Website Workflow"

| Phase | Name | What Happens | PRD |
|---|---|---|---|
| Phase 01 | Reference | Brand, palette, typography, mood | 00, 01 |
| Phase 02 | Stack | Next.js 14 + TS + Tailwind + GSAP + Lenis | 06 |
| Phase 03 | Visuals + 3D | Imagery direction, motif library, saree layers | 01, 04 |
| Phase 04 | Build (3 rounds) | Structure → Motion → Polish | 06 |
| Phase 05 | Components | Cart, wishlist, cards, modals, toasts | 05 |
| Phase 06 | Backend | Checkout, orders, waitlist, contact | 05, 06 |
| Phase 07 | Ship | Deploy, monitor, iterate | 06 |

---

## 4. Phase Map — PRD → PDF 2 Phase

```
PRD 00 ─── Phase 01 (Reference) + Phase 02 (Stack)
PRD 01 ─── Phase 01 (Reference) + Phase 03 (Visuals)
PRD 02 ─── Phase 04 Round 2 (Motion) + Prompt 08 Section 1
PRD 03 ─── Phase 04 Round 2 (Motion) + Prompt 03 + Prompt 08 Section 2
PRD 04 ─── Phase 04 Round 2 (Motion) + Prompts 02, 03, 05, 08
PRD 05 ─── Phase 05 (Components) + Phase 06 (Backend) + Prompt 08 E-Commerce
PRD 06 ─── Phase 02 (Stack) + Phase 04 (Build) + Phase 05 + Phase 06 + Phase 07
```

---

## 5. Non-Negotiable Constraints

These are **locked**. Any deviation requires written approval from the product owner.

1. **No hard cuts.** Every transition is a crossfade, scale, or drift. The page breathes; it never snaps.
2. **One accent color at a time.** Zari gold (#C9A24B) is the only active accent in any given viewport moment. Maroon (#6B1F2A) is reserved for the bridal/occasion section only.
3. **prefers-reduced-motion is a first-class path.** Every animation must degrade to a static or near-static layout. See PRD 01 §7 and PRD 04 §7 for the full fallback spec.
4. **Semantic HTML.** `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, proper heading order. No `<div>` soup.
5. **next/image priority only on the hero.** All other images use `loading="lazy"` with explicit width/height to prevent CLS.
6. **Draco compression mandatory for any GLB/GLTF.** No uncompressed 3D assets in the repo.
60fps on iPhone 13 (or equivalent) is the performance floor.
7. **60fps on iPhone 13** (or equivalent) is the performance floor. DPR clamped to [1, 2].
8. **No third-party UI kit used raw.** shadcn/ui primitives are styled to match the brand; 21st.dev sections are restyled; Magic UI effects are rebranded.

---

## 6. Deliverable List

| File | Description | Depends On |
|---|---|---|
| `prd/00-overview.md` | This document — vision, brand, constraints | — |
| `prd/01-design-system.md` | Palette, typography, spacing, motion tokens, motif library, a11y | 00 |
| `prd/02-hero-landing.md` | Pinned hero, navbar, split-line headline, scroll scale-down | 00, 01, 04 |
| `prd/03-saree-circular-carousel.md` | RTL arc carousel, per-card state function, Flip snap | 00, 01, 04 |
| `prd/04-animation-and-motion.md` | Lenis+GSAP sync, floating saree, particles, reduced-motion | 01 |
| `prd/05-commerce-and-components.md` | Cart, wishlist, product cards, modals, toasts | 00, 01 |
| `prd/06-tech-stack-and-build-phases.md` | Stack lock, 3-round build plan, verification, deploy | 00–05 |

---

## 7. Open Questions

| # | Question | Owner | Needed By |
|---|---|---|---|
| OQ-01 | Is the hero image a licensed photo, a 3D render, or a video loop? (Affects next/image vs. R3F path) | Product + Creative | Phase 03 |
| OQ-02 | Do we need a real backend at launch, or is Razorpay Link / manual order processing sufficient for Phase 07? | Product | Phase 06 |
| OQ-03 | Is the saree model for the floating layer a layered PNG sequence or a GLB? (GLB requires Draco; PNG requires ~24 frames) | Motion Designer | Phase 03 |
| OQ-04 | What is the initial inventory count? (Affects carousel card count — currently specced at 6) | Product | Phase 05 |
| OQ-05 | Is the lookbook content editorial photography or user-generated? (Affects Instagram strip integration) | Product | Phase 05 |
| OQ-06 | Do we ship internationally at launch? (Affects currency, shipping logic, footer links) | Product | Phase 06 |

---

*End of PRD 00. Next file: `prd/01-design-system.md`.*
