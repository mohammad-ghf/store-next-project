"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Product } from "../types/product.types";
import { useCart } from "@/features/cart/context/CartContext";

type AddToCartProps = {
  product: Product;
};

const AddToCartBtn = ({ product }: AddToCartProps) => {
  const { handleIncreaseProduct, cartItems, handleDecreaseProduct } = useCart();

  const cartItem = cartItems.find((item) => item.id === product.id);
  

  return (
    <div>
      {!cartItem ? (
        <Button
          onClick={() => handleIncreaseProduct(product.id)}
          className={"cursor-pointer"}
        >
          افزودن به سبد
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleIncreaseProduct(product.id)}
            className={"cursor-pointer"}
          >
            <Plus />
          </Button>
          <span>{cartItem.quantity}</span>
          <Button
            onClick={() => handleDecreaseProduct(product.id)}
            className={"cursor-pointer"}
            variant={"destructive"}
          >
            <Minus />
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddToCartBtn;
