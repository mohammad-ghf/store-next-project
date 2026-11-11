
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product.types";
import AddToCartBtn from "./AddToCartBtn";
import AddToWishlistBtn from "../wshlist/AddToWishlistBtn";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

const ProductCard = ({ product, compact = false }: ProductCardProps) => {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300",
        compact
          ? "border-red-200 hover:border-red-400 hover:shadow-md hover:shadow-red-100"
          : "border-border",
      )}
    >
      {/* Product Image */}
      <div className="relative">
        <Link
          href={`/products/${product.id}`}
          className="block shrink-0"
        >
          <div
            className={cn(
              "relative overflow-hidden",
              compact ? "aspect-5/4" : "aspect-square",
            )}
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/75 px-2 py-2 text-center text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              برای دیدن محصول کلیک کنید
            </div>
          </div>
        </Link>

        {/* Wishlist Button */}
        <AddToWishlistBtn
          productId={product.id}
          className="absolute left-2 top-2 z-10"
        />
      </div>

      {/* Product Information */}
      <div
        className={cn(
          "flex flex-1 flex-col",
          compact
            ? "space-y-2 bg-red-50/70 p-2.5"
            : "space-y-3 bg-gray-100 p-4",
        )}
      >
        <h3
          className={cn(
            "line-clamp-2 font-semibold leading-5",
            compact ? "min-h-9 text-xs" : "min-h-10 text-sm",
          )}
        >
          {product.title}
        </h3>

        <p
          className={cn(
            "line-clamp-2 leading-5 text-gray-600",
            compact ? "min-h-8 text-[11px]" : "min-h-10 text-xs",
          )}
        >
          {product.description}
        </p>

        <div
          className={cn(
            "mt-auto flex items-center justify-between gap-2",
            compact ? "pt-1" : "pt-2",
          )}
        >
          <span
            className={cn(
              "font-bold",
              compact ? "text-xs" : "text-sm",
            )}
          >
            {product.price.toLocaleString("fa-IR")} تومان
          </span>

          <AddToCartBtn product={product} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
