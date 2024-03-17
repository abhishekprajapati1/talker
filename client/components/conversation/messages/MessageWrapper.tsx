import SingleCheckIcon from '@/components/icons/SingleCheckIcon';
import { IMessage, IWrapper, MessageStatus } from '@/libs/types';
import { Box } from '@mui/material';
import React, { FC } from 'react'

interface MessageBoxWrapperProps extends IWrapper {
    time: string;
    sameUser?: boolean;
    status: MessageStatus
}

const MessageBoxWrapper: FC<MessageBoxWrapperProps> = ({ children, time, status, sameUser }) => {

    return (
        <Box className="pb-2">
            <Box className={`flex w-full ${sameUser && "justify-end"}`}>
                <Box className={`text-white text-sm w-fit max-w-[90%] p-2 rounded-xl ${sameUser ? "bg-[#bc0000] rounded-br-none" : "bg-[#333] rounded-bl-none"}`}>
                    {children}
                </Box>
            </Box>
            <span className={`w-full flex items-center gap-2 text-[10px] ${sameUser && "justify-end"}`}>
                {time} {sameUser && (
                    <span className='text-base'>
                        {status === "notdelivered" && <SingleCheckIcon />}
                    </span>
                )}
            </span>
        </Box>
    )
}

export default MessageBoxWrapper