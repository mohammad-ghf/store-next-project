import type { Product } from "@/types/product.types";
import ProductCard from "../ProductCard";

type ProductsGridProps = {
  products: Product[];
  search?: string;
};

const ProductsGrid = ({ products, search }: ProductsGridProps) => {
  if (products.length === 0) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed p-6 text-center">
        <h3 className="font-semibold">محصولی پیدا نشد!</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          {search
            ? "محصولی با عبارت جست‌وجوشده پیدا نشد."
            : "فیلترهای انتخاب‌شده را تغییر دهید."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
