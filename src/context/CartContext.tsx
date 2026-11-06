"use client";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

type CartItem = {
  id: string;
  quantity: number;
  price: number;
  isDiscounted: boolean;
};

type CartContextType = {
  cartItems: CartItem[];
  handleIncreaseProduct: (
    id: string,
    price: number,
    isDiscounted?: boolean,
  ) => void;
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
  const { user, isInitialized: isAuthInitialized } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartInitialized, setIsCartInitialized] = useState(false);

  const userId = user?.id ?? null;

  // تغییر حساب: سبد همان کاربر را بارگذاری می‌کنیم
  useEffect(() => {
    if (!isAuthInitialized) return;

    setIsCartInitialized(false);

    if (!userId) {
      setCartItems([]);
      setIsCartInitialized(true);
      return;
    }

    try {
      const storageKey = `cartItems_${userId}`;
      const storedCart = localStorage.getItem(storageKey);

      if (storedCart) {
        const parsed: unknown = JSON.parse(storedCart);

        if (
          Array.isArray(parsed) &&
          parsed.every(
            (item) =>
              item !== null &&
              typeof item === "object" &&
              typeof item.id === "string" &&
              typeof item.quantity === "number" &&
              Number.isFinite(item.quantity) &&
              item.quantity > 0,
          )
        ) {
          setCartItems(parsed as CartItem[]);
        } else {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    } catch {
      setCartItems([]);
    } finally {
      setIsCartInitialized(true);
    }
  }, [userId, isAuthInitialized]);

  // ذخیره سبد فقط برای حساب فعلی
  useEffect(() => {
    if (!isAuthInitialized || !isCartInitialized || !userId) return;

    try {
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
    } catch {
      console.error("ذخیره سبد خرید انجام نشد.");
    }
  }, [cartItems, userId, isAuthInitialized, isCartInitialized]);

  const handleIncreaseProduct = (
    id: string,
    price: number,
    isDiscounted = false,
  ) => {
    if (!userId || !isCartInitialized) return;

    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === id);

      if (exist) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...prev,
        {
          id,
          quantity: 1,
          price,
          isDiscounted,
        },
      ];
    });
  };

  const handleDecreaseProduct = (id: string) => {
    if (!userId || !isCartInitialized) return;

    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === id);

      if (!exist) return prev;

      if (exist.quantity <= 1) {
        return prev.filter((item) => item.id !== id);
      }

      return prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      );
    });
  };

  const handleDeleteProduct = (id: string) => {
    if (!userId || !isCartInitialized) return;

    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: userId && isCartInitialized ? cartItems : [],
        handleIncreaseProduct,
        handleDecreaseProduct,
        handleDeleteProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
