import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, IconButton, InputAdornment, Paper, TextField, Typography, useTheme } from "@mui/material"
import { useNavigate, useSearchParams } from "react-router-dom"
import * as PasswrodResetToken from "@/services/passwordresettoken.service"
import { useNotification } from "@/contexts/NotificationContext"
import { useLoading } from "@/contexts/LoadingContext"
import { useTranslation } from "react-i18next"
import { useState } from "react"

const PasswordRecovery = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const theme = useTheme()

    const { showLoading, hideLoading } = useLoading()
    const { t } = useTranslation()
    const { showNotification } = useNotification()

    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === "password") {
            setPassword(value)
        } else if (name === "passwordconfirmation") {
            setPasswordConfirmation(value)
        }
    }

    const passwordMatch = password === passwordConfirmation && password.length >= 8

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!passwordMatch) {
            return
        }
        showLoading()
        const token = searchParams.get("token")
        const userId = searchParams.get("userId")
        if (!token || !userId) {
            showNotification(t("password.reset.error"), "error")
            hideLoading()
            return
        }
        try {
            const success = await PasswrodResetToken.resetPassword(userId, password, passwordConfirmation, token)
            if (success) {
                showNotification(t("password.reset.success"), "success")
                navigate("/")
            }
            else {
                showNotification(t("password.reset.error"), "error")
            }
        } catch (error) {
            showNotification(t("password.reset.error"), "error")
            console.error("Error resetting password:", error)
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
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" mt={2}>
                        {t('password.recovery')}
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        label={t("new.password")}
                        margin="normal"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleChange}
                        slotProps={{ htmlInput: { minLength: 8 } }}
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

                    <TextField
                        fullWidth
                        required
                        label={t("password.confirm")}
                        margin="normal"
                        variant="outlined"
                        type={showPasswordConfirmation ? "text" : "password"}
                        name="passwordconfirmation"
                        value={passwordConfirmation}
                        onChange={handleChange}
                        error={passwordMatch === false}
                        helperText={passwordMatch === false ? t("password.confirm.error") : " "}
                        slotProps={{ htmlInput: { minLength: 8 } }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPasswordConfirmation((prev) => !prev)}>
                                        {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
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
            </Paper>
        </Box>
    )
}

export default PasswordRecovery