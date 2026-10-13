import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

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
