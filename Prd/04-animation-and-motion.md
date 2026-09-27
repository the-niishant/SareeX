# PRD: AURELIA SAREES — Animation and Motion System

- **File:** `SareeX/Prd/04-animation-and-motion.md`
- **PDF 2 phase:** Phase 03 — Visuals + 3D; Phase 04 — Build, Round 2: Motion
- **Owner:** Product Architect + Motion Designer
- **Status:** Draft for review

## Purpose

Define the shared motion runtime and the site-wide behaviors that connect Lenis, GSAP, ScrollTrigger, the floating saree, motif drift, particles, and the Instagram marquee. This PRD specifies motion behavior only; it does not authorize application code in this deliverable.

## Scope

### In scope

- Exact Lenis + GSAP ticker synchronization for the client-side `LenisProvider`.
- Floating saree loop and its Lenis-velocity modulation.
- Motif parallax and section motif treatment.
- Zari particles, section reveals, the Instagram marquee, and page scroll indicator.
- Reduced-motion behavior, performance budgets, and motion cleanup requirements.

### Out of scope

- Hero placement and pin range, specified in PRD 02.
- Carousel geometry and card states, specified in PRD 03.
- Component-specific micro-interactions, specified in PRD 05.
- A final decision between layered image assets and R3F for the floating saree.

## Dependencies

- `00-overview.md` for the PDF reference map and non-negotiables.
- `01-design-system.md` for shared motion tokens, typography, and reduced-motion rules.
- `02-hero-landing.md` for hero motion placement and pin range.
- `03-saree-circular-carousel.md` for pinned product swaps and carousel background motion.
- `06-tech-stack-and-build-phases.md` for the locked stack and round-by-round verification.

## Detailed specification

### 1. Lenis + GSAP synchronization

The scroll runtime lives in a client-only `LenisProvider`. This is the required synchronization snippet:

```ts
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
// after mount:
ScrollTrigger.refresh();
```

Runtime requirements:

- Register GSAP plugins once before creating animations or triggers.
- Use the GSAP ticker as the single Lenis animation clock; do not add a competing requestAnimationFrame loop.
- Refresh ScrollTrigger after mount and after fonts, images, or dynamic content change layout measurements.
- In React, create and revert scoped GSAP work in a client lifecycle (`useGSAP` or a scoped GSAP context). Do not execute GSAP or ScrollTrigger during server rendering.
- On provider teardown, remove the ticker callback, unsubscribe the scroll listener, kill or revert provider-owned triggers, and destroy the Lenis instance.
- Each pinned section uses `scrub: 1`, never `scrub: true`. Reduced motion disables pin and scrub.

### 2. Floating saree motion

The floating saree is a foreground editorial layer on the hero. PRD 02 controls its placement; this PRD defines the motion contract.

| Property | Motion |
|---|---|
| Vertical bob | Sinusoidal `y(t) = sin(t) × 12px`, giving a ±12px travel around the resting position |
| Rotation | Gentle `rotateZ` sway within ±3° |
| Scale | Slow breathing between `1` and `1.02` |
| Playback | GSAP timeline with `repeat: -1` and `yoyo: true`; transform channels remain smooth at the loop boundary |
| Scroll response | Modulate loop intensity from Lenis velocity without snapping the current transform or changing the base amplitude abruptly |

The loop is an ambient motion layer and must not compete with the hero headline or CTA. Layered fabric images or meshes may offset their motion phase to suggest drape; the phase offsets must remain subtle and continuous.

#### Rendering routes

- **Layered-image route:** Use optimized transparent PNG/WebP layers with phase offsets. This is the default candidate while a 3D hero has not been approved.
- **R3F route:** Only if the art direction explicitly chooses 3D, use a cloth-like plane with `MeshDistortMaterial` and soft drei `Environment` lighting. Smooth frame-updated values with `lerp` inside `useFrame`; motion values must not snap.
- Draco-compress any GLB used by the 3D route. The required compression command is `gltf-transform draco model.glb model.draco.glb`.

