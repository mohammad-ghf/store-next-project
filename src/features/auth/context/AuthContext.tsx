"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types/auth.types";
import { getUsers, registerUser, validateUser } from "../utils/auth-storage";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextProps = {
  user: User | null;
  isAuthComplate: boolean;
  isInitialized: boolean;
  register: (id: string, password: string) => boolean;
  loginWithCredentials: (id: string, password: string) => boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const isAuthComplate = user !== null;

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const register = (id: string, password: string): boolean => {
    const normalizedId = id.trim();

    if (!normalizedId || !password) {
      return false;
    }

    return registerUser({
      id: normalizedId,
      password,
    });
  };

  const loginWithCredentials = (id: string, password: string): boolean => {
    const matchedUser = validateUser(id, password);

    if (!matchedUser) {
      return false;
    }

    login(matchedUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        const registeredUsers = getUsers();

        const matchedUser = registeredUsers.find(
          (item) =>
            item.id === parsedUser.id && item.password === parsedUser.password,
        );

        if (matchedUser) {
          setUser(matchedUser);
        } else {
          localStorage.removeItem("user");
        }
      }
    } catch {
      localStorage.removeItem("user");
    } finally {
      setIsInitialized(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthComplate,
        isInitialized,
        register,
        loginWithCredentials,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
