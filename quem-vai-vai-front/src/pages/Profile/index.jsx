import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useState } from "react";
import { Box, Button, Container, Grid, Paper, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import ConfirmDeleteDialog from "@/components/Dialogs/ConfirmDeleteDialog";

const Profile = () => {

    const { t } = useTranslation()
    const { showLoading, hideLoading } = useLoading()
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const { user, updateUserProfile, deleteUser } = useAuth()

    const [userValues, setUserValues] = useState(user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        showLoading()
        try {
            await updateUserProfile(userValues)
        } finally {
            hideLoading()
        }
    }

    const handleDelete = async () => {
        showLoading()
        try {
            await deleteUser(user.id)
        } finally {
            hideLoading()
        }
    }

    const handleChange = (name, value) => {
        setUserValues({
            ...userValues,
            [name]: value
        })
    }

    return (
        <Container
            maxWidth={isMobile ? false : "md"}
            disableGutters={isMobile}
            sx={{
                display: "flex",
                justifyContent: isMobile ? "flex-start" : "center",
                alignItems: "center",
                minHeight: "calc(100vh - 64px)",
                height: "calc(100vh - 64px)",
                py: isMobile ? 0 : 8,
            }}
        >
            <Paper
                elevation={isMobile ? 0 : 3}
                sx={{
                    py: isMobile ? 8 : 4,
                    px: 0,
                    borderRadius: isMobile ? 0 : 3,
                    backgroundColor: theme.palette.background.paper,
                    width: "100%",
                    height: isMobile ? "100%" : "100%",
                    alignItems: "center",
                    justifyContent: "start",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    minHeight: '300px',
                    overflow: 'auto'
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    textAlign="center"
                    gutterBottom
                    color="primary"
                >
                    {t("profile")}
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    gap={3}
                    width="100%"
                    flex={1} // ocupa o espaço vertical restante
                    sx={{
                        px: isMobile ? 2 : 8,
                        py: isMobile ? 3 : 4,
                        maxWidth: isMobile ? "100%" : "800px",
                    }}
                >
                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12} lg={12}>
                            <TextField
                                label={t('name')}
                                type="text"
                                variant="outlined"
                                value={userValues.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                required={true}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Grid item xs={12} lg={12}>
                                <TextField
                                    label={t('email')}
                                    type="text"
                                    variant="outlined"
                                    value={userValues.email}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                        flexDirection="row"
                        gap={2}
                        alignItems="center"
                        marginTop={2}
                    >
                        <Button
                            variant="outlined"
                            size="large"
                            color="error"
                            onClick={_ => setDeleteDialogOpen(true)}
                            sx={{
                                mt: 1,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: "bold",
                                py: 1.2,
                                maxWidth: "40%",
                                minWidth: "180px"
                            }}
                        >
                            {t('delete')}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 1,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: "bold",
                                py: 1.2,
                                maxWidth: "40%",
                                minWidth: "180px",
                            }}
                        >
                            {t('save.edit')}
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <ConfirmDeleteDialog open={deleteDialogOpen} onClose={_ => setDeleteDialogOpen(false)} onConfirm={handleDelete} entity={"group"} />
        </Container>
    )
}

export default Profile