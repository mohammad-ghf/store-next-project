"use client";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/products/ProductCard";

const WishlistPage = () => {
  const { wishlistItems, isWishlistInitialized } = useWishlist();

  const favoriteProducts = products.filter((product) =>
    wishlistItems.includes(product.id),
  );

  if (!isWishlistInitialized) {
    return (
      <main className="container mx-auto px-4 py-16">
        <p className="text-center text-muted-foreground">
          در حال بارگذاری علاقه‌مندی‌ها...
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto min-h-screen px-4 py-10">
      <div className="mb-8 flex items-center gap-3">
        <Heart className="size-7 fill-red-500 text-red-500" />

        <div>
          <h1 className="text-2xl font-bold">علاقه‌مندی‌های من</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {favoriteProducts.length} محصول در لیست علاقه‌مندی‌های شما
          </p>
        </div>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-87.5 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-red-50">
            <Heart className="size-8 text-red-400" />
          </div>

          <h2 className="text-lg font-semibold">
            لیست علاقه‌مندی‌های شما خالی است
          </h2>

          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            هنوز محصولی به علاقه‌مندی‌های خود اضافه نکرده‌اید. محصولات
            موردعلاقه‌تان را پیدا کنید و اینجا ذخیره کنید.
          </p>

          <Link
            href="/products"
            className="mt-6 flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            <ShoppingBag className="size-4" />
            مشاهده محصولات
          </Link>
        </div>
      )}
    </main>
  );
};
export default WishlistPage;
