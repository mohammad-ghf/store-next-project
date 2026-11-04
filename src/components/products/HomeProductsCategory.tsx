import Link from "next/link";
import {
  Monitor,
  Home,
  Smartphone,
  Laptop,
  Gamepad2,
  Shirt,
} from "lucide-react";

const categories = [
  {
    title: "کالای دیجیتال",
    value: "digital",
    icon: Monitor,
    color: "bg-amber-500",
  },
  {
    title: "لوازم خانگی",
    value: "home-appliances",
    icon: Home,
    color: "bg-red-500",
  },
  {
    title: "گوشی موبایل",
    value: "mobile",
    icon: Smartphone,
    color: "bg-cyan-600",
  },
  {
    title: "لپ‌تاپ",
    value: "laptop",
    icon: Laptop,
    color: "bg-blue-600",
  },
  {
    title: "گیمینگ",
    value: "gaming",
    icon: Gamepad2,
    color: "bg-purple-600",
  },
  {
    title: "پوشاک",
    value: "clothing",
    icon: Shirt,
    color: "bg-green-600",
  },
];

const HomeProductsCategory = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="grid min-w-162.5 grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.value}
              href={`/products?category=${category.value}`}
              className="group flex flex-col items-center gap-4 py-2"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full text-white transition-all duration-200 group-hover:scale-110 ${
                  category.color
                }`}
              >
                <Icon size={32} strokeWidth={1.5} />
              </div>

              <span className="whitespace-nowrap text-sm font-medium transition-colors">
                {category.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomeProductsCategory;
