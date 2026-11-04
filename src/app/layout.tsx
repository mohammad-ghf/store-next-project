import type { Metadata } from "next";
import { vazirmatn } from "./fonts";
import "./globals.css";
import StoreLayout from "@/components/layout/StoreLayout";
import Providers from "./Providers";
import ThemeRegistry from "./ThemeRegistry";

export const metadata: Metadata = {
  title: "فروشگاه اینترنتی",
  description: "فروشگاه اینترنتی با بهترین قیمت",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable}`}>
        <ThemeRegistry>
          <Providers>
            <StoreLayout>{children}</StoreLayout>
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
