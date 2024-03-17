'use client'
import Socket from '@/libs/Socket';
import endpoints from '@/libs/endpoints';
import useFetch from '@/libs/hooks/useFetch';
import { IMessage } from '@/libs/types';
import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import TextMessage from './TextMessage';
import { useAppDispatch, useAppSelector } from '@/store';
import { populateMessages, pushMessage } from '@/store/slices/messages.slice';


interface MessagesProps {
    conversation_id: string;
}


const Messages: React.FC<MessagesProps> = ({ conversation_id }) => {
    const socket = Socket.socket;
    const { data, isLoading } = useFetch({
        endpoint: endpoints.CONVERSATION_MESSAGES(conversation_id)
    });

    const dispatch = useAppDispatch();
    const messages = useAppSelector(store => store.messagesStore)

    useEffect(() => {
        const messageReceivedHandler = (newMessageReceived: IMessage) => {
            dispatch(pushMessage(newMessageReceived))
        };
        socket.on("message", messageReceivedHandler);
        return () => {
            socket.off("message", messageReceivedHandler);
        };
    });

    useEffect(() => {
        if (Array.isArray(data)) {
            dispatch(populateMessages(data));
        }
    }, [data, data]);


    if (isLoading) {
        return (
            <Box className="h-full grid place-content-center">
                Loading...
            </Box>
        )
    }

    return (
        <Stack paddingX={3} paddingY={1} direction="column" spacing={.5} flexGrow={1}>
            {
                Array.isArray(messages) && messages.length > 0 ? (
                    messages.map((message: IMessage) => {
                        return (
                            <TextMessage key={message.id} {...message} />
                        )
                    })
                ) : (
                    <Box className="h-full grid place-content-center">
                        <Typography textAlign="center" variant='h5'>Let's chat</Typography>
                    </Box>
                )
            }
        </Stack>
    )
}

export default Messages