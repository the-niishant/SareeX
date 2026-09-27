# PRD: AURELIA SAREES — Tech Stack and Build Phases

- **File:** `SareeX/Prd/06-tech-stack-and-build-phases.md`
- **PDF 2 phase:** Phase 02 — Stack; Phase 04 — Build; Phase 06 — Backend; Phase 07 — Ship
- **Owner:** Product Architect + Frontend Architect
- **Status:** Draft for review

## Purpose

Lock the planned application stack, setup manifest, available-tool requirements, three-round build sequence, backend boundary, verification approach, deployment path, and final definition of done. This is the execution PRD; it does not authorize implementation or deployment in this response.

## Scope

### In scope

- Stack selection and conditional dependencies.
- Required contents of `premium-stack-setup.txt`.
- Context7, browser, Chrome DevTools, Playwright, and Git tool requirements.
- Round 1 Structure, Round 2 Motion, and Round 3 Polish gates.
- Backend choice only if newsletter, waitlist, auth, or orders require persistence.
- Vercel deployment and final quality review.

### Out of scope

- Application code, package installation, account creation, credential setup, deployment, or payment configuration.
- Production catalog administration, order management, and payment processing unless approved as a separate backend scope.
- Spring Boot; this storefront does not require enterprise backend logic.

## Dependencies

- `00-overview.md` for product vision, priorities, and project-wide constraints.
- `01-design-system.md` through `05-commerce-and-components.md` for the design, section, animation, and commerce requirements to implement.
- The supplied project capabilities inventory for the stated tools and existing commerce features.

## Stack lock

Use the following baseline for this project:

| Area | Locked choice | Boundary |
|---|---|---|
| Framework | Next.js 14 App Router | The Vite alternative in the general capabilities brief is not selected for this PRD. Use TypeScript and a `src/` directory. |
| Styling | Tailwind CSS with AURELIA design tokens | Use semantic tokens and thin hairlines from PRD 01. |
| Motion | GSAP + ScrollTrigger + Flip; Lenis smooth scroll | ScrollTrigger drives pinned sections. Pinned sections use `scrub: 1`. Framer Motion is limited to micro-interactions. |
| Fonts | Fraunces + Manrope through `next/font` | See PRD 01. |
| Icons | Lucide React inline SVG | No icon fonts. |
| Images | `next/image` | `priority` only for the hero image/poster; lazy-load the rest. |
| Components | shadcn/ui primitives; at most 2–3 restyled premium sections from 21st.dev; selected Magic UI effects where approved | See PRD 05 for component sourcing and restyling boundaries. |
| 3D | React Three Fiber, drei, and postprocessing only if the hero’s 3D route is approved | Otherwise use layered image assets and do not install Three.js packages. |
| Forms | React Hook Form + Zod + resolvers only if persistence/validation needs are confirmed | Do not install for an unvalidated static form. |
| Data | No database for client-only cart/wishlist | Neon for a contact/newsletter/waitlist-only API; Supabase if auth, storage, or orders are approved. |
| Deployment | Vercel for the Next.js frontend | Deployment occurs only after Phase 07 acceptance. |

