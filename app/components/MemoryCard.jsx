"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/auth";

const MemoryCard = ({ memory, index, isFocused, handleDelete, handleEdit }) => {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const { title, image, tags, description, date, location } = memory;
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title,
    description,
    location,
    date,
  });

  const handleUpdateClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  return (
    <div
      className={`relative w-full h-full perspective-1200 ${isFocused ? "z-50" : "z-10"}`}
      onMouseEnter={() => isFocused && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTimeout(() => setIsEditing(false), 700);
      }}
    >
      <div
        className="relative w-full h-full preserve-3d transition-transform duration-700 ease-in-out"
        style={{
          transform:
            isHovered && isFocused ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT SIDE */}
        <div className="relative w-full h-full backface-hidden bg-white rounded-[2.5rem]  flex flex-col text-[#08021C] border border-gray-100 overflow-hidden">
          <div className="bg-white rounded-[2.5rem] p-5 shadow-2xl flex flex-col h-full w-full text-[#08021C] border border-gray-100">
            {/* Image Area */}
            <div className="relative w-full aspect-4/3 rounded-4xl overflow-hidden mb-6 shrink-0 bg-gray-100">
              <motion.img
                layoutId={`image-${title}`}
                src={image || "/lake_memory.jpg"}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Area */}
            <div className="flex flex-col grow">
              <motion.h3
                layoutId={`title-${title}`}
                className="text-2xl font-bold mb-3 tracking-tight line-clamp-2 min-h-16"
              >
                {title}
              </motion.h3>

              <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 min-h-15">
                {description}
              </p>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center text-[#6B7280] text-[11px] font-semibold">
                      <svg
                        className="w-4 h-4 mr-2 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {date}
                    </div>
                    <div className="flex items-center text-[#6B7280] text-[11px] font-semibold truncate max-w-30">
                      <svg
                        className="w-4 h-4 mr-2 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      {location}
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md mb-1 bg-purple-100">
                      <img
                        src={
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        }
                        alt={user.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold">
                      by {user.username}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 overflow-hidden h-9">
                  {tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#F1F5F9] text-[#475569]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="bg-[#0B0322] border-2 border-white/10 rounded-[2.5rem] p-8 flex flex-col h-full w-full text-white shadow-2xl relative overflow-hidden">
            <motion.div layout className="flex flex-col h-full w-full">
              {/* Header Icon & Title */}
              {!isEditing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center mb-6"
                >
                  <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold">Manage Memory</h4>
                </motion.div>
              )}

              {/* Edit Mode Inputs */}
              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    className="space-y-4 mb-6 flex-grow overflow-y-auto pr-2 scrollbar-hide"
                  >
                    <h4 className="text-lg font-bold mb-4 text-purple-400">
                      Edit Details
                    </h4>
                    <div className="space-y-3">
                      <input
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-purple-500 outline-none transition-all"
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                        placeholder="Title"
                      />
                      <textarea
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-purple-500 outline-none transition-all resize-none h-24"
                        value={editData.description}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Description"
                      />
                      <input
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-purple-500 outline-none transition-all"
                        value={editData.location}
                        onChange={(e) =>
                          setEditData({ ...editData, location: e.target.value })
                        }
                        placeholder="Location"
                      />
                      <input
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-purple-500 outline-none transition-all"
                        value={editData.date}
                        onChange={(e) =>
                          setEditData({ ...editData, date: e.target.value })
                        }
                        placeholder="Date"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="mt-auto space-y-3 relative">
                <div className="flex flex-col gap-3">
                  <motion.button
                    layout
                    onClick={
                      isEditing
                        ? (e) => {
                            e.stopPropagation();
                            setIsEditing(false);
                            handleEdit(memory._id, editData);
                          }
                        : handleUpdateClick
                    }
                    className={`w-full py-4 font-bold rounded-2xl transition-all duration-300 z-10 ${
                      isEditing
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                        : "bg-white text-[#050114]"
                    }`}
                  >
                    {isEditing ? "Save Changes" : "Update Details"}
                  </motion.button>

                  <AnimatePresence>
                    {!isEditing && (
                      <motion.button
                        initial={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className="w-full py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(memory._id);
                        }}
                      >
                        Delete Memory
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {!isEditing && (
                <p className="mt-6 text-gray-500 text-[10px] text-center uppercase tracking-widest animate-pulse">
                  Hover out to flip back
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
