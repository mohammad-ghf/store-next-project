
export default function RecentOrders() {
  return (
    <section
      id="orders"
      dir="rtl"
      className="min-h-36 rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="font-semibold">آخرین سفارش‌ها</h2>

      <div className="flex min-h-20 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          هنوز سفارشی ثبت نکرده‌اید.
        </p>
      </div>
    </section>
  );
}
