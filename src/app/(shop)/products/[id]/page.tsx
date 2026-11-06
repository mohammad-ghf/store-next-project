import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetails from "@/components/products/ProductDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const ProductPage = async ({ params }: Props) => {
  const { id } = await params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
};

export default ProductPage;
