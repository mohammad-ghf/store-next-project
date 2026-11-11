import Link from "next/link";
import { Headset, AtSign, Send } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import Logo from "../../../public/logo.png"

const Footer = () => {
  const customerLinks = [
    { href: "#", label: "پرسش‌های متداول" },
    { href: "#", label: "راهنمای خرید" },
    { href: "#", label: "شرایط بازگشت کالا" },
    { href: "#", label: "ثبت شکایات" },
    { href: "#", label: "حریم خصوصی" },
  ];

  const categoryLinks = [
    { href: "/products?category=mobile", label: "گوشی موبایل" },
    { href: "/products?category=laptop", label: "لپ‌تاپ" },
    { href: "/products?category=gaming", label: "گیمینگ" },
    { href: "/products?category=home-appliances", label: "لوازم خانگی" },
    { href: "/products?category=digital", label: "کالای دیجیتال" },
    { href: "/products?category=clothing", label: "پوشاک" },
  ];

  const aboutLinks = [
    { href: "#", label: "تماس با ما" },
    { href: "#", label: "درباره ما" },
    { href: "#", label: "مجله فروشگاه" },
    { href: "#", label: "شرایط و قوانین" },
  ];

  return (
    <footer dir="rtl" className="border-t bg-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 space-y-4 md:col-span-1">
            <Link href="/" className="inline-block w-55 sm:w-40">
              <Image src={Logo} alt="logo"  />
            </Link>

            <p className="text-sm leading-7 text-muted-foreground">
              تجربه خریدی آسان، مطمئن و لذت‌بخش با بهترین قیمت‌ها. ما تلاش
              می‌کنیم محصولات باکیفیت را با مناسب‌ترین قیمت در اختیار شما قرار
              دهیم.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
                className="text-muted-foreground transition hover:text-red-600"
              >
                <FaInstagram size={23} />
              </Link>

              <Link
                href="https://t.me"
                target="_blank"
                aria-label="Telegram"
                className="text-muted-foreground transition hover:text-red-600"
              >
                <Send size={22} />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
                className="text-muted-foreground transition hover:text-red-600"
              >
                <FaLinkedin size={23} />
              </Link>
            </div>
          </div>

          {/* Customer Services */}
          <div>
            <h3 className="mb-5 font-bold">خدمات مشتریان</h3>

            <ul className="space-y-4">
              {customerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-red-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 font-bold">دسته‌بندی محصولات</h3>

            <ul className="space-y-4">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-red-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-5 font-bold">درباره فروشگاه</h3>

            <ul className="space-y-4">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-red-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-bold">ارتباط با ما</h3>

            <div className="space-y-5">
              <div>
                <p className="mb-2 text-xs text-muted-foreground">
                  ساعت پاسخگویی
                </p>
                <p className="text-sm leading-6">
                  شنبه تا پنجشنبه، ساعت ۹ الی ۱۸
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Headset className="shrink-0 text-red-600" size={25} />
                <div>
                  <p className="text-xs text-muted-foreground">تلفن پشتیبانی</p>
                  <a href="tel:02112345678" className="text-sm font-semibold">
                    ۰۲۱-۱۲۳۴۵۶۷۸
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <AtSign className="shrink-0 text-red-600" size={25} />
                <div>
                  <p className="text-xs text-muted-foreground">ایمیل</p>
                  <a
                    href="mailto:info@example.com"
                    className="text-sm font-semibold"
                  >
                    info@example.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-5 grid gap-8 pt-8 md:grid-cols-2 md:items-center">
          {/* Store Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold">
              فروشگاه اینترنتی <span className="text-red-600">دیجیتال</span>
            </h3>

            <p className="text-justify text-xs leading-7 text-muted-foreground">
              فروشگاه اینترنتی ما با هدف فراهم کردن تجربه‌ای متفاوت از خرید
              آنلاین فعالیت خود را آغاز کرده است. تلاش می‌کنیم با ارائه محصولات
              متنوع، قیمت مناسب و پشتیبانی پاسخگو، خریدی آسان و مطمئن را برای
              مشتریان فراهم کنیم. رضایت شما مهم‌ترین هدف ماست.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-5">
          <p className="text-center text-xs text-muted-foreground">
            © تمامی حقوق این وب‌سایت متعلق به فروشگاه دیجیتال است.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
