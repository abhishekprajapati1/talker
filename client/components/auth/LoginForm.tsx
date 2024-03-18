'use client';
import InputBox from '@/widgets/InputBox'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import GoogleAuthButton from '../GoogleAuthButton'
import FacebookAuthButton from '../FacebookAuthButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form';
import useLogin from '@/libs/mutations/auth/useLogin';
import { ILoginForm } from '@/libs/forms';
import { Button } from '../ui/button';

const LoginForm = () => {
    const router = useRouter();
    const { mutate: login, isPending } = useLogin();
    const { handleSubmit, control } = useForm<ILoginForm>({
        defaultValues: {
            email: "",
            password: ""
        }
    });


    const onSubmit = (data: ILoginForm) => {
        login(data);
    }


    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} height="100%" marginTop={2}>
            <Stack height="100%" direction="column" gap={3}>
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
                    Login
                </Button>
                <Typography textAlign="center">or</Typography>

                <GoogleAuthButton />
                <FacebookAuthButton />

                <Box flexGrow={1}>
                    <Typography variant='subtitle2' textAlign="center">Didn't have an account ? <Box color="primary.main" component={Link} href="/register">Create one</Box>.</Typography>
                </Box>
            </Stack>
        </Box>
    )
}

export default LoginForm