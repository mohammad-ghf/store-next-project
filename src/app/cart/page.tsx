"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Trash } from "lucide-react";

const CartPage = () => {
  const {
    cartItems,
    handleIncreaseProduct,
    handleDecreaseProduct,
    handleDeleteProduct,
  } = useCart();

  const items = products
    .filter((product) =>
      cartItems.some((cartItem) => cartItem.id === product.id),
    )
    .map((product) => ({
      ...product,
      quantity: cartItems.find((cartItem) => cartItem.id === product.id)!
        .quantity,
    }));

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <ProtectedRoute>
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-2xl font-bold">سبد خرید</h1>

        {items.length === 0 ? (
          <div className="rounded-xl border p-8 text-center">
            <p className="text-muted-foreground">سبد خرید شما خالی است.</p>

            <Button className="mt-5">
              <Link href="/products">مشاهده محصولات</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center"
                >
                  <div className="relative h-28 w-full shrink-0 rounded-lg bg-muted sm:w-28">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="112px"
                      className=" p-2"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <h2 className="font-semibold">{item.title}</h2>

                    <p className="text-sm text-muted-foreground">
                      {item.price.toLocaleString("fa-IR")} تومان
                    </p>

                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="افزایش تعداد"
                        onClick={() => handleIncreaseProduct(item.id)}
                      >
                        +
                      </Button>

                      <span className="min-w-6 text-center mx-2">
                        {item.quantity.toLocaleString("fa-IR")}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="کاهش تعداد"
                        onClick={() => handleDecreaseProduct(item.id)}
                      >
                        −
                      </Button>

                      <Button
                        className="mr-7 cursor-pointer"
                        variant={"outline"}
                        onClick={() => handleDeleteProduct(item.id)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>

                  <p className="font-bold sm:text-left">
                    {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
                  </p>
                </article>
              ))}
            </div>

            <aside className="h-fit space-y-5 rounded-xl border p-5">
              <h2 className="text-lg font-bold">خلاصه سفارش</h2>

              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">تعداد کالا</span>

                <span>
                  {items
                    .reduce((total, item) => total + item.quantity, 0)
                    .toLocaleString("fa-IR")}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">مبلغ کل</span>

                <span className="font-bold">
                  {totalPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>

              <Button className="w-full" disabled>
                ادامه فرایند خرید
              </Button>
            </aside>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
};

export default CartPage;
