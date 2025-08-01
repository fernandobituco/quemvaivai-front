import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    CircularProgress,
    Button,
    Paper,
    useTheme,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Api from "../../services/api";
import { useLoading } from "../../contexts/LoadingContext";
import * as Service from "../../services/emailconfirmationtoken.service"
import { useTranslation } from "react-i18next";

export default function AccountConfirmation() {
    const [status, setStatus] = useState("loading") // "loading" | "success" | "error"
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const theme = useTheme()
    const { showLoading, hideLoading } = useLoading()
    const { t } = useTranslation()

    useEffect(() => {
        showLoading()
        const token = searchParams.get("token");
        if (!token) {
            setStatus("error")
            return
        }

        const confirmAccount = async () => {
            try {
                await confirmAccount(token)
                setStatus("success")
            } catch (error) {
                setStatus("error")
            }
        }
                setStatus("success")
        //confirmAccount()
        hideLoading()
    }, [searchParams])

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
                {status === "success" && (
                    <>
                        <CheckCircleOutlineIcon fontSize="large" color="success" />
                        <Typography variant="h5" mt={2}>
                            {t('account.confirmation.success')}
                        </Typography>
                        <Typography variant="body1" mt={1}>
                            {t('login.allowed')}
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3 }}
                            onClick={() => navigate("/")}
                        >
                            {t('go.to.login')}
                        </Button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <ErrorOutlineIcon fontSize="large" color="error" />
                        <Typography variant="h5" mt={2}>
                            {t('invalid.link')}
                        </Typography>
                        <Typography variant="body2" mt={1}>
                            {t('verify.link')}
                        </Typography>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 3 }}
                            onClick={() => navigate("/reenviar-confirmacao")}
                        >
                            {t('resend.email')}
                        </Button>
                    </>
                )}
            </Paper>
        </Box>
    )
}