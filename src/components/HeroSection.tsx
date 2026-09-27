import Image from "next/image";
import { ArrowDown, Play } from "lucide-react";
import { TraditionalPattern } from "@/components/TraditionalPattern";

const heroImage =
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2400&h=1600&q=90";

export function HeroSection() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-media-frame" data-hero-media>
        <Image
          src={heroImage}
          alt="Model wearing a deep-plum silk saree with a gold woven border"
          fill
          priority
          sizes="100vw"
          className="hero-image kinetic-image"
        />
        <div className="hero-shade" aria-hidden="true" />
        <TraditionalPattern className="hero-pattern" />
      </div>

      <div className="floating-saree" data-floating-saree aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1778148046782-2b5c2ce37612?auto=format&fit=crop&w=700&h=1000&q=85"
          alt=""
          fill
          sizes="(max-width: 760px) 32vw, 22vw"
          className="floating-saree-image"
        />
        <span className="floating-fabric-layer floating-fabric-layer-one" data-fabric-layer="0" />
        <span className="floating-fabric-layer floating-fabric-layer-two" data-fabric-layer="1" />
        <span className="floating-saree-caption">Silk, in motion</span>
      </div>

      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">Handwoven · Heritage ’26</p>
        <h1 id="hero-title">
          <span className="hero-line"><span className="hero-line-inner">Draped in</span></span>
          <br />
          <span className="hero-line"><span className="hero-line-inner">Poetry.</span></span>
        </h1>
        <p className="hero-copy">
          For the moments you carry with you. Discover handwoven sarees shaped
          by craft, culture, and the way you choose to wear them.
        </p>
        <div className="hero-actions">
          <a className="button button-gold" href="#showcase">
            Shop the collection
          </a>
          <a className="button button-outline" href="#craft">
            <Play aria-hidden="true" size={15} fill="currentColor" />
            Watch the film
          </a>
        </div>
      </div>

      <a className="hero-scroll" href="#showcase">
        <span>Discover the collection</span>
        <ArrowDown aria-hidden="true" size={16} />
      </a>
      <div className="hero-side-note" aria-hidden="true">A study in silk and time</div>
    </section>
  );
}
