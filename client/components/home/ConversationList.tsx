'use client';
import { Box, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import ConversationTile from './ConversationTile';
import Socket from '@/libs/Socket';
import useFetch from '@/libs/hooks/useFetch';
import endpoints from '@/libs/endpoints';
import { IConversation } from '@/libs/types';

const ConversationList = () => {
    const { data } = useFetch({ endpoint: endpoints.CONVERSATIONS })
    const conversations = data;
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