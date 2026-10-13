import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product.types";
import AddToCartBtn from "./AddToCartBtn";

type ProductCardProps = {
  product: Product;
};
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="group overflow-hidden rounded-xl border">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden ">
          <Image
            src={product.image}
            alt={product.title}
          />
        </div>
      </Link>
      <div className="space-y-3 p-4 bg-gray-100">
        <h3 className="line-clamp-2 text-sm font-semibold">{product.title}</h3>

        <p className="line-clamp-2 text-xs leading-5">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-bold">
            {product.price.toLocaleString("fa-IR")} تومان
          </span>

          <AddToCartBtn product={product} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
