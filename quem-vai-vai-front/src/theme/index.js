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
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            '&:hover': {
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.6)',
              transform: 'translateY(-2px) scale(1.03)',
            },
          },
        },
      },
    },
  })
