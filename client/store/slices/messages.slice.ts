import { IMessage } from "@/libs/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IMessage[] = []


const messagesSlice = createSlice({
    name: "chat/messages",
    initialState,
    reducers: {
        populateMessages: (_state, action: { payload: IMessage[] }) => {
            return action.payload
        },
        pushMessage: (state, action: { payload: IMessage }) => {
            state.push(action.payload);
        },
        deleteMessage: (state, action: { payload: string }) => {
            state = state.filter(message => message.id !== action.payload)
        }
    }
})

export const { populateMessages, pushMessage, deleteMessage } = messagesSlice.actions;
export default messagesSlice.reducer;