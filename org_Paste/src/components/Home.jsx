import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import { addToPaste,updateToPaste } from "../redux/pasteSlice";
import { useSelector } from "react-redux";

function Home() {
  
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes)

  useEffect(() => {
    if(pasteId){
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
    
  }, [pasteId])

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      ceratedAt: new Date().toISOString(),
    };

   
    

    if (pasteId) {
      //update
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    //after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div
        className="flex felx-row gap-7
      place-content-between"
      >
        <input
          type="text"
          className="p-1 rounded-2xl mt-2
          w-[66%] pl-4 border-2"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="p-2 rounded-2xl border-2 mt-2" onClick={createPaste}>
          {pasteId ? "Update Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="mt-8">
        <textarea
          className="rounded-2xl border-2 mt-4 min-w-[500px] p-4 "
          value={value}
          placeholder="Enter Your Content Here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        ></textarea>
      </div>
    </div>
  );
}

export default Home;
