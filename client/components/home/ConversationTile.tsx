import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React, { FC } from 'react'

interface ConversationTileProps {
    data: any,
}

const ConversationTile: FC<ConversationTileProps> = ({ data }) => {
    return (
        <Box component={Link} href={{ pathname: data.email }} >
            <Typography>{data.name}</Typography>
        </Box>
    )
}

export default ConversationTile