import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router";
import { addToPaste,updateToPaste } from "../redux/pasteSlice";
import { useSelector } from "react-redux";


function ViewPaste() {

    const {id} = useParams();

    const allPastes = useSelector((state) => state.paste.pastes);

    const paste = allPastes.filter((p) => p._id === id)[0]


  return (
    <div>
      <div
        className="flex felx-row gap-7
      place-content-between"
      >
        <input
          disabled
          type="text"
          className="p-1 rounded-2xl mt-2
          w-[66%] pl-4 border-2"
          placeholder="enter title here"
          value={paste.title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* <button className="p-2 rounded-2xl border-2 mt-2" onClick={createPaste}>
          {pasteId ? "Update Paste" : "Create My Paste"}
        </button> */}
      </div>

      <div className="mt-8">
        <textarea
          className="rounded-2xl border-2 mt-4 min-w-[500px] p-4 "
          value={paste.content}
          disabled
          placeholder="Enter Your Content Here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        ></textarea>
      </div>
    </div>
  )
}

export default ViewPaste