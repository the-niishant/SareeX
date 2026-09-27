"use client";

import dynamic from "next/dynamic";
import { useRef, type ReactNode } from "react";
import { useMotionContext } from "@/components/LenisProvider";

const MotionEngine = dynamic(
  () => import("@/components/MotionEngine").then((module) => module.MotionEngine),
  { ssr: false, loading: () => null },
);

export function MotionScope({ children }: { children: ReactNode }) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, lenisRef, velocityRef } = useMotionContext();

  return (
    <div className="motion-scope" ref={scopeRef}>
      {children}
      {!prefersReducedMotion && (
        <MotionEngine
          scopeRef={scopeRef}
          prefersReducedMotion={prefersReducedMotion}
          lenisRef={lenisRef}
          velocityRef={velocityRef}
        />
      )}
    </div>
  );
}
