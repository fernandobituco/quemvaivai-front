import GlobalSwitches from "@/components/GlobalSwitches";
import { Engineering } from "@mui/icons-material";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function InDevelopment() {
  const navigate = useNavigate()
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: theme.palette.background.default,
        p: 2,
      }}
    >

      <Engineering sx={{ fontSize: 100, color: theme.palette.primary.main }} />
      <Typography variant="h5" mt={2}>
        {t('in.development')}
      </Typography>
      <Typography variant="body1" mt={1}>
        {t('in.development.address')}
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => navigate(-1)}
      >
        {t('go.back')}
      </Button>
    </Box>
  )
}