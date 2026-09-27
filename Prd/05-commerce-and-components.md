# PRD: AURELIA SAREES — Commerce and Components

- **File:** `SareeX/Prd/05-commerce-and-components.md`
- **PDF 2 phase:** Phase 05 — Components; Phase 06 — Backend boundary
- **Owner:** Product Architect + Frontend Architect
- **Status:** Draft for review

## Purpose

Define the shared saree product model and the client-side shopping interactions used throughout the storefront: product cards, cart, wishlist, size guide, quick view, and feedback. Specify how existing UI libraries can supply accessible primitives and solved sections without weakening the AURELIA design system.

## Scope

### In scope

- Typed `Saree` product data shape.
- Shared client-side cart state, cart badge, and slide-in cart drawer.
- Wishlist toggle and persistence.
- Grid, carousel, and lookbook product-card variants.
- Size guide, quick-view drawer, toast feedback, and empty states.
- Component sourcing and restyling boundaries for shadcn/ui, 21st.dev, and Magic UI.

### Out of scope

- Real order creation, inventory reservation, account sync, taxes, shipping calculations, and payment processing.
- Production Razorpay integration. The Checkout action is an integration boundary for a later backend phase.
- A product information management system or admin catalog.
- Pricing, testimonial, or other page sections not present in the approved site scope.

## Dependencies

- `00-overview.md` for brand, scope, and success measures.
- `01-design-system.md` for palette, typography, spacing, contrast, and component tokens.
- `02-hero-landing.md` for navbar cart and wishlist controls.
- `03-saree-circular-carousel.md` for the carousel card variant and featured product fields.
- `06-tech-stack-and-build-phases.md` for package, service, and backend decisions.

## Detailed specification

### 1. Saree product model

The storefront consumes a typed product record with these fields:

| Field | Type | Requirement |
|---|---|---|
| `id` | string | Stable unique product identifier |
| `name` | string | Product display name |
| `images` | array of image references | At least one image; a second image supports the product-card crossfade when available |
| `price` | number | Current product price in the approved currency |
| `mrp` | number | Maximum retail price / comparison price when supplied |
| `fabric` | string | Fabric name shown in detail and quick view |
| `occasion` | string | Approved occasion/category value |
| `sizes` | string array | Available size values; exact selection behavior is an open question |
| `colors` | string array | Available color labels or variants |
| `accentColor` | string | Product accent value consumed by the showcase background transition in PRD 03 |

The exact currency, sale-price semantics, image dimensions, product inventory, size options, and allowed `accentColor` values must be supplied or approved before implementation. Do not invent product data. Every card variant reads from the same product record so price, name, image, and availability remain consistent.

### 2. Cart state and badge

- A client-side cart provider is the single source of truth for cart items and quantities across the page.
- `Add to Bag` increments the quantity of the matching product in the cart. If products require size or color variants, identify a cart line by product plus selected variant so separate variants do not merge.
- Cart badge count is the sum of item quantities, not the number of distinct products. Every add, remove, or quantity change updates the badge immediately.
- The navbar badge uses the same cart state specified in PRD 02.
- Cart state remains available across storefront sections and route navigation. Persistence across a full page reload is not committed in this PRD; see Open Questions.

### 3. Cart drawer

The cart drawer opens from the cart control and uses the current shadcn/ui drawer or sheet primitive configured by the project. Keep its visual treatment within PRD 01 tokens.

| Area | Requirement |
|---|---|
| Surface | Side drawer on wide screens; responsive drawer treatment on narrow screens |
| Backdrop | Soft backdrop blur and dimming; clicking the backdrop closes the drawer unless an active flow requires confirmation |
| Header | Accessible title, item count, and close control |
| Item list | Product image, name, selected variants where applicable, unit price, quantity stepper, and remove action |
| Quantity | Stepper decrements to a minimum of one; remove action deletes the cart line |
| Subtotal | Sum of current unit prices × quantities; label as subtotal, not final payable total |
| Checkout | Champagne-gold `Checkout` pill marks the future Razorpay handoff; do not imply a successful payment or collect payment details in this PRD |
| Empty state | Clear message and `Continue shopping` action that closes the drawer and returns to the storefront |

