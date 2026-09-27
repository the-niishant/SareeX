"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useMotionContext } from "@/components/LenisProvider";

export function ScrollProgress() {
  const progressRef = useRef<HTMLSpanElement>(null);
  const { prefersReducedMotion } = useMotionContext();

  useGSAP(() => {
    if (prefersReducedMotion || !progressRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => gsap.set(progressRef.current, { scaleY: self.progress }),
    });
    return () => trigger.kill();
  }, { dependencies: [prefersReducedMotion], revertOnUpdate: true });

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={progressRef} />
    </div>
  );
}
