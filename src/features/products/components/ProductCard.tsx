import Image from "next/image";
import Link from "next/link";

import type { Product } from "../types/product.types";

type ProductCardProps = {
  product: Product;
};
const ProductCard = ({product} : ProductCardProps) => {
  return (
    <article className="group overflow-hidden rounded-xl border">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden ">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="space-y-3 p-4 bg-gray-100">
          <h3 className="line-clamp-2 text-sm font-semibold">
            {product.title}
          </h3>

          <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
            {product.description}
          </p>

          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold">
              {product.price.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard