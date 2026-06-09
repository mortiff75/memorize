"use client";

import React, { startTransition, useOptimistic, useState } from "react";
import MemoryCard from "./MemoryCard";
import { AnimatePresence, motion } from "framer-motion";
import { delete_memory, edit_memory } from "../(main)/memories/actions";
import { toast } from "react-toastify";
{
  /* Responsive Grid: 5 columns on XL, 4 on LG, 3 on MD, 2 on SM, 1 on Mobile */
}

const opstimicReducer = (state, action) => {
  switch (action.type) {
    case "delete":
      return [...action.value];

    case "edit":
      return [...action.value];
    default:
      return state;
  }
};

const MemoriesList = ({ memories }) => {
  const [opstimicData, opstimicAction] = useOptimistic(
    [...memories],
    opstimicReducer,
  );

  const [selectedId, setSelectedId] = useState(null);

  const selectedMemory = opstimicData.find((m) => m.title === selectedId);

  const handleDelete = (id) => {
    // startTransition همیشه باید بیرونی‌ترین لایه باشد
    startTransition(async () => {
      // ۱. آپدیت خوش‌بینانه و سریع UI
      opstimicAction({
        type: "delete",
        value: opstimicData.filter((memory) => memory._id !== id),
      });

      // ۲. بستن مودال بلافاصله برای تجربه کاربری بهتر
      setSelectedId(null);

      try {
        // ۳. ارسال درخواست واقعی به سرور
        const result = await delete_memory(id);

        if (result.success) {
          toast(result.message);
        }

        if (result?.errors) {
          // اگر سرور ارور داد، ما فقط یک لاگ یا Toast نشون میدیم
          throw result.errors;

          // 🪄 نکته: ما اینجا دستی دیتا رو برنمیگردونیم!
          // چون سرور ارور داده و revalidatePath اجرا نشده،
          // خود useOptimistic به صورت کاملاااا خودکار عکس رو برمیگردونه سر جاش!
        }
      } catch (error) {
        // خطاهای اینترنت یا شبکه
        toast(error?.errors);
      }
    });
  };

  const handleUpdate = (id, editData) => {
    startTransition(async () => {
      const updated_memory = { ...editData };

      const new_memories_array = opstimicData.map((memory) => {
        if (memory._id === id) {
          return { ...memory, ...updated_memory };
        }

        return memory;
      });

      opstimicAction({ type: "edit", value: new_memories_array });

      try {
        const result = await edit_memory(id, editData);

        if (result?.errors) throw result.errors;

        toast(result.message);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
        {opstimicData.map((memory, index) => (
          <AnimatePresence mode="popLayout" key={`${memory.title}_${index}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true, margin: "-90px" }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  delay: (index % 5) * 0.1,
                  ease: [0.25, 1, 0.5, 1],
                },
              }}
              exit={{ opacity: 0, y: 0 }}
              key={memory.title}
              layoutId={`card-${memory.title}`}
              onClick={() => setSelectedId(memory.title)}
              className="cursor-pointer h-145"
            >
              <div
                key={memory.title}
                className="transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="group transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] rounded-[2.5rem]">
                  <MemoryCard
                    memory={{
                      ...memory,
                      _id: memory._id.toString(),
                      user: memory.user.toString(),
                    }}
                    index={index}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedId && selectedMemory && (
          <div className="fixed inset-0 z-100 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              layoutId={`card-${selectedId}`}
              className="relative w-[90%] max-w-112.5 h-162.5 z-101"
            >
              <div
                key={selectedMemory.title}
                className="transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="group transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] rounded-[2.5rem]">
                  <MemoryCard
                    memory={{
                      ...selectedMemory,
                      _id: selectedMemory._id.toString(),
                      user: selectedMemory.user.toString(),
                    }}
                    isFocused={true}
                    handleDelete={handleDelete}
                    handleEdit={handleUpdate}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MemoriesList;
