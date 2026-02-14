"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/context/AuthContext";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      id: "1",
      name: "Mohammad",
      email,
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
          <h1 className="text-2xl font-bold">ورود به حساب</h1>
          <p className="text-sm text-muted-foreground">
            برای مشاهده محصولات وارد حساب خود شوید
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="email">ایمیل</label>

          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
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
            required
          />
        </div>

        <Button type="submit" className="w-full">
          ورود
        </Button>
      </form>
    </main>
  );
};

export default LoginPage;
