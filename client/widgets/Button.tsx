import { ButtonProps, Button as MuiButton } from '@mui/material'
import React, { FC } from 'react'

const Button: FC<ButtonProps> = ({ children, className, disableRipple = true, disableElevation = true, sx, ...rest }) => {
    return (
        <MuiButton
            disableElevation={disableElevation}
            disableRipple={disableRipple}
            size="large"
            sx={{ borderRadius: "10px", textTransform: "capitalize", ...sx }}
            className={`h-[45px] ${className || ""}`}
            {...rest}
        >
            {children}
        </MuiButton>
    )
}

export default Button