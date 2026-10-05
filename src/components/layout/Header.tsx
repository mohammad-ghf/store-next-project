"use client";
import { LogOut, Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useAuth } from "@/features/auth/context/AuthContext";

const Header = () => {
  const navigationItems = [
    { href: "/", label: "خانه" },
    { href: "/products", label: "محصولات" },
  ];

  const { isAuthComplate, logout } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger render={<Button className="cursor-pointer" />}>
              <Menu />
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>منوی فروشگاه</SheetTitle>
              </SheetHeader>

              <nav className="mt-6 flex flex-col gap-2 px-4">
                {navigationItems.map((item) => (
                  <Link href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        {/* end mobile menu */}

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold"
          aria-label="صفحه اصلی فروشگاه"
        >
          فروشگاه
        </Link>

        {/* Navbar */}
        <nav className="hidden items-center gap-6 md:flex">
          {navigationItems.map((item) => (
            <Link className="text-lg" key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* icons */}
        <div className="flex items-center gap-2">
          {isAuthComplate && (
            <Button variant="ghost">
              <Link
                href="/cart"
                className="relative rounded-md p-2 transition-colors hover:bg-muted"
                aria-label="سبد خرید"
              >
                <ShoppingCart className="size-5" />
              </Link>
            </Button>
          )}

          {!isAuthComplate && (
            <Button variant="ghost">
              <Link
                href="/login"
                className="rounded-md p-2 transition-colors hover:bg-muted"
                aria-label="ورود"
              >
                <User className="size-5" />
              </Link>
            </Button>
          )}

          {isAuthComplate && (
            <Button onClick={logout}>
              {" "}
              <LogOut />{" "}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
