import { ThemeOptions, createTheme } from "@mui/material";

const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#bc0000',
        },
        secondary: {
            main: '#f50057',
        },
        success: {
            main: "#55bc79"
        }
    },
};


const theme = createTheme(themeOptions)

export default theme;