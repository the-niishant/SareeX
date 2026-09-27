"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useCommerce } from "@/components/CommerceProvider";
import { formatPrice, sarees } from "@/lib/sarees";

export function CartDrawer() {
  const {
    cartItems,
    cartSubtotal,
    surface,
    closeSurface,
    setCartQuantity,
    removeFromCart,
    notify,
  } = useCommerce();
  const open = surface?.type === "cart";

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && closeSurface()}>
      <DialogContent className="commerce-dialog-content--sheet" aria-describedby="cart-description">
        <div className="commerce-dialog-heading">
          <p className="commerce-overline">AURELIA SAREES</p>
          <DialogTitle>Your bag</DialogTitle>
          <DialogDescription id="cart-description">
            {cartItems.length
              ? "A considered edit, gathered in one place."
              : "Your bag is ready for something beautifully made."}
          </DialogDescription>
        </div>

        {cartItems.length ? (
          <>
            <ul className="cart-lines">
              {cartItems.map((line) => {
                const product = sarees.find((item) => item.id === line.sareeId);
                if (!product) return null;
                const image = product.images[0];
                return (
                  <li className="cart-line" key={line.key}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={96}
                      height={128}
                      sizes="96px"
                    />
                    <div className="cart-line-content">
                      <div className="cart-line-top">
                        <div>
                          <p className="cart-line-fabric">{product.fabric}</p>
                          <h3>{product.name}</h3>
                        </div>
                        <button
                          className="icon-text-button cart-remove"
                          type="button"
                          onClick={() => removeFromCart(line.key)}
                          aria-label={"Remove " + product.name + " from bag"}
                        >
                          <Trash2 aria-hidden="true" size={16} />
                        </button>
                      </div>
                      {(line.size || line.color) && (
                        <p className="cart-line-variant">
                          {[line.size, line.color].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      <div className="cart-line-bottom">
                        <div className="quantity-stepper" aria-label={"Quantity for " + product.name}>
                          <button
                            type="button"
                            disabled={line.quantity <= 1}
                            onClick={() => setCartQuantity(line.key, line.quantity - 1)}
                            aria-label={"Decrease quantity of " + product.name}
                          >
                            <Minus aria-hidden="true" size={13} />
                          </button>
                          <output aria-live="polite">{line.quantity}</output>
                          <button
                            type="button"
                            onClick={() => setCartQuantity(line.key, line.quantity + 1)}
                            aria-label={"Increase quantity of " + product.name}
                          >
                            <Plus aria-hidden="true" size={13} />
                          </button>
                        </div>
                        <p>{formatPrice(product.price * line.quantity)}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="cart-summary">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>{formatPrice(cartSubtotal)}</strong>
              </div>
              <p>Shipping and taxes are confirmed at checkout.</p>
              <button
                className="button button-gold cart-checkout"
                type="button"
                onClick={() => notify("Checkout with Razorpay is coming soon. No order has been placed.")}
              >
                Continue to checkout
              </button>
              <p className="cart-checkout-note">
                Secure payment is not connected yet; your bag is only a preview.
              </p>
            </div>
          </>
        ) : (
          <div className="commerce-empty-state">
            <p>A little silk is waiting to find its way here.</p>
            <DialogClose asChild>
              <a className="button button-gold" href="#arrivals">Continue shopping</a>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
