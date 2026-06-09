"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Avatar from "./Avatar";
import { useAuth } from "@/contexts/auth";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, isLoading } = useAuth();

  const patheName = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  const navRefs = useRef([]);

  const [pinStyle, setPinStyle] = useState({ x: 0, width: 0, opacity: 0 });

  const navLinks = [
    { title: "memories", link: "/memories" },
    { title: "create", link: "/memories/create" },
    { title: "why us ?", link: "/why-us" },
    { title: "contact us", link: "/contact-us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeIndex = navLinks.findIndex((link) => link.link === patheName);

    if (activeIndex !== -1 && navRefs.current[activeIndex]) {
      const el = navRefs.current[activeIndex];

      setPinStyle({
        x: el.offsetLeft - el.offsetWidth * 0.6,
        opacity: 1,
        width: el.offsetWidth,
      });
    } else {
      setPinStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [patheName]);

  return (
    <nav
      className={`flex items-center justify-between px-6 md:px-16 py-8 w-full z-50 fixed top-0 left-0 transition-all duration-500 ease-in-out ${
        isScrolled ? "bg-[#0B0322]  py-5 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <svg
          width="34"
          height="34"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 15.5 32 12 28 12C24 12 22 15 22 18C22 21 24 23 26 23C28 23 30 21 30 18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="20" cy="20" r="2" fill="white" />
        </svg>
      </div>

      {/* Menu Links */}
      <div className="hidden md:flex items-center space-x-2">
        {navLinks.map((link, index) => (
          <Link
            key={link.link}
            href={link.link}
            ref={(el) => (navRefs.current[index] = el)}
            className={`nav-link ${link.link === patheName ? "active" : ""}`}
          >
            {link.title.toLocaleUpperCase()}
          </Link>
        ))}
      </div>

      <motion.div
        className="absolute bottom-3 flex justify-center pointer-events-none"
        initial={false}
        animate={{
          x: pinStyle.x,
          width: pinStyle.width,
          opacity: pinStyle.opacity,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      >
        <div className="flex justify-center w-full ">
          {/* Custom Pin SVG */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
          </svg>
        </div>
      </motion.div>

      {/* Download Button */}

      {!isLoading && user && <Avatar />}
    </nav>
  );
};

export default Navbar;
