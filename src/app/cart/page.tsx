"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useEffect, useState, useRef } from "react";
import { Trash, Undo2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStartDelete = (id: string) => {
    if (timerRef.current) clearInterval(timerRef.current);

    setPendingDeleteId(id);
    setCountdown(3);

    let remaining = 3;

    timerRef.current = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);

      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;

        handleDeleteProduct(id);
        setPendingDeleteId(null);
        setCountdown(3);
      }
    }, 1000);
  };

  const handleCancelDelete = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;

    setPendingDeleteId(null);
    setCountdown(3);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

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
                  className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center justify-center"
                >
                  {pendingDeleteId === item.id ? (
                    <div className="flex flex-col items-center gap-4 py-8 text-center">
                      <h2 className="text-lg font-bold">
                        کالای موردنظر شما حذف شد
                      </h2>

                      <div className="w-full max-w-xs space-y-2">
                        <Progress
                          value={(countdown / 3) * 100}
                          className="h-1"
                        />
                      </div>

                      <Button variant="ghost" onClick={handleCancelDelete}>
                        <Undo2 className="ml-2 size-4" />
                        انصراف
                      </Button>
                    </div>
                  ) : (
                    <>
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

                          {item.quantity > 1 ? (
                            <>
                              {" "}
                              <Button
                                variant="outline"
                                size="icon"
                                aria-label="کاهش تعداد"
                                onClick={() => handleDecreaseProduct(item.id)}
                              >
                                −
                              </Button>
                            </>
                          ) : (
                            <>
                              {" "}
                              <Button
                                className="cursor-pointer"
                                variant={"outline"}
                                onClick={() => handleStartDelete(item.id)}
                              >
                                <Trash />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>

                      <p className="font-bold sm:text-left">
                        {(item.price * item.quantity).toLocaleString("fa-IR")}{" "}
                        تومان
                      </p>
                    </>
                  )}
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
