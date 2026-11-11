import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

type ProviderProps = {
  children: React.ReactNode;
};
const Providers = ({ children }: ProviderProps) => {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
};

export default Providers;
