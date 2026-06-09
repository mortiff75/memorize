"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImageUpload = ({ onChange }) => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    onChange(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const startSimulatedUpload = () => {
    setIsUploading(true);
    setProgress(0);
    setIsDone(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsDone(true);
          onUploadComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="w-full">
      <div className="relative group cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
        />
        <div
          className={`aspect-video rounded-4xl border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden relative ${
            isDone
              ? "border-green-500/50 bg-green-500/5"
              : "border-white/10 bg-white/5 hover:border-purple-500/50"
          }`}
        >
          {preview ? (
            <>
              <img
                src={preview}
                className="w-full h-full object-cover"
                alt="Preview"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                {isUploading && (
                  <div className="text-white font-bold text-xl">
                    {progress}%
                  </div>
                )}
                {isDone && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40"
                  >
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/20 transition-colors">
                <svg
                  className="w-8 h-8 text-gray-400 group-hover:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-400 font-medium">
                Click or drag image to upload
              </p>
              <p className="text-gray-600 text-xs mt-2">PNG, JPG up to 10MB</p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4"
          >
            <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium">
              <span>Uploading memory...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
