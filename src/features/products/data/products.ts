import type { Product } from "../types/product.types";
import monitor from "../../../../public/monitor.jpg"
import keyboard from "../../../../public/keyboard.jpg"
import vacuumCleaner from "../../../../public/vacuum cleaner.jpg"
import coffeeMaker from "../../../../public/coffee maker.jpg"
import Iphone18 from "../../../../public/iphone 18.jpg"
import Samsung from "../../../../public/Samsung.jpg"
import lapTop from "../../../../public/lap top.jpg"
import Ps5 from "../../../../public/ps5.jpg"
import gamingChair from "../../../../public/gaming chair.jpg"
import hody from "../../../../public/hody.jpg"

export const products: Product[] = [
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
    title: "کیبورد مکانیکی",
    description: "کیبورد مکانیکی با طراحی مناسب برای استفاده طولانی",
    price: 3200000,
    category: "digital",
    image: keyboard,
  },
  {
    id: "digital-4",
    title: "کیبورد مکانیکی",
    description: "کیبورد مکانیکی با طراحی مناسب برای استفاده طولانی",
    price: 3200000,
    category: "digital",
    image: keyboard,
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
    title: "گوشی اقتصادی",
    description: "گوشی مناسب استفاده روزمره",
    price: 12500000,
    category: "mobile",
    image: Samsung,
  },
  {
    id: "mobile-4",
    title: "گوشی اقتصادی",
    description: "گوشی مناسب استفاده روزمره",
    price: 12500000,
    category: "mobile",
    image: Samsung,
  },
  {
    id: "mobile-5",
    title: "گوشی اقتصادی",
    description: "گوشی مناسب استفاده روزمره",
    price: 12500000,
    category: "mobile",
    image: Samsung,
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
    title: "صندلی گیمینگ",
    description: "صندلی راحت برای استفاده طولانی مدت",
    price: 12500000,
    category: "gaming",
    image: gamingChair,
  },
  {
    id: "gaming-4",
    title: "صندلی گیمینگ",
    description: "صندلی راحت برای استفاده طولانی مدت",
    price: 12500000,
    category: "gaming",
    image: gamingChair,
  },
  {
    id: "gaming-5",
    title: "صندلی گیمینگ",
    description: "صندلی راحت برای استفاده طولانی مدت",
    price: 12500000,
    category: "gaming",
    image: gamingChair,
  },
  {
    id: "gaming-6",
    title: "صندلی گیمینگ",
    description: "صندلی راحت برای استفاده طولانی مدت",
    price: 12500000,
    category: "gaming",
    image: gamingChair,
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
    image:hody,
  },
  {
    id: "clothing-3",
    title: "شلوار",
    description: "کت اسپرت مناسب استایل روزمره",
    price: 3200000,
    category: "clothing",
    image: hody,
  },
  {
    id: "clothing-4",
    title: "شلوارک",
    description: "کت اسپرت مناسب استایل روزمره",
    price: 3200000,
    category: "clothing",
    image: hody,
  },
  {
    id: "clothing-5",
    title: "کفش",
    description: "کت اسپرت مناسب استایل روزمره",
    price: 3200000,
    category: "clothing",
    image: hody,
  },
];
