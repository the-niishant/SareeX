import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { TraditionalPattern } from "@/components/TraditionalPattern";

const occasions = [
  {
    title: "Wedding & Bridal",
    note: "For a day that stays with you",
    image: "photo-1775486102075-a9db33ac6cdf",
    alt: "Two women in embroidered ceremonial saris",
    className: "occasion-bridal",
  },
  {
    title: "Evening",
    note: "A softer kind of occasion",
    image: "photo-1778148046782-2b5c2ce37612",
    alt: "An ivory sari with a warm pink border, worn outdoors",
    className: "occasion-evening",
  },
  {
    title: "Casual day",
    note: "Easy drapes, everyday ritual",
    image: "photo-1778148046511-27141f5f01ae",
    alt: "Woman in a peach-gold sari in soft afternoon light",
    className: "occasion-day",
  },
  {
    title: "Festive ethnic",
    note: "Colour made for coming together",
    image: "photo-1617627143750-d86bc21e42bb",
    alt: "Orange and gold saree styled for a festive occasion",
    className: "occasion-festive",
  },
];

function OccasionTile({ occasion }: { occasion: (typeof occasions)[number] }) {
  return (
    <a className={`occasion-tile ${occasion.className}`} href="#arrivals">
      <Image
        src={`https://images.unsplash.com/${occasion.image}?auto=format&fit=crop&w=1400&h=1600&q=85`}
        alt={occasion.alt}
        fill
        loading="lazy"
        sizes="(max-width: 700px) 85vw, (max-width: 1000px) 45vw, 50vw"
        className="kinetic-image"
      />
      <span className="occasion-scrim" aria-hidden="true" />
      <span className="occasion-copy" data-silk-item>
        <span>{occasion.note}</span>
        <strong>{occasion.title}</strong>
        <span className="occasion-link">Explore <ArrowUpRight aria-hidden="true" size={15} /></span>
      </span>
    </a>
  );
}

export function OccasionsSection() {
  return (
    <section className="occasion-section section-wrap" id="occasions" aria-labelledby="occasion-title">
      <TraditionalPattern variant="wave" className="section-pattern occasion-pattern" />
      <div className="section-heading" data-silk-group>
        <div>
          <p className="eyebrow" data-silk-item>Wear the moment</p>
          <h2 id="occasion-title" data-silk-item>Shop by occasion</h2>
        </div>
        <p className="heading-aside" data-silk-item>A considered drape, whatever the day holds.</p>
      </div>
      <div className="occasion-grid" data-silk-group>
        {occasions.map((occasion) => (
          <OccasionTile key={occasion.title} occasion={occasion} />
        ))}
      </div>
    </section>
  );
}
