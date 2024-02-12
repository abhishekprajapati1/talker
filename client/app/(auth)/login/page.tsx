import LoginForm from "@/components/auth/LoginForm";
import { Box, Container, Stack, Typography } from "@mui/material"
import Image from "next/image";

const LoginPage = () => {
    return (
        <Container>
            <Stack direction="column" gap={2}>
                <Box textAlign="center" padding={4} gap={4}>
                    <Stack direction="row" alignItems="center" margin="auto" width="fit-content">
                        <Box width={60} height={40} position="relative">
                            <Image
                                src="/logo.svg"
                                alt="brand logo"
                                fill
                                priority
                                className="object-contain"
                            />
                        </Box>
                        <Typography variant="h1" fontSize={25}>Talker</Typography>
                    </Stack>
                    <Box padding={2}>
                        <Typography variant="body1" align="center" >Login</Typography>
                    </Box>
                </Box>
            </Stack>
            <LoginForm />
        </Container>
    )
}

export default LoginPage;