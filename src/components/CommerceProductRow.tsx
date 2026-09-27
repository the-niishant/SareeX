import Image from "next/image";
import type { ReactNode } from "react";
import { formatPrice, type Saree } from "@/lib/sarees";

type CommerceProductRowProps = {
  product: Saree;
  action: ReactNode;
  onOpen: () => void;
};

export function CommerceProductRow({ product, action, onOpen }: CommerceProductRowProps) {
  const image = product.images[0];

  return (
    <li className="commerce-product-row">
      <button className="commerce-product-row-main" type="button" onClick={onOpen}>
        <Image
          src={image.src}
          alt={image.alt}
          width={76}
          height={96}
          sizes="76px"
        />
        <span className="commerce-product-row-copy">
          <span className="commerce-product-row-title">{product.name}</span>
          <span className="commerce-product-row-detail">{product.fabric}</span>
          <span className="commerce-product-row-price">{formatPrice(product.price)}</span>
        </span>
      </button>
      <div className="commerce-product-row-actions">{action}</div>
    </li>
  );
}
