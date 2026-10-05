"use client";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CartItem = {
  id: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  handleIncreaseProduct: (id: string) => void;
  handleDecreaseProduct: (id: string) => void;
  handleDeleteProduct: (id: string) => void;
};

const CartContext = createContext({} as CartContextType);

export function useCart() {
  return useContext(CartContext);
}

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleIncreaseProduct = (id: string) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === id);

      if (!exist) {
        return [...prev, { id, quantity: 1 }];
      }

      return prev.map((item) => {
        return item.id === id ? { ...item, quantity: item.quantity + 1 } : item;
      });
    });
  };

  const handleDecreaseProduct = (id: string) => {
    setCartItems((prev) => {
      const isLastOne = prev.find((item) => item.id === id)?.quantity === 1;

      if (isLastOne) {
        return prev.filter((item) => item.id !== id);
      }

      return prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      );
    });
  };

  const handleDeleteProduct = (id: string) => {
    setCartItems((prev) => {
      return prev.filter(item => item.id !== id)
    })
  }

  useEffect(() => {
    const storedCartItem = localStorage.getItem("cartItems");

    if (storedCartItem) {
      setCartItems(JSON.parse(storedCartItem))
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleIncreaseProduct,
        handleDecreaseProduct,
        handleDeleteProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
