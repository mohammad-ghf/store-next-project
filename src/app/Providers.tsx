import { CartProvider } from "@/features/cart/context/CartContext";

type ProviderProps = {
  children: React.ReactNode;
};
const Providers = ({ children }: ProviderProps) => {
  return (
    <div>
      <CartProvider>{children}</CartProvider>
    </div>
  );
};

export default Providers;
