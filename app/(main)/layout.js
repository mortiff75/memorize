import { AuthProvider } from "@/contexts/auth";
import React from "react";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";

const MainLayout = async ({ children }) => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        {children}
        <ToastContainer />
      </AuthProvider>
    </>
  );
};

export default MainLayout;
