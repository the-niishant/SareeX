"use client";

import { HeartOff, ShoppingBag } from "lucide-react";
import { CommerceProductRow } from "@/components/CommerceProductRow";
import { useCommerce } from "@/components/CommerceProvider";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { sarees } from "@/lib/sarees";

export function WishlistDialog() {
  const {
    wishlistIds,
    surface,
    closeSurface,
    openQuickView,
    toggleWishlist,
    addToCart,
  } = useCommerce();
  const open = surface?.type === "wishlist";
  const products = wishlistIds
    .map((id) => sarees.find((product) => product.id === id))
    .filter((product) => product !== undefined);

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && closeSurface()}>
      <DialogContent className="commerce-dialog-content--sheet" aria-describedby="wishlist-description">
        <div className="commerce-dialog-heading">
          <p className="commerce-overline">SAVED FOR LATER</p>
          <DialogTitle>Your wishlist</DialogTitle>
          <DialogDescription id="wishlist-description">
            Pieces you would like to return to.
          </DialogDescription>
        </div>
        {products.length ? (
          <ul className="commerce-product-list">
            {products.map((product) => (
              <CommerceProductRow
                key={product.id}
                product={product}
                onOpen={() => openQuickView(product)}
                action={
                  <>
                    <button
                      className="commerce-row-action"
                      type="button"
                      onClick={() => addToCart(product)}
                      aria-label={"Add " + product.name + " to bag"}
                    >
                      <ShoppingBag aria-hidden="true" size={15} />
                      <span>Add to bag</span>
                    </button>
                    <button
                      className="commerce-row-icon"
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      aria-label={"Remove " + product.name + " from wishlist"}
                    >
                      <HeartOff aria-hidden="true" size={15} />
                    </button>
                  </>
                }
              />
            ))}
          </ul>
        ) : (
          <div className="commerce-empty-state">
            <p>Your saved pieces will gather here.</p>
            <DialogClose asChild>
              <a className="button button-gold" href="#arrivals">Explore new arrivals</a>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
