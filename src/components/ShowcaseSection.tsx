import { ArrowDownRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { TraditionalPattern } from "@/components/TraditionalPattern";
import { sarees } from "@/lib/sarees";

export function ShowcaseSection() {
  return (
    <section className="showcase-section section-wrap" id="showcase" aria-labelledby="showcase-title">
      <TraditionalPattern variant="paisley" className="section-pattern showcase-pattern" />
      <div className="showcase-content">
        <div className="section-heading showcase-heading" data-silk-group>
          <div data-silk-item>
            <p className="eyebrow">The signature edit</p>
            <h2 id="showcase-title">A drape for every story.</h2>
          </div>
          <a className="text-link" href="#arrivals" data-silk-item>
            Explore all sarees <ArrowDownRight aria-hidden="true" size={16} />
          </a>
        </div>

        <p className="showcase-intro">
          Six heirloom weaves, chosen for the way they move.
        </p>

        <div className="showcase-track">
          {sarees.map((saree) => (
            <div className="showcase-card" key={saree.id}>
              <ProductCard saree={saree} variant="showcase" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
