import { IConversation } from "@/libs/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IConversation[] = []


const conversationsSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        populateConversations: (_state, action: { payload: IConversation[] }) => {
            return action.payload
        },
        pushConversation: (state, action: { payload: IConversation }) => {
            let newOne = state.filter(c => c.id !== action.payload.id);
            newOne.unshift(action.payload);
            return newOne;
        },
        deleteConversation: (state, action: { payload: string }) => {
            state = state.filter(cnv => cnv.id !== action.payload)
        }
    }
})

export const { populateConversations, pushConversation, deleteConversation } = conversationsSlice.actions;
export default conversationsSlice.reducer;