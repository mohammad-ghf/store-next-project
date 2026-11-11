"use client";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

type WishlistContextType = {
  wishlistItems: string[];
  isWishlistInitialized: boolean;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
};

const WishlistContext = createContext({} as WishlistContextType);

export function useWishlist() {
  return useContext(WishlistContext);
}

type WishlistProviderProps = {
  children: ReactNode;
};

export function WishlistProvider({ children }: WishlistProviderProps) {
  const { user, isInitialized: isAuthInitialized } = useAuth();
  
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [isWishlistInitialized, setIsWishlistInitialized] = useState(false);

  const userId = user?.id ?? null;

  // بارگذاری علاقه‌مندی‌های کاربر فعلی
  useEffect(() => {
    if (!isAuthInitialized) return;

    setIsWishlistInitialized(false);

    if (!userId) {
      setWishlistItems([]);
      setIsWishlistInitialized(true);
      return;
    }

    try {
      const storageKey = `wishlistItems_${userId}`;
      const storedWishlist = localStorage.getItem(storageKey);

      if (storedWishlist) {
        const parsed: unknown = JSON.parse(storedWishlist);

        if (
          Array.isArray(parsed) &&
          parsed.every((id) => typeof id === "string")
        ) {
          setWishlistItems(parsed);
        } else {
          setWishlistItems([]);
        }
      } else {
        setWishlistItems([]);
      }
    } catch {
      setWishlistItems([]);
    } finally {
      setIsWishlistInitialized(true);
    }
  }, [userId, isAuthInitialized]);

  // ذخیره علاقه‌مندی‌های کاربر فعلی
  useEffect(() => {
    if (
      !isAuthInitialized ||
      !isWishlistInitialized ||
      !userId
    ) {
      return;
    }

    try {
      localStorage.setItem(
        `wishlistItems_${userId}`,
        JSON.stringify(wishlistItems),
      );
    } catch {
      console.error("ذخیره علاقه‌مندی‌ها انجام نشد.");
    }
  }, [wishlistItems, userId, isAuthInitialized, isWishlistInitialized]);

  // بررسی وجود محصول در علاقه‌مندی‌ها
  const isInWishlist = (id: string) => {
    return wishlistItems.includes(id);
  };

  // اضافه یا حذف محصول
  const toggleWishlist = (id: string) => {
    if (!userId || !isWishlistInitialized) return;

    setWishlistItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  // حذف محصول از علاقه‌مندی‌ها
  const removeFromWishlist = (id: string) => {
    if (!userId || !isWishlistInitialized) return;

    setWishlistItems((prev) =>
      prev.filter((itemId) => itemId !== id),
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems:
          userId && isWishlistInitialized ? wishlistItems : [],
        isWishlistInitialized,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
