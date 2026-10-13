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
                <div className="flex justify-center items-center gap-44 rounded-2xl border-2 px-16 py-3 md:max-h-96">
                  <div className="flex flex-col items-center justify-center text-center">
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
                  <Image className="-z-10" src={slide.img} alt={slide.title} />
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
