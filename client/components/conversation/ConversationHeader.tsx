'use client';

import endpoints from '@/libs/endpoints';
import useFetch from '@/libs/hooks/useFetch';
import React from 'react'
import Topbar from '../navigations/TopBar';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import ThreeDotIcon from '../icons/ThreeDotIcon';
import Image from 'next/image';

interface ConversationHeaderProps {
    conversation_id: string;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({ conversation_id }) => {
    const { data, isLoading } = useFetch({
        endpoint: endpoints.CONVERSATION(conversation_id)
    });

    if (isLoading || !data) {
        return (
            <Topbar isLoading>
                <Stack direction="row" justifyContent="space-between" alignItems="center" className="w-full ms-4">
                    <Stack direction="row" className="h-full flex-shrink-0">
                        <Box className="h-[40px] aspect-square rounded-full overflow-hidden"><Box className="animate-pulse bg-white/50 w-full h-full rounded-full" /></Box>
                    </Stack>
                    <Box className="animate-pulse bg-white/50 w-[22px] h-[22px] rounded-md" />
                </Stack>

            </Topbar>
        )
    }

    return (
        <Topbar>
            <Stack direction="row" justifyContent="space-between" alignItems="center" className="w-full">
                <Stack direction="row" alignItems="center" gap={2} className="h-full flex-shrink-0">
                    <Box className="h-[40px] aspect-square rounded-full overflow-hidden"><Image src="/user_placeholder.png" width={50} height={50} alt="user image" priority className='w-full h-full' /></Box>
                    <Box className="leading-3">
                        <Typography variant="h6">{data.user.name}</Typography>
                        <Box className="text-xs">Online</Box>
                    </Box>
                </Stack>
                <IconButton title='Open conversation options'>
                    <ThreeDotIcon color='white' />
                </IconButton>
            </Stack>
        </Topbar>
    )
}

export default ConversationHeader