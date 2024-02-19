'use client';
import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import ConversationTile from './ConversationTile';
import Socket from '@/libs/Socket';

const ConversationList = () => {

    const socket = Socket.socket;

    let conversations = [
        { name: "Abhishek Prajapati", email: "abhishek@gmail.com" },
        { name: "John Doe", email: "doe.john@gmail.com" },
    ];



    useEffect(() => {
        const messageReceivedHandler = (newMessageReceived: string) => {
            console.log("see this message recieved", newMessageReceived);
        };
        socket.on("message", messageReceivedHandler);
        return () => {
            socket.off("message", messageReceivedHandler);
        };

    });


    if (conversations.length <= 0) {
        return (
            <Box display="flex" flexGrow={1} alignItems="center" justifyContent="center">
                <Typography>No conversations</Typography>
            </Box>
        )
    }

    return (
        <Box flexGrow={1} display="flex" flexDirection="column">
            {
                conversations.map(conversation => (
                    <ConversationTile data={conversation} key={conversation.email} />
                ))
            }
        </Box>
    )
}

export default ConversationList;