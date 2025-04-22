import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ViewPaste() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste)
    return (
      <div className="text-red-500 text-center mt-10 text-xl">
        Paste not found or has been deleted.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6 bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 shadow-lg text-white">
      <input
        type="text"
        className="w-full bg-white/10 text-white border border-white/20 rounded-md px-4 py-2 transition-all duration-300"
        value={paste.title}
        disabled
      />

      <textarea
        className="w-full min-h-[300px] bg-white/10 text-white border border-white/20 rounded-md px-4 py-2 transition-all duration-300"
        value={paste.content}
        disabled
      ></textarea>
    </div>
  );
}

export default ViewPaste;
