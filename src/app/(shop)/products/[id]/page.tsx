import AddToCartBtn from "@/features/products/components/AddToCartBtn";
import { products } from "@/features/products/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";

type params = {
  params: Promise<{ id: string }>;
};

const Product = async ({ params }: params) => {
  const { id } = await params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <section className="flex gap-12 px-20 py-6">
      <div>
        <Image src={product?.image} alt={product.title} />
      </div>
      <div className="mt-5 space-y-3">
        <h1 className="text-3xl font-semibold">{product?.title}</h1>
        <p className="text-xl text-gray-600 ">{product.description}</p>
        <p className="max-w-200 text-gray-500">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
          الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
          صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
          شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای
          اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
          قرار گیرد.
        </p>
        <div className="mt-8 space-y-3">
          <h3 className="text-xl">قیمت: {product.price.toLocaleString("fa-IR")}</h3>

          <AddToCartBtn product={product} />
        </div>
      </div>
    </section>
  );
};

export default Product;
