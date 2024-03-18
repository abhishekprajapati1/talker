import React, { FC } from 'react'
import FacebookIcon from './icons/FacebookIcon'
import { Button, ButtonProps } from './ui/button';

const FacebookAuthButton: FC<ButtonProps> = ({ ...rest }) => {
    return (
        <Button type='button' variant='secondary' {...rest}>
            <FacebookIcon className='text-[#0866FF] me-4 w-[20px] h-[20px]' />
            Continue with facebook
        </Button>
    )
}

export default FacebookAuthButton;