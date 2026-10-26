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
import digitalProduct from "../../public/digitals.jpg";
import modileProduct from "../../public/mobiles.jpg";
import homeAppliancesProduct from "../../public/Home Appliances.jpg";
import Image from "next/image";

const slides = [
  {
    title: "کالای دیجیتال تخفیف خورد!",
    description: "محصولات دیجیتال منتخب با قیمت ویژه",
    href: "/categories/digital",
    img: digitalProduct,
  },
  {
    title: "تخفیف ویژه لوازم خانگی",
    description: "لوازم خانگی مورد نیازت را با قیمت مناسب تهیه کن",
    href: "/categories/home-appliances",
    img: homeAppliancesProduct,
  },
  {
    title: "فروش ویژه موبایل",
    description: "جدیدترین گوشی‌های موبایل را مشاهده کن",
    href: "/categories/mobile",
    img: modileProduct,
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
              <CarouselItem key={slide.href}>
                <div className="grid min-h-105 grid-cols-1 items-center gap-6 overflow-hidden rounded-2xl border-2 p-5 sm:min-h-90 sm:p-8 md:grid-cols-2 md:gap-8 md:p-10 lg:min-h-100 lg:gap-12 lg:p-12">
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="mb-3 text-xs font-medium text-muted-foreground sm:text-sm">
                      پیشنهاد ویژه فروشگاه
                    </span>

                    <h1 className="text-2xl font-bold leading-relaxed sm:text-3xl md:text-4xl lg:text-5xl">
                      {slide.title}
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-4 sm:text-base">
                      {slide.description}
                    </p>

                    <Link
                      href={slide.href}
                      className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:mt-7 sm:px-6 sm:py-3"
                    >
                      مشاهده محصولات
                    </Link>
                  </div>

                  <div className="relative mx-auto h-44 w-full max-w-sm sm:h-56 md:h-64 lg:h-80">
                    <Image
                      className="object-contain"
                      src={slide.img}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 40vw"
                      priority={false}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

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
