import { NewConversationResultType, User } from "@/libs/types";
import { createSlice } from "@reduxjs/toolkit";



type InitialState = {
    newConversationResults: NewConversationResultType[];
}

const initialState: InitialState = {
    newConversationResults: [],
};

const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        setNewConversationResults: (state, action: { payload: NewConversationResultType[] }) => {
            state.newConversationResults = action.payload;
        }
    }
});

export const { setNewConversationResults } = conversationSlice.actions;
export default conversationSlice.reducer;