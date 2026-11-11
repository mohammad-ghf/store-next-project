"use client";
import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProfileForm = () => {
  const { profile, updateField, saveProfile, isLoaded } = useProfile();
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const saved = saveProfile();

    setMessage(
      saved
        ? "اطلاعات پروفایل با موفقیت ذخیره شد."
        : "ذخیره اطلاعات انجام نشد. دوباره تلاش کن.",
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        در حال بارگذاری اطلاعات...
      </div>
    );
  }

  const fields = [
    {
      name: "firstName" as const,
      label: "نام",
      placeholder: "نام خود را وارد کنید",
    },
    {
      name: "lastName" as const,
      label: "نام خانوادگی",
      placeholder: "نام خانوادگی خود را وارد کنید",
    },
    {
      name: "email" as const,
      label: "ایمیل",
      placeholder: "example@email.com",
      type: "email",
    },
    {
      name: "phone" as const,
      label: "شماره موبایل",
      placeholder: "09xxxxxxxxx",
      type: "tel",
    },
  ];

  return (
    <Card className={cn("w-full rounded-2xl shadow-sm")}>
      <CardHeader>
        <CardTitle className="text-xl">اطلاعات پروفایل</CardTitle>
        <CardDescription>
          اطلاعات حساب کاربری خود را ویرایش کنید.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>

                <Input
                  id={field.name}
                  type={field.type ?? "text"}
                  placeholder={field.placeholder}
                  value={profile[field.name]}
                  onChange={(event) => {
                    updateField(field.name, event.target.value);
                    setMessage("");
                  }}
                  autoComplete={
                    field.name === "firstName"
                      ? "given-name"
                      : field.name === "lastName"
                        ? "family-name"
                        : field.name === "email"
                          ? "email"
                          : "tel"
                  }
                />
              </div>
            ))}
          </div>

          {message && (
            <p
              role="status"
              className={cn(
                "text-sm",
                message.startsWith("اطلاعات")
                  ? "text-green-600"
                  : "text-destructive",
              )}
            >
              {message}
            </p>
          )}

          <Button type="submit" className="w-full sm:w-auto">
            ذخیره تغییرات
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default ProfileForm;
