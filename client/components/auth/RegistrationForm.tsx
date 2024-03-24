'use client';
import InputBox from '@/widgets/InputBox'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import GoogleAuthButton from '../GoogleAuthButton'
import FacebookAuthButton from '../FacebookAuthButton'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { ISignupForm } from '@/libs/forms';
import useSignup from '@/libs/mutations/auth/useSignup';
import { Button } from '../ui/button';



const RegistrationForm = () => {
    const { mutate: signup, isPending } = useSignup();
    const { handleSubmit, control } = useForm<ISignupForm>({
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    });

    const onSubmit = (data: ISignupForm) => {
        signup(data);
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} height="100%" marginTop={2}>
            <Stack height="100%" direction="column" gap={3}>
                <Controller
                    name='name'
                    control={control}
                    render={({ field }) => {
                        return (
                            <InputBox
                                required
                                label="Full Name"
                                size="small"
                                type="text"
                                {...field}
                            />
                        )
                    }}
                />


                <Controller
                    name='email'
                    control={control}
                    render={({ field }) => {
                        return (
                            <InputBox
                                required
                                label="Email address"
                                size="small"
                                type="email"
                                {...field}
                            />
                        )
                    }}
                />

                <Controller
                    name='password'
                    control={control}
                    render={({ field }) => {
                        return (
                            <InputBox
                                required
                                label="Password"
                                size="small"
                                type="password"
                                {...field}
                            />
                        )
                    }}
                />

                <Button type="submit">
                    Register
                </Button>
                <Typography textAlign="center">or</Typography>

                <GoogleAuthButton />
                <FacebookAuthButton />

                <Box flexGrow={1}>
                    <p className='text-center text-sm'>Already have an account ? <Box color="primary.main" component={Link} href="/login">login</Box>.</p>
                </Box>
            </Stack>
        </Box>
    )
}

export default RegistrationForm