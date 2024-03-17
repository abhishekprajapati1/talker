const endpoints = {
    LOGOUT: "",
    REFRESH_TOKEN: "auth/refresh-token",
    PROFILE: "auth/profile",
    SIGNUP: "auth/signup",
    LOGIN: "auth/login",

    CONTACTS: "contacts",
    CONVERSATIONS: "chats",
    CONVERSATION: (id: string) => `chats/${id}`,
    CONVERSATION_MESSAGES: (id: string) => `chats/${id}/messages`,
    START_CONVERSATION: "chats/start",
}

export default endpoints;