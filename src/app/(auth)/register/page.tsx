"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

const RegisterPage = () => {
  const router = useRouter();
  const { register, login } = useAuth();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const normalizedId = id.trim();

    if (!normalizedId) {
      setError("نام کاربری را وارد کنید");
      return;
    }

    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }

    const success = register(normalizedId, password);

    if (!success) {
      setError("این شناسه قبلاً ثبت شده است.");
      return;
    }

    login({
      id: normalizedId,
      password,
    });

    router.push("/");
  };

  return (
    <main className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-xl border bg-card p-6"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">ساخت حساب کاربری</h1>
          <p className="text-sm text-muted-foreground">
            برای ساخت حساب، اطلاعات زیر را وارد کنید.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="id">شناسه کاربری</label>
          <Input
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="یک شناسه انتخاب کنید"
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
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword">تکرار رمز عبور</label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full">
          ثبت‌نام
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          قبلاً حساب ساخته‌ای؟{" "}
          <Link href="/login" className="text-primary hover:underline">
            وارد شو
          </Link>
        </p>
      </form>
    </main>
  );
};

export default RegisterPage;
