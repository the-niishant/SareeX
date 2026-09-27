"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { sarees, type Saree } from "@/lib/sarees";

export type CartSelection = {
  size?: string;
  color?: string;
};

export type CartLine = CartSelection & {
  key: string;
  sareeId: string;
  quantity: number;
};

export type CommerceSurface =
  | { type: "cart" }
  | { type: "wishlist" }
  | { type: "search" }
  | { type: "quick-view"; product: Saree }
  | { type: "size-guide" }
  | null;

type CommerceToast = { id: number; message: string } | null;

type CommerceContextValue = {
  cartItems: CartLine[];
  cartCount: number;
  cartSubtotal: number;
  wishlistIds: string[];
  surface: CommerceSurface;
  toast: CommerceToast;
  openCart: () => void;
  openWishlist: () => void;
  openSearch: () => void;
  openQuickView: (product: Saree) => void;
  openSizeGuide: () => void;
  closeSurface: () => void;
  addToCart: (product: Saree, selection?: CartSelection) => void;
  setCartQuantity: (lineKey: string, quantity: number) => void;
  removeFromCart: (lineKey: string) => void;
  toggleWishlist: (product: Saree) => void;
  isWishlisted: (productId: string) => boolean;
  notify: (message: string) => void;
  dismissToast: () => void;
};

const CommerceContext = createContext<CommerceContextValue | null>(null);
const WISHLIST_STORAGE_KEY = "aurelia-sarees-wishlist";

export function CommerceProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartLine[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [wishlistReady, setWishlistReady] = useState(false);
  const [surface, setSurface] = useState<CommerceSurface>(null);
  const [toast, setToast] = useState<CommerceToast>(null);
  const toastSequence = useRef(0);
  const wishlistIdsRef = useRef<string[]>([]);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const restoreFocusAfterClose = useRef(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
      const parsed: unknown = stored ? JSON.parse(stored) : [];
      const productIds = new Set(sarees.map((product) => product.id));
      const validIds = Array.isArray(parsed)
        ? parsed.filter((id): id is string => typeof id === "string" && productIds.has(id))
        : [];
      wishlistIdsRef.current = validIds;
      setWishlistIds(validIds);
    } catch {
      // Keep the in-memory wishlist available when storage is blocked.
      wishlistIdsRef.current = [];
      setWishlistIds([]);
    } finally {
      setWishlistReady(true);
    }
  }, []);

  useEffect(() => {
    if (!wishlistReady) return;
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // The in-memory wishlist remains usable when storage is unavailable.
    }
  }, [wishlistIds, wishlistReady]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (surface !== null || !restoreFocusAfterClose.current) return;
    restoreFocusAfterClose.current = false;
    const target = returnFocusRef.current;
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 240;
    const timeout = window.setTimeout(() => {
      if (target?.isConnected) target.focus({ preventScroll: true });
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [surface]);

  const openSurface = useCallback((nextSurface: Exclude<CommerceSurface, null>) => {
    if (surface === null && document.activeElement instanceof HTMLElement) {
      returnFocusRef.current = document.activeElement;
    }
    restoreFocusAfterClose.current = false;
    setSurface(nextSurface);
  }, [surface]);

  const closeSurface = useCallback(() => {
    restoreFocusAfterClose.current = true;
    setSurface(null);
  }, []);

  const notify = useCallback((message: string) => {
    toastSequence.current += 1;
    setToast({ id: toastSequence.current, message });
  }, []);

  const addToCart = useCallback((product: Saree, selection: CartSelection = {}) => {
    const key = [product.id, selection.size ?? "", selection.color ?? ""].join("::");
    setCartItems((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { key, sareeId: product.id, quantity: 1, ...selection }];
    });
    notify(product.name + " added to your bag.");
  }, [notify]);

  const setCartQuantity = useCallback((lineKey: string, quantity: number) => {
    const nextQuantity = Math.max(1, Math.floor(quantity));
    setCartItems((current) =>
      current.map((item) =>
        item.key === lineKey ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  }, []);

  const removeFromCart = useCallback((lineKey: string) => {
    setCartItems((current) => current.filter((item) => item.key !== lineKey));
    notify("Item removed from your bag.");
  }, [notify]);

  const toggleWishlist = useCallback((product: Saree) => {
    const current = wishlistIdsRef.current;
    const wasSaved = current.includes(product.id);
    const next = wasSaved
      ? current.filter((id) => id !== product.id)
      : [...current, product.id];
    wishlistIdsRef.current = next;
    setWishlistIds(next);
    notify(wasSaved ? product.name + " removed from your wishlist." : product.name + " saved to your wishlist.");
  }, [notify]);

  const isWishlisted = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds],
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => {
    const product = sarees.find((candidate) => candidate.id === item.sareeId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const contextValue = useMemo<CommerceContextValue>(() => ({
    cartItems,
    cartCount,
    cartSubtotal,
    wishlistIds,
    surface,
    toast,
    openCart: () => openSurface({ type: "cart" }),
    openWishlist: () => openSurface({ type: "wishlist" }),
    openSearch: () => openSurface({ type: "search" }),
    openQuickView: (product) => openSurface({ type: "quick-view", product }),
    openSizeGuide: () => openSurface({ type: "size-guide" }),
    closeSurface,
    addToCart,
    setCartQuantity,
    removeFromCart,
    toggleWishlist,
    isWishlisted,
    notify,
    dismissToast: () => setToast(null),
  }), [
    cartItems,
    cartCount,
    cartSubtotal,
    wishlistIds,
    surface,
    toast,
    addToCart,
    setCartQuantity,
    removeFromCart,
    toggleWishlist,
    isWishlisted,
    notify,
    openSurface,
    closeSurface,
  ]);

  return <CommerceContext.Provider value={contextValue}>{children}</CommerceContext.Provider>;
}

export function useCommerce() {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error("useCommerce must be used inside CommerceProvider.");
  }
  return context;
}
