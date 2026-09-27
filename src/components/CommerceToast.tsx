"use client";

import { X } from "lucide-react";
import { useCommerce } from "@/components/CommerceProvider";

export function CommerceToast() {
  const { toast, dismissToast } = useCommerce();

  return (
    <div className="commerce-toast-region" aria-live="polite" aria-atomic="true">
      {toast && (
        <div className="commerce-toast" role="status" key={toast.id}>
          <span>{toast.message}</span>
          <button type="button" onClick={dismissToast} aria-label="Dismiss notification">
            <X aria-hidden="true" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
