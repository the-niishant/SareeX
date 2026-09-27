"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

export function useSilkReveal(
  scopeRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useGSAP(
    () => {
      if (!enabled || !scopeRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const groups = scopeRef.current.querySelectorAll<HTMLElement>("[data-silk-group]");
      groups.forEach((group) => {
        const items = Array.from(group.querySelectorAll<HTMLElement>("[data-silk-item]"));
        if (!items.length) return;

        gsap.fromTo(
          items,
          { opacity: 0, y: 60, skewY: 4 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1.1,
            stagger: 0.08,
            ease: "power4.out",
            onStart: () => gsap.set(items, { willChange: "transform, opacity" }),
            onComplete: () => gsap.set(items, { clearProps: "willChange" }),
            scrollTrigger: {
              trigger: group,
              start: "top 86%",
              once: true,
            },
          },
        );
      });
    },
    { scope: scopeRef, dependencies: [enabled], revertOnUpdate: true },
  );
}
