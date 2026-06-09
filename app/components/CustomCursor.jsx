"use client";

import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // بررسی اینکه آیا روی المنت‌های قابل کلیک هستیم
      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName === "A" ||
          target.tagName === "BUTTON",
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Outer Ring (Outline) */}
      <div
        className="fixed top-0 left-0 w-10 h-10 border-2 rounded-full pointer-events-none z-9999 transition-transform duration-150 ease-out hidden md:block"
        style={{
          borderColor: "#161850",
          transform: `translate(${position.x - 20}px, ${position.y - 20}px) scale(${isPointer ? 1.5 : 1})`,
        }}
      />

      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out hidden md:block"
        style={{
          backgroundColor: "#3A1A6F",
          transform: `translate(${position.x - 6}px, ${position.y - 6}px) scale(${isPointer ? 0.5 : 1})`,
        }}
      />
    </>
  );
};

export default CustomCursor;
