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
  registerSchema,
  type RegisterFormData,
} from "@/schemas/register.schema";

const RegisterPage = () => {
  const router = useRouter();

  const { register: registerUser, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      id: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    const normalizedId = data.id.trim();

    const success = registerUser(normalizedId, data.password);

    if (!success) {
      toast.error("این شناسه قبلاً ثبت شده است.");
      return;
    }

    login({
      id: normalizedId,
      password: data.password,
    });

    toast.success("حساب کاربری با موفقیت ایجاد شد.");
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">ثبت‌نام</h1>

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
            <p role="alert" className="mt-1 text-sm text-destructive">
              {errors.id.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password">رمز عبور</label>

          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="رمز عبور خود را وارد کنید"
            {...register("password")}
          />

          {errors.password && (
            <p role="alert" className="mt-1 text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword">تکرار رمز عبور</label>

          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="رمز عبور را دوباره وارد کنید"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p role="alert" className="mt-1 text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          ثبت‌نام
        </Button>
      </form>

      <p className="mt-4 text-sm">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <Link href="/login" className="text-primary">
          ورود
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
