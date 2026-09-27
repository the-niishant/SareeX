# AURELIA SAREES

Project root: `SareeX/`. The PRD suite is in `Prd/`.
The standing premium build workflow is recorded in `meow.txt`.

## Workflow status

1. **Phase 0 — Environment setup:** base packages installed; see `premium-stack-setup.txt`.
2. **Phase 1 — Reference and visual direction:** recorded in `design-brief.md`.
3. **Phase 2 — Stack:** Next.js App Router, TypeScript, Tailwind, GSAP, Lenis, Framer Motion, Lucide, and `next/image`. Next 15.5.26 is used because Next 14 is unsupported; this implementation deviation is recorded in the setup file.
4. **Phase 3 — Visuals + 3D:** Round 1 uses image media and static SVG motifs. A 3D/GLB route remains deferred.
5. **Phase 4 — Build:** Round 1 Structure, Round 2 Motion, and Round 3 Polish are implemented.
6. **Phase 5 — Components:** the commerce layer uses the shadcn/Radix dialog primitive restyled with AURELIA tokens, shared cart and wishlist state, product card variants, search, quick view, size guidance, and announced toasts.
7. **Phase 6 — Backend:** no backend is connected. The cart and wishlist are client-side; wishlist uses local storage. Checkout and newsletter submission clearly state that they are not connected.
8. **Phase 7 — Ship:** a temporary Vercel deployment is live; an account-owned deployment is pending Vercel authentication. The production build, local Chrome desktop/mobile interaction pass, Playwright desktop/mobile screenshot pass, and mobile Lighthouse pass are complete (90 Performance, 100 Accessibility). Browser MCP connections are not available in the current session; see `premium-stack-setup.txt`.

## Run locally

```bash
npm run dev
```

Round 2 adds the Lenis/GSAP ticker sync, masked hero line reveal, scroll-driven
hero frame, pinned desktop carousel/craft/lookbook sections, floating saree,
motif and particle parallax, silk entrances, image Ken Burns, and velocity-led
Instagram marquee. The motion engine loads after hydration and offscreen image
triggers are registered near the viewport. Round 3 adds functional client-side
cart, wishlist, search, quick view, a size guidance dialog, product card
actions, and announced toast feedback. Mobile keeps the showcase swipeable and
exposes product actions; reduced motion removes pinning and loops and stacks
the showcase cards. The premium refinement adds paisley, leheriya, and temple
motifs to the existing zari and lotus textures, with scroll-linked reveal and
parallax. The hero entrance now stages its headline, drape, copy, and CTAs as a
single silk-like sequence.

Product photography, inventory, and pricing are editorial placeholders.
Measurements and product variants were not supplied, so the sample listings do
not invent those values. No payment, order, shipping, newsletter, authentication,
or server persistence is connected.

The production build passes, including Next lint and TypeScript checks. Mobile
Lighthouse measured 90 Performance, 100 Accessibility, 2.7 s LCP, 300 ms TBT,
and 0 CLS in the final recorded run. Local headless Chrome verified desktop
layout, add-to-bag and quantity updates, cart subtotal, wishlist persistence,
quick view, size guidance, search results,
mobile width and drawer geometry, and the reduced-motion fallback. No runtime
exceptions were observed. Chrome DevTools MCP, Playwright MCP, Browser MCP, and
Context7 are not connected in this session, so these checks used local Chrome
through its DevTools protocol.

## Phase 7 review artifacts

- [Desktop home, 1440 × 1000](screenshots/desktop-home.png)
- [Mobile home, 390 × 844](screenshots/mobile-home.png)
- [Mobile Quick View, 390 × 844](screenshots/mobile-quick-view.png)
- [Deployed desktop home](screenshots/deployed-desktop.png)
- [Deployed mobile home](screenshots/deployed-mobile.png)
- [Deployed mobile Quick View](screenshots/deployed-mobile-quick-view.png)
- [Refined deployed desktop](screenshots/premium-refinement-deployed-desktop.png)
- [Refined deployed mobile](screenshots/premium-refinement-deployed-mobile.png)
- [Refined arrivals motif](screenshots/premium-refinement-deployed-arrivals.png)
- [Reduced-motion fallback](screenshots/premium-refinement-reduced-motion.png)

Playwright ran against local headless Chrome: desktop and mobile pages loaded,
both viewports had no horizontal overflow, Quick View stayed inside the mobile
viewport, and the run reported no page errors. Playwright was installed in a
temporary directory for this pass; it is not a project dependency. The requested
Playwright MCP and Chrome DevTools MCP remain unavailable.

The final simplicity audit kept the image based textile motion, motif texture,
carousel, and product actions because each supports product discovery or the
heritage story. R3F/GLB and backend services remain out of the build: current
assets are layered photography and there is no connected order, account, or
newsletter service. Existing commerce components and the shared motion engine
cover the page without adding another section library.

Temporary preview: [aurelia-sarees-teal.vercel.app](https://aurelia-sarees-teal.vercel.app/).
Vercel CLI built and served it successfully (HTTP 200) and Playwright verified
desktop, mobile, and mobile Quick View with zero page errors. The preview is in
Vercel's temporary unclaimed scope; no authenticated personal/team project is
linked in this workspace. The `.vercelignore` file keeps PRDs, screenshots, and
planning notes out of later deployment uploads. No Neon/Supabase service is
currently required.
