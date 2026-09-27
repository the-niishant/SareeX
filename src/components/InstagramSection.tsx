import Image from "next/image";
import { Camera } from "lucide-react";

const moments = [
  { photo: "photo-1610030469983-98e550d6193c", alt: "Deep-plum silk saree with a gold woven border" },
  { photo: "photo-1778148046782-2b5c2ce37612", alt: "An ivory sari styled with gold jewellery" },
  { photo: "photo-1778148046511-27141f5f01ae", alt: "A peach-gold sari in soft afternoon light" },
  { photo: "photo-1617627143750-d86bc21e42bb", alt: "An orange and gold sari for a celebration" },
  { photo: "photo-1775486102075-a9db33ac6cdf", alt: "Two women in ceremonial saris" },
];

export function InstagramSection() {
  return (
    <section className="instagram-section" id="instagram" aria-labelledby="instagram-title">
      <div className="instagram-heading" data-silk-group>
        <div>
          <p className="eyebrow" data-silk-item>The world, in AURELIA</p>
          <h2 id="instagram-title" data-silk-item>Draped your way.</h2>
        </div>
        <a href="https://www.instagram.com/" aria-label="Visit AURELIA on Instagram" data-silk-item>
          <Camera aria-hidden="true" size={17} /> @aureliasarees
        </a>
      </div>
      <div className="instagram-viewport">
        <div className="instagram-strip" data-marquee-track>
          {[0, 1].map((copy) => (
            <div className="instagram-group" key={copy} aria-hidden={copy === 1}>
              {moments.map((moment, index) => (
                <div className="instagram-image" key={`${copy}-${moment.photo}-${index}`}>
                  <Image
                    src={`https://images.unsplash.com/${moment.photo}?auto=format&fit=crop&w=700&h=700&q=80`}
                    alt={copy === 1 ? "" : moment.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 700px) 48vw, 20vw"
                    className="kinetic-image"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
