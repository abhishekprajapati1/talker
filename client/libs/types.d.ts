import React, { SVGProps } from "react";

export interface IWrapper {
    children?: React.ReactNode;
}

export interface SvgIconProps extends SVGProps<SVGSVGElement> {

}

export interface User {
    id: string;
    name: string;
    email: string;
}

export type NewConversationResultType = { data: User, isTalkerUser: boolean }
export type MessageStatus = "notdelivered" | "delivered" | "read";
export interface IMessage {
    id: string,
    body: string;
    sender_id: string;
    status: MessageStatus;
    type: string;
    timestamp: string;
}

export interface IConversation {
    id: string;
    recent_message: IMessage;
    user: User;
    _count: {
        messages: number
    }
}