import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff, DarkMode, LightMode } from '@mui/icons-material';
import { useThemeMode } from '../../contexts/ThemeContext';
import { loginUser } from '../../services/user.service';

const Login = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { toggleTheme, mode } = useThemeMode()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await loginUser(email, password)
      .then((data) => {
        console.log('Login successful:', data)
        // Handle successful login (e.g., redirect to dashboard)
      })
      .catch((error) => {
        console.error('Login failed:', error)
        // Handle login error (e.g., show error message)
      })
  }

  return (
    <Container maxWidth="sm" sx={{ mt: isMobile ? 4 : 12 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Quem Vai Vai
          </Typography>
          <IconButton onClick={toggleTheme}>
            {mode === 'light' ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Box>

        <Typography variant="body1" color="text.secondary">
          Faça login para continuar
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Senha"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Entrar
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Login