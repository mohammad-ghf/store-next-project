"use client";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";

type AddToWishlistBtnProps = {
  productId: string;
  className?: string;
};

const AddToWishlistBtn = ({ productId, className }: AddToWishlistBtnProps) => {
  const { user } = useAuth();

  const { isInWishlist, toggleWishlist, isWishlistInitialized } = useWishlist();
  const isFavorite = isInWishlist(productId);

  const handleToggleWishlist = () => {
    if (!user) {
      toast.info("برای افزودن محصول به علاقه‌مندی‌ها وارد حساب کاربری شوید.");
      return;
    }

    toggleWishlist(productId);

    toast.success(
      isFavorite
        ? "محصول از علاقه‌مندی‌ها حذف شد."
        : "محصول به علاقه‌مندی‌ها اضافه شد.",
    );
  };

  return (
    <button
      type="button"
      onClick={handleToggleWishlist}
      disabled={!isWishlistInitialized}
      aria-label={
        isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
      }
      aria-pressed={isFavorite}
      title={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      className={cn(
        "flex size-9 items-center justify-center rounded-full",
        "bg-white shadow-sm transition-all duration-200",
        "hover:scale-110 hover:bg-red-50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      <Heart
        className={cn(
          "size-5 transition-colors duration-200",
          isFavorite
            ? "fill-red-500 text-red-500"
            : "text-gray-500 hover:text-red-500",
        )}
      />
    </button>
  );
};

export default AddToWishlistBtn;
