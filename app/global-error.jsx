"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("System Error:", error);
  }, [error]);

  return (
    <div className="relative min-h-[80vh] w-full flex flex-col items-center justify-center p-6 text-center overflow-hidden rounded-[3rem] bg-[#050114]/50 backdrop-blur-sm border border-white/5">
      {/* Background Glitchy Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />

      {/* Error Illustration / Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative mb-12"
      >
        <div className="text-[100px] md:text-[140px] font-black text-white/5 select-none leading-none tracking-tighter">
          FATAL_ERR
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.2, repeat: Infinity }}
              className="absolute inset-0 blur-xl bg-red-500/20 rounded-full"
            />
            <svg
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Main Error Text */}
      <div className="max-w-2xl z-10">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-black tracking-tighter mb-6 uppercase italic"
        >
          Data Stream <span className="text-red-500">Corrupted</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-red-500/5 border border-red-500/10 rounded-3xl p-6 backdrop-blur-xl mb-10"
        >
          <p className="text-red-400/80 font-mono text-sm wrap-break-word leading-relaxed">
            {error?.message ||
              "Critical failure in the neural synchronization layer. Signal lost."}
          </p>
          {error?.digest && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">
                Trace ID: {error.digest}
              </p>
            </div>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-10 py-4 bg-white text-[#050114] rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            Re-Sync System
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Emergency Exit
          </button>
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="mt-16 opacity-30 font-mono text-[9px] tracking-[0.3em] uppercase">
        Internal Security Protocol Active
      </div>
    </div>
  );
}
