"use client";
import Image from "next/image";
import { BadgePercent } from "lucide-react";
import { discountedProducts } from "@/data/discounted-products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const DiscountSection = () => {
  return (
    <section className="overflow-hidden rounded-2xl bg-red-600 py-8 text-white select-none">
      {/* Header */}
      <div className="mb-8 flex items-center justify-center gap-3">
        <BadgePercent size={42} />

        <h2 className="text-2xl font-bold md:text-3xl">تخفیف تایم</h2>
      </div>

      {/* Carousel */}
      <div className="mx-auto max-w-[1600px] px-8 md:px-12">
        <Carousel
          opts={{
            align: "start",
            direction: "rtl",
            duration: 30,
            dragFree: true,
            containScroll: "trimSnaps",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {discountedProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-[65%] pl-3 sm:basis-1/2 lg:basis-1/3 xl:basis-1/5"
              >
                <Link href={`/discounts/${product.id}`}>
                  <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[32px] bg-white text-black transition-transform duration-300 hover:-translate-y-1">
                    {/* Product Image */}
                    <div className="relative flex h-65 items-center justify-center p-5">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={250}
                        height={230}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:-rotate-1"
                      />

                      <span className="absolute bottom-3 left-3 flex h-10 min-w-10 items-center justify-center rounded-full bg-red-600 px-2 text-sm font-bold text-white transition-colors duration-300 group-hover:bg-white group-hover:text-red-600">
                        {product.discountPercentage}٪
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="group/details relative isolate flex min-h-31.25 flex-1 flex-col justify-between overflow-hidden rounded-b-[24px] bg-white p-3">
                      <div className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-black transition-transform duration-500 ease-in-out group-hover:scale-y-100 group-hover:rounded-t-3xl" />

                      <h3 className="line-clamp-2 text-right text-sm font-medium leading-7 text-black transition-colors duration-300 group-hover:text-white">
                        {product.title}
                      </h3>

                      <div className="mt-3 flex flex-col gap-1">
                        <span className="text-xs text-gray-400 line-through">
                          {product.originalPrice.toLocaleString("fa-IR")} تومان
                        </span>

                        <div className="flex items-center justify-between gap-2">
                          <span className="text-lg font-bold text-red-600 transition-colors duration-500 group-hover:text-white">
                            {product.discountedPrice.toLocaleString("fa-IR")}
                          </span>

                          <span className="text-xs text-red-600 transition-colors duration-500 group-hover:text-white">
                            تومان
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-auto right-0 translate-x-1/2 border-0 bg-white text-black hover:bg-gray-200" />
          <CarouselNext className="right-auto left-0 -translate-x-1/2 border-0 bg-white text-black hover:bg-gray-200" />
        </Carousel>
      </div>
    </section>
  );
};

export default DiscountSection;
