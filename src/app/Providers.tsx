import { AuthProvider } from "@/features/auth/context/AuthContext";
import { CartProvider } from "@/features/cart/context/CartContext";

type ProviderProps = {
  children: React.ReactNode;
};
const Providers = ({ children }: ProviderProps) => {
  return (
    <div>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </div>
  );
};

export default Providers;
