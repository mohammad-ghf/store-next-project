import { products } from "@/data/products";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProductsFilters from "@/components/products/filters/ProductsFilters";
import ProductsToolbar from "@/components/products/filters/ProductsToolbar";
import ProductsPagination from "@/components/products/filters/ProductsPagination";
import ProductsGrid from "@/components/products/filters/ProductsGrid";

const PRODUCTS_PER_PAGE = 14;

type SortOption = "default" | "price-asc" | "price-desc";

type ProductsPageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const params = await searchParams;

  const selectedCategory = params.category;
  const searchQuery = (params.search ?? "").trim().toLocaleLowerCase("fa-IR");

  const sort: SortOption = (
    ["default", "price-asc", "price-desc"].includes(params.sort ?? "")
      ? params.sort
      : "default"
  ) as SortOption;

  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;

  // Filter
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    const matchesSearch =
      !searchQuery ||
      product.title.toLocaleLowerCase("fa-IR").includes(searchQuery) ||
      product.description.toLocaleLowerCase("fa-IR").includes(searchQuery);

    const matchesMinPrice =
      minPrice === undefined ||
      !Number.isFinite(minPrice) ||
      product.price >= minPrice;

    const matchesMaxPrice =
      maxPrice === undefined ||
      !Number.isFinite(maxPrice) ||
      product.price <= maxPrice;

    return (
      matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice
    );
  });

  // Sort
  const sortedProducts = [...filteredProducts];

  switch (sort) {
    case "price-asc":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    case "price-desc":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
  }

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const currentPage = Math.min(
    Math.max(Number(params.page) || 1, 1),
    Math.max(totalPages, 1),
  );

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  const maxAvailablePrice = Math.max(
    ...products.map((product) => product.price),
    0,
  );

  return (
    <ProtectedRoute>
      <main dir="rtl" className="container mx-auto px-4 py-8">
        <div className="mb-7">
          <h1 className="text-2xl font-bold md:text-3xl">
            {params.search
              ? `نتایج جست‌وجو برای «${params.search}»`
              : "همه محصولات"}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            محصولات موردنظر خود را پیدا کنید.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[270px_minmax(0,1fr)]">
          {/* Sidebar */}
          <ProductsFilters
            category={selectedCategory}
            minPrice={params.minPrice}
            maxPrice={params.maxPrice}
            search={params.search}
            sort={sort}
            maxAvailablePrice={maxAvailablePrice}
          />

          {/* Main Content */}
          <section className="min-w-0 space-y-6">
            <ProductsToolbar
              totalProducts={filteredProducts.length}
              sort={sort}
              category={selectedCategory}
              search={params.search}
              minPrice={params.minPrice}
              maxPrice={params.maxPrice}
            />

            <ProductsGrid products={currentProducts} search={params.search} />

            <ProductsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              category={selectedCategory}
              search={params.search}
              sort={sort}
              minPrice={params.minPrice}
              maxPrice={params.maxPrice}
            />
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default ProductsPage;
