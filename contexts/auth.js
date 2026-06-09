"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext({ user: undefined });

export const AuthProvider = ({ children, fetchUser }) => {
  const [user, setUser] = useState(() => fetchUser);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("this contex does not availabale in this path");

  return ctx;
};
