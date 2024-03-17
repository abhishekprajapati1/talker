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
        <Box component={Link} href={{ pathname: data.id }} className='py-3' >
            <Typography>{data.user.name}</Typography>
            <Typography>{data.user.email}</Typography>
            {
                data.recent_message &&
                <Stack direction="row" justifyContent="space-between">
                    <Typography>{data.recent_message?.body}</Typography>
                    <Typography>{dayjs(data.recent_message?.timestamp).format("hh:mm a")}</Typography>
                </Stack>
            }
        </Box>
    )
}

export default ConversationTile