"use client";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import type { Product, ProductCategory } from "@/types/product.types";
import { ChevronLeft } from "lucide-react";

type CategoryProductSectionProps = {
  title: string;
  subtitle?: string;
  category: ProductCategory;
  products: Product[];
};

const CategoryProductSection = ({
  title,
  category,
  products,
}: CategoryProductSectionProps) => {
  const categoryProducts = products.filter(
    (product) => product.category === category,
  );

  if (categoryProducts.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-red-200/70 bg-red-50/40 p-3 shadow-sm dark:border-red-900/50 dark:bg-red-950/10 md:p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="border-r-4 border-red-500 pr-3 text-lg font-bold text-red-700 dark:text-red-400 md:text-xl">
            {title}
          </h2>
        </div>

        <Link
          href={`/categories/${category}`}
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-red-600 md:text-sm"
        >
          مشاهده همه
          <ChevronLeft size={16} />
        </Link>
      </div>

      <Carousel
        opts={{
          align: "start",
          direction: "rtl",
          duration: 30,
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        className="px-1 select-none"
      >
        <CarouselContent className="-ml-3">
          {categoryProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-[65%] pl-3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-[16.6667%]"
            >
              <ProductCard product={product} compact />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="right-2 left-auto translate-x-1/2 border-red-200 bg-background text-red-600 hover:bg-red-500 hover:text-white" />

        <CarouselNext className="left-2 right-auto -translate-x-1/2 border-red-200 bg-background text-red-600 hover:bg-red-500 hover:text-white" />
      </Carousel>
    </section>
  );
};

export default CategoryProductSection;
