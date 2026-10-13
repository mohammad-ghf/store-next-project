import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ProductCategory } from "@/types/product.types";
type ProductsFilterProps = {
  selectedCategory?: string;
};

const categories: {
  value: ProductCategory;
  label: string;
}[] = [
  { value: "digital", label: "کالای دیجیتال" },
  { value: "home-appliances", label: "لوازم خانگی" },
  { value: "mobile", label: "موبایل" },
  { value: "laptop", label: "لپ‌تاپ" },
  { value: "gaming", label: "گیمینگ" },
  { value: "clothing", label: "پوشاک" },
];

const ProductsFilter = ({ selectedCategory }: ProductsFilterProps) => {
  return (
    <aside className="h-fit rounded-xl border bg-card p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">فیلتر محصولات</h2>

        <Link href="/products" className="text-sm text-primary hover:underline">
          حذف فیلترها
        </Link>
      </div>

      <form action="/products" method="GET" className="space-y-6">
        <div className="space-y-3">
          <h3 className="font-semibold">دسته‌بندی</h3>

          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="category"
              value=""
              defaultChecked={!selectedCategory}
              className="accent-primary"
            />
            همه محصولات
          </label>

          {categories.map((category) => (
            <label
              key={category.value}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <input
                type="radio"
                name="category"
                value={category.value}
                defaultChecked={selectedCategory === category.value}
                className="accent-primary"
              />
              {category.label}
            </label>
          ))}
        </div>

        <Button type="submit" className="w-full">
          اعمال فیلتر
        </Button>
      </form>
    </aside>
  );
};

export default ProductsFilter;
