import { notFound } from "next/navigation";
import { discountedProducts } from "@/data/discounted-products";
import ProductDetails from "@/components/products/ProductDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const DiscountPage = async ({ params }: Props) => {
  const { id } = await params;

  const product = discountedProducts.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const { originalPrice, discountedPrice, discountPercentage, ...baseProduct } =
    product;

  return (
    <ProductDetails
      product={baseProduct}
      discount={{
        originalPrice,
        discountedPrice,
        discountPercentage,
      }}
    />
  );
};

export default DiscountPage;
