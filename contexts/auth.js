"use client";

import { getCurrentUser } from "@/hooks/useGetUser";
import { useEffect } from "react";
import { useTransition } from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({ user: undefined, isLoading: false });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const user = await getCurrentUser();

      if (user) {
        setUser({ ...user });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("this contex does not availabale in this path");

  return ctx;
};
