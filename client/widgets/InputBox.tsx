import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";

const InputBox: FC<TextFieldProps> = ({...rest}) => {
    return (
        <TextField
            InputProps={{
                sx: {
                    borderRadius: '10px'
                }
            }}
            {...rest}
        />
    )
}


export default InputBox;