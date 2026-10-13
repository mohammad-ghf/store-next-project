"use client";
import { ChevronDown, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import { TbLogin } from "react-icons/tb";
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
import { useState } from "react";
import { useCart } from "@/features/cart/context/CartContext";

const Header = () => {
  const navigationItems = [
    { href: "/", label: "خانه" },
    { href: "/products", label: "محصولات" },
  ];

  const { isAuthComplate, logout } = useAuth();
  const { cartItems } = useCart();

  const [openProfile, setOpenProfile] = useState(false);

  const item = cartItems.length;

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
        <div className="flex gap-10">
          <Link
            href="/"
            className="text-4xl font-bold"
            aria-label="صفحه اصلی فروشگاه"
          >
            فروشگاه
          </Link>

          {/* Navbar */}
          <nav className="hidden items-center gap-6 md:flex">
            {navigationItems.map((item) => (
              <Link className={`text-xl`} key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* icons */}
        <div className="flex items-center gap-2 cursor-pointer">
          {isAuthComplate && (
            <div
              onClick={() => setOpenProfile(!openProfile)}
              className="ml-3 relative flex items-center"
            >
              <User />
              <ChevronDown size={18} />

              <div
                className={
                  openProfile
                    ? "absolute top-7 left-0 border border-black"
                    : "hidden"
                }
              >
                <Button
                  onClick={() => logout()}
                  variant={"ghost"}
                  className={
                    "flex  items-center gap-4 font-semibold cursor-pointer"
                  }
                >
                  <LogOut />
                  خروج از حساب کار بری
                </Button>
              </div>
            </div>
          )}

          {!isAuthComplate && (
            <Button variant="ghost" className="border border-gray-300">
              <Link href="/login" className="rounded-md p-2" aria-label="ورود">
                <p className="flex items-center gap-2 text-lg font-semibold">
                  {" "}
                  <TbLogin />
                  ورود | ثبت نام
                </p>
              </Link>
            </Button>
          )}

          {isAuthComplate && (
            <Link
              href="/cart"
              className="relative px-3 py-1 border-r border-gray-800"
              aria-label="سبد خرید"
            >
              <span
                className={
                  item === 0
                    ? "hidden"
                    : "absolute bg-red-500 h-2 w-2 rounded-full -top-1 right-2"
                }
              ></span>
              <ShoppingCart className="size-5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
