'use client';
import { useAppSelector } from '@/store';
import { Box, Typography } from '@mui/material';
import React from 'react'
import ResultCard from './ResultCard';

const Results = () => {
    const results = useAppSelector(store => store.conversationStore.newConversationResults);

    console.log("see this", results);

    if (!results || results.length <= 0) {
        return (
            <Box className='h-full w-full grid place-content-center text-gray-500'>
                No contacts found.
            </Box>
        )
    }

    return (
        <Box className="h-full text-gray-600">
            {
                results.map((result, index) => {
                    return (
                        <ResultCard key={index} {...result} />
                    )
                })
            }
        </Box>
    )
}

export default Results