import {
    Alert,
    Box,
    Button,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { useState } from "react";
import GlobalSwitches from "@/components/Switches/GlobalSwitches";

export default function AccountDeletion() {
    const theme = useTheme();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setError("");

        if (!email || !password) {
            setError("Informe seu e-mail e sua senha.");
            return;
        }

        setLoading(true);

        try {
            // TODO: chamar endpoint de exclusão da conta
            //
            // await Api.delete("/users/account", {
            //   data: {
            //     email,
            //     password,
            //   },
            // });

            setSuccess(true);
        } catch (err) {
            setError(
                "Não foi possível excluir a conta. Verifique seus dados e tente novamente."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                p: 2,
            }}
        >
            <GlobalSwitches top={16} />

            <Box
                sx={{
                    width: "100%",
                    maxWidth: 500,
                    mt: 12,
                    mb: 6,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <DeleteForever
                        sx={{
                            fontSize: 80,
                            color: theme.palette.error.main,
                        }}
                    />

                    <Typography
                        variant="h4"
                        mt={2}
                        color={theme.palette.primary.main}
                    >
                        Excluir conta
                    </Typography>

                    <Typography
                        variant="body1"
                        mt={2}
                        color="text.secondary"
                    >
                        A exclusão da conta removerá seus dados pessoais e os dados
                        relacionados à sua conta no Quem Vai Vai.
                    </Typography>
                </Box>

                {success ? (
                    <Alert
                        severity="success"
                        sx={{ mt: 4 }}
                    >
                        Sua conta foi excluída com sucesso.
                    </Alert>
                ) : (
                    <>
                        <Box
                            sx={{
                                mt: 4,
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            <TextField
                                label="E-mail"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                fullWidth
                                autoComplete="email"
                            />

                            <TextField
                                label="Senha"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                fullWidth
                                autoComplete="current-password"
                            />

                            {error && (
                                <Alert severity="error">
                                    {error}
                                </Alert>
                            )}

                            <Button
                                variant="contained"
                                color="error"
                                size="large"
                                onClick={handleDelete}
                                disabled={loading}
                                sx={{ mt: 1 }}
                            >
                                {loading ? "Excluindo..." : "Excluir minha conta"}
                            </Button>
                        </Box>

                        <Typography
                            variant="body2"
                            mt={3}
                            color="text.secondary"
                            textAlign="center"
                        >
                            Essa ação é permanente e não poderá ser desfeita.
                        </Typography>
                    </>
                )}
            </Box>
        </Box>
    );
}