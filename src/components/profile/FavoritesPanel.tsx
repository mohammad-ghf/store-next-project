import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FavoritesPanel() {
  return (
    <section
      id="favorites"
      dir="rtl"
      className="min-h-75 rounded-2xl bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold">لیست علاقه‌مندی‌ها</h2>

        <Link
          href="/products"
          className="text-sm text-blue-600 hover:underline"
        >
          مشاهده لیست علاقه‌مندی‌ها
        </Link>
      </div>

      <div className="flex min-h-55 flex-col items-center justify-center gap-4 text-gray-300">
        <Heart size={72} strokeWidth={1.5} />

        <p className="text-sm">لیست علاقه‌مندی‌های شما خالی است</p>

        <Button variant="outline" className="text-foreground">
          <Link href="/products">مشاهده محصولات</Link>
        </Button>
      </div>
    </section>
  );
}
