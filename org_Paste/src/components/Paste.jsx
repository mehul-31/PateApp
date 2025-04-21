import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router";

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  return (
    <div>
      <input
        type="search"
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border" key={paste?._id}>
                <div className="border-gray-500 border">{paste.title}</div>
                <div className="border-gray-500 border">{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">

                  <Link className="border p-2" to={`/?pasteId=${paste?._id}`}>Edit</Link>

                  <Link to={`/pastes/${paste?._id}`} className="border p-2">
                    View
                  </Link>

                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied To ClipBoard");
                    }}
                  >
                    Copy
                  </button>

                  <button>
                    Share
                    {/* HomeWork */}
                  </button>
                </div>

                <div>{paste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Paste;
