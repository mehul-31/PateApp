import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Paste() {
  const pastes = useSelector((state) => state.paste?.pastes || []);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => dispatch(removeFromPaste(id));

  const handleCopyContent = (content) => {
    navigator.clipboard
      .writeText(content)
      .then(() => toast.success("Content copied to clipboard!"))
      .catch((err) => {
        toast.error("Failed to copy content.");
        console.error("Clipboard write failed", err);
      });
  };

  const handleCopyLink = (pasteId) => {
    const pasteUrl = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard
      .writeText(pasteUrl)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch((err) => {
        toast.error("Failed to copy link.");
        console.error("Clipboard write failed", err);
      });
  };

  const truncateContent = (content, wordLimit = 20) => {
    const words = content.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : content;
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6 bg-white/10 backdrop-blur-md min-h-screen p-6 rounded-lg border border-white/20 shadow-lg text-white">
      <input
        type="search"
        className="w-full bg-white/10 text-white placeholder-white/70 border border-white/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
        placeholder="Search Pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredData.length === 0 && (
        <p className="text-center text-white/60 mt-8">No pastes found.</p>
      )}

      {filteredData.map((paste) => (
        <div
          key={paste._id}
          className="bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white/20 transition-all duration-300"
        >
          <div className="text-xl font-semibold text-[#E2E2B6] mb-2">
            {paste.title}
          </div>
          <div className="text-sm text-gray-200 mb-4">
            {truncateContent(paste.content, 20)}
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link
              to={`/?pasteId=${paste._id}`}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-700 text-white px-3 py-1 rounded transition-all duration-300"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/10435/10435929.png"
                alt="Edit"
                className="w-4 h-4"
              />
              Edit
            </Link>
            <Link
              to={`/pastes/${paste._id}`}
              className="flex items-center gap-2 bg-[#5b66cd] hover:bg-[#03346E] text-white px-3 py-1 rounded transition-all duration-300"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3917/3917752.png"
                alt="View"
                className="w-4 h-4"
              />
              View
            </Link>
            <button
              onClick={() => handleDelete(paste._id)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-all duration-300"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3917/3917242.png"
                alt="Delete"
                className="w-4 h-4"
              />
              Delete
            </button>
            <button
              onClick={() => handleCopyContent(paste.content)}
              className="flex items-center gap-2 bg-[#E2E2B6] hover:bg-yellow-200 text-black px-3 py-1 rounded transition-all duration-300"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3914/3914097.png"
                alt="Copy"
                className="w-4 h-4"
              />
              Copy
            </button>
            <button
              onClick={() => handleCopyLink(paste._id)}
              className="flex items-center gap-2 bg-black/30 hover:bg-black/50 text-white px-3 py-1 rounded transition-all duration-300"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/7931/7931033.png"
                alt="Link"
                className="w-4 h-4"
              />
              Link
            </button>
          </div>
          <div className="text-black text-xs mt-2">
            {new Date(paste.createdAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Paste;
