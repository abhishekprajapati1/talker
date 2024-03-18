import React, { FC } from 'react'
import GoogleIcon from './icons/GoogleIcon'
import { Button, ButtonProps } from './ui/button'

const GoogleAuthButton: FC<ButtonProps> = ({ ...rest }) => {
    return (
        <Button type='button' variant='secondary' {...rest}>
            <GoogleIcon className="me-4 w-[20px] h-[20px]" />
            Continue with google
        </Button>
    )
}

export default GoogleAuthButton