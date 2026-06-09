import Link from "next/link";
import React, { useEffect, useState } from "react";
import LogoutBtn from "./LogoutBtn";
import { useAuth } from "@/contexts/auth";

const Avatar = () => {
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useEffect(() => {
  //   const handleClickWindow = (e) => {
  //     if (isMenuOpen) {
  //       setIsMenuOpen(false);
  //     }
  //   };

  //   window.addEventListener("click", handleClickWindow);

  //   return () => window.removeEventListener("click", handleClickWindow);
  // }, [isMenuOpen]);

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden hover:border-white transition-colors duration-300 focus:outline-none"
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="User Avatar"
            className="w-full h-full object-cover bg-indigo-900"
          />
        </button>

        {/* Popup Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-3 w-48 bg-[#0B0322] border border-white/10 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in duration-200">
            <Link
              href="/profile"
              className="block px-4 py-3 text-sm text-gray-200 hover:bg-white hover:text-[#08021C] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <LogoutBtn userId={user} />
          </div>
        )}
      </div>
    </>
  );
};

export default Avatar;
