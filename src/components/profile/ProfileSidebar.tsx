"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserRound,
  MapPin,
  ShoppingCart,
  Heart,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const menuItems = [
  {
    label: "اطلاعات کاربری",
    icon: UserRound,
    href: "#profile-info",
    active: true,
  },
  { label: "لیست نشانی‌ها", icon: MapPin, href: "#addresses", active: false },
  { label: "سفارش‌های من", icon: ShoppingCart, href: "#orders", active: false },
  {
    label: "کالاهای موردعلاقه",
    icon: Heart,
    href: "/wishlist",
    active: false,
  },
  { label: "دیدگاه‌ها", icon: MessageSquare, href: "#comments", active: false },
];

const ProfileSidebar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    toast.success("با موفقیت از حساب کاربری خارج شدید");
    router.replace("/login");
  }

  return (
    <aside
      dir="rtl"
      className="h-fit w-full rounded-2xl bg-white p-4 shadow-sm"
    >
      <div className="mb-5 flex items-center gap-3 px-2 py-2">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-red-500 text-red-500">
          <UserRound size={32} />
        </div>

        <div className="min-w-0">
          <p className="truncate font-semibold">
            {user?.username || user?.id || "کاربر"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
            {user?.phone || "شماره تلفن ثبت نشده"}
          </p>
        </div>
      </div>

      <nav className="space-y-1">
        {menuItems.map(({ label, icon: Icon, href, active }) => (
          <Link
            key={label}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-3 transition-colors",
              active ? "text-red-500" : "text-foreground hover:bg-gray-50",
            )}
          >
            <Icon
              size={23}
              className={cn(
                "shrink-0",
                active ? "text-red-500" : "text-gray-400",
              )}
            />
            <span className="text-sm">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="my-4 border-t" />

      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-foreground transition-colors hover:bg-gray-50"
      >
        <LogOut size={23} className="text-gray-400" />
        <span className="text-sm">خروج</span>
      </button>
    </aside>
  );
};

export default ProfileSidebar;
