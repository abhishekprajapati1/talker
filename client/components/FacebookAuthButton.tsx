import Button from '@/widgets/Button'
import { ButtonProps } from '@mui/material'
import React, { FC } from 'react'
import FacebookIcon from './icons/FacebookIcon'

const FacebookAuthButton: FC<ButtonProps> = ({ ...rest }) => {
    return (
        <Button type='button' variant='contained' startIcon={<FacebookIcon className='text-[#0866FF]' />} color='inherit' {...rest}>
            Continue with facebook
        </Button>
    )
}

export default FacebookAuthButton;