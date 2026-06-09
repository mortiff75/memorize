import React from "react";
import { fetch_memories } from "./controller";
import MemoriesList from "../../components/MemoriesList";
import MemoryFilter from "@/app/components/Filter";
import Pagination from "@/app/components/Pagination";

const MemoriesPage = async ({ searchParams }) => {
  const { title, memory_date, page } = await searchParams;

  const { memories, currentPage, total_memories, limit } = await fetch_memories(
    {
      title,
      memory_date,
      page,
    },
  );

  return (
    <div className="min-h-screen bg-[#050114] pt-32 pb-20 px-6 md:px-10">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="max-w-450 mx-auto">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Your Memories
            </h1>
            <p className="text-gray-500 max-w-2xl">
              Relive your most precious moments. A collection of your travels,
              adventures, and quiet afternoons.
            </p>
          </div>
          <MemoryFilter />
        </header>

        {memories.length === 0 ? (
          <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              You don't have any memories How Start Now ?
            </h1>
          </div>
        ) : (
          <>
            <MemoriesList memories={JSON.parse(JSON.stringify(memories))} />

            <Pagination
              totalItems={total_memories}
              currentPage={currentPage}
              itemsPerPage={limit}
            />
          </>
        )}

        {}
      </div>
    </div>
  );
};

export default MemoriesPage;