The Next.js 14 App Router is documented as a file-system router with server components by default and client components for browser-only behavior; keep Lenis and GSAP in client-only boundaries. [Next.js 14 App Router documentation](https://nextjs.org/docs/14/app) Vercel is the target managed deployment for the selected Next.js app. [Vercel’s Next.js deployment documentation](https://vercel.com/docs/frameworks/full-stack/nextjs)

## `premium-stack-setup.txt` requirements

Create `premium-stack-setup.txt` in the project root during Phase 02. It must record the exact install command, package purpose, and whether a dependency is required now or conditional. Do not install the optional 3D or form groups before the relevant product decision is made.

| Command / package group | Purpose | Install condition |
|---|---|---|
| `npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"` | Scaffold the TypeScript App Router app with Tailwind, ESLint, `src/`, and the `@/*` alias | Initial setup, after resolving the version question below |
| `npm i gsap @studio-freight/lenis lucide-react clsx tailwind-merge` | GSAP motion, Lenis scroll, Lucide icons, conditional class composition, and Tailwind class merging | Base frontend, after confirming the Lenis package name |
| `npm i framer-motion` | Small component-level micro-interactions | Base frontend; do not use for scroll-pinned scenes |
| `npx shadcn@latest init` | Configure shadcn/ui primitives for the selected framework and theme | Base component setup |
| `npx shadcn@latest add button card dialog drawer input form toast tooltip` | Install the named accessible UI primitives used by PRD 05 | Add only components used by the approved scope |
| `npm i three @react-three/fiber @react-three/drei @react-three/postprocessing` | Three.js rendering, React bindings, helpers, and postprocessing | Only if the 3D hero route is approved |
| `npm i -D @types/three` | TypeScript declarations for Three.js | Only with the R3F/Three.js group |
| `npm i -D gltf-pipeline @gltf-transform/cli` | Optimize and compress 3D assets | Only if GLB assets are approved |
| `npm i react-hook-form zod @hookform/resolvers` | Client form state and validation | Only if a newsletter/contact/waitlist form needs validated submission |
| `npm i -D prettier prettier-plugin-tailwindcss eslint-config-prettier` | Consistent formatting and ESLint/Prettier compatibility | Base developer experience |

For any shipped GLB, include and use this compression command:

```bash
gltf-transform draco model.glb model.draco.glb
```

The setup file must include the exact synchronization snippet from PRD 04:

```ts
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
// after mount:
ScrollTrigger.refresh();
```

The setup file must also list the MCP/browser tools below, their purpose, and the connection state verified in the active build environment. Do not claim a tool is installed or connected without checking it.

### Version and package validation

- The stack requirement is Next.js 14, while the scaffold command uses `create-next-app@latest`. `@latest` does not pin the major version; choose a pinned scaffold command or establish a verified Next.js 14 package lock before installation.
- The project brief specifies `@studio-freight/lenis`. Current upstream Lenis installation instructions use the `lenis` package name. Confirm whether the project should retain the requested scoped package or use the current upstream package before creating the setup file. [Lenis upstream installation](https://github.com/darkroomengineering/lenis/blob/main/README.md)
- Keep the requested Next.js 14 baseline unless the product owner explicitly changes it. Do not silently upgrade the framework to follow a moving `latest` tag.

## MCP and browser tools

The project capabilities inventory names these tools as required for implementation. Confirm each is available in the active environment before depending on it:

| Tool | Purpose |
|---|---|
| Context7 | Retrieve current library documentation for Next.js, GSAP, R3F, and Lenis |
| Chrome DevTools | Inspect console/runtime behavior, responsive layouts, pin geometry, performance, and accessibility issues |
| Playwright | Navigate the local site, capture desktop/mobile screenshots, and exercise scroll and commerce interactions |
| Browser MCP | Automate browser tabs and preview/back/forward navigation during review |
| Git MCP | Inspect status and perform the authorized branch/commit workflow |

If a listed MCP is unavailable, record that in `premium-stack-setup.txt` and use the closest available local verification method. Do not state that browser verification occurred if it did not.

## Three-round build plan

### Round 1 — Structure (PDF 2 Phase 04)

**Build:** Semantic section structure, responsive layout, content order, typography hierarchy, product-card slots, navigation, cart/wishlist controls, and media aspect-ratio reservations. Do not add scroll animation, parallax, pinned scenes, or automatic motion in this round.

**Review gate:** Confirm all sections are present, links and controls are discoverable, mobile structure is readable, and headings/landmarks have a logical order. Stop for review before Round 2.

### Round 2 — Motion (PDF 2 Phase 04)

**Build:** Lenis + GSAP synchronization; hero pin and image frame; circular carousel; silk reveals; motif parallax; floating saree only if the asset route is approved; lookbook horizontal movement; and the Instagram marquee. Every pinned section uses `scrub: 1`. Add the reduced-motion static layout alongside each animated treatment, not as a later patch.

**Review gate:** Use Chrome DevTools and Playwright to verify that every intended pinned section pins, ScrollTriggers fire at the correct boundaries, card/navigation interactions stay synchronized, mobile does not break, and `prefers-reduced-motion` removes pins/scrubs and keeps all content usable. Capture desktop and mobile screenshots. Stop for review before Round 3.

### Round 3 — Polish (PDF 2 Phase 04)

**Build:** Refine spacing, color contrast, hover/focus states, responsive drawer/dialog behavior, loading/empty/toast states, and restrained micro-interactions. Audit images, font loading, layout shift, dynamic imports, and animation cleanup.

**Review gate:** Run the Lighthouse pass and final image/performance audit. Fix the issues that prevent the acceptance targets, then complete the Phase 07 ship checklist.

## Backend and deployment boundary

- **Static/client-only shopping experience:** Keep cart and wishlist in client-side state; no database is required for these interactions.
- **Newsletter/contact/waitlist only:** Use Neon behind a Next.js API route if submitted addresses must persist. Store only the fields approved for the form.
- **Auth, storage, or order records:** Use Supabase only if these requirements are approved for launch.
- **Payments:** Razorpay remains a later checkout integration. Do not collect payment details or imply transaction success until the payment backend and flow are approved.
- **Frontend hosting:** Deploy the Next.js app to Vercel after the definition of done is met. Next.js 14 supports managed deployment and self-hosting; this project selects Vercel as its target. [Next.js 14 deployment documentation](https://nextjs.org/docs/14/app/building-your-application/deploying)
- Do not wire Spring Boot into this one-page storefront.

## Verification matrix

| Round | Chrome DevTools | Playwright / Browser | Pass condition |
|---|---|---|---|
| Structure | Inspect console, responsive viewport, semantics, image dimensions | Navigate sections and capture desktop/mobile screenshots | Sections and controls are usable; no horizontal overflow or reserved-media layout shift |
| Motion | Inspect pin positions, ScrollTrigger markers during development, rendering and console | Scroll through every pinned section; exercise dots, navbar, drawer, and mobile layout | Every intended pin/trigger fires; motion stays continuous; mobile interactions remain usable |
| Reduced motion | Emulate `prefers-reduced-motion` and inspect layout/runtime | Repeat the section and commerce flows with reduced motion enabled | No pin, scrub, loop, or motion-only content; all controls and content remain available |
| Polish / Ship | Review performance, accessibility, network, and image loading | Capture final desktop/mobile screenshots and complete interaction review | Lighthouse Performance ≥ 85 mobile and Accessibility ≥ 95; no critical interaction or accessibility defects |

Remove development ScrollTrigger markers before ship. Keep screenshot artifacts with the project review notes.

## Definition of done

- [ ] All seven PRDs and `design-brief.md` are present and reviewed.
- [ ] `premium-stack-setup.txt` lists every command, package purpose, conditional dependency, Lenis snippet, Draco command, and verified MCP/browser-tool state.
- [ ] The project follows Next.js 14 App Router + TypeScript + Tailwind unless an explicit product decision changes the stack.
- [ ] The page is split into section components and has no monolithic 1000-line component.
- [ ] `LenisProvider` and motion hooks have client-only lifecycle and cleanup behavior.
- [ ] Every pinned section uses `scrub: 1`; reduced-motion mode disables pins/scrubs and presents static usable content.
- [ ] 3D is included only if approved; DPR is clamped to `[1, 2]` with a lower mobile cap; each GLB is Draco-compressed.
- [ ] `next/image` is used and priority is reserved for hero media; other imagery is lazy-loaded and has reserved dimensions.
- [ ] Semantic landmarks, alt text, keyboard-accessible drawers/dialogs, visible focus, and contrast requirements are met.
- [ ] Cart/wishlist behavior works at the client layer; payment/order claims are absent unless backend work is approved and implemented.
- [ ] Desktop and mobile Playwright/browser screenshots are reviewed; pinned sections and reduced-motion paths are verified.
- [ ] Lighthouse Performance is at least 85 on mobile and Accessibility is at least 95.
- [ ] Final simplicity review removes decorative motion that does not serve the product story.
- [ ] Deployment target is Vercel; any required Neon/Supabase environment is configured for the approved backend scope.

## Open questions

1. Should `create-next-app` be pinned to a Next.js 14 release instead of using `@latest`?
2. Should the install manifest retain `@studio-freight/lenis` exactly as specified, or use upstream’s current `lenis` package name?
3. Is the floating-saree R3F route approved? This determines whether Three.js, R3F, drei, postprocessing, type definitions, and GLB tooling are installed.
4. Does the newsletter form require persisted submissions at launch? If yes, confirm fields, consent copy, and Neon ownership.
5. Are authentication or order records in launch scope? If yes, confirm the Supabase requirements and payment integration boundary.
6. Which Context7, Chrome DevTools, Playwright, Browser, and Git MCP connections are available in the implementation environment?
7. What domain, production assets, analytics, privacy/cookie requirements, and deployment credentials will be supplied for Phase 07?
8. Who approves the Round 1 structure, Round 2 motion, and Round 3 polish gates?

## References

- **PDF 1:** “Scroll Animation & 3D Website — AI Build-Prompt Library v2”; Prompt 08 is the storefront template; Prompt 02 governs scroll-driven 3D/movement; Prompt 03 governs pinned product swaps; Prompt 04 applies only if a canvas sequence is selected; Prompt 05 applies only if a curve-follow rig is selected; Prompt 06 applies only if a cinematic camera move is selected.
- **PDF 2:** “The Premium Website Workflow”; this PRD covers Phase 02 — Stack, Phase 04 — Build in three rounds, Phase 06 — Backend, and Phase 07 — Ship.
- **Official documentation:** [Next.js 14 App Router](https://nextjs.org/docs/14/app), [Next.js 14 deployment](https://nextjs.org/docs/14/app/building-your-application/deploying), [Vercel Next.js deployment](https://vercel.com/docs/frameworks/full-stack/nextjs), and [Lenis upstream installation](https://github.com/darkroomengineering/lenis/blob/main/README.md).
