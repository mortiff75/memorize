"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const MemoryFilter = () => {
  const { register, watch } = useForm();

  const count = useRef(0);

  const router = useRouter();

  const title = watch("title");
  const date = watch("date_memory");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();

      if (count.current > 0) {
        if (title) params.set("title", title);

        if (date) params.set("date_memory", date);

        router.push(`/memories?${params.toString()}`);
      }
      count.current += 1;
    }, 500); // نیم ثانیه صبر

    return () => clearTimeout(timeout);
  }, [title, date]);
  return (
    <form className="flex flex-col gap-6 bg-white/5 p-6 rounded-[2.5rem] backdrop-blur-xl border border-white/10 w-full lg:max-w-2xl">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative grow">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            {...register("title")}
            placeholder="Search by title..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Categories Dropdown or Small Chips */}
      </div>

      {/* Year Range Slider */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs font-semibold text-gray-400 uppercase tracking-widest">
          <span>Time Range</span>
          <span className="text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md">
            {watch().date_memory}
          </span>
        </div>

        <div className="relative h-6 flex items-center">
          <input
            type="range"
            min={1950}
            max={new Date().getFullYear()}
            {...register("date_memory")}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="absolute -bottom-6 w-full flex justify-between text-[10px] text-gray-500 font-bold">
            <span>{1950}</span>
            <span>{2026}</span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MemoryFilter;
