# AURELIA SAREES — Design Brief

**Status:** Phase 01 visual direction; structure, motion, and polish are implemented.

## Style statement

Warm ivory editorial space, handwoven silk as the hero, fine zari-gold rules, and a restrained cinematic pace rooted in Indian textile craft.

## Visual references

Use these as mood and craft references only; do not copy their layouts, imagery, campaigns, or identity.

1. **AURELLE — Women's Dress Shop, PDF 1 Prompt 08:** direct structure reference for the editorial storefront rhythm, product-led story, and commerce flow. Adapt it to AURELIA and Indian saree craft.
2. **Raw Mango collections:** handloom as contemporary design, confident textile color, and craft-led product storytelling. [Collections](https://rawmango.com/collections) · [Brand story](https://rawmango.com/pages/raw-mango)
3. **Anavila:** airy sari presentation, visible material character, and a light, modern treatment of Indian dressing. [Official site](https://www.anavila.com/)
4. **Sabyasachi collections:** heirloom atmosphere, ceremonial richness, and deep art direction. Borrow the sense of occasion while keeping AURELIA's canvas lighter and more spacious. [Collections](https://sabyasachi.com/collections)
5. **Good Earth design language:** Indian surface pattern, flora, and craft expressed through composed interiors and textile stories. [Design philosophy](https://www.goodearth.in/our-world/design-philosophy/interiors/) · [Craft stories](https://www.goodearth.in/our-world/design-philosophy/pehchaan/crafts/)
6. **V&A Indian textiles archive:** visual and historical reference for weave, material, and motif detail; use it to guide accurate cultural context rather than decorative invention. [Indian textiles](https://www.vam.ac.uk/articles/indian-textiles)

## Typography

- **Display:** Fraunces, loaded with `next/font/google`; editorial headings and saree names.
- **Body and UI:** Manrope, loaded with `next/font/google`; navigation, copy, metadata, and controls.
- **Hierarchy:** oversized serif hero, clear section heads, readable body copy, and restrained uppercase overlines with wide tracking.

## Palette

| Token | Hex | Role |
|---|---|---|
| Base ivory | `#FAF7F2` | Main canvas and cards |
| Blush | `#F3E6E0` | Alternating craft and editorial sections |
| Deep espresso | `#1C1512` | Text and footer |
| Champagne gold | `#C9A24B` | The single active accent for calls to action and zari details |
| Zari maroon | `#6B1F2A` | Reserved traditional secondary tone; do not show alongside gold as a competing accent |

## Motion beats (implemented in Rounds 2–3)

1. The hero enters as one sequence: masked headline, soft copy and CTA reveals, floating saree, and a zari motif that travels with the pinned image.
2. Six featured sarees travel right to left along a shallow arc; the centered card becomes crisp and prominent.
3. A layered saree image has a slow, velocity-led floating drape.
4. Five inline SVG motifs—zari, paisley, leheriya, lotus, and temple border—reveal and drift at a restrained scroll pace behind related sections.
5. Craft and lookbook sections carry measured parallax and horizontal movement; reduced motion keeps content static and fully visible.

Round 1 intentionally implements none of these animations.

## Layout inspiration

Left-weighted hero copy with open negative space for the drape; a restrained arc for the signature saree showcase; four-column portrait product grid; wedding-led bento grid; split craft story; horizontal lookbook; offset testimonial cards; quiet image marquee; and an espresso footer with an ivory newsletter panel.

## Implementation decisions

- Use **AURELIA** as the site wordmark because that is the project brand; the hero PRD's “AURELLE” label is treated as an unresolved source typo unless the product owner corrects it.
- Keep one active accent color at a time: champagne gold for the initial storefront. Maroon remains reserved and is not used as a second simultaneous accent.
- Use static image media and DOM layouts for Round 1. R3F/GLB is deferred until a 3D hero is explicitly approved.
- Use semantic landmarks, descriptive image alternatives, reserved image ratios, visible keyboard focus, and a static reduced-motion path from the first structure pass.

## Phase map

- PDF 2 Phase 01 — Reference: this brief and PRD 01.
- PDF 2 Phase 02 — Stack: `premium-stack-setup.txt` and PRD 06.
- PDF 2 Phase 03 — Visuals + 3D: inline SVG motifs and layered photography are in use; 3D remains deferred.
- PDF 2 Phase 04 — Build: Rounds 1 Structure, 2 Motion, and 3 Polish are implemented.
- PDF 2 Phases 05–06 — Components and backend: client-side commerce interactions are implemented; server checkout and persistence remain out of scope.
- PDF 2 Phase 07 — Ship: temporary Vercel deployment is live at [aurelia-sarees-teal.vercel.app](https://aurelia-sarees-teal.vercel.app/).
