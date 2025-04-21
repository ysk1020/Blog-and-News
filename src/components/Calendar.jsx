import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function CustomCalendar() {
    const lightTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#6366f1', // Tailwind indigo-500
            },
        },
        typography: {
            fontFamily: 'Comfortaa, sans-serif',
        },
    });

    return (
        <div className='w-full h-[calc(70%-9rem)] bg-[#111214] rounded-2xl'>
            <ThemeProvider theme={lightTheme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                </LocalizationProvider>
            </ThemeProvider>
        </div>
    );
}

export default CustomCalendar;
