"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { Product } from "@/types/product.types";
import { useCart } from "@/context/CartContext";

type AddToCartProps = {
  product: Product;
};

const AddToCartBtn = ({ product }: AddToCartProps) => {
  const {
    handleIncreaseProduct,
    cartItems,
    handleDecreaseProduct,
    handleDeleteProduct,
  } = useCart();

  const cartItem = cartItems.find((item) => item.id === product.id);

  return (
    <div className="inline-block">
      {!cartItem ? (
        <Button
          onClick={() => handleIncreaseProduct(product.id)}
          className={"cursor-pointer"}
        >
          افزودن به سبد
        </Button>
      ) : (
        <div className="flex items-center gap-1 px-0.5 border-2 shadow">
          <Button
            onClick={() => handleIncreaseProduct(product.id)}
            className={"cursor-pointer"}
            variant={"ghost"}
          >
            <Plus color="red" />
          </Button>

          <span className="text-red-600">{cartItem.quantity}</span>

          {cartItem.quantity !== 1 ? (
            <Button
              onClick={() => handleDecreaseProduct(product.id)}
              className={"cursor-pointer"}
              variant={"ghost"}
            >
              <Minus color="red" />
            </Button>
          ) : (
            <div
              onClick={() => handleDeleteProduct(product.id)}
              className="pr-2 cursor-pointer"
            >
              <Trash color="red" size={19} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddToCartBtn;
