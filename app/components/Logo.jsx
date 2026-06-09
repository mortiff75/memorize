import React from "react";

const LogoItem = ({ children, color, shape }) => (
  <div className="flex items-center space-x-2 opacity-50 hover:opacity-100 transition-opacity duration-300 flex-shrink-0 mx-12">
    {shape === "circle" && (
      <div
        className={`w-8 h-8 ${color} rounded-full flex items-center justify-center font-black italic text-[10px]`}
      >
        L
      </div>
    )}
    {shape === "square" && (
      <div
        className={`w-8 h-8 ${color} rounded-md flex items-center justify-center text-xs text-black font-bold`}
      >
        ●
      </div>
    )}
    {shape === "skew" && <div className={`w-8 h-8 ${color} skew-x-12`}></div>}
    {shape === "rect" && <div className={`w-10 h-6 ${color} rounded-sm`}></div>}
    {shape === "border" && (
      <div className="border-2 border-white px-2 py-1 font-bold text-xs uppercase tracking-tighter">
        Logo Ipsum
      </div>
    )}
    {shape !== "border" && (
      <span className="font-bold text-xl tracking-tight">logoipsum</span>
    )}
  </div>
);

const LogoMarquee = () => {
  const logos = [
    { color: "bg-blue-500", shape: "circle" },
    { color: "bg-lime-500", shape: "square" },
    { color: "bg-purple-500", shape: "skew" },
    { color: "bg-orange-600", shape: "rect" },
    { shape: "border" },
    { color: "bg-emerald-400", shape: "circle" },
    { color: "bg-indigo-500", shape: "rect" },
    { color: "bg-yellow-400", shape: "square" },
  ];

  return (
    <section className="w-full pb-20 pt-8 z-20 marquee-container">
      <div className="flex animate-scroll w-max">
        {/* Render logos twice for seamless loop */}
        {[...logos, ...logos].map((logo, index) => (
          <LogoItem key={index} {...logo} />
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;
