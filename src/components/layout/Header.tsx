"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Menu,
  ShoppingCart,
  User,
  Search,
  X,
  ShoppingBag,
  House,
  BookOpen,
} from "lucide-react";
import { TbLogin } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/", label: "خانه", icon: House },
  { href: "/products", label: "محصولات", icon: ShoppingBag },
  { href: "/about-us", label: "درباره ما", icon: BookOpen },
];

const Header = () => {
  const { isAuthComplate } = useAuth();
  const { cartItems } = useCart();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const profileRef = useRef<HTMLDivElement>(null);
  const itemCount = cartItems.length;
  const pathname = usePathname();

  // بستن منوی پروفایل با کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // بستن منوی موبایل با کلید Escape
  useEffect(() => {
    if (!openMobileMenu) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMobileMenu(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openMobileMenu]);

  // جست‌وجوی محصولات
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchValue.trim();

    if (!query) return;

    window.location.href = `/products?search=${encodeURIComponent(query)}`;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
      <div
        dir="rtl"
        className="flex min-h-16 max-w-[1600px] items-center justify-between gap-3 px-4 py-3 md:min-h-21 md:gap-6 md:px-8"
      >
        {/* لوگو و جست‌وجو */}
        <div className="flex items-center">
          {/* لوگو */}
          <Link
            href="/"
            aria-label="صفحه اصلی فروشگاه"
            className="flex shrink-0 items-center gap-2 text-red-600 no-underline"
          >
            <span className="whitespace-nowrap text-lg font-black md:text-3xl">
              فروشگاه
            </span>
          </Link>

          {/* جست‌وجو - فقط دسکتاپ */}
          <form
            onSubmit={handleSearch}
            className="hidden w-full md:order-0 md:mx-auto md:block md:max-w-192.5"
          >
            <div className="mr-6 flex w-160 items-center rounded-full bg-[#f5f5f5] px-2">
              <button
                type="submit"
                aria-label="جست‌وجو"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-red-600 transition hover:bg-red-50"
              >
                <Search size={27} />
              </button>

              <input
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="جستجو..."
                aria-label="جست‌وجو در فروشگاه"
                className="h-full min-w-0 flex-1 bg-transparent px-2 text-right text-sm text-gray-800 outline-none placeholder:text-gray-400 md:text-base"
              />
            </div>
          </form>
        </div>

        {/* آیکون‌های دسکتاپ */}
        <div className="hidden shrink-0 items-center gap-2 md:flex md:gap-3">
          {isAuthComplate ? (
            <>
              {/* حساب کاربری */}
              <div ref={profileRef} className="relative">
                <Link
                  href="/profile"
                  aria-label="حساب کاربری"
                  aria-expanded={openProfile}
                  onClick={() => setOpenProfile((prev) => !prev)}
                  className="flex h-11 items-center gap-1 rounded-full px-2 text-gray-700 transition hover:bg-gray-50 md:border md:border-gray-200 md:px-3"
                >
                  <User size={21} />
                </Link>
              </div>

              {/* سبد خرید */}
              <Link
                href="/cart"
                aria-label="سبد خرید"
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-red-600 transition hover:bg-red-50"
              >
                <ShoppingCart size={22} />

                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              {/* ورود و ثبت‌نام */}
              <Link
                href="/login"
                aria-label="ورود و ثبت‌نام"
                className="flex h-11 items-center gap-2 whitespace-nowrap rounded-xl border border-gray-200 px-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 sm:px-3 md:text-base"
              >
                <TbLogin size={22} />
                <span className="hidden sm:inline">ورود | ثبت‌نام</span>
              </Link>

              {/* سبد خرید */}
              <Link
                href="/cart"
                aria-label="سبد خرید"
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-red-600 transition hover:bg-red-50"
              >
                <ShoppingCart size={22} />

                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </Link>
            </>
          )}
        </div>

        {/* دکمه همبرگر - فقط موبایل */}
        <button
          type="button"
          aria-label={openMobileMenu ? "بستن منو" : "باز کردن منو"}
          aria-expanded={openMobileMenu}
          onClick={() => setOpenMobileMenu((prev) => !prev)}
          className="flex h-11 w-10 shrink-0 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-100 md:hidden"
        >
          {openMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* منوی دسکتاپ */}
      <div className="hidden gap-7 px-6 md:flex py-3 ">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1 font-bold text-xl ${pathname === item.href ? "text-red-600" : "text-black"}`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* منوی موبایل */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          openMobileMenu ? "visible" : "invisible"
        }`}
      >
        {/* پس‌زمینه تاریک */}
        <button
          type="button"
          aria-label="بستن منو"
          onClick={() => setOpenMobileMenu(false)}
          className={`absolute inset-0 h-full w-full bg-black/40 transition-opacity ${
            openMobileMenu ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* پنل منو */}
        <aside
          dir="rtl"
          aria-label="منوی موبایل"
          className={`absolute right-0 top-0 flex h-full w-[min(300px,85vw)] flex-col bg-white shadow-xl transition-transform duration-300 ${
            openMobileMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* عنوان منو */}
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-5">
            <span className="text-lg font-bold text-gray-800">
              منوی فروشگاه
            </span>

            <button
              type="button"
              aria-label="بستن منو"
              onClick={() => setOpenMobileMenu(false)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex flex-col gap-1 p-3">
            {/* لینک‌های اصلی */}
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpenMobileMenu(false)}
                  className={`${pathname === item.href ? "text-red-600" : "text-gray-700"} flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-red-50 hover:text-red-600`}
                >
                  <Icon />
                  {item.label}
                </Link>
              );
            })}

            <div className="my-2 border-t border-gray-100" />

            {/* حساب کاربری یا ورود */}
            {isAuthComplate ? (
              <Link
                href="/profile"
                onClick={() => setOpenMobileMenu(false)}
                className={`${pathname.startsWith("/profile") ? "text-red-600" : "text-gray-700"} flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-red-50 hover:text-red-600`}
              >
                <User size={20} />
                حساب کاربری
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpenMobileMenu(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-red-50 hover:text-red-600"
              >
                <TbLogin size={20} />
                ورود | ثبت‌نام
              </Link>
            )}

            {/* سبد خرید */}
            <Link
              href="/cart"
              onClick={() => setOpenMobileMenu(false)}
              className={`${pathname.startsWith("/cart") ? "text-red-600" : "text-gray-700"} flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition hover:bg-red-50 hover:text-red-600`}
            >
              <ShoppingCart size={20} />

              <span>سبد خرید</span>

              {itemCount > 0 && (
                <span className="mr-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </aside>
      </div>
    </header>
  );
};

export default Header;
