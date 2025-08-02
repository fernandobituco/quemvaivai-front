import GlobalSwitches from "@/components/GlobalSwitches";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate()
  const theme = useTheme()
  const { t } = useTranslation()
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

      <GlobalSwitches top={16} />
      <Typography variant="h2" color={theme.palette.primary.main}>
        404
      </Typography>
      <Typography variant="h5" mt={2}>
        {t('not.found')}
      </Typography>
      <Typography variant="body1" mt={1}>
        {t('not.found.address')}
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => navigate("/")}
      >
        {t('go.back')}
      </Button>
    </Box>
  )
}