'use client';
import endpoints from '@/libs/endpoints';
import useFetch from '@/libs/hooks/useFetch';
import { Box, Typography } from '@mui/material';
import React from 'react'
import ContactTile from './ContactTile';

const ContactList = () => {
    const { data, isLoading } = useFetch({ endpoint: endpoints.CONTACTS });

    if (isLoading) {
        return (
            <Box className="h-full grid place-content-center">
                loading...
            </Box>
        )
    }

    if (!Array.isArray(data) || data.length <= 0) {
        return (
            <Box className="h-full grid place-content-center">
                <Typography textAlign="center" variant='h5'>You don't have any contacts.</Typography>
                <Typography textAlign="center" variant='body2'>Add one to view here.</Typography>
            </Box>
        )
    }

    return data.map(d => (
        <ContactTile key={d.id} {...d} />
    ))
}

export default ContactList