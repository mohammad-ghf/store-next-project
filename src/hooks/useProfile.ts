
"use client";
import { useEffect, useState } from "react";
import {
  defaultProfile,
  type UserProfile,
} from "@/types/profile.types";

const STORAGE_KEY = "userProfile";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isLoaded, setIsLoaded] = useState(false);

  // دریافت اطلاعات ذخیره‌شده هنگام باز شدن صفحه
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(STORAGE_KEY);

      if (storedProfile) {
        const parsedProfile: unknown = JSON.parse(storedProfile);

        if (
          typeof parsedProfile === "object" &&
          parsedProfile !== null &&
          "firstName" in parsedProfile &&
          "lastName" in parsedProfile &&
          "email" in parsedProfile &&
          "phone" in parsedProfile &&
          typeof parsedProfile.firstName === "string" &&
          typeof parsedProfile.lastName === "string" &&
          typeof parsedProfile.email === "string" &&
          typeof parsedProfile.phone === "string"
        ) {
          setProfile({
            firstName: parsedProfile.firstName,
            lastName: parsedProfile.lastName,
            email: parsedProfile.email,
            phone: parsedProfile.phone,
          });
        }
      }
    } catch {
      console.error("خطا در خواندن اطلاعات پروفایل");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // تغییر یک فیلد از پروفایل
  function updateField<K extends keyof UserProfile>(
    field: K,
    value: UserProfile[K],
  ) {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }));
  }

  // ذخیره اطلاعات
  function saveProfile() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      return true;
    } catch {
      console.error("خطا در ذخیره اطلاعات پروفایل");
      return false;
    }
  }

  return {
    profile,
    updateField,
    saveProfile,
    isLoaded,
  };
}
