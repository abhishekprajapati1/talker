'use client';
import { Box, IconButton, Input } from '@mui/material'
import React, { FC, KeyboardEvent, MouseEvent, useEffect, useState } from 'react'
import PlaneIcon from '../icons/PlaneIcon'
import Socket from '@/libs/Socket'
import { IMessage } from '@/libs/types';

interface MessageInputProps {
    conversation_id: string;
}

const MessageInput: FC<MessageInputProps> = ({ conversation_id }) => {
    const socket = Socket.socket;
    const [message, setMessage] = useState("");


    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === "Enter" && message) {
            socket.emit("message", { conversation_id, body: { text: message } });
            setMessage("");
        }
    }

    const handleSendMessage = () => {
        if (message) {
            socket.emit("message", message);
            setMessage("");
        }
    }

    return (
        <Box paddingX={3} className="flex items-center gap-4 sticky bg-white py-2 shadow-2xl bottom-0">
            <Input
                className='flex-grow'
                onKeyDown={event => handleKeyDown(event)}
                value={message}
                onChange={event => setMessage(event.target.value)}
                placeholder="Enter a message..."
            />
            <IconButton type="button" onClick={() => handleSendMessage()}>
                <PlaneIcon className='text-gray-500' />
            </IconButton>
        </Box>
    )
}

export default MessageInput