"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const router = useRouter();
  const { loginWithCredentials } = useAuth();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const success = loginWithCredentials(id, password);

    if (!success) {
      setError("شناسه یا رمز عبور اشتباه است.");
      return;
    }

    router.push("/");
  };

  return (
    <main className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-xl border bg-card p-6"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">ورود به حساب</h1>
          <p className="text-sm text-muted-foreground">
            برای مشاهده محصولات وارد حساب خود شوید
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="id">نام کاربری</label>
          <Input
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="نام کاربری"
            autoComplete="username"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password">رمز عبور</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full">
          ورود
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          حساب کاربری نداری؟{" "}
          <Link href="/register" className="text-primary hover:underline">
            ثبت‌نام کن
          </Link>
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
