import ContactList from '@/components/contact/ContactList';
import PlusIcon from '@/components/icons/PlusIcon'
import Topbar from '@/components/navigations/TopBar'
import { Box, IconButton, Stack } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const ContactsPage = () => {
    return (
        <Stack direction="column" height="100%">
            <Topbar title='Your contacts'>
                <IconButton title='Add new contact' LinkComponent={Link} href="/contacts/add">
                    <PlusIcon color='white' />
                </IconButton>
            </Topbar>
            <Stack paddingX={3} paddingY={1} direction="column" spacing={2} flexGrow={1}>
                <ContactList />
            </Stack>
        </Stack>
    )
}

export default ContactsPage