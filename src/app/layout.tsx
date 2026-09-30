import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import StoreLayout from "@/components/layout/StoreLayout";
import Providers from "./Providers";

const VazirmatnّFont = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "فروشگاه اینترنتی",
  description: "فروشگاه اینترنتی با بهترین قیمت",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${VazirmatnّFont.variable}`}>
        <Providers>
          <StoreLayout>{children}</StoreLayout>
        </Providers>
      </body>
    </html>
  );
}
