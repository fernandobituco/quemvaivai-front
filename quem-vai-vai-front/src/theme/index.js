import { createTheme } from '@mui/material/styles';
import { lightPalette, darkPalette } from './palette';

export const getTheme = (mode) =>
  createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    shadows: mode === 'light' ? Array(25).fill('none') : Array(25).fill('none').map((_, index) => `0px ${index}px 10px rgba(0, 0, 0, 0.1)`),
  })
