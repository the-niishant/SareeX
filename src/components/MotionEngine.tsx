"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MutableRefObject, RefObject } from "react";
import type Lenis from "lenis";
import { useSilkReveal } from "@/hooks/useSilkReveal";
import { sarees } from "@/lib/sarees";

const clamp = gsap.utils.clamp;

type MotionEngineProps = {
  scopeRef: RefObject<HTMLDivElement | null>;
  prefersReducedMotion: boolean;
  lenisRef: MutableRefObject<Lenis | null>;
  velocityRef: MutableRefObject<number>;
};

export function MotionEngine({
  scopeRef,
  prefersReducedMotion,
  lenisRef,
  velocityRef,
}: MotionEngineProps) {
  useSilkReveal(scopeRef, !prefersReducedMotion);

  useGSAP(
    (_context) => {
      const root = scopeRef.current;
      if (!root || prefersReducedMotion) return;
      gsap.registerPlugin(ScrollTrigger, Flip);
      root.classList.add("motion-enabled");
      const manualCleanups: Array<() => void> = [];
      const media = gsap.matchMedia(root);

      const header = root.querySelector<HTMLElement>("#site-header");
      const hero = root.querySelector<HTMLElement>(".hero");
      const heroMedia = root.querySelector<HTMLElement>("[data-hero-media]");
      const heroPattern = root.querySelector<HTMLElement>(".hero-pattern");
      const heroContent = root.querySelector<HTMLElement>(".hero-content");
      const floatingSaree = root.querySelector<HTMLElement>("[data-floating-saree]");
      const showcase = root.querySelector<HTMLElement>(".showcase-section");
      const marquee = root.querySelector<HTMLElement>("[data-marquee-track]");
      const fabricLoops = Array.from(root.querySelectorAll<HTMLElement>("[data-fabric-layer]"), (layer, index) =>
        gsap.timeline({ repeat: -1, yoyo: true, paused: true, delay: index * 0.18 }).to(layer, {
          x: index === 0 ? -5 : 6,
          y: index === 0 ? -7 : 5,
          rotationZ: index === 0 ? -1.5 : 2,
          duration: 3 + index * 0.7,
          ease: "sine.inOut",
        }),
      );
      const floatLoop = floatingSaree
        ? gsap.timeline({ repeat: -1, yoyo: true, paused: true }).to(floatingSaree, {
            y: -12,
            rotationZ: 3,
            scale: 1.02,
            duration: 3.4,
            ease: "sine.inOut",
          })
        : null;

      if (hero) {
        const lines = hero.querySelectorAll<HTMLElement>(".hero-line-inner");
        const eyebrow = hero.querySelector<HTMLElement>(".hero-eyebrow");
        const copy = hero.querySelector<HTMLElement>(".hero-copy");
        const actions = Array.from(hero.querySelectorAll<HTMLElement>(".hero-actions > *"));
        const scrollLink = hero.querySelector<HTMLElement>(".hero-scroll");
        const sideNote = hero.querySelector<HTMLElement>(".hero-side-note");
        const entrance = gsap.timeline();

        if (eyebrow) {
          entrance.fromTo(eyebrow, { autoAlpha: 0, y: 14 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
          }, 0);
        }
        if (lines.length) {
          entrance.fromTo(lines, { yPercent: 110 }, {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out",
            onStart: () => gsap.set(lines, { willChange: "transform" }),
            onComplete: () => gsap.set(lines, { clearProps: "willChange" }),
          }, 0.08);
        }
        if (floatingSaree) {
          entrance.fromTo(floatingSaree, { autoAlpha: 0, rotationY: -8 }, {
            autoAlpha: 1,
            rotationY: 0,
            duration: 1.2,
            ease: "power3.out",
          }, 0.24);
        }
        if (heroPattern) {
          entrance.fromTo(heroPattern, { opacity: 0 }, {
            opacity: 0.08,
            duration: 1.6,
            ease: "power3.out",
          }, 0.18);
        }
        if (copy) {
          entrance.fromTo(copy, { autoAlpha: 0, y: 20 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }, 0.66);
        }
        if (actions.length) {
          entrance.fromTo(actions, { autoAlpha: 0, y: 16 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.74,
            stagger: 0.1,
            ease: "power3.out",
          }, 0.82);
        }
        if (scrollLink) {
          entrance.fromTo(scrollLink, { autoAlpha: 0, y: 10 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          }, 1.04);
        }
        if (sideNote) {
          entrance.fromTo(sideNote, { autoAlpha: 0 }, {
            autoAlpha: 1,
            duration: 0.9,
            ease: "power2.out",
          }, 0.6);
        }
      }

      if (header) {
        ScrollTrigger.create({
          trigger: root,
          start: 0,
          end: "max",
          onUpdate: (self) => header.classList.toggle("is-scrolled", self.scroll() > 40),
        });
      }

      const kineticImages = root.querySelectorAll<HTMLElement>(".kinetic-image");
      const kineticCleanups: Array<() => void> = [];
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const image = entry.target as HTMLElement;
            const wrapper = image.parentElement;
            observer.unobserve(image);
            if (!wrapper) return;

            const imageContext = gsap.context(() => {
              gsap.fromTo(
                image,
                { scale: 1.15 },
                {
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: wrapper,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                  },
                },
              );
            }, wrapper);
            kineticCleanups.push(() => imageContext.revert());
          });
        }, { rootMargin: "120% 0px" });
        kineticImages.forEach((image) => observer.observe(image));
        manualCleanups.push(() => {
          observer.disconnect();
          kineticCleanups.forEach((cleanup) => cleanup());
        });
      }

      if (marquee) {
        const marqueeLoop = gsap.to(marquee, {
          xPercent: -50,
          duration: 42,
          ease: "none",
          repeat: -1,
        });
        gsap.set(marquee, { willChange: "transform" });
        let easedSpeed = 1;
        const adjustMotionSpeed = () => {
          const targetSpeed = 1 + clamp(0, 1.1, Math.abs(velocityRef.current) / 1500);
          easedSpeed += (targetSpeed - easedSpeed) * 0.08;
          marqueeLoop.timeScale(easedSpeed);
          if (floatLoop) {
            const floatSpeed = 1 + clamp(0, 0.45, Math.abs(velocityRef.current) / 1800);
            floatLoop.timeScale(floatSpeed);
            fabricLoops.forEach((loop) => loop.timeScale(floatSpeed));
          }
        };
        gsap.ticker.add(adjustMotionSpeed);
        manualCleanups.push(() => {
          gsap.ticker.remove(adjustMotionSpeed);
          gsap.set(marquee, { clearProps: "willChange" });
        });
      }

      if (floatLoop && hero) {
        ScrollTrigger.create({
          trigger: hero,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (self.isActive) {
              floatLoop.play();
              fabricLoops.forEach((loop) => loop.play());
            } else {
              floatLoop.pause();
              fabricLoops.forEach((loop) => loop.pause());
            }
          },
        });
      }

      root.querySelectorAll<HTMLElement>(".section-pattern").forEach((pattern) => {
        const section = pattern.closest("section");
        if (!section) return;
        const requestedOpacity = Number.parseFloat(
          getComputedStyle(pattern).getPropertyValue("--pattern-opacity"),
        );
        const finalOpacity = Number.isFinite(requestedOpacity) ? requestedOpacity : 0.075;
        gsap.fromTo(pattern, {
          y: 24,
          scale: 0.97,
          rotation: -1.5,
          opacity: 0,
        }, {
          y: -120,
          scale: 1,
          rotation: 0,
          opacity: finalOpacity,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onToggle: (self) => pattern.classList.toggle("is-animating", self.isActive),
          },
        });
        manualCleanups.push(() => pattern.classList.remove("is-animating"));
      });

      if (showcase) {
        const particles = showcase.querySelectorAll<HTMLElement>(".zari-particle");
        gsap.to(particles, {
          y: (index) => -24 - (index % 8) * 12,
          x: (index) => (index % 2 ? 1 : -1) * (8 + (index % 5) * 4),
          ease: "none",
          scrollTrigger: {
            trigger: showcase,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      media.add("(min-width: 901px)", () => {
        const mediaCleanups: Array<() => void> = [];
        if (hero && heroMedia && heroContent) {
          const heroTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: () => `+=${window.innerHeight}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              onToggle: (self) => hero.classList.toggle("is-animating", self.isActive),
            },
          });
          heroTimeline
            .fromTo(heroMedia, { scale: 1, borderRadius: "0px" }, { scale: 0.92, borderRadius: "28px", ease: "none" }, 0)
            .to(heroContent, { y: -90, ease: "none" }, 0);
          if (heroPattern) heroTimeline.to(heroPattern, { y: -120, rotation: -3, scale: 1.04, ease: "none" }, 0);
          mediaCleanups.push(() => hero.classList.remove("is-animating"));
        }

        if (showcase) {
          const cards = Array.from(showcase.querySelectorAll<HTMLElement>("[data-carousel-card]"));
          const dots = Array.from(showcase.querySelectorAll<HTMLAnchorElement>("[data-carousel-dot]"));
          const indexNode = showcase.querySelector<HTMLElement>("#showcase-index");
          const nameNode = showcase.querySelector<HTMLElement>("#showcase-active-name");
          const track = showcase.querySelector<HTMLElement>(".showcase-track");
          const activeSarees = sarees.slice(0, cards.length);
          let currentIndex = -1;
          let carouselTrigger: ScrollTrigger | undefined;
          const section = showcase;

          const renderArc = (progress: number) => {
            const last = Math.max(cards.length - 1, 1);
            const center = clamp(0, last, progress * last);
            const nearest = Math.round(center);
            const radius = 1400;
            const angleStep = 0.15;

            cards.forEach((card, index) => {
              const offset = index - center;
              const distance = Math.abs(offset);
              const angle = offset * angleStep;
              let scale = 0.82;
              let blur = 4;
              let opacity = 0.5;
              if (distance < 1) {
                scale = 1.05 - distance * 0.15;
                blur = distance * 2;
                opacity = 1 - distance * 0.25;
              } else if (distance < 2) {
                scale = 0.9 - (distance - 1) * 0.08;
                blur = 2 + (distance - 1) * 2;
                opacity = 0.75 - (distance - 1) * 0.25;
              }
              const hidden = distance >= 3;
              card.inert = hidden;
              card.setAttribute("aria-hidden", String(hidden));
              card.dataset.focused = String(distance < 0.5);
              gsap.set(card, {
                x: radius * Math.sin(angle),
                y: radius * (1 - Math.cos(angle)),
                xPercent: -50,
                yPercent: -50,
                scale,
                rotateY: clamp(-8, 8, -offset * 6),
                filter: `blur(${blur}px)`,
                autoAlpha: hidden ? 0 : opacity,
                zIndex: Math.round(100 - distance * 10),
                pointerEvents: hidden ? "none" : "auto",
              });
            });

            if (nearest !== currentIndex && activeSarees[nearest]) {
              const nextSaree = activeSarees[nearest];
              const flipTargets = [indexNode, nameNode].filter((node): node is HTMLElement => Boolean(node));
              const state = flipTargets.length ? Flip.getState(flipTargets) : null;
              currentIndex = nearest;
              if (indexNode) indexNode.textContent = String(nearest + 1).padStart(2, "0");
              if (nameNode) nameNode.textContent = nextSaree.name;
              if (state) Flip.from(state, { duration: 0.45, ease: "power4.out", absolute: false, fade: true });
              gsap.to(section, { "--accent": nextSaree.accentColor, duration: 0.65, ease: "power3.out", overwrite: "auto" });
              dots.forEach((dot, index) => dot.classList.toggle("is-current", index === nearest));
            }
          };

          const scrollState = { progress: 0 };
          section.classList.add("is-pinned");
          const carouselTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${window.innerHeight * 6}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              onToggle: (self) => section.classList.toggle("is-animating", self.isActive),
              onRefresh: (self) => renderArc(self.progress),
            },
          });
          carouselTimeline.to(scrollState, {
            progress: 1,
            duration: 1,
            ease: "none",
            onUpdate: () => renderArc(scrollState.progress),
          });
          carouselTrigger = carouselTimeline.scrollTrigger;
          renderArc(0);

          const onDotClick = (event: MouseEvent) => {
            const dot = event.currentTarget as HTMLAnchorElement;
            const index = Number(dot.dataset.carouselIndex ?? 0);
            if (!carouselTrigger || !lenisRef.current || !Number.isFinite(index)) return;
            event.preventDefault();
            const progress = index / Math.max(cards.length - 1, 1);
            const target = carouselTrigger.start + (carouselTrigger.end - carouselTrigger.start) * progress;
            lenisRef.current.scrollTo(target, { duration: 1.1 });
          };
          dots.forEach((dot) => dot.addEventListener("click", onDotClick));

          if (track) {
            mediaCleanups.push(() => {
              section.classList.remove("is-pinned", "is-animating");
              dots.forEach((dot) => dot.removeEventListener("click", onDotClick));
              cards.forEach((card) => {
                card.inert = false;
                card.removeAttribute("aria-hidden");
                delete card.dataset.focused;
              });
              gsap.set(section, { clearProps: "--accent" });
            });
          }
        }

        const craft = root.querySelector<HTMLElement>(".craft-section");
        if (craft) {
          const image = craft.querySelector<HTMLElement>(".craft-image-wrap");
          const copy = craft.querySelector<HTMLElement>(".craft-copy-inner");
          const counters = Array.from(craft.querySelectorAll<HTMLElement>("[data-count-to]"));
          craft.classList.add("is-pinned");
          const craftTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: craft,
              start: "top top",
              end: () => `+=${window.innerHeight * 1.4}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              onToggle: (self) => craft.classList.toggle("is-animating", self.isActive),
            },
          });
          if (image) craftTimeline.to(image, { y: -54, ease: "none" }, 0);
          if (copy) craftTimeline.to(copy, { y: -38, ease: "none" }, 0);
          counters.forEach((counter) => {
            const target = Number(counter.dataset.countTo ?? 0);
            const value = { current: 0 };
            craftTimeline.fromTo(value, { current: 0 }, {
              current: target,
              duration: 0.65,
              ease: "none",
              onUpdate: () => { counter.textContent = String(Math.round(value.current)); },
            }, 0.2);
          });
          mediaCleanups.push(() => craft.classList.remove("is-pinned", "is-animating"));
        }

        const lookbook = root.querySelector<HTMLElement>(".lookbook-section");
        const lookbookTrack = lookbook?.querySelector<HTMLElement>(".lookbook-track");
        const progressLine = lookbook?.querySelector<HTMLElement>(".lookbook-progress span");
        if (lookbook && lookbookTrack) {
          lookbook.classList.add("is-pinned");
          const distance = () => Math.max(0, lookbookTrack.scrollWidth - lookbookTrack.clientWidth);
          const gallery = gsap.to(lookbookTrack, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: lookbook,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onToggle: (self) => lookbook.classList.toggle("is-animating", self.isActive),
              onUpdate: (self) => progressLine && gsap.set(progressLine, { scaleX: self.progress }),
            },
          });
          void gallery;
          mediaCleanups.push(() => lookbook.classList.remove("is-pinned", "is-animating"));
        }
        return () => mediaCleanups.forEach((cleanup) => cleanup());
      });

      media.add("(max-width: 900px)", () => {
        if (!hero || !heroMedia || !heroContent) return;
        const mobileHero = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onToggle: (self) => hero.classList.toggle("is-animating", self.isActive),
          },
        });
        mobileHero
          .fromTo(heroMedia, { scale: 1, borderRadius: "0px" }, { scale: 0.96, borderRadius: "18px", ease: "none" }, 0)
          .to(heroContent, { y: -48, ease: "none" }, 0);
        if (heroPattern) mobileHero.to(heroPattern, { y: -80, rotation: -2, scale: 1.025, ease: "none" }, 0);
        return () => hero.classList.remove("is-animating");
      });

      return () => {
        media.revert();
        manualCleanups.forEach((cleanup) => cleanup());
        floatLoop?.kill();
        fabricLoops.forEach((loop) => loop.kill());
        root.classList.remove("motion-enabled");
        header?.classList.remove("is-scrolled");
      };
    },
    {
      scope: scopeRef,
      dependencies: [prefersReducedMotion, lenisRef, velocityRef],
      revertOnUpdate: true,
    },
  );

  return null;
}
