import type { Product } from "@/types/product.types";
import monitor from "../../public/monitor.jpg"
import keyboard from "../../public/keyboard.jpg"
import vacuumCleaner from "../../public/vacuum cleaner.jpg"
import coffeeMaker from "../../public/coffee maker.jpg"
import Iphone18 from "../../public/iphone 18.jpg"
import Samsung from "../../public/Samsung.jpg"
import lapTop from "../../public/lap top.jpg"
import Ps5 from "../../public/ps5.jpg"
import gamingChair from "../../public/gaming chair.jpg"
import hody from "../../public/hody.jpg"


export const baseProducts: Product[] = [
  // Digital
  {
    id: "digital-1",
    title: "مانیتور حرفه‌ای",
    description: "مانیتور با کیفیت تصویر بالا مناسب کار و سرگرمی",
    price: 18500000,
    category: "digital",
    image: monitor,
  },
  {
    id: "digital-2",
    title: "کیبورد مکانیکی",
    description: "کیبورد مکانیکی با طراحی مناسب برای استفاده طولانی",
    price: 3200000,
    category: "digital",
    image: keyboard,
  },
  {
    id: "digital-3",
    title: "کیبورد گیمینگ RGB",
    description: "کیبورد مخصوص بازی با نورپردازی جذاب",
    price: 4500000,
    category: "digital",
    image: keyboard,
  },
  {
    id: "digital-4",
    title: "کیبورد بی‌سیم",
    description: "کیبورد بی‌سیم مناسب میز کار",
    price: 2800000,
    category: "digital",
    image: keyboard,
  },
  {
    id: "digital-5",
    title: "مانیتور گیمینگ",
    description: "مانیتور مناسب بازی و استفاده حرفه‌ای",
    price: 24500000,
    category: "digital",
    image: monitor,
  },
  {
    id: "digital-6",
    title: "مانیتور اداری",
    description: "مانیتور مناسب کارهای روزمره و اداری",
    price: 12000000,
    category: "digital",
    image: monitor,
  },

  // Home Appliances
  {
    id: "home-appliances-1",
    title: "جاروبرقی",
    description: "جاروبرقی قدرتمند با طراحی مدرن",
    price: 7800000,
    category: "home-appliances",
    image: vacuumCleaner,
  },
  {
    id: "home-appliances-2",
    title: "قهوه‌ساز",
    description: "قهوه‌ساز مناسب استفاده خانگی",
    price: 5600000,
    category: "home-appliances",
    image: coffeeMaker,
  },
  {
    id: "home-appliances-3",
    title: "جاروبرقی خانگی",
    description: "جاروبرقی مناسب نظافت روزانه منزل",
    price: 8500000,
    category: "home-appliances",
    image: vacuumCleaner,
  },
  {
    id: "home-appliances-4",
    title: "قهوه‌ساز حرفه‌ای",
    description: "قهوه‌ساز با طراحی مدرن برای تهیه قهوه",
    price: 9200000,
    category: "home-appliances",
    image: coffeeMaker,
  },
  {
    id: "home-appliances-5",
    title: "جاروبرقی کم‌مصرف",
    description: "جاروبرقی با مصرف انرژی مناسب",
    price: 6900000,
    category: "home-appliances",
    image: vacuumCleaner,
  },

  // Mobile
  {
    id: "mobile-1",
    title: "گوشی هوشمند",
    description: "گوشی هوشمند با نمایشگر باکیفیت",
    price: 32000000,
    category: "mobile",
    image: Iphone18,
  },
  {
    id: "mobile-2",
    title: "گوشی اقتصادی",
    description: "گوشی مناسب استفاده روزمره",
    price: 12500000,
    category: "mobile",
    image: Samsung,
  },
  {
    id: "mobile-3",
    title: "گوشی سامسونگ",
    description: "گوشی هوشمند مناسب استفاده روزانه",
    price: 18500000,
    category: "mobile",
    image: Samsung,
  },
  {
    id: "mobile-4",
    title: "آیفون",
    description: "گوشی هوشمند با امکانات پیشرفته",
    price: 58000000,
    category: "mobile",
    image: Iphone18,
  },
  {
    id: "mobile-5",
    title: "گوشی میان‌رده",
    description: "گوشی مناسب کارهای روزمره و سرگرمی",
    price: 22000000,
    category: "mobile",
    image: Samsung,
  },
  {
    id: "mobile-6",
    title: "گوشی پرچمدار",
    description: "گوشی قدرتمند با نمایشگر باکیفیت",
    price: 45000000,
    category: "mobile",
    image: Iphone18,
  },

  // Laptop
  {
    id: "laptop-1",
    title: "لپ‌تاپ حرفه‌ای",
    description: "لپ‌تاپ قدرتمند مناسب برنامه‌نویسی و کارهای سنگین",
    price: 65000000,
    category: "laptop",
    image: lapTop,
  },
  {
    id: "laptop-2",
    title: "لپ‌تاپ دانشجویی",
    description: "لپ‌تاپ سبک و مناسب استفاده روزمره",
    price: 28000000,
    category: "laptop",
    image: lapTop,
  },
  {
    id: "laptop-3",
    title: "لپ‌تاپ گیمینگ",
    description: "لپ‌تاپ قدرتمند مناسب اجرای بازی‌ها",
    price: 85000000,
    category: "laptop",
    image: lapTop,
  },
  {
    id: "laptop-4",
    title: "لپ‌تاپ اقتصادی",
    description: "لپ‌تاپ مناسب کارهای روزمره و تحصیلی",
    price: 32000000,
    category: "laptop",
    image: lapTop,
  },
  {
    id: "laptop-5",
    title: "لپ‌تاپ برنامه‌نویسی",
    description: "لپ‌تاپ مناسب توسعه نرم‌افزار و برنامه‌نویسی",
    price: 55000000,
    category: "laptop",
    image: lapTop,
  },

  // Gaming
  {
    id: "gaming-1",
    title: "دسته بازی",
    description: "دسته بازی مناسب کامپیوتر و کنسول",
    price: 4200000,
    category: "gaming",
    image: Ps5,
  },
  {
    id: "gaming-2",
    title: "صندلی گیمینگ",
    description: "صندلی راحت برای استفاده طولانی مدت",
    price: 12500000,
    category: "gaming",
    image: gamingChair,
  },
  {
    id: "gaming-3",
    title: "صندلی گیمینگ حرفه‌ای",
    description: "صندلی مناسب میز گیمینگ",
    price: 14500000,
    category: "gaming",
    image: gamingChair,
  },
  {
    id: "gaming-4",
    title: "صندلی گیمینگ ارگونومیک",
    description: "صندلی با طراحی مناسب برای نشستن طولانی",
    price: 16500000,
    category: "gaming",
    image: gamingChair,
  },
  {
    id: "gaming-5",
    title: "کنسول بازی",
    description: "کنسول بازی مناسب سرگرمی و بازی‌های جدید",
    price: 35000000,
    category: "gaming",
    image: Ps5,
  },
  {
    id: "gaming-6",
    title: "کنسول بازی حرفه‌ای",
    description: "کنسول قدرتمند برای تجربه بازی",
    price: 42000000,
    category: "gaming",
    image: Ps5,
  },
  {
    id: "gaming-7",
    title: "دسته بازی بی‌سیم",
    description: "دسته بازی بی‌سیم مناسب کنسول",
    price: 5200000,
    category: "gaming",
    image: Ps5,
  },

  // Clothing
  {
    id: "clothing-1",
    title: "هودی",
    description: "هودی راحت و مناسب استفاده روزمره",
    price: 1850000,
    category: "clothing",
    image: hody,
  },
  {
    id: "clothing-2",
    title: "کت اسپرت",
    description: "کت اسپرت مناسب استایل روزمره",
    price: 3200000,
    category: "clothing",
    image: hody,
  },
  {
    id: "clothing-3",
    title: "شلوار",
    description: "شلوار راحت مناسب استفاده روزمره",
    price: 2200000,
    category: "clothing",
    image: hody,
  },
  {
    id: "clothing-4",
    title: "شلوارک",
    description: "شلوارک مناسب استفاده روزمره",
    price: 1200000,
    category: "clothing",
    image: hody,
  },
  {
    id: "clothing-5",
    title: "کفش",
    description: "کفش مناسب استفاده روزانه",
    price: 2800000,
    category: "clothing",
    image: hody,
  },
  {
    id: "clothing-6",
    title: "هودی اسپرت",
    description: "هودی اسپرت با طراحی ساده",
    price: 2400000,
    category: "clothing",
    image: hody,
  },
  {
    id: "clothing-7",
    title: "لباس راحتی",
    description: "لباس راحت و مناسب استفاده روزانه",
    price: 1750000,
    category: "clothing",
    image: hody,
  },
];

export const products: Product[] = Array.from(
  { length: 130 },
  (_, index) => {
    const product = baseProducts[index % baseProducts.length];

    return {
      ...product,
      id: `${product.category}-${index + 1}`,
    };
  }
);
