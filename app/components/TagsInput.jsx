import React, { useState } from "react";

const TagsInput = ({ label, onChange }) => {
  const [tags, setTags] = useState([]);
  const [tag, setTagsInput] = useState("");

  const keyDownHandler = (e) => {
    const input_value = e.target.value;

    if (e.key === "Enter" && !tags.includes(input_value)) {
      e.preventDefault(); // ✅ جلوگیری از submit شدن فرم

      const newArrays = [...tags, input_value];

      setTags(newArrays);
      setTagsInput("");
      onChange(newArrays);
    }
  };

  const removeTag = (tag) => {
    const newTags = tags.filter((item) => item !== tag);
    setTags([...newTags]);
    onChange(newTags);
  };

  return (
    <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 backdrop-blur-xl">
      <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-xl text-sm flex items-center gap-2 border border-purple-500/20"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="hover:text-white text-red-700"
            >
              X
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        onKeyDown={keyDownHandler}
        value={tag}
        onChange={(e) => setTagsInput(e.target.value)}
        placeholder="Type and press Enter..."
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-purple-500 transition-all"
      />
    </div>
  );
};

export default TagsInput;
