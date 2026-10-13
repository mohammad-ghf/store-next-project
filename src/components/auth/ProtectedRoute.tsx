"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthComplate, isInitialized } = useAuth();

  useEffect(() => {
    if (isInitialized && !isAuthComplate) {
      router.replace("/login");
    }
  }, [isAuthComplate, router, isInitialized]);

  if (!isInitialized) {
    return null;
  }

  if (!isAuthComplate) {
    return null;
  }

  return children;
}
