'use client';
import useConversation from '@/libs/mutations/conversations/useConversation';
import { NewConversationResultType } from '@/libs/types'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'


const ResultCard: FC<NewConversationResultType> = ({ data }) => {
    const { mutate, isPending } = useConversation();
    return (
        <Stack onClick={() => mutate(data.id)} direction="row" spacing={2} padding={2} borderRadius={2} className='cursor-pointer' sx={{ border: ".51px solid gray" }}>
            <Box className="aspect-square h-[50px] rounded-full overflow-hidden">
                <Image src="/user_placeholder.png" width={50} height={50} alt="user image" priority className='w-full h-full' />
            </Box>
            <Box>
                <Typography variant="h6">{data.name}</Typography>
                <Typography variant="body2" color="primary.main">{data.email}</Typography>
            </Box>
        </Stack>
    )
}

export default ResultCard