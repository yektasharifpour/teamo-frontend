import { createContext, useEffect, useState } from "react";

import type { ReactNode } from "react";

import type { User } from "../types/user";
import { getCurrentUser } from "../../../services/authService";

interface AuthContextType {
  user: User | null;

  token: string | null;

  isAuthenticated: boolean;

  login: (token: string, user: User) => void;

  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const restoreUser = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        return;
      }

      try {
        setToken(storedToken);

        const currentUser = await getCurrentUser(storedToken);

        setUser(currentUser);
      } catch (error) {
        console.error(error);

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);
      }
    };

    restoreUser();
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);

    setToken(token);

    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);

    setUser(null);
  };
  console.log({
    user,
    token,
    isAuthenticated: !!token,
  });
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
