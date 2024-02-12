import Button from '@/widgets/Button'
import { ButtonProps } from '@mui/material'
import React, { FC } from 'react'
import GoogleIcon from './icons/GoogleIcon'

const GoogleAuthButton: FC<ButtonProps> = ({ ...rest }) => {
    return (
        <Button type='button' startIcon={<GoogleIcon />} variant='contained' color='inherit' {...rest}>
            Continue with google
        </Button>
    )
}

export default GoogleAuthButton