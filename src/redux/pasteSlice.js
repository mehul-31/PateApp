import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import Paste from "../components/Paste";

const initialState = {
    pastes:localStorage.getItem("pastes") ?
    JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
    name:'paste',
    initialState,
    reducers :{
        addToPaste: (state,action) => {
            const paste = action.payload;

            //add a check --> if paste alreadyg exists

            state.pastes.push(paste);
            localStorage.setItem("pastes", 
            JSON.stringify(state.pastes));
            toast.success("Paste Created Successfully")

        },
        updateToPaste: (state,action) => {
            const paste = action.payload
            const index = state.pastes.findIndex((item) =>
                item._id === paste._id)

            if (index >= 0) {
                state.pastes[index] = paste

                localStorage.setItem("pastes",JSON.stringify(state.pastes))

                toast.success("Paste Updated")
            }
        },
        resetAllPaste: (state,action) => {
            state.pastes = []
            localStorage.removeItem("pastes");

        },
        removeFromPaste: (state,action) => {
            const pasteId = action.payload;

            console.log(pasteId);
            const index = state.pastes.findIndex((item) => 
                item._id ===pasteId);

            if(index >= 0) {
                state.pastes.splice(index, 1);

                localStorage.setItem("pastes", JSON.stringify
                (state.pastes))

                toast.success("Paste Deleted");
            }
        },
    },
})

export const {addToPaste, updateToPaste,removeFromPaste,resetAllPaste} = pasteSlice.actions

export default pasteSlice.reducer;