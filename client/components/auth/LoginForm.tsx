'use client';
import Button from '@/widgets/Button'
import InputBox from '@/widgets/InputBox'
import { Box, FormGroup, Stack, Typography } from '@mui/material'
import React from 'react'
import GoogleAuthButton from '../GoogleAuthButton'
import FacebookAuthButton from '../FacebookAuthButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';

const LoginForm = () => {
    const router = useRouter();

    const { handleSubmit } = useForm();


    const onSubmit = (data: any) => {
        router.push("/");
    }


    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} height="100%" marginTop={2}>
            <Stack height="100%" direction="column" gap={3}>
                <FormGroup>
                    <InputBox
                        required
                        label="Email address"
                        size="small"
                        type="email"
                    />
                </FormGroup>
                <FormGroup>
                    <InputBox
                        required
                        label="Password"
                        size="small"
                        type="password"
                    />
                </FormGroup>

                <Button type="submit" variant="contained">
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