import { ButtonProps, Button as MuiButton } from '@mui/material'
import React, { FC } from 'react'

const Button: FC<ButtonProps> = ({ children, disableRipple = true, disableElevation = true, sx, ...rest }) => {
    return (
        <MuiButton
            disableElevation={disableElevation}
            disableRipple={disableRipple}
            size="large"
            sx={{ borderRadius: "10px", textTransform: "capitalize", ...sx }}
            {...rest}
        >
            {children}
        </MuiButton>
    )
}

export default Button