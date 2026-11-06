import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product.types";
import AddToCartBtn from "./AddToCartBtn";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border">
      <Link href={`/products/${product.id}`} className="block shrink-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/75 px-2 py-3 text-center text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            برای دیدن محصول کلیک کنید
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col space-y-3 bg-gray-100 p-4">
        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5">
          {product.title}
        </h3>

        <p className="line-clamp-2 min-h-10 text-xs leading-5 text-gray-600">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
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
