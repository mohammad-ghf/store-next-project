"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { User } from "@/types/auth.types";

export default function ProfileInfo() {
  const { user, login } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    birthDate: "",
    email: "",
    nationalCode: "",
    shebaNumber: "",
  });

  // هماهنگ‌کردن فرم با اطلاعات کاربر واردشده
  useEffect(() => {
    if (!user) return;

    setFormData({
      username: user.username ?? user.id,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      phone: user.phone ?? "",
      birthDate: user.birthDate ?? "",
      email: user.email ?? "",
      nationalCode: user.nationalCode ?? "",
      shebaNumber: user.shebaNumber ?? "",
    });
  }, [user]);

  function handleChange(field: keyof typeof formData, value: string) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) return;

    const updatedUser: User = {
      ...user,
      ...formData,
    };

    // به‌روزرسانی Context و localStorage
    login(updatedUser);

    setIsEditing(false);
    setMessage("اطلاعات پروفایل ذخیره شد.");
  }

  if (!user) {
    return (
      <Card dir="rtl">
        <CardContent className="py-8 text-center text-muted-foreground">
          برای مشاهده پروفایل ابتدا وارد حساب کاربری شو.
        </CardContent>
      </Card>
    );
  }

  const fields = [
    {
      key: "username",
      label: "نام کاربری",
    },
    {
      key: "firstName",
      label: "نام",
    },
    {
      key: "lastName",
      label: "نام خانوادگی",
    },
    {
      key: "phone",
      label: "تلفن همراه",
      type: "tel",
    },
    {
      key: "birthDate",
      label: "تاریخ تولد",
      placeholder: "مثلاً ۱۳۸۵/۰۵/۲۰",
      type: "date",
    },
    {
      key: "email",
      label: "ایمیل",
      type: "email",
    },
    {
      key: "nationalCode",
      label: "کد ملی",
    },
    {
      key: "shebaNumber",
      label: "شماره شبا",
    },
  ] as const;

  return (
    <Card dir="rtl" className={cn("h-full rounded-2xl")}>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle className="text-lg font-semibold">اطلاعات کاربر</CardTitle>

        <Button
          type="button"
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={() => {
            setMessage("");

            if (isEditing) {
              setFormData({
                username: user.username ?? user.id,
                firstName: user.firstName ?? "",
                lastName: user.lastName ?? "",
                phone: user.phone ?? "",
                birthDate: user.birthDate ?? "",
                email: user.email ?? "",
                nationalCode: user.nationalCode ?? "",
                shebaNumber: user.shebaNumber ?? "",
              });
            }

            setIsEditing((current) => !current);
          }}
        >
          {isEditing ? "لغو ویرایش" : "ویرایش"}
        </Button>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.key}
                className="min-w-0 border-b border-border p-4"
              >
                <Label
                  htmlFor={field.key}
                  className="mb-3 block text-sm text-muted-foreground"
                >
                  {field.label}
                </Label>

                {isEditing ? (
                  <Input
                    id={field.key}
                    type={"type" in field ? field.type : "text"}
                    placeholder={
                      "placeholder" in field
                        ? field.placeholder
                        : `وارد کردن ${field.label}`
                    }
                    value={formData[field.key]}
                    onChange={(event) =>
                      handleChange(field.key, event.target.value)
                    }
                    className="text-right"
                    autoComplete="off"
                  />
                ) : (
                  <p className="min-h-5 wrap-break-word text-sm">
                    {formData[field.key] || "ثبت نشده"}
                  </p>
                )}
              </div>
            ))}
          </div>

          {message && (
            <p role="status" className="mt-4 text-sm text-green-600">
              {message}
            </p>
          )}

          {isEditing && (
            <div className="mt-5 flex gap-3">
              <Button type="submit">ذخیره تغییرات</Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    username: user.username ?? user.id,
                    firstName: user.firstName ?? "",
                    lastName: user.lastName ?? "",
                    phone: user.phone ?? "",
                    birthDate: user.birthDate ?? "",
                    email: user.email ?? "",
                    nationalCode: user.nationalCode ?? "",
                    shebaNumber: user.shebaNumber ?? "",
                  });
                  setIsEditing(false);
                  setMessage("");
                }}
              >
                انصراف
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
