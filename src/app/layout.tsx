import type { Metadata } from "next";
import { vazirmatn } from "./fonts";
import "./globals.css";
import StoreLayout from "@/components/layout/StoreLayout";
import Providers from "./Providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "فروشگاه اینترنتی",
  description: "فروشگاه اینترنتی با بهترین قیمت",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable}`}>
          <Providers>
            <StoreLayout>
              {children}
              <Toaster position="top-center" richColors />
            </StoreLayout>
          </Providers>
      </body>
    </html>
  );
}
