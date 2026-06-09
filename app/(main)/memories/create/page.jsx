import CreateForm from "@/app/components/CreateForm";
import React from "react";

const CreatePage = () => {
  return (
    <div className="min-h-screen bg-[#050114] pt-32 pb-20 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Create Memory
          </h1>
          <p className="text-gray-400">
            Capture your moments and save them forever in your digital timeline.
          </p>
        </header>

        <CreateForm />
      </div>
    </div>
  );
};

export default CreatePage;
