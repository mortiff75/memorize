import Image from "next/image";
import React from "react";

const Hero = () => {
  const line1 = "Get Everyone Working";
  const line2 = "On A Memmory Platform";

  const renderGlitchText = (text) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        data-char={char}
        className={char === " " ? "inline-block w-4" : "glitch-char"}
      >
        {char}
      </span>
    ));
  };

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{
        background:
          "radial-gradient(circle at 50% 40%, #1c0a4d 0%, #050114 70%)",
      }}
    >
      {/* لایه تصویر مغز که در globals.css تعریف شده است */}
      <Image
        fill
        src={"/images/brain.png"}
        className="brain-overlay"
        loading="eager"
        alt="hero section bg"
      />

      <div className="max-w-6xl z-10 mt-12">
        <h1 className="heading-font text-5xl md:text-[88px] mb-12 select-none">
          <div className="flex flex-wrap justify-center">
            {renderGlitchText(line1)}
          </div>
          <div className="flex flex-wrap justify-center">
            {renderGlitchText(line2)}
          </div>
        </h1>

        <button className="bg-white text-[#050114] px-10 py-4 rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all">
          Write a New Memmory
        </button>
      </div>
    </main>
  );
};

export default Hero;
