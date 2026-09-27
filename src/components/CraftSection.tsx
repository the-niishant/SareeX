import Image from "next/image";
import { TraditionalPattern } from "@/components/TraditionalPattern";

const craftImage =
  "https://images.unsplash.com/photo-1778148046511-27141f5f01ae?auto=format&fit=crop&w=1400&h=1600&q=85";

export function CraftSection() {
  return (
    <section className="craft-section" id="craft" aria-labelledby="craft-title">
      <div className="craft-image-wrap">
        <Image
          src={craftImage}
          alt="Silk folds and a gold-edged sari drape in warm natural light"
          fill
          loading="lazy"
          sizes="(max-width: 800px) 100vw, 50vw"
          className="craft-image kinetic-image"
        />
        <div className="craft-image-caption">
          <span>Made slowly</span>
          <span>Worn for years</span>
        </div>
      </div>
      <div className="craft-copy">
        <TraditionalPattern variant="lotus" className="section-pattern craft-pattern" />
        <div className="craft-copy-inner" data-silk-group>
          <p className="eyebrow" data-silk-item>The hand behind the weave</p>
          <h2 id="craft-title" data-silk-item>A hundred quiet hours, held in every thread.</h2>
          <p className="craft-description" data-silk-item>
            From the first winding of silk to the final zari border, every
            AURELIA saree is shaped by hands that know the loom by heart. We
            honour the time, skill, and patience that make a drape feel like
            your own.
          </p>
          <div className="craft-stats" aria-label="Our craft at a glance" data-silk-item>
            <div><strong><span data-count-to="120">120</span>+</strong><span>hours of handwork</span></div>
            <div><strong><span data-count-to="100">100</span>%</strong><span>pure fabrics</span></div>
            <div><strong>Made</strong><span>to measure</span></div>
          </div>
          <a className="text-link" href="#lookbook" data-silk-item>Discover our craft <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
