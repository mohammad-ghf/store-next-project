import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";

export default function NotFound() {
  return (
    <section className=" mx-auto flex items-center justify-center bg-gray-100 min-h-120">
      <div className="flex items-center justify-between w-[60%] bg-white p-12">
        <Image src={Logo} alt="logo" />

        <main className="flex flex-col items-center gap-4">
          <h1 className="text-8xl font-bold text-red-600">404</h1>

          <h2 className="text-2xl font-bold">صفحه مورد نظر پیدا نشد!</h2>

          <Link
            href="/"
            className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
          >
            بازگشت به صفحه اصلی
          </Link>
        </main>
      </div>
    </section>
  );
}
