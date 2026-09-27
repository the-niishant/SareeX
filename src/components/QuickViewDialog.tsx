"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { useCommerce } from "@/components/CommerceProvider";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { formatPrice, type Saree } from "@/lib/sarees";

export function QuickViewDialog({
  product,
  open,
}: {
  product: Saree | null;
  open: boolean;
}) {
  const {
    closeSurface,
    addToCart,
    isWishlisted,
    toggleWishlist,
    openSizeGuide,
  } = useCommerce();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    setSize("");
    setColor("");
  }, [product?.id]);

  if (!product) return null;
  const image = product.images[0];
  const hasOptions = product.sizes.length > 0 || product.colors.length > 0;
  const optionsReady =
    (product.sizes.length === 0 || Boolean(size)) &&
    (product.colors.length === 0 || Boolean(color));

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && closeSurface()}>
      <DialogContent className="commerce-dialog-content--quick" aria-describedby="quick-view-description">
        <div className="quick-view-layout">
          <div className="quick-view-image">
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 88vw, 46vw" />
            {product.isNew && <span className="new-pill">New</span>}
          </div>
          <div className="quick-view-copy">
            <p className="commerce-overline">{product.fabric}</p>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription id="quick-view-description">
              {product.occasion} edit
            </DialogDescription>
            <p className="quick-view-price">
              {formatPrice(product.price)}
              {product.mrp && product.mrp > product.price && (
                <del>{formatPrice(product.mrp)}</del>
              )}
            </p>
            <p className="quick-view-detail">
              A considered piece from the AURELIA edit. Product imagery and inventory details are
              editorial samples pending final approval.
            </p>

            {product.sizes.length > 0 && (
              <fieldset className="quick-view-options">
                <legend>Size</legend>
                <div>
                  {product.sizes.map((option) => (
                    <button
                      key={option}
                      className="option-chip"
                      type="button"
                      aria-pressed={size === option}
                      onClick={() => setSize(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}
            {product.colors.length > 0 && (
              <fieldset className="quick-view-options">
                <legend>Color</legend>
                <div>
                  {product.colors.map((option) => (
                    <button
                      key={option}
                      className="option-chip"
                      type="button"
                      aria-pressed={color === option}
                      onClick={() => setColor(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}
            {!hasOptions && (
              <p className="quick-view-variant-note">
                Size and color details for this sample listing are not yet available.
                <button type="button" onClick={openSizeGuide}>View size guidance</button>
              </p>
            )}

            <div className="quick-view-actions">
              <button
                className="button button-gold"
                type="button"
                disabled={!optionsReady}
                onClick={() => addToCart(product, { size: size || undefined, color: color || undefined })}
              >
                <ShoppingBag aria-hidden="true" size={17} />
                {optionsReady ? "Add to bag" : "Choose options"}
              </button>
              <button
                className="quick-view-wishlist"
                type="button"
                aria-pressed={isWishlisted(product.id)}
                onClick={() => toggleWishlist(product)}
              >
                <Heart aria-hidden="true" size={17} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
                {isWishlisted(product.id) ? "Saved" : "Save to wishlist"}
              </button>
            </div>
            <button className="quick-view-size-link" type="button" onClick={openSizeGuide}>
              Size guide & care notes
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
