'use client';
import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import ConversationTile from './ConversationTile';
import useFetch from '@/libs/hooks/useFetch';
import endpoints from '@/libs/endpoints';
import { IConversation } from '@/libs/types';
import useSocket from '@/libs/hooks/useSocket';
import { useAppDispatch, useAppSelector } from '@/store';
import { populateConversations, pushConversation } from '@/store/slices/conversations.slice';

const ConversationList = () => {
    const dispatch = useAppDispatch();
    const { data } = useFetch({ endpoint: endpoints.CONVERSATIONS })
    const conversations = useAppSelector(store => store.conversationsStore)

    useSocket('update-conversation', (data) => {
        dispatch(pushConversation(data))
    })


    useEffect(() => {
        if (data) {
            dispatch(populateConversations(data))
        }
    }, [data]);

    if (conversations?.length <= 0) {
        return (
            <Box display="flex" flexGrow={1} alignItems="center" justifyContent="center">
                <Typography>No conversations</Typography>
            </Box>
        )
    }

    return (
        <Stack flexGrow={1} display="flex" flexDirection="column" paddingX={3} className='divide-y'>
            {
                conversations?.map((conversation: IConversation) => (
                    <ConversationTile data={conversation} key={conversation.id} />
                ))
            }
        </Stack>
    )
}

export default ConversationList;