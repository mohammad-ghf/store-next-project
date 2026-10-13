import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { ProductCategory } from "@/types/product.types";
import Link from "next/link";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

const categoryPage = async ({ params }: CategoryPageProps) => {
  const { category } = await params;

  const categoryProducts = products.filter(
    (product) => product.category === category,
  );

  const categoryTitles: Record<ProductCategory, string> = {
    digital: "دیجیتال",
    "home-appliances": "لوازم خانگی",
    mobile: "موبایل",
    laptop: "لپ‌تاپ",
    gaming: "گیمینگ",
    clothing: " پوشاک",
  };

  const title =
    categoryTitles[category as ProductCategory] ?? "دسته بندی محصولات";

  return (
    <ProtectedRoute>
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-semibold">{title}</h1>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex items-center justify-center mt-5">
          <Button>
            <Link href="/products">مشاهده همه محصولات</Link>
          </Button>
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default categoryPage;
