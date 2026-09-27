"use client";

import { CartDrawer } from "@/components/CartDrawer";
import { CommerceToast } from "@/components/CommerceToast";
import { QuickViewDialog } from "@/components/QuickViewDialog";
import { SearchDialog } from "@/components/SearchDialog";
import { SizeGuideDialog } from "@/components/SizeGuideDialog";
import { useCommerce } from "@/components/CommerceProvider";
import { WishlistDialog } from "@/components/WishlistDialog";

export function CommerceOverlays() {
  const { surface } = useCommerce();
  const product = surface?.type === "quick-view" ? surface.product : null;

  return (
    <>
      <CartDrawer />
      <WishlistDialog />
      <SearchDialog />
      <SizeGuideDialog />
      <QuickViewDialog
        key={product?.id ?? "closed"}
        product={product}
        open={surface?.type === "quick-view"}
      />
      <CommerceToast />
    </>
  );
}
