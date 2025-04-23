import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      } else {
        // Paste not found
        setTitle("");
        setValue("");
      }
    }
  }, [pasteId, allPastes]);
  

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white/10 backdrop-blur-md p-6 rounded-lg border border-gray-700 shadow-lg text-black">
    <div className="flex flex-col md:flex-row gap-4 items-stretch mb-6">
  <input
    type="text"
    className="w-full md:w-2/3 bg-white/10 text-black placeholder-black border border-white/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
    placeholder="Enter title here"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
  <button
    className="w-full md:w-auto bg-[#6EACDA] hover:bg-[#03346E] px-4 py-2 rounded-md text-black font-semibold transition-all duration-300"
    onClick={createPaste}
  >
    {pasteId ? "Update Paste" : "Create My Paste"}
  </button>
</div>


      <textarea
        className="w-full min-h-[300px] bg-white/10 text-black placeholder-black border border-white/20 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
        placeholder="Enter your content here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
}

export default Home;
