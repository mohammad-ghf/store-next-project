import ProductCard from "@/features/products/components/ProductCard";
import { products } from "@/features/products/data/products";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

const categoryPage = async ({ params }: CategoryPageProps) => {
  const { category } = await params;

  const categoryProducts = products.filter(
    (product) => product.category === category,
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default categoryPage;
