import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProductsFilter from "@/components/products/ProductsFilter";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductsPageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
};

const PRODUCTS_PER_PAGE = 8;

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const params = await searchParams;

  const selectedCategory = params.category;

  const filteredProducts = products.filter((product) => {
    return !selectedCategory || product.category === selectedCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const currentPage = Math.min(
    Math.max(Number(params.page) || 1, 1),
    Math.max(totalPages, 1),
  );

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <ProtectedRoute>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <ProductsFilter selectedCategory={selectedCategory} />

          <div>
            <div className="mb-5">
              <h1 className="text-2xl font-bold md:text-3xl">همه محصولات</h1>

              <p className="mt-2 text-sm text-muted-foreground">
                {filteredProducts.length.toLocaleString("fa-IR")} محصول
              </p>
            </div>

            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="rounded-lg border p-6 text-center text-muted-foreground">
                محصولی در این دسته‌بندی پیدا نشد.
              </p>
            )}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {/* دکمه صفحه قبلی */}
            <Link
              href={(() => {
                const queryParams = new URLSearchParams();
                queryParams.set("page", String(currentPage - 1));

                if (selectedCategory) {
                  queryParams.set("category", selectedCategory);
                }

                return `/products?${queryParams.toString()}`;
              })()}
              aria-label="صفحه قبلی"
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : undefined}
              className={`flex size-10 items-center justify-center rounded-lg border transition-colors ${
                currentPage === 1
                  ? "pointer-events-none opacity-40"
                  : "hover:bg-muted"
              }`}
            >
              <ChevronRight size={18} />
            </Link>

            {/* شماره صفحات */}
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const queryParams = new URLSearchParams();

              queryParams.set("page", String(page));

              if (selectedCategory) {
                queryParams.set("category", selectedCategory);
              }

              return (
                <Link
                  key={page}
                  href={`/products?${queryParams.toString()}`}
                  aria-current={currentPage === page ? "page" : undefined}
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

            {/* دکمه صفحه بعدی */}
            <Link
              href={(() => {
                const queryParams = new URLSearchParams();
                queryParams.set("page", String(currentPage + 1));

                if (selectedCategory) {
                  queryParams.set("category", selectedCategory);
                }

                return `/products?${queryParams.toString()}`;
              })()}
              aria-label="صفحه بعدی"
              aria-disabled={currentPage === totalPages}
              tabIndex={currentPage === totalPages ? -1 : undefined}
              className={`flex size-10 items-center justify-center rounded-lg border transition-colors ${
                currentPage === totalPages
                  ? "pointer-events-none opacity-40"
                  : "hover:bg-muted"
              }`}
            >
              <ChevronLeft size={18} />
            </Link>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
};

export default ProductsPage;
