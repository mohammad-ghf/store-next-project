
"use client";

import Link from "next/link";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProductCard from "./ProductCard";

import type {
  Product,
  ProductCategory,
} from "../types/product.types";
import { ChevronLeft } from "lucide-react";

type CategoryProductSectionProps = {
  title: string;
  subtitle?: string;
  category: ProductCategory;
  products: Product[];
};

export default function CategoryProductSection({
  title,
  category,
  products,
}: CategoryProductSectionProps) {
  const categoryProducts = products.filter(
    (product) => product.category === category,
  );

  if (categoryProducts.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border bg-background p-4 shadow-sm md:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold md:text-2xl">
            {title}
          </h2>
        </div>

        <Link
          href={`/categories/${category}`}
          className="flex items-center justify-center gap-3 shrink-0 rounded-lg bg-muted px-4 py-3 text-sm transition-colors hover:bg-muted/70"
        >
          مشاهده همه
          <ChevronLeft size={18} />
        </Link>
      </div>

      <Carousel
        opts={{
          align: "start",
          direction: "rtl",
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: true,
          }),
        ]}
        className="px-1 select-none"
      >
        <CarouselContent className="-ml-4">
          {categoryProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-[65%] pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-[16.6667%]"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="right-2 left-auto translate-x-1/2" />
        <CarouselNext className="left-2 right-auto -translate-x-1/2" />
      </Carousel>
    </section>
  );
}