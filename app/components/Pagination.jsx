"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ totalItems, itemsPerPage, currentPage }) => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  console.log(currentPage);

  const onPageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", newPage.toString());

    router.push(`/memories?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-16">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
              currentPage === number
                ? "text-[#050114]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {+currentPage === number && (
              <motion.div
                layoutId="activePage"
                className="absolute inset-0 bg-white rounded-xl"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{number}</span>
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(+currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