Accessibility requirements: the drawer has an accessible title, manages focus while open, closes with Escape, and restores focus to the cart control when closed. Keep the item list independently scrollable while the subtotal and Checkout action remain available. Confirm the selected shadcn base and its current drawer behavior during implementation; the library provides different base variants and responsive drawer patterns. [shadcn/ui Drawer documentation](https://ui.shadcn.com/docs/components/base/drawer)

### 4. Wishlist

- Each product has a wishlist toggle in the grid, carousel, lookbook, quick view, and navbar context where applicable.
- Toggle state is exposed with an accessible name and pressed/selected state.
- Persist wishlist IDs in localStorage for this client-only phase; fall back to in-memory state if browser storage is unavailable.
- Adding or removing a product produces a short toast message. Do not require sign-in.
- Account-level wishlist synchronization is outside this PRD and requires a later backend decision.

### 5. Product-card variants

All variants share the same product data, typography, image ratio, keyboard focus behavior, and commerce events. Product cards use 3:4 portraits, rounded-2xl corners, and a thin hairline from PRD 01.

| Variant | Placement | Required behavior |
|---|---|---|
| Grid card | New Arrivals and other product grids | Optional `NEW` pill; product name and price; image hover/focus zoom; second-image crossfade when available; slide-up `Add to Bag` bar |
| Carousel card | PRD 03 showcase | Arc-specific focus styling; product identity synced to active carousel item; product action remains usable without hover |
| Lookbook card | PRD 02/section lookbook flow | Editorial crop and product identity; links to approved product destination or quick view |

Interaction requirements:

- Pointer hover and keyboard focus expose the same `Add to Bag` action; touch users must not depend on hover.
- Image zoom, second-image crossfade, and add-bar reveal run as one restrained card interaction, not as independent attention effects.
- If only one product image exists, do not render an empty or broken crossfade state.
- New-arrival status is available as visible text, not color alone.
- Add-to-bag auto-increment and the cart badge use the shared cart provider.

### 6. Quick view, size guide, and feedback

#### Quick-view drawer

- Opens from a product card action and shows product image, name, price, fabric, occasion, available sizes/colors, wishlist toggle, and Add to Bag action.
- Use a responsive drawer primitive with an accessible title, close behavior, focus management, and an independently scrollable details region.
- If a product requires a variant selection before adding, communicate the required selection and validation next to the selector.

#### Size guide

- Open the size guide from product details or quick view.
- Use a labeled dialog with a close button, Escape support, and focus restoration.
- Content is an accessible table or structured list. Actual measurements and sizing copy are supplied by the business; do not invent them.

#### Toast system

- Provide feedback for added-to-bag, wishlist add/remove, and recoverable validation outcomes.
- Toast text is short, consistent with the action, announced to assistive technology, and dismissible.
- Use the toast implementation appropriate to the selected shadcn base. The installed component and its current docs are confirmed during implementation; see the official [shadcn/ui component catalog](https://ui.shadcn.com/docs/components).

### 7. Interaction motion specification

All transitions remain continuous and use the PRD 01 motion tokens. Under reduced motion, remove spatial movement and use immediate state updates.

| Interaction | Motion | PDF 1 reference |
|---|---|---|
| Product image hover/focus | Image scales from `1` toward `1.15` within its clipped frame; second image crossfades in when available | Prompt 08, e-commerce behavior |
| Add-to-bag bar | Bar moves upward into view while fading in; reverse on pointer leave or focus exit; use the shared `0.6s` / `power3.out` transition token | Prompt 08, e-commerce behavior |
| Cart drawer | Slides from its responsive edge with backdrop blur/dimming; close reverses smoothly; use shared motion tokens | Prompt 08, e-commerce behavior |
| Quick-view drawer and size-guide dialog | Enter and exit continuously with no hard cut; reduce to immediate state change under reduced motion | Prompt 08 storefront component behavior |
| Cart/wishlist toast | Brief opacity/position transition consistent with the shared motion tokens; must not block the next action | Prompt 08, e-commerce feedback behavior |
| Carousel-card product action | Follows the active-card interaction in PRD 03 and remains readable at center focus | Prompt 03; Prompt 08, Section 2 |

Ken-Burns image movement from PRD 01 applies only where a section PRD assigns an editorial image reveal. Do not create a second competing zoom timeline on the same product image; use the card hover behavior as the interaction state.

### 8. Component sourcing and restyling

- **shadcn/ui:** Use as the base for dialog, drawer, input, form, toast, tooltip, card, and button primitives where needed. Preserve accessible titles, focus behavior, semantic states, and the project’s configured component base.
- **21st.dev:** Reuse and restyle no more than two or three premium sections across the site. Prioritize the already-required testimonials and footer. Do not add a pricing section just to use a library component. Preview and review the chosen component’s code, dependencies, color tokens, and visual fit before adoption. 21st.dev currently lists section categories including testimonials and footers; the individual selected components and install access must be confirmed. [21st.dev component categories](https://21st.dev/plans) and [footer components](https://21st.dev/community/components/explore/footer-components)
- **Magic UI:** Use only effects that fit the brand and already-required story, such as a marquee or particle treatment. Keep the default particle cap of 40 from PRD 04; configure or replace any component whose defaults exceed that budget. Apply reduced-motion behavior and remove any competing animation loop. [Magic UI Marquee](https://magicui.design/docs/components/marquee) and [Magic UI Particles](https://v3.magicui.design/docs/components/particles)
- Restyle all imported sections with AURELIA tokens, one approved accent policy, local typography, and the same spacing and radii. Do not ship raw registry styling.
- Inspect imported component files and dependencies before adoption. A registry component is a starting point, not a requirement to accept its defaults.

## Acceptance criteria

- [ ] The shared `Saree` model contains every required field and is used by all card variants.
- [ ] Add to Bag increments the matching cart line and immediately updates the shared cart badge.
- [ ] Variant selections, if required, are part of the cart line identity and are visible in the cart drawer.
- [ ] Cart drawer displays item rows, quantity steppers, remove actions, subtotal, and future Checkout handoff.
- [ ] Empty cart state provides a clear path back to shopping.
- [ ] Cart drawer and quick view are keyboard operable, have accessible titles, manage focus, and restore focus on close.
- [ ] Wishlist state persists in localStorage with an in-memory fallback and does not require sign-in.
- [ ] Grid, carousel, and lookbook card variants share product data and commerce behavior.
- [ ] Product image zoom, second-image crossfade, and add-bar reveal have reduced-motion fallbacks and cite PDF 1 Prompt 08 or Prompt 03.
- [ ] Size guide uses supplied measurements and does not invent sizing data.
- [ ] Toast messages announce cart and wishlist changes without blocking controls.
- [ ] Imported sections are limited to 2–3, restyled to PRD 01 tokens, and reviewed for dependencies and accessibility.
- [ ] No production payment processing is implied; Razorpay remains a later integration boundary.

## Open questions

1. What currency and price display rules should be used? Is `mrp` always a comparison price, and when should it be shown?
2. Are sarees one-size products, or must a size/color variant be selected before adding to bag?
3. Should cart contents persist across a page reload, or only across client-side navigation for the initial release?
4. Is a product-detail page in the first release, or should lookbook and quick-view actions stay within the landing page?
5. Should adding to bag open the drawer, show a toast only, or follow a user preference? This PRD assumes quantity and badge update with a toast.
6. What are the approved measurement table and size-guide copy?
7. Which specific testimonial/footer components and registry sources are approved for reuse? Confirm component availability and terms when selected.
8. What checkout destination should the Checkout pill use before Razorpay integration is ready?
9. What approved values can `accentColor` contain without conflicting with the one-accent rule in PRD 01?

## References

- **PDF 1:** “Scroll Animation & 3D Website — AI Build-Prompt Library v2”; Prompt 08 e-commerce behavior governs product-card hover, add-to-bag, drawer, and feedback patterns. Prompt 03 governs the carousel-card context.
- **PDF 2:** “The Premium Website Workflow”; Phase 05 — Components is primary. Phase 06 — Backend is limited to future payment/order integration boundaries.
- **Library references:** [shadcn/ui components](https://ui.shadcn.com/docs/components), [shadcn/ui Drawer](https://ui.shadcn.com/docs/components/base/drawer), [21st.dev](https://21st.dev/plans), [Magic UI Marquee](https://magicui.design/docs/components/marquee), [Magic UI Particles](https://v3.magicui.design/docs/components/particles).
