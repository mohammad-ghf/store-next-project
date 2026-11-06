import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const PRODUCTS_PER_PAGE = 15;

type ProductsPageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const params = await searchParams;

  const selectedCategory = params.category;
  const searchQuery = (params.search ?? "").trim().toLocaleLowerCase("fa-IR");

  //* فیلتر محصولات بر اساس دسته‌بندی و عبارت جست‌وجو
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    const matchesSearch =
      !searchQuery ||
      product.title.toLocaleLowerCase("fa-IR").includes(searchQuery) ||
      product.description.toLocaleLowerCase("fa-IR").includes(searchQuery);

    return matchesCategory && matchesSearch;
  });

  //* محاسبه صفحات
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

  // ساخت شماره صفحات همراه با سه‌نقطه
  const getPaginationPages = () => {
    const pages: (number | "...")[] = [];

    for (let page = 1; page <= totalPages; page++) {
      if (
        page === 1 ||
        page === totalPages ||
        Math.abs(page - currentPage) <= 1
      ) {
        pages.push(page);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  //* ساخت لینک صفحه‌بندی با حفظ فیلترها
  const getPageUrl = (page: number) => {
    const queryParams = new URLSearchParams();

    queryParams.set("page", String(page));

    if (selectedCategory) {
      queryParams.set("category", selectedCategory);
    }

    if (params.search) {
      queryParams.set("search", params.search);
    }

    return `/products?${queryParams.toString()}`;
  };

  return (
    <ProtectedRoute>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="mt-6 text-2xl font-bold md:text-3xl">
            {params.search
              ? `نتایج جست‌وجو برای «${params.search}»`
              : "همه محصولات"}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {filteredProducts.length} محصول پیدا شد
          </p>
        </div>

        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border p-6 text-center text-muted-foreground">
            {params.search
              ? "محصولی با این عبارت پیدا نشد."
              : "محصولی در این دسته‌بندی پیدا نشد."}
          </p>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {/* فلش صفحه قبل */}
            <Link
              href={getPageUrl(currentPage - 1)}
              aria-label="صفحه قبلی"
              className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors ${
                currentPage === 1
                  ? "pointer-events-none opacity-40"
                  : "hover:bg-accent"
              }`}
            >
              <span>{"<"}</span>
            </Link>

            {/* شماره صفحات */}
            {getPaginationPages().map((page, index) =>
              page === "..." ? (
                <span
                  key={`dots-${index}`}
                  className="flex h-9 min-w-9 items-center justify-center text-muted-foreground"
                >
                  ...
                </span>
              ) : (
                <Link
                  key={page}
                  href={getPageUrl(page)}
                  className={`flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm transition-colors ${
                    currentPage === page
                      ? "border-primary bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  {page}
                </Link>
              ),
            )}

            {/* فلش صفحه بعد */}
            <Link
              href={getPageUrl(currentPage + 1)}
              aria-label="صفحه بعدی"
              className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors ${
                currentPage === totalPages
                  ? "pointer-events-none opacity-40"
                  : "hover:bg-accent"
              }`}
            >
              <span>{">"}</span>
            </Link>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
};

export default ProductsPage;
