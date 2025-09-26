import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import SlidingPanel from "./sliding-panel"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useTranslation } from "react-i18next"
import { AnimatePresence, motion } from "framer-motion"

const MobileLayout = (props) => {
    const {
        showPassword,
        setShowPassword,
        showPasswordConfirmation,
        setShowPasswordConfirmation,
        toggleForm,
        mode,
        isLogin,
        muiTheme,
        handleUpdateLoginForm,
        loginForm,
        handleSubmitLoginForm,
        handleUpdateCreateUserForm,
        createUserForm,
        handleSubmitCreateUserForm,
        passwordMatch,
    } = props

    const { t } = useTranslation()

    const handleToggleForm = () => {
        setShowPassword(false)
        toggleForm()
    }

    const formMotion = {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 1 },
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: 600,
                borderRadius: `${muiTheme.shape.borderRadius}px`,
                overflow: "hidden",
                boxShadow: muiTheme.shadows[10],
                background: muiTheme.palette.background.paper,
                [muiTheme.breakpoints.down("sm")]: {
                    flexDirection: "column",
                    height: "auto",
                    maxWidth: 400,
                },
            }}
        >
            <SlidingPanel
                isLogin={isLogin}
                handleChangeForm={() => {
                    setShowPassword(false)
                    setShowPasswordConfirmation(false)
                    toggleForm()
                }}
                mode={mode}
            />

            <Box sx={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "65vh", overflow: "auto" }}>
                <AnimatePresence mode="wait" initial={false}>
                    {isLogin ? (
                        <motion.form
                            key="login"
                            onSubmit={handleSubmitLoginForm}
                            {...formMotion}
                            style={{
                                width: "100%",
                                height: "100%",
                                zIndex: 1,
                                backgroundColor: muiTheme.palette.background.paper,
                                color: muiTheme.palette.text.primary,
                                paddingInline: muiTheme.spacing(4),
                                paddingBottom: muiTheme.spacing(4),
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box sx={{ width: "100%", maxWidth: 360, mt: 2 }}>
                                <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom align="center">
                                    {t("login")}
                                </Typography>

                                <Box sx={{ mt: 2, minHeight: "40vh" }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="Email"
                                        margin="normal"
                                        variant="outlined"
                                        name="email"
                                        type="email"
                                        value={loginForm.email}
                                        onChange={handleUpdateLoginForm}
                                    />

                                    <TextField
                                        fullWidth
                                        required
                                        label={t("password")}
                                        margin="normal"
                                        variant="outlined"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={loginForm.password}
                                        onChange={handleUpdateLoginForm}
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

                                    <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                                        {t("forgot.password")}
                                    </Typography>

                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography mt={1}>{t("not.registered")}</Typography>
                                        <Button
                                            variant="outlined"
                                            sx={{ mt: 2, color: muiTheme.palette.primary.main, borderColor: muiTheme.palette.primary.main }}
                                            onClick={handleToggleForm}
                                        >
                                            {t("register")}
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>

                            <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: "auto", mb: 3, borderRadius: 3 }}>
                                {t("login")}
                            </Button>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="register"
                            onSubmit={handleSubmitCreateUserForm}
                            {...formMotion}
                            style={{
                                width: "100%",
                                height: "100%",
                                zIndex: 1,
                                backgroundColor: muiTheme.palette.background.paper,
                                color: muiTheme.palette.text.primary,
                                paddingInline: muiTheme.spacing(4),
                                paddingBottom: muiTheme.spacing(4),
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box sx={{ width: "100%", maxWidth: 360, mt: 2, mb: 2 }}>
                                <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom align="center">
                                    {t("register")}
                                </Typography>

                                <Box sx={{ mt: 2, minHeight: "40vh" }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label={t("name")}
                                        margin="normal"
                                        variant="outlined"
                                        name="name"
                                        value={createUserForm.name}
                                        onChange={handleUpdateCreateUserForm}
                                    />

                                    <TextField
                                        fullWidth
                                        required
                                        label="Email"
                                        margin="normal"
                                        variant="outlined"
                                        name="email"
                                        type="email"
                                        value={createUserForm.email}
                                        onChange={handleUpdateCreateUserForm}
                                    />

                                    <TextField
                                        fullWidth
                                        required
                                        label={t("password")}
                                        margin="normal"
                                        variant="outlined"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={createUserForm.password}
                                        onChange={handleUpdateCreateUserForm}
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
                                        value={createUserForm.passwordconfirmation}
                                        onChange={handleUpdateCreateUserForm}
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

                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography mt={1}>{t("already.registered")}</Typography>
                                        <Button
                                            variant="outlined"
                                            sx={{ mt: 2, color: muiTheme.palette.primary.main, borderColor: muiTheme.palette.primary.main }}
                                            onClick={handleToggleForm}
                                        >
                                            {t("login")}
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>

                            <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: "auto", mb: 3, borderRadius: 3 }}>
                                {t("to.register")}
                            </Button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </Box>
        </Box>
    )
}

export default MobileLayout
