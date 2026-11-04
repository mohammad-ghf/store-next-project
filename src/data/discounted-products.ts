import { products } from "@/data/products";

const discountSettings = [
  { category: "digital", discountPercentage: 15 },
  { category: "digital", discountPercentage: 20 },
  { category: "home-appliances", discountPercentage: 10 },
  { category: "mobile", discountPercentage: 12 },
  { category: "laptop", discountPercentage: 18 },
  { category: "gaming", discountPercentage: 25 },
  { category: "clothing", discountPercentage: 30 },
];

export const discountedProducts = discountSettings
  .map((discount, index) => {
    const categoryProducts = products.filter(
      (product) => product.category === discount.category,
    );
    
    const product =
      categoryProducts[
        discountSettings
          .slice(0, index)
          .filter((item) => item.category === discount.category).length
      ];

    if (!product) return null;

    const discountedPrice = Math.round(
      product.price * (1 - discount.discountPercentage / 100),
    );

    return {
      ...product,
      originalPrice: product.price,
      discountedPrice,
      discountPercentage: discount.discountPercentage,
    };
  })
  .filter((product) => product !== null);
