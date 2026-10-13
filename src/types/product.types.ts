import { StaticImageData } from "next/image";

export type ProductCategory =
  | "digital"
  | "home-appliances"
  | "mobile"
  | "laptop"
  | "gaming"
  | "clothing"

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: StaticImageData;
};