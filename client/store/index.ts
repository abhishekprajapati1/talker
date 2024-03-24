import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import conversationStore from "./slices/conversation.slice";
import conversationsStore from "./slices/conversations.slice";
import messagesStore from "./slices/messages.slice";

const store = configureStore({
    reducer: {
        conversationStore,
        conversationsStore,
        messagesStore,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;