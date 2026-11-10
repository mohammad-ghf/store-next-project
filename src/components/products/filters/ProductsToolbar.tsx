import Link from "next/link";
import { ArrowDownWideNarrow } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductsToolbarProps = {
  totalProducts: number;
  sort?: string;
  category?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
};

const sortOptions = [
  { value: "default", label: "پیش‌فرض" },
  { value: "price-asc", label: "کمترین قیمت" },
  { value: "price-desc", label: "بیشترین قیمت" },
];
const ProductsToolbar = ({
  totalProducts,
  sort,
  category,
  search,
  minPrice,
  maxPrice,
}: ProductsToolbarProps) => {
  const getSortUrl = (value: string) => {
    const params = new URLSearchParams();
    params.set("sort", value);

    if (category) params.set("category", category);
    if (search) params.set("search", search);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    return `/products?${params.toString()}`;
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <div className="flex shrink-0 items-center gap-2 text-sm font-semibold">
          <ArrowDownWideNarrow size={20} className="text-muted-foreground" />
          <span>مرتب‌سازی بر اساس:</span>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {sortOptions.map((option) => (
            <Link
              key={option.value}
              href={getSortUrl(option.value)}
              aria-current={sort === option.value ? "page" : undefined}
              className={cn(
                "whitespace-nowrap text-sm transition-colors hover:text-primary",
                sort === option.value
                  ? "font-semibold text-red-600"
                  : "text-muted-foreground",
              )}
            >
              {option.label}
            </Link>
          ))}
        </nav>
      </div>

      <p className="shrink-0 text-sm text-muted-foreground">
        تعداد محصولات:
        <span className="mr-1 font-bold text-foreground">
          {totalProducts.toLocaleString("fa-IR")}
        </span>
      </p>
    </div>
  );
};

export default ProductsToolbar;
