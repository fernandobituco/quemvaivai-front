import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate()
  const theme = useTheme()
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: theme.palette.background.default,
        p: 2,
      }}
    >
      <Typography variant="h2" color={theme.palette.primary.main}>
        404
      </Typography>
      <Typography variant="h5" mt={2}>
        Página não encontrada
      </Typography>
      <Typography variant="body1" mt={1}>
        O endereço que você tentou acessar não existe.
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => navigate("/")}
      >
        Voltar para o início
      </Button>
    </Box>
  )
}