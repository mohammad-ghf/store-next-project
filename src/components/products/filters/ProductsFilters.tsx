import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";
import ProductsPriceSlider from "./ProductsPriceSlider";

type ProductsFiltersProps = {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  sort?: string;
  maxAvailablePrice: number;
};

const categories = [
  { value: "digital", label: "کالای دیجیتال" },
  { value: "home-appliances", label: "لوازم خانگی" },
  { value: "mobile", label: "موبایل" },
  { value: "laptop", label: "لپ‌تاپ" },
  { value: "gaming", label: "گیمینگ" },
  { value: "clothing", label: "پوشاک" },
];

const ProductsFilters = ({
  category,
  minPrice,
  maxPrice,
  search,
  sort,
  maxAvailablePrice,
}: ProductsFiltersProps) => {
  const hasFilters = Boolean(category || minPrice || maxPrice);

  const clearParams = new URLSearchParams();
  if (search) clearParams.set("search", search);
  if (sort) clearParams.set("sort", sort);

  const clearHref = clearParams.toString()
    ? `/products?${clearParams.toString()}`
    : "/products";

  return (
    <aside className="h-fit rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={19} />
          <h2 className="font-bold">فیلتر محصولات</h2>
        </div>

        {hasFilters && (
          <Link
            href={clearHref}
            className="flex items-center gap-1 text-xs text-red-600 transition hover:text-red-700"
          >
            <X size={15} />
            حذف فیلترها
          </Link>
        )}
      </div>

      <form action="/products" method="GET" className="space-y-6">
        {search && <input type="hidden" name="search" value={search} />}

        {sort && <input type="hidden" name="sort" value={sort} />}

        {/* Category */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">دسته‌بندی</h3>

          <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>همه دسته‌بندی‌ها</span>

            <input
              type="radio"
              name="category"
              value=""
              defaultChecked={!category}
              className="size-4 accent-primary"
            />
          </label>

          <div className="space-y-3">
            {categories.map((item) => (
              <label
                key={item.value}
                className="flex cursor-pointer items-center justify-between gap-3 text-sm text-muted-foreground transition hover:text-foreground"
              >
                <span>{item.label}</span>

                <input
                  type="radio"
                  name="category"
                  value={item.value}
                  defaultChecked={category === item.value}
                  className="size-4 accent-primary"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Price Filter */}
        <div className="space-y-5">
          <h3 className="text-sm font-semibold">محدوده قیمت</h3>

          <ProductsPriceSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            maxAvailablePrice={maxAvailablePrice}
          />
        </div>

        <button
          type="submit"
          className="h-11 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition hover:opacity-90 active:scale-[0.98]"
        >
          اعمال فیلترها
        </button>
      </form>
    </aside>
  );
};

export default ProductsFilters;