### 3. Motif parallax

- Each section uses the motif assigned by PRD 01 and its section-specific product context.
- For scroll progress `p` within the relevant section, motif vertical offset is `y = -p × 120px`.
- Motif opacity is `0.08` for this shared background treatment, within the PRD 01 allowed range `0.06–0.12`.
- Motif drift is slow and scroll-linked; it sits behind content and imagery and never lowers text contrast.
- Any SVG stroke-draw effect must be assigned by a section PRD and cite the PDF 1 prompt that governs that animation.

**Reference:** PDF 1 Prompt 02, scroll-driven movement; Prompt 08 for the storefront’s section treatment.

### 4. Zari particles

- Use 40 decorative particles behind foreground content: 40 DOM spans by default, or instanced R3F points only if an R3F route is approved.
- Distribute particles across distinct relative drift speeds so depth reads gently; exact speed tiers are a visual-tuning question.
- Keep all particles `aria-hidden`, non-interactive, and behind text and product controls.
- Disable the particle system when the section is offscreen where feasible and completely remove it under reduced motion.

**Reference:** PDF 1 Prompt 02 for scroll-linked movement; Prompt 08 for the storefront’s ambient visual layer.

### 5. Section reveals

- Use the PRD 01 **Silk entrance** as the default for editorial section content: opacity `0→1`, y `60px→0`, skewY `4°→0`, duration `1.1s`, `power4.out`, stagger `0.08s`.
- Use word stagger `0.05s` for an explicitly split headline.
- The hero uses its masked line reveal from PRD 02. The carousel uses its own active-card and name transition from PRD 03.
- Use the **Flip entrance** only if a mono section is approved; it is not a site-wide reveal pattern.
- Do not add entrance motion to every decorative element. Motion should clarify hierarchy or respond to scroll and selection.

**Reference:** PDF 1 Prompt 08 storefront and product-section reveal patterns. Specific hero and carousel behavior follows Prompts 08 and 03 in their own PRDs.

### 6. Instagram marquee and page progress

#### Instagram marquee

- Show a continuous horizontal strip of editorial/Instagram imagery without a hard reset or visible seam.
- Marquee speed responds smoothly to Lenis velocity; velocity modulation must be bounded and must return to the baseline speed without a snap.
- Images retain reserved aspect ratios and meaningful alt text when informative; duplicated loop content is hidden from assistive technology.
- Under reduced motion, replace continuous movement with a static, manually browsable row.

**Reference:** PDF 1 Prompt 08, Instagram storefront section; Prompt 02 for scroll-linked response.

#### Page scroll indicator

- For the long cinematic page, show one thin progress line at the right edge.
- Map document scroll progress to line scale from top to bottom. Keep the line subtle and decorative, and do not let it obscure the page or interactive controls.
- Under reduced motion, update the progress state without a smooth animated tween.

**Reference:** PDF 1 Prompt 02, scroll-driven progress mapping.

### 7. ScrollTrigger and transform ownership

- Pinned sections use the pin ranges defined by their section PRDs and `scrub: 1`.
- Pin stable section wrappers; animate inner content rather than the pinned element itself.
- Keep scroll-driven triggers top-to-bottom in document order. Refresh after layout changes, not on every animation frame.
- Avoid competing GSAP tweens that write to the same transform property. Scroll progress owns pinned transforms; GSAP Flip owns only the discrete layout transition described in PRD 03.
- Animate transform and opacity where possible. Avoid layout-heavy animation for scroll movement.
- Apply `will-change` only while a tween is active and clear it when the tween completes or is reverted.

**Reference:** PDF 1 Prompts 02 and 03; PDF 2 Phase 04, Round 2.

## Reduced-motion behavior

When `prefers-reduced-motion: reduce` is active:

