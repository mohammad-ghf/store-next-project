import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductsPaginationProps = {
  currentPage: number;
  totalPages: number;
  category?: string;
  search?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
};

const ProductsPagination = ({
  currentPage,
  totalPages,
  category,
  search,
  sort,
  minPrice,
  maxPrice,
}: ProductsPaginationProps) => {
  if (totalPages <= 1) return null;

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

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();

    params.set("page", String(page));

    if (category) params.set("category", category);
    if (search) params.set("search", search);
    if (sort) params.set("sort", sort);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    return `/products?${params.toString()}`;
  };

  const buttonClass = cn(
    "flex size-9 items-center justify-center rounded-lg border text-sm transition",
    "hover:bg-accent hover:text-accent-foreground",
  );

  return (
    <nav
      aria-label="صفحه‌بندی محصولات"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <Link
        href={getPageUrl(currentPage - 1)}
        aria-label="صفحه قبلی"
        aria-disabled={currentPage === 1}
        className={cn(
          buttonClass,
          currentPage === 1 && "pointer-events-none opacity-40",
        )}
      >
        <ChevronRight size={18} />
      </Link>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className="flex size-9 items-center justify-center text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={getPageUrl(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={cn(
              buttonClass,
              currentPage === page &&
                "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            )}
          >
            {page.toLocaleString("fa-IR")}
          </Link>
        ),
      )}

      <Link
        href={getPageUrl(currentPage + 1)}
        aria-label="صفحه بعدی"
        aria-disabled={currentPage === totalPages}
        className={cn(
          buttonClass,
          currentPage === totalPages && "pointer-events-none opacity-40",
        )}
      >
        <ChevronLeft size={18} />
      </Link>
    </nav>
  );
};

export default ProductsPagination;
