import Link from "next/link";

const Footer = () => {
  const footerLinks = [
    { href: "/", label: "خانه" },
    { href: "/products", label: "محصولات" },
    { href: "/cart", label: "سبد خرید" },
  ];

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* title */}
          <div>
            <Link href="/" className="text-xl font-bold">
              فروشگاه
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              خریدی به صرفه با بهترین قیمت
            </p>
          </div>

          {/* Links */}
          <div>
            <h2 className="mb-3 font-semibold">دسترسی سریع</h2>

            <nav className="flex flex-col items-start gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-3 font-semibold">ارتباط با ما</h2>

            <p className="text-sm leading-6 text-muted-foreground">
                برای اطلاع از محصولات با ما در ارتباط باشید.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
