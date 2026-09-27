import { ArrowUpRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { TraditionalPattern } from "@/components/TraditionalPattern";
import { sarees } from "@/lib/sarees";

export function NewArrivalsSection() {
  const arrivals = sarees.filter((saree) => saree.isNew).slice(0, 4);

  return (
    <section className="arrivals-section section-wrap" id="arrivals" aria-labelledby="arrivals-title">
      <TraditionalPattern variant="paisley" className="section-pattern arrivals-pattern" />
      <div className="arrivals-content">
        <div className="section-heading" data-silk-group>
          <div>
            <p className="eyebrow" data-silk-item>Just woven</p>
            <h2 id="arrivals-title" data-silk-item>New arrivals</h2>
          </div>
          <a className="text-link" href="#showcase" data-silk-item>
            View the collection <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>
        <div className="product-grid" data-silk-group>
          {arrivals.map((saree) => (
            <ProductCard key={saree.id} saree={saree} />
          ))}
        </div>
      </div>
    </section>
  );
}
