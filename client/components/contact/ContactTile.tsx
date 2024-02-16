import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React, { FC } from 'react'

interface ContactTileProps {
    id: string;
    name: string;
    email: string;
}

const ContactTile: FC<ContactTileProps> = ({ id, name, email }) => {
    return (
        <Stack direction="row" spacing={2} padding={2} borderRadius={2} sx={{ border: ".51px solid gray" }}>
            <Box className="aspect-square h-[50px] rounded-full overflow-hidden">
                <Image src="/user_placeholder.png" width={50} height={50} alt="user image" priority className='w-full h-full' />
            </Box>
            <Box>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2" color="primary.main">{email}</Typography>
            </Box>
        </Stack>
    )
}

export default ContactTile