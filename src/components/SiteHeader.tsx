"use client";

import { Heart, Search, ShoppingBag } from "lucide-react";
import { useCommerce } from "@/components/CommerceProvider";

const links = [
  { label: "Collections", href: "#showcase" },
  { label: "New arrivals", href: "#arrivals" },
  { label: "Our craft", href: "#craft" },
];

export function SiteHeader() {
  const {
    cartCount,
    wishlistIds,
    openCart,
    openWishlist,
    openSearch,
  } = useCommerce();

  return (
    <header className="site-header" id="site-header">
      <a className="wordmark" href="#top" aria-label="Aurelia Sarees home">
        AURELIA <span>SAREES</span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </nav>

      <nav className="header-actions" aria-label="Shopping tools">
        <button type="button" onClick={openSearch} aria-label="Search the collection" title="Search">
          <Search aria-hidden="true" size={19} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={openWishlist}
          aria-label={"Wishlist, " + wishlistIds.length + " saved " + (wishlistIds.length === 1 ? "piece" : "pieces")}
          title="Wishlist"
        >
          <Heart aria-hidden="true" size={19} strokeWidth={1.5} />
          {wishlistIds.length > 0 && <span className="bag-count" aria-hidden="true">{wishlistIds.length}</span>}
        </button>
        <button
          className="bag-link"
          type="button"
          onClick={openCart}
          aria-label={"Shopping bag, " + cartCount + " " + (cartCount === 1 ? "item" : "items")}
          title="Shopping bag"
        >
          <ShoppingBag aria-hidden="true" size={19} strokeWidth={1.5} />
          <span className="bag-count" aria-hidden="true">{cartCount}</span>
        </button>
      </nav>

      <details className="mobile-navigation">
        <summary aria-label="Open navigation menu">Menu</summary>
        <nav aria-label="Mobile navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </details>
    </header>
  );
}
