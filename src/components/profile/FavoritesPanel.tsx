"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { products } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";

const FavoritesPanel = () => {
  const { wishlistItems, isWishlistInitialized, removeFromWishlist } =
    useWishlist();

  const favoriteProducts = products.filter((product) =>
    wishlistItems.includes(product.id),
  );

  return (
    <section
      id="favorites"
      dir="rtl"
      className="min-w-0 rounded-2xl bg-white p-5 shadow-sm"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Heart className="size-5 fill-red-500 text-red-500" />
          <h2 className="font-semibold">لیست علاقه‌مندی‌ها</h2>
        </div>

        <Link
          href="/wishlist"
          className="shrink-0 text-sm text-blue-600 hover:underline"
        >
          مشاهده همه
        </Link>
      </div>

      {!isWishlistInitialized ? (
        <div className="flex min-h-40 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            در حال بارگذاری علاقه‌مندی‌ها...
          </p>
        </div>
      ) : favoriteProducts.length > 0 ? (
        <div className="flex max-h-80 flex-col gap-3 overflow-y-auto pl-2">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-100 p-3 transition-colors hover:bg-gray-50"
            >
              <Link
                href={`/products/${product.id}`}
                className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-gray-50"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <Link href={`/products/${product.id}`}>
                  <h1 className="line-clamp-1 text-sm font-medium text-gray-800 hover:text-red-500">
                    {product.title}
                  </h1>

                  <p className="mt-2 text-sm font-semibold text-red-600">
                    {product.price.toLocaleString("fa-IR")} تومان
                  </p>
                </Link>
              </div>

              <button
                type="button"
                onClick={() => removeFromWishlist(product.id)}
                aria-label="حذف از علاقه‌مندی‌ها"
                title="حذف از علاقه‌مندی‌ها"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-gray-400">
          <Heart size={52} strokeWidth={1.5} />

          <p className="text-sm">لیست علاقه‌مندی‌های شما خالی است</p>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-gray-50"
          >
            <ShoppingBag size={16} />
            مشاهده محصولات
          </Link>
        </div>
      )}
    </section>
  );
};
export default FavoritesPanel;
