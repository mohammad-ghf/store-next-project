import Image from "next/image";
import type { Product } from "@/types/product.types";
import AddToCartBtn from "./AddToCartBtn";

type ProductDetailsProps = {
  product: Product;
  discount?: {
    originalPrice: number;
    discountedPrice: number;
    discountPercentage: number;
  };
};

const ProductDetails = ({ product, discount }: ProductDetailsProps) => {
  const price = discount?.discountedPrice ?? product.price;

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="space-y-8">
        {/* Main Product Section */}
        <section className="grid gap-8 rounded-2xl border bg-card p-5 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:p-8">
          {/* Product Image */}
          <div className="flex items-center justify-center rounded-xl bg-muted/50 p-5">
            <div className="relative aspect-square w-full max-w-85">
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                className="object-contain p-3"
                sizes="(max-width: 768px) 100vw, 340px"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col gap-6">
            <div className="space-y-3">
              <span className="text-sm text-muted-foreground">
                فروشگاه / محصولات / {product.category}
              </span>

              <h1 className="text-2xl font-bold leading-relaxed md:text-3xl">
                {product.title}
              </h1>

              <p className="text-sm leading-7 text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/40 p-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">شناسه محصول</span>
                <p className="font-medium">{product.title}</p>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground">دسته‌بندی</span>
                <p className="font-medium">{product.category}</p>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground">وضعیت محصول</span>
                <p className="font-medium text-green-600">موجود در انبار</p>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground">ارسال</span>
                <p className="font-medium">ارسال سریع</p>
              </div>
            </div>

            {/* Price Section */}
            <div className="space-y-3 rounded-xl border p-5">
              {discount && (
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-red-600 px-3 py-1 text-sm font-medium text-white">
                    {discount.discountPercentage}٪ تخفیف
                  </span>

                  <span className="text-sm text-muted-foreground line-through">
                    {discount.originalPrice.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">
                  قیمت نهایی:
                </span>

                <p className="text-2xl font-bold text-red-600">
                  {price.toLocaleString("fa-IR")} تومان
                </p>
              </div>

              <AddToCartBtn
                product={product}
                price={price}
                isDiscounted={Boolean(discount)}
              />
            </div>
          </div>
        </section>

        {/* Product Description */}
        <section className="space-y-5 rounded-2xl border bg-card p-5 md:p-8">
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold">توضیحات محصول</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              بررسی کامل ویژگی‌ها و جزئیات محصول
            </p>
          </div>

          <div className="space-y-4 text-sm leading-8 text-muted-foreground">
            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می‌باشد.
            </p>

            <p>
              در طراحی این محصول تلاش شده است تا کیفیت، کارایی و زیبایی در کنار
              یکدیگر قرار بگیرند. استفاده از متریال مناسب و توجه به جزئیات باعث
              شده این محصول انتخابی کاربردی برای استفاده روزمره باشد.
            </p>

            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است.
              طراحان گرافیک از این متن به عنوان نمونه‌ای برای نمایش ساختار
              محتوای صفحات استفاده می‌کنند تا ظاهر نهایی طراحی پیش از آماده شدن
              متن اصلی قابل بررسی باشد.
            </p>

            <p>
              با انتخاب این محصول می‌توانید از تجربه‌ای مناسب و کاربردی بهره‌مند
              شوید. پیشنهاد می‌شود پیش از خرید، مشخصات و توضیحات محصول را به‌دقت
              بررسی کنید تا انتخاب مناسبی داشته باشید.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
