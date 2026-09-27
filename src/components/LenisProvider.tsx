"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { MutableRefObject, ReactNode } from "react";
import type Lenis from "lenis";

type MotionContextValue = {
  prefersReducedMotion: boolean;
  lenisRef: MutableRefObject<Lenis | null>;
  velocityRef: MutableRefObject<number>;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);
  const velocityRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
      document.documentElement.dataset.motion = mediaQuery.matches ? "reduced" : "full";
    };

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
      delete document.documentElement.dataset.motion;
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      velocityRef.current = 0;
      return;
    }

    let disposed = false;
    let teardown: (() => void) | undefined;

    void Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]).then(([gsapModule, scrollTriggerModule, lenisModule]) => {
      if (disposed) return;

      const gsap = gsapModule.default;
      const { ScrollTrigger } = scrollTriggerModule;
      const Lenis = lenisModule.default;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      lenis.on("scroll", ({ velocity }) => {
        velocityRef.current = velocity;
      });

      const ticker = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      teardown = () => {
        window.cancelAnimationFrame(refreshFrame);
        gsap.ticker.remove(ticker);
        lenis.destroy();
        lenisRef.current = null;
        velocityRef.current = 0;
        gsap.ticker.lagSmoothing(500, 33);
      };
    });

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [prefersReducedMotion, velocityRef]);

  return (
    <MotionContext.Provider value={{ prefersReducedMotion, lenisRef, velocityRef }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionContext() {
  const context = useContext(MotionContext);
  if (!context) throw new Error("useMotionContext must be used within LenisProvider");
  return context;
}
