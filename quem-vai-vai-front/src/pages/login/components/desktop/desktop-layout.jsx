import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import SlidingPanel from "./sliding-panel"
import LoginForm from "./form"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useTranslation } from "react-i18next"

const DesktopLayout = (props) => {

    const {
        showPassword,
        setShowPassword,
        toggleForm,
        toggleTheme,
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
                }
                }
                toggleTheme={toggleTheme}
                mode={mode}
            />
            <LoginForm
                show={!isLogin}
                leftSide
                title="Registration"
                buttonName={t('to.register')}
                handleSubmit={handleSubmitCreateUserForm}
                fields={
                    <Box
                        sx={{ width: "100%", maxWidth: "360", mt: 2 }}
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
                            slotProps={{ htmlInput: { minLength: 8 }}}
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
                            slotProps={{ htmlInput: { minLength: 8 }}}
                            value={createUserForm.passwordconfirmation}
                            onChange={handleUpdateCreateUserForm}
                        />
                    </Box>
                }
            />
            <LoginForm
                title="Login"
                show={isLogin}
                leftSide={false}
                buttonName={"Login"}
                handleSubmit={handleSubmitLoginForm}
                fields={
                    <Box
                        sx={{ width: "100%", maxWidth: 360, mt: 2 }}
                    >
                        <TextField
                            fullWidth
                            required
                            label="Email"
                            margin="normal"
                            variant="outlined"
                            name="email"
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
                    </Box>
                }
            />
        </Box>
    )
}

export default DesktopLayout