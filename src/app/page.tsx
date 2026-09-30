"use client";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    title: "کالای دیجیتال تخفیف خورد!",
    description: "محصولات دیجیتال منتخب با قیمت ویژه",
    href: "/categories/digital",
  },
  {
    title: "تخفیف ویژه لوازم خانگی",
    description: "لوازم خانگی مورد نیازت را با قیمت مناسب تهیه کن",
    href: "/categories/home-appliances",
  },
  {
    title: "فروش ویژه موبایل",
    description: "جدیدترین گوشی‌های موبایل را مشاهده کن",
    href: "/categories/mobile",
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
          className="w-full"
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.href}>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-200 px-6 py-12 text-center">
                  <span className="mb-4 text-sm font-medium">
                    پیشنهاد ویژه فروشگاه
                  </span>

                  <h1 className="text-3xl font-bold md:text-5xl">
                    {slide.title}
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-7 md:text-base">
                    {slide.description}
                  </p>

                  <Link
                    href={slide.href}
                    className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:opacity-90"
                  >
                    مشاهده محصولات
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </div>
  );
};

export default Home;
