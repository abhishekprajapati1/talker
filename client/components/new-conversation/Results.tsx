'use client';
import { useAppSelector } from '@/store';
import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import ResultCard from './ResultCard';

const Results = () => {

    const results = useAppSelector(store => store.conversationStore.newConversationResults);

    if (!results || results.length <= 0) {
        return (
            <Box className='h-full w-full grid place-content-center text-gray-500'>
                No contacts found.
            </Box>
        )
    }

    return (
        <Stack className="h-full text-gray-600" gap={3}>
            {
                results.map((result, index) => {
                    return (
                        <ResultCard key={index} {...result} />
                    )
                })
            }
        </Stack>
    )
}

export default Results