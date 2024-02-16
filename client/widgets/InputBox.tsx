import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";

const InputBox: FC<TextFieldProps> = ({ className, ...rest }) => {
    return (
        <TextField
            InputProps={{
                sx: {
                    borderRadius: '10px'
                }
            }}
            className={`w-full ${className || ""}`}
            {...rest}
        />
    )
}


export default InputBox;