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
      <main className="container mx-auto w-full px-3 py-5 sm:px-4 sm:py-8 lg:px-6">
        <h1 className="mb-5 text-xl font-bold sm:mb-8 sm:text-2xl">سبد خرید</h1>

        {items.length === 0 ? (
          <div className="rounded-xl border p-6 text-center sm:p-8">
            <p className="text-sm text-muted-foreground sm:text-base">
              سبد خرید شما خالی است.
            </p>

            <Button className="mt-5 w-full sm:w-auto">
              <Link href="/products">مشاهده محصولات</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
            <div className="min-w-0 space-y-3 sm:space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex min-w-0 flex-col gap-4 rounded-xl border p-3 sm:p-4 md:flex-row md:items-center"
                >
                  {pendingDeleteId === item.id ? (
                    <div className="flex min-h-48 w-full flex-col items-center justify-center gap-4 py-6 text-center sm:py-8">
                      <h2 className="text-base font-bold sm:text-lg">
                        کالای موردنظر شما در حال حذف است
                      </h2>

                      <div className="w-full max-w-xs space-y-2 px-2">
                        <Progress
                          value={(countdown / 3) * 100}
                          className="h-1.5"
                        />
                      </div>

                      <Button
                        variant="ghost"
                        onClick={handleCancelDelete}
                        className="gap-2"
                      >
                        <Undo2 className="size-4" />
                        انصراف
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="relative mx-auto h-36 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:h-40 sm:w-40 md:mx-0 md:h-28 md:w-28 lg:h-32 lg:w-32">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 639px) 90vw, (max-width: 767px) 160px, 128px"
                          className="object-contain p-2"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col gap-3">
                        <h2 className="wrap-break-word text-sm font-semibold leading-7 sm:text-base">
                          {item.title}
                        </h2>

                        <p className="text-sm text-muted-foreground sm:text-base">
                          {item.price.toLocaleString("fa-IR")} تومان
                        </p>

                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            aria-label="افزایش تعداد"
                            onClick={() => handleIncreaseProduct(item.id)}
                          >
                            +
                          </Button>

                          <span className="min-w-7 text-center text-sm tabular-nums">
                            {item.quantity.toLocaleString("fa-IR")}
                          </span>

                          {item.quantity > 1 ? (
                            <Button
                              variant="outline"
                              size="icon"
                              aria-label="کاهش تعداد"
                              onClick={() => handleDecreaseProduct(item.id)}
                            >
                              −
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="icon"
                              aria-label="حذف محصول"
                              onClick={() => handleStartDelete(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash className="size-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-bold md:min-w-28 md:text-left sm:text-base">
                        {(item.price * item.quantity).toLocaleString("fa-IR")}{" "}
                        تومان
                      </p>
                    </>
                  )}
                </article>
              ))}
            </div>
            
            <aside className="h-fit min-w-0 space-y-5 rounded-xl border p-4 sm:p-5 lg:sticky lg:top-5">
              <h2 className="text-base font-bold sm:text-lg">خلاصه سفارش</h2>

              <div className="flex items-center justify-between gap-3 text-sm sm:text-base">
                <span className="text-muted-foreground">تعداد کالا</span>

                <span className="font-medium">
                  {items
                    .reduce((total, item) => total + item.quantity, 0)
                    .toLocaleString("fa-IR")}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 border-t pt-4">
                <span className="text-sm text-muted-foreground sm:text-base">
                  مبلغ کل
                </span>

                <span className="text-left text-sm font-bold sm:text-base">
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
