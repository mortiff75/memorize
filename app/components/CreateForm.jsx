"use client";
import React, { useEffect, useTransition } from "react";
import ImageUpload from "./ImageUpload";
import TagsInput from "./TagsInput";
import { Controller, useForm } from "react-hook-form";
import { create_memory } from "../(main)/memories/actions";
import { useAuth } from "@/contexts/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CreateForm = () => {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      tags: [],
    },
  });

  const validForm = (data) => {
    // Start Transition
    startTransition(async () => {
      const formData = new FormData();
      for (const key in data) {
        if (key === "tags") {
          formData.append("tags", JSON.stringify(data[key]));
          continue;
        }
        formData.append(key, data[key]);
      }

      formData.append("user", user._id);

      const result = await create_memory(formData);

      if (result?.success) {
        toast(result.message);
        reset();
        router.replace("/memories");
      }
    });
  };

  const handleErrorForm = (error) => {};

  return (
    <form
      onSubmit={handleSubmit(validForm, handleErrorForm)}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12"
    >
      {/* Left Column: Image Upload */}
      <div className="space-y-8">
        <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 backdrop-blur-xl">
          <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
            Memory Visual
          </label>
          <Controller
            name="image"
            control={control}
            rules={{
              validate: (file) => {
                if (!file) return "image is required";
                return true;
              },
            }}
            render={({ field: { onChange, value } }) => (
              <ImageUpload onChange={onChange} />
            )}
          />
        </div>

        {/* Tags Input */}

        <Controller
          name="tags"
          rules={{
            validate: (val) => val.length > 0 || "Please some add tags",
          }}
          control={control}
          render={({ field: { onChange } }) => (
            <TagsInput label={"Tags"} onChange={onChange} />
          )}
        />
      </div>

      {/* Right Column: Form Details */}
      <div className="bg-white/5 p-10 rounded-[3.5rem] border border-white/10 backdrop-blur-xl space-y-8">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              Title
            </label>
            <input
              type="text"
              placeholder="e.g. Summer by the Lake"
              {...register("title", { required: true, minLength: 5 })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-lg font-medium focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Tell the story behind this moment..."
              {...register("description", { required: true })}
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-purple-500 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                Location
              </label>
              <input
                type="text"
                placeholder="Lake Como, Italy"
                {...register("location", { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                Date
              </label>
              <input
                type="text"
                required
                placeholder="Aug 12, 2025"
                {...register("date", { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>
          </div>
        </div>

        <button
          disabled={!isValid}
          className={`w-full py-5 rounded-4xl font-bold text-lg transition-all ${
            isValid || isLoading
              ? "bg-white text-[#050114] shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-95"
              : "bg-white/10 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Loading..." : "Create Memory"}
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
