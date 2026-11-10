"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

import {
  loginSchema,
  type LoginFormData,
} from "@/schemas/login.schema";

const LoginPage = () => {
  const router = useRouter();
  const { loginWithCredentials } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    const success = loginWithCredentials(data.id, data.password);

    if (!success) {
      toast.error("شناسه یا رمز عبور اشتباه است.");
      return;
    }

    toast.success("ورود با موفقیت انجام شد.");
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">ورود</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="id">نام کاربری</label>

          <Input
            id="id"
            type="text"
            autoComplete="username"
            placeholder="نام کاربری خود را وارد کنید"
            {...register("id")}
          />

          {errors.id && (
            <p className="mt-1 text-sm text-destructive">
              {errors.id.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password">رمز عبور</label>

          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="رمز عبور خود را وارد کنید"
            {...register("password")}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          ورود
        </Button>
      </form>

      <p className="mt-4 text-sm">
        حساب کاربری ندارید؟{" "}
        <Link href="/register" className="text-primary">
          ثبت‌نام
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
