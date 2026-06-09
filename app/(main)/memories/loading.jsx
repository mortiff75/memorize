"use client";

import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-[#050114]">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer Glowing Ring */}
        <motion.div
          animate={{
            rotate: 360,
            borderTopColor: ["#A855F7", "#3B82F6", "#A855F7"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]"
        />

        {/* Middle Orbiting Ring */}
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-4 border-4 border-transparent border-b-blue-500 rounded-full opacity-60"
        />

        {/* Inner Pulsing Core */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
            boxShadow: [
              "0 0 20px rgba(168, 85, 247, 0.4)",
              "0 0 50px rgba(168, 85, 247, 0.8)",
              "0 0 20px rgba(168, 85, 247, 0.4)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 bg-linear-to-tr from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
        >
          {/* Central Brain Icon or Logo Mark */}
          <svg
            width="30"
            height="30"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="20" cy="20" r="3" fill="white" />
          </svg>
        </motion.div>

        {/* Floating Digital Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: "50%",
            }}
          />
        ))}

        {/* Loading Text */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -bottom-16 text-white font-bold tracking-[0.3em] uppercase text-xs"
        >
          Initializing Platform
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
