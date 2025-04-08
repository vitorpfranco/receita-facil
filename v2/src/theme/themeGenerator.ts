import { createTheme } from '@mui/material/styles';
import { PaletteOptions } from '@mui/material/styles';

import { lightPalette } from './palette'


const generateCustomTheme = (
    palette: PaletteOptions,
) => {
    return createTheme({
        palette,
        typography:{
            fontFamily: `"Segoe UI", "Noto Sans", "Arial", sans-serif`,
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    "*": {
                        margin: 0,
                        padding: 0,
                        boxSizing: "border-box",
                    },
                    body: {
                        backgroundColor: "#f6f6f6",
                    },
                    a: {
                        textDecoration: "none",
                    },
                    li: {
                        listStyle: "none",
                    },
                },
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        minWidth: 'auto',
                        marginRight: '1rem',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none", 
                        fontSize: "1rem"
                    },
                    startIcon: {
                        "& > *:nth-of-type(1)": {
                            fontSize: "24px !important", 
                            fontWeight:"bold"
                        },
                    },
                },
            }
        }
    });
}


export const lightTheme = generateCustomTheme(lightPalette);
