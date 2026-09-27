import { ArrowDownRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { TraditionalPattern } from "@/components/TraditionalPattern";
import { ZariParticles } from "@/components/ZariParticles";
import { sarees } from "@/lib/sarees";

export function ShowcaseSection() {
  return (
    <section className="showcase-section section-wrap" id="showcase" aria-labelledby="showcase-title">
      <TraditionalPattern variant="zari" className="section-pattern showcase-pattern" />
      <div className="showcase-glow" aria-hidden="true" />
      <ZariParticles />
      <div className="section-heading showcase-heading" data-silk-group>
        <div data-silk-item>
          <p className="eyebrow">The signature edit</p>
          <h2 id="showcase-title">A drape for every story.</h2>
        </div>
        <a className="text-link" href="#arrivals" data-silk-item>
          Explore all sarees <ArrowDownRight aria-hidden="true" size={16} />
        </a>
      </div>

      <div className="showcase-intro">
        <p className="showcase-counter"><span id="showcase-index">01</span> <span>/ 06</span></p>
        <p>Six heirloom weaves, chosen for the way they move.</p>
      </div>

      <p className="showcase-active-name" id="showcase-active-name" aria-live="polite">
        {sarees[0]?.name}
      </p>

      <div className="showcase-track">
        {sarees.map((saree, index) => (
          <div
            className="showcase-card"
            id={`featured-${saree.id}`}
            data-carousel-card
            data-carousel-index={index}
            key={saree.id}
          >
            <ProductCard saree={saree} index={index} variant="carousel" />
          </div>
        ))}
      </div>
      <nav className="showcase-dots" aria-label="Featured saree positions">
        {sarees.map((saree, index) => (
          <a
            key={saree.id}
            href={`#featured-${saree.id}`}
            data-carousel-dot
            data-carousel-index={index}
            aria-label={`Featured saree ${index + 1}: ${saree.name}`}
            className={index === 0 ? "is-current" : ""}
          />
        ))}
      </nav>
    </section>
  );
}
