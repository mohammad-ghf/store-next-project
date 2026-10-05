"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { User } from "../types/auth.types";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextProps = {
  user: User | null;
  isAuthComplate: boolean;
  isInitialized: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextProps);

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const isAuthComplate = user !== null;

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("user");
      }
    }

    setIsInitialized(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthComplate,
        login,
        logout,
        isInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
