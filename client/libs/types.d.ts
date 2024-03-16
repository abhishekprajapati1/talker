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