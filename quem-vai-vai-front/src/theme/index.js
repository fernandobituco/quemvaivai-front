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
  })
