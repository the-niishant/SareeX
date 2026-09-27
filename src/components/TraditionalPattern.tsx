import { useId } from "react";

type TraditionalPatternProps = {
  variant?: "zari" | "lotus" | "wave" | "paisley" | "temple";
  className?: string;
};

export function TraditionalPattern({
  variant = "zari",
  className = "",
}: TraditionalPatternProps) {
  const patternId = useId().replace(/:/g, "");

  if (variant === "lotus") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        viewBox="0 0 220 220"
        fill="none"
      >
        <pattern id={`lotus-pattern-${patternId}`} width="110" height="110" patternUnits="userSpaceOnUse">
          <path d="M55 22c-9 12-13 22-13 31 0 8 5 13 13 16 8-3 13-8 13-16 0-9-4-19-13-31Z" />
          <path d="M55 43c-15 2-24 8-27 16 7 8 16 11 27 9 11 2 20-1 27-9-3-8-12-14-27-16Z" />
          <path d="M55 69v17m-20-3c7 8 14 12 20 12s13-4 20-12M25 40c8 2 14 6 18 12m42-12c-8 2-14 6-18 12" />
        </pattern>
        <rect width="220" height="220" fill={`url(#lotus-pattern-${patternId})`} />
      </svg>
    );
  }

  if (variant === "wave") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        viewBox="0 0 220 220"
        fill="none"
      >
        <pattern id={`wave-pattern-${patternId}`} width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
          <path d="M-8 12c8-8 16-8 24 0s16 8 24 0M-8 32c8-8 16-8 24 0s16 8 24 0" />
        </pattern>
        <rect width="220" height="220" fill={`url(#wave-pattern-${patternId})`} />
      </svg>
    );
  }

  if (variant === "paisley") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        viewBox="0 0 220 220"
        fill="none"
      >
        <pattern id={`paisley-pattern-${patternId}`} width="110" height="110" patternUnits="userSpaceOnUse">
          <path d="M54 11c-19 12-31 27-31 43 0 18 12 29 27 29 14 0 25-10 25-24 0-11-8-19-18-19-7 0-12 5-12 11 8-4 15 0 15 8 0 7-5 12-12 12-10 0-16-8-16-18 0-15 10-29 22-42Z" />
          <path d="M53 24c9 4 15 10 19 19M53 71c6-3 11-8 14-14M27 64c7 2 13 6 17 12" />
          <circle cx="54" cy="53" r="2" fill="currentColor" stroke="none" />
          <path d="M9 103c8-5 16-5 24 0m54-88c7 3 12 8 15 15" />
        </pattern>
        <rect width="220" height="220" fill={`url(#paisley-pattern-${patternId})`} />
      </svg>
    );
  }

  if (variant === "temple") {
    return (
      <svg
        aria-hidden="true"
        className={className}
        viewBox="0 0 220 220"
        fill="none"
      >
        <pattern id={`temple-pattern-${patternId}`} width="88" height="88" patternUnits="userSpaceOnUse">
          <path d="m5 34 39-25 39 25v48H5V34Z" />
          <path d="M14 35h60M20 43v29m12-29v29m12-29v29m12-29v29m12-29v29M5 77h78M10 83h68" />
          <path d="m35 22 9-6 9 6M40 43v12c0 4 2 7 4 9 3-2 4-5 4-9V43" />
        </pattern>
        <rect width="220" height="220" fill={`url(#temple-pattern-${patternId})`} />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 220 220"
      fill="none"
    >
      <pattern id={`zari-pattern-${patternId}`} width="44" height="44" patternUnits="userSpaceOnUse">
        <path d="m22 2 20 20-20 20L2 22 22 2Z" />
        <path d="M22 12v20M12 22h20" />
        <circle cx="22" cy="22" r="2" fill="currentColor" stroke="none" />
      </pattern>
      <rect width="220" height="220" fill={`url(#zari-pattern-${patternId})`} />
    </svg>
  );
}
