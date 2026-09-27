"use client";

import { useMemo, useRef, useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { CommerceProductRow } from "@/components/CommerceProductRow";
import { useCommerce } from "@/components/CommerceProvider";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { sarees } from "@/lib/sarees";

export function SearchDialog() {
  const { surface, closeSurface, openQuickView, addToCart } = useCommerce();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const open = surface?.type === "search";
  const matches = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return sarees;
    return sarees.filter((product) =>
      [product.name, product.fabric, product.occasion]
        .join(" ")
        .toLocaleLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && closeSurface()}>
      <DialogContent
        className="commerce-dialog-content--search"
        aria-describedby="search-description"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          inputRef.current?.focus();
        }}
      >
        <div className="commerce-dialog-heading">
          <p className="commerce-overline">FIND YOUR DRAPE</p>
          <DialogTitle>Search the collection</DialogTitle>
          <DialogDescription id="search-description">
            Search by weave, fabric, or occasion.
          </DialogDescription>
        </div>
        <label className="commerce-search-field">
          <Search aria-hidden="true" size={18} />
          <span className="visually-hidden">Search sarees</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Banarasi or festive"
          />
        </label>
        <p className="commerce-results-label" aria-live="polite">
          {matches.length} {matches.length === 1 ? "piece" : "pieces"}
        </p>
        {matches.length ? (
          <ul className="commerce-product-list commerce-search-results">
            {matches.map((product) => (
              <CommerceProductRow
                key={product.id}
                product={product}
                onOpen={() => openQuickView(product)}
                action={
                  <button
                    className="commerce-row-icon"
                    type="button"
                    onClick={() => addToCart(product)}
                    aria-label={"Add " + product.name + " to bag"}
                  >
                    <ShoppingBag aria-hidden="true" size={16} />
                  </button>
                }
              />
            ))}
          </ul>
        ) : (
          <div className="commerce-empty-state commerce-search-empty">
            <p>No pieces match that search. Try a fabric or occasion.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
