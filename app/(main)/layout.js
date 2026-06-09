import { AuthProvider } from "@/contexts/auth";
import React from "react";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "@/hooks/useGetUser";
import { ToastContainer } from "react-toastify";

const MainLayout = async ({ children }) => {
  const user = await getCurrentUser();

  return (
    <AuthProvider fetchUser={user}>
      <Navbar />
      {children}
      <ToastContainer />
    </AuthProvider>
  );
};

export default MainLayout;
