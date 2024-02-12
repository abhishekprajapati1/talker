import Topbar from '@/components/navigations/TopBar'
import { Box, Card, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const ContactsPage = () => {
    return (
        <Box>
            <Stack direction="column">
                <Topbar title='Your contacts' />
                <Stack paddingX={3} paddingY={1} direction="column" spacing={2} flexGrow={1}>
                    {Array(6).fill("").map((_, i) => {
                        return (
                            <Stack key={i} direction="row" spacing={2} padding={2} borderRadius={2} sx={{ border: ".51px solid gray" }}>
                                <Box className="aspect-square h-[50px] rounded-full overflow-hidden">
                                    <Image src="/user_placeholder.png" width={50} height={50} alt="user image" priority className='w-full h-full' />
                                </Box>
                                <Box>
                                    <Typography variant="h6">John Doe</Typography>
                                    <Typography variant="body2" color="primary.main">doe.john@talker.com</Typography>
                                </Box>
                            </Stack>
                        )
                    })
                    }
                </Stack>
            </Stack>
        </Box>
    )
}

export default ContactsPage