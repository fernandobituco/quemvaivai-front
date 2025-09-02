import { Box, Button, IconButton, InputAdornment, TextField, Typography, useTheme } from "@mui/material"
import SlidingPanel from "./sliding-panel"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useTranslation } from "react-i18next"
import { AnimatePresence, motion } from "framer-motion"

const DesktopLayout = (props) => {

    const {
        showPassword,
        setShowPassword,
        toggleForm,
        mode,
        isLogin,
        muiTheme,
        handleUpdateCreateUserForm,
        handleUpdateLoginForm,
        loginForm,
        createUserForm,
        handleSubmitCreateUserForm,
        handleSubmitLoginForm,
        passwordMatch
    } = props

    const { t } = useTranslation()
    const theme = useTheme()

    return (
        <Box
            sx={{
                width: "100%",
                position: "relative",
                maxWidth: 960,
                height: 600,
                display: "flex",
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
                handleChangeForm={_ => {
                    setShowPassword(false)
                    toggleForm()
                }}
                mode={mode}
            />
            <Box
                sx={{
                    flex: 1,
                    padding: theme.spacing(4),
                    alignItems: "center",
                    zIndex: 1,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    position: "relative",
                    overflow: "hidden",
                    [theme.breakpoints.down("sm")]: {
                        width: "100%",
                    },
                }}>
                <AnimatePresence>
                    {!isLogin && (
                        <form
                            onSubmit={handleSubmitCreateUserForm}
                            style={{
                                height: "100%",
                            }}>
                            <Box
                                initial={{ opacity: 0, x: "100%" }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: "100%" }}
                                transition={{ duration: 2, ease: "easeIn" }}
                                component={motion.div}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    marginBottom: 4,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "column",
                                }}>
                                <Box
                                    justifyContent="center"
                                    marginTop={4}
                                    sx={{ width: "100%", maxWidth: 360 }}
                                >
                                    <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom align="center">
                                        {t('register')}
                                    </Typography>
                                    <Box
                                        sx={{ width: "100%", maxWidth: "360", mt: 2 }}
                                        minHeight={"auto"}
                                    >
                                        <TextField
                                            fullWidth
                                            required
                                            label={t('name')}
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
                                            type="email"
                                            variant="outlined"
                                            name="email"
                                            value={createUserForm.email}
                                            onChange={handleUpdateCreateUserForm}
                                        />
                                        <TextField
                                            fullWidth
                                            required
                                            label={t('password')}
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
                                            label={t('password.confirm')}
                                            margin="normal"
                                            variant="outlined"
                                            type="password"
                                            name="passwordconfirmation"
                                            error={!passwordMatch}
                                            helperText={!passwordMatch ? t('password.confirm.error') : null}
                                            slotProps={{ htmlInput: { minLength: 8 } }}
                                            value={createUserForm.passwordconfirmation}
                                            onChange={handleUpdateCreateUserForm}
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
                                    </Box >
                                </Box>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{ mb: 3, borderRadius: 3 }}
                                >
                                    {t('to.register')}
                                </Button>
                            </Box>
                        </form>
                    )}
                </AnimatePresence>
            </Box >
            <Box
                sx={{
                    flex: 1,
                    padding: theme.spacing(4),
                    alignItems: "center",
                    zIndex: 1,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    position: "relative",
                    overflow: "hidden",
                    [theme.breakpoints.down("sm")]: {
                        width: "100%",
                    },
                }}>
                <AnimatePresence>
                    {isLogin && (
                        <form
                            onSubmit={handleSubmitLoginForm}
                            style={{
                                height: "100%",
                            }}>
                            <Box
                                initial={{ opacity: 0, x: "-100%" }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: "-100%" }}
                                transition={{ duration: 2, ease: "easeIn" }}
                                component={motion.div}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    marginBottom: 4,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "column",
                                }}>
                                <Box
                                    justifyContent="center"
                                    marginTop={4}
                                    sx={{ width: "100%", maxWidth: 360 }}
                                >
                                    <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom align="center">
                                        {t('login')}
                                    </Typography>
                                    <Box
                                        sx={{ width: "100%", maxWidth: "360", mt: 2 }}
                                        minHeight={"auto"}
                                    >
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
                                            label={t('password')}
                                            margin="normal"
                                            variant="outlined"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={loginForm.password}
                                            onChange={handleUpdateLoginForm}
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
                                        <Typography variant="caption" sx={{ display: "block", mt: 1 }} align="center">
                                            {t('forgot.password')}
                                        </Typography>
                                    </Box >
                                </Box>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{ mb: 3, borderRadius: 3 }}
                                >
                                    Login
                                </Button>
                            </Box>
                        </form>
                    )}
                </AnimatePresence>
            </Box >
        </Box>
    )
}

export default DesktopLayout