import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { TraditionalPattern } from "@/components/TraditionalPattern";
import { sarees } from "@/lib/sarees";

const captions = [
  "The plum of celebration",
  "A quieter kind of gold",
  "For the long afternoon",
  "Woven to be remembered",
];

export function LookbookSection() {
  return (
    <section className="lookbook-section section-wrap" id="lookbook" aria-labelledby="lookbook-title">
      <TraditionalPattern variant="temple" className="section-pattern lookbook-pattern" />
      <div className="section-heading lookbook-heading" data-silk-group>
        <div>
          <p className="eyebrow" data-silk-item>AURELIA in the world</p>
          <h2 id="lookbook-title" data-silk-item>The art of being draped.</h2>
        </div>
        <a className="text-link" href="#instagram" data-silk-item>
          View the lookbook <ArrowRight aria-hidden="true" size={16} />
        </a>
      </div>
      <div
        className="lookbook-track"
        role="group"
        aria-label="Lookbook saree photographs"
        data-silk-group
      >
        {sarees.slice(0, 4).map((saree, index) => (
          <ProductCard
            key={saree.id}
            saree={saree}
            index={index}
            variant="lookbook"
            caption={captions[index]}
          />
        ))}
      </div>
      <div className="lookbook-progress" aria-hidden="true"><span /></div>
    </section>
  );
}
