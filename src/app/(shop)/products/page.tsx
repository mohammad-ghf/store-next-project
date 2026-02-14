import Link from "next/link";
import ProductCard from "@/features/products/components/ProductCard";
import { products } from "@/features/products/data/products";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

type ProductsPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const PRODUCTS_PER_PAGE = 8;

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const params = await searchParams;

  const currentPage = Math.max(Number(params.page) || 1, 1);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <ProtectedRoute>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">همه محصولات</h1>

          <p className="mt-2 text-sm">تمام محصولات فروشگاه را مشاهده کنید.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <Link
                key={page}
                href={`/products?page=${page}`}
                className={`flex size-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {page}
              </Link>
            );
          })}
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default ProductsPage;
