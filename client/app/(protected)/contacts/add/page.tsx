import ContactForm from '@/components/contact/ContactForm'
import Topbar from '@/components/navigations/TopBar'
import { Box, Stack } from '@mui/material'
import React from 'react'

const AddNewContact = () => {
    return (
        <Box>
            <Stack direction="column">
                <Topbar backURL='/contacts' title='Add new contact' />
                <ContactForm />
            </Stack>
        </Box>
    )
}

export default AddNewContact;