- Disable pinning and scrub-based movement; render pinned storytelling sections in normal flow or their specified static stacked layout.
- Kill the floating-saree loop and stop the Instagram marquee.
- Render motifs as static low-opacity artwork; hide zari particles.
- Show static product and hero imagery. If the Ken-Burns image sequence is selected, use a still frame rather than animating the sequence in reduced-motion mode.
- Make section content immediately visible without spatial entrance movement.
- Preserve controls, product information, and navigation without requiring motion.

This follows the global static-fallback rule. The brief’s mention of a Ken-Burns PNG sequence as a reduced-motion fallback is treated as a source of still imagery, not as continued movement; see Open Questions.

## Performance budgets

- Target 60fps on supported devices for motion-enabled sections.
- Clamp WebGL device pixel ratio to `[1, 2]`; mobile uses a lower cap than desktop. The exact mobile cap is to be set after device profiling.
- Do not create a WebGL canvas unless the 3D route is approved. If used, keep scene detail, particle count, and camera distance lower on mobile.
- Keep particle count at 40 maximum for this spec; pause or remove offscreen ambient animation where feasible.
- Do not set `will-change` globally or permanently.
- Draco-compress every GLB before delivery.
- Verify pins, ScrollTrigger activation, frame pacing, reduced-motion behavior, and mobile layout during PDF 2 Phase 04 Round 2 and Phase 07 ship review.

## Acceptance criteria

- [ ] `LenisProvider` uses the exact sync snippet in this PRD and runs client-side only.
- [ ] Provider teardown removes its ticker callback and listener, reverts owned GSAP work, and destroys Lenis.
- [ ] Floating saree meets the ±12px bob, ±3° rotation, `1–1.02` scale, repeat/yoyo, and Lenis-velocity modulation requirements.
- [ ] The selected fabric route is documented; R3F remains optional and requires an approved 3D direction.
- [ ] Motif position follows `y = -progress × 120px` at opacity `0.08`.
- [ ] Particle count is capped at 40 and particles are hidden from assistive technology.
- [ ] Editorial section reveals use the specified Silk entrance unless their PRD defines a different pattern.
- [ ] Instagram marquee speed responds smoothly to Lenis velocity and becomes static under reduced motion.
- [ ] Right-edge scroll progress reflects document progress without obscuring content.
- [ ] Reduced-motion mode disables pins, scrubs, loops, parallax, and particle movement while retaining all content.
- [ ] DPR stays within `[1, 2]` and is capped lower on mobile when WebGL is used.
- [ ] Any GLB is Draco-compressed; will-change is temporary and removed after tweens.
- [ ] Every animation family cites the applicable PDF 1 prompt and build work follows PDF 2 Phase 04 Round 2.

## Open questions

1. Should the floating saree use layered transparent images or an R3F cloth-like plane? The 3D path requires explicit approval and an asset/performance review.
2. What Lenis-velocity clamp and blend factor should modulate the floating-saree loop and marquee speed?
3. What is the ambient loop duration for the floating saree? The brief fixes amplitudes but not cycle time.
4. Is the reduced-motion fallback a static frame from a Ken-Burns PNG sequence, as specified by the global static-fallback rule, or is an animated sequence explicitly desired?
5. What lower mobile DPR cap should be used if R3F is approved?
6. What exact relative speed tiers should separate the 40 particle layers?
7. Should a canvas sequence or cinematic camera move be used? If selected, add the relevant PDF 1 Prompt 04 or Prompt 06 spec in the implementing section PRD.

## References

- **PDF 1:** “Scroll Animation & 3D Website — AI Build-Prompt Library v2”; Prompt 02 for scroll-driven motion, Prompt 03 for pinned product swaps, Prompt 05 for curve-follow rigs if selected, and Prompt 08 for the AURELLE storefront and section patterns.
- **PDF 2:** “The Premium Website Workflow”; Phase 03 — Visuals + 3D and Phase 04 — Build, Round 2: Motion. Verification continues in Phase 07 — Ship.
