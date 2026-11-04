"use client";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import CategoryProductSection from "@/components/products/CategoryProductSection";
import { products } from "@/data/products";
import img1 from "../../public/homeSlide/DESKTOPSLIDE-10da70ba-3323-432f-9340-e10421f553d2.webp";
import img2 from "../../public/homeSlide/img2.webp";
import img3 from "../../public/homeSlide/img3.webp";
import Image from "next/image";
import HomeProductsCategory from "@/components/products/HomeProductsCategory";
import DiscountSection from "@/components/products/DiscountSection";

const slides = [
  {
    id: 1,
    href: "/categories/digital",
    img: img1,
  },
  {
    id: 2,
    href: "/categories/laptop",
    img: img2,
  },
  {
    id: 3,
    href: "/categories/mobile",
    img: img3,
  },
];

const Home = () => {
  return (
    <div>
      <section className="container mx-auto px-4 py-6">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false,
            }),
          ]}
          opts={{
            direction: "rtl",
            loop: true,
          }}
          className="w-full select-none"
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="h-40 sm:h-56 md:h-72 lg:h-100">
                  <Link href={slide.href} className="block h-full w-full">
                    <Image
                      src={slide.img}
                      alt="title"
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-4">
          < HomeProductsCategory/>
        </div>

        <div className="mt-4">
          <DiscountSection />
        </div>

        <div className="space-y-7 mt-7">
          <h1 className="text-3xl font-semibold">محصولات برتر</h1>
          <CategoryProductSection
            title="موبایل"
            category="mobile"
            products={products}
          />
          <CategoryProductSection
            title="محصولات دیجیتال"
            category="digital"
            products={products}
          />
          <CategoryProductSection
            title="محصولات گیمینگ"
            category="gaming"
            products={products}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
