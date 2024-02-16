'use client';
import { IContactForm } from '@/libs/forms';
import useCreate from '@/libs/mutations/contacts/useCreate';
import Button from '@/widgets/Button';
import InputBox from '@/widgets/InputBox';
import { Box, CircularProgress, InputLabel, Stack } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';

const ContactForm = () => {
    const { mutate: createContact, isPending } = useCreate();
    const { handleSubmit, control } = useForm<IContactForm>({
        defaultValues: {
            name: "",
            email: ""
        }
    });

    const onSubmit = (data: IContactForm) => {
        createContact(data);
    }

    return (
        <Stack onSubmit={handleSubmit(onSubmit)} component="form" padding={10} direction="column" spacing={4} flexGrow={1}>

            <Controller
                name='name'
                control={control}
                render={({ field: { value, onChange } }) => {
                    return (
                        <InputBox
                            type='text'
                            value={value}
                            onChange={onChange}
                            placeholder='ex. doe.john@domain.com'
                            label="Name"
                            size="small"
                            required
                        />
                    )
                }}
            />

            <Controller
                name='email'
                control={control}
                render={({ field: { value, onChange } }) => {
                    return (
                        <InputBox
                            type='email'
                            value={value}
                            onChange={onChange}
                            placeholder='ex. doe.john@domain.com'
                            label="Email ID"
                            size="small"
                            required
                        />
                    )
                }}
            />

            <Box>
                <Button type="submit" disabled={isPending} variant='contained' className='w-full'>
                    {isPending ? (<CircularProgress size={20} variant="indeterminate" color="inherit" />) : "Save"}
                </Button>
            </Box>
        </Stack>
    )
}

export default ContactForm