"use client";

import Image from "next/image";
import { ArrowUpRight, Eye, Heart } from "lucide-react";
import { useCommerce } from "@/components/CommerceProvider";
import { formatPrice, type Saree } from "@/lib/sarees";

type ProductCardProps = {
  saree: Saree;
  index?: number;
  variant?: "grid" | "carousel" | "lookbook";
  caption?: string;
};

export function ProductCard({
  saree,
  index,
  variant = "grid",
  caption,
}: ProductCardProps) {
  const { addToCart, isWishlisted, openQuickView, toggleWishlist } = useCommerce();
  const saved = isWishlisted(saree.id);
  const image = saree.images[0];
  const secondaryImage = saree.images[1];
  const indexLabel = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;
  const imageSizes = variant === "lookbook"
    ? "(max-width: 700px) 78vw, 40vw"
    : variant === "carousel"
      ? "(max-width: 700px) 70vw, (max-width: 1100px) 31vw, 17vw"
      : "(max-width: 468px) calc((100vw - 3.15rem) / 2), (max-width: 1000px) 14rem, (max-width: 1100px) 21vw, 14rem";

  return (
    <article
      className={
        "product-card product-card--" + variant +
        (variant === "lookbook" ? " lookbook-frame lookbook-frame-" + ((index ?? 0) + 1) : "")
      }
      data-silk-item
    >
      <div className={"product-image-wrap" + (variant === "lookbook" ? " lookbook-image-wrap" : "")}>
        <button
          className="product-image-trigger"
          type="button"
          onClick={() => openQuickView(saree)}
          aria-label={"View " + saree.name + " details"}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="lazy"
            sizes={imageSizes}
            className="product-image kinetic-image"
          />
          {secondaryImage && (
            <Image
              src={secondaryImage.src}
              alt=""
              fill
              loading="lazy"
              sizes={imageSizes}
              className="product-image product-image-secondary"
              aria-hidden="true"
            />
          )}
        </button>
        {saree.isNew && <span className="new-pill">New</span>}
        {indexLabel && variant === "carousel" && (
          <span className="product-index" aria-hidden="true">{indexLabel}</span>
        )}
        <div className="product-image-tools">
          <button
            className="product-icon-button"
            type="button"
            aria-label={saved ? "Remove " + saree.name + " from wishlist" : "Add " + saree.name + " to wishlist"}
            aria-pressed={saved}
            onClick={() => toggleWishlist(saree)}
          >
            <Heart aria-hidden="true" size={17} fill={saved ? "currentColor" : "none"} />
          </button>
          <button
            className="product-icon-button"
            type="button"
            aria-label={"Quick view " + saree.name}
            onClick={() => openQuickView(saree)}
          >
            <Eye aria-hidden="true" size={17} />
          </button>
        </div>
        <div className="product-add-bar">
          <button type="button" onClick={() => addToCart(saree)}>
            Add to bag <ArrowUpRight aria-hidden="true" size={16} />
          </button>
        </div>
      </div>
      {variant === "lookbook" ? (
        <div className="lookbook-card-caption">
          <span>{indexLabel ?? "01"}</span>
          <p>{caption ?? saree.name}</p>
        </div>
      ) : null}
      <div className="product-meta">
        <div>
          <p className="product-fabric">{saree.fabric}</p>
          <h3>
            <button type="button" onClick={() => openQuickView(saree)}>{saree.name}</button>
          </h3>
        </div>
        <div className="product-price-group">
          <p className="product-price">{formatPrice(saree.price)}</p>
          {saree.mrp && saree.mrp > saree.price && (
            <p className="product-mrp"><del>{formatPrice(saree.mrp)}</del></p>
          )}
        </div>
      </div>
      <div className="product-foot">
        <span>{saree.occasion}</span>
        <button type="button" onClick={() => openQuickView(saree)}>
          Details <ArrowUpRight aria-hidden="true" size={14} />
        </button>
      </div>
    </article>
  );
}
