import { IConversation } from '@/libs/types'
import { Box, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { FC } from 'react'

interface ConversationTileProps {
    data: IConversation,
}

const ConversationTile: FC<ConversationTileProps> = ({ data }) => {
    return (
        <Box component={Link} href={{ pathname: data.id }} className='py-3 relative' >
            <Typography>{data.user.name}</Typography>
            <Typography>{data.user.email}</Typography>
            {
                data.recent_message &&
                <Stack direction="row" justifyContent="space-between">
                    <Typography>{data.recent_message?.body}</Typography>
                    <Typography>{dayjs(data.recent_message?.timestamp).format("hh:mm a")}</Typography>
                </Stack>
            }

            {
                data._count.messages > 0 && (
                    <span className='absolute  grid place-content-center py-0 px-2 top-3 right-0 bg-destructive rounded-full text-white text-xs' >{data._count.messages}</span>
                )
            }
        </Box>
    )
}

export default ConversationTile