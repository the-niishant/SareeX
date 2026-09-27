"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useCommerce } from "@/components/CommerceProvider";

export function SizeGuideDialog() {
  const { surface, closeSurface } = useCommerce();
  const open = surface?.type === "size-guide";

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && closeSurface()}>
      <DialogContent className="commerce-dialog-content--size" aria-describedby="size-guide-description">
        <div className="commerce-dialog-heading">
          <p className="commerce-overline">A NOTE FROM THE ATELIER</p>
          <DialogTitle>Size guidance</DialogTitle>
          <DialogDescription id="size-guide-description">
            The current sample listings do not include standardized measurements or size options.
          </DialogDescription>
        </div>
        <div className="size-guide-note">
          <p>
            Please request item-specific measurements and fit guidance from the atelier before
            placing an order. We will add a complete guide when verified sizing details are available.
          </p>
        </div>
        <button className="button button-gold" type="button" onClick={closeSurface}>
          Understood
        </button>
      </DialogContent>
    </Dialog>
  );
}
