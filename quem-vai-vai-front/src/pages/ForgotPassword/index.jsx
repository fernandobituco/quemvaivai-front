import { Box, Button, Paper, TextField, Typography, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"
import * as PasswrodResetToken from "@/services/passwordresettoken.service"
import { useLoading } from "@/contexts/LoadingContext"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { useNotification } from "@/contexts/NotificationContext"

const ForgotPassword = () => {
    const navigate = useNavigate()
    const theme = useTheme()

    const { showLoading, hideLoading } = useLoading()
    const { t } = useTranslation()
    const { showNotification } = useNotification()

    const [email, setEmail] = useState("")

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setEmail(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        showLoading()
        try {
            const success = await PasswrodResetToken.getToken(email)
            if (success) {
                console.log('caiu no if')
                showNotification(t("password.revocery.request.success"), "success")
                navigate("/")
            }
            else {
                console.error("caiu no else")
                showNotification(t("password.revocery.request.error"), "error")
            }
        } catch (error) {
            console.error("caiu no catch")
            console.error("Error resetting password:", error)
            showNotification(t("password.revocery.request.error"), "error")
        } finally {
            hideLoading()
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: theme.palette.background.default,
                p: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: "100%",
                    maxWidth: 400,
                    textAlign: "center",
                }}
            >
                <>
                    <Typography variant="h5" mt={2}>
                        {t('password.recovery')}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            required
                            label={t("email")}
                            margin="normal"
                            variant="outlined"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3 }}
                            type="submit"
                        >
                            {t('save')}
                        </Button>
                    </form>
                </>
            </Paper>
        </Box>
    )
}

export default ForgotPassword