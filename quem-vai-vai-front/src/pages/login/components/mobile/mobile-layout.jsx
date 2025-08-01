import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import SlidingPanel from "./sliding-panel";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginForm from "./form";
import { useTranslation } from "react-i18next";

const MobileLayout = (props) => {

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
                handleChangeForm={_ => {
                    setShowPassword(false)
                    toggleForm()
                }}
                mode={mode} />
            <Box sx={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "65vh", overflow: 'auto' }}>
                <LoginForm
                    title="Login"
                    isMobile
                    show={isLogin}
                    handleSubmit={handleSubmitLoginForm}
                    buttonName="Login"
                    fields={
                        <Box
                            sx={{ width: "100%", maxWidth: "360", mt: 2 }}
                            noValidate
                            autoComplete="off"
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
                            <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                                {t('forgot.password')}
                            </Typography>

                            <Box
                                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <Typography mt={1}>
                                    {t('not.registered')}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        mt: 2, color: muiTheme.palette.primary.main,
                                        borderColor: muiTheme.palette.primary.main
                                    }}
                                    onClick={toggleForm}
                                >
                                    {t('register')}
                                </Button>
                            </Box>
                        </Box>
                    }
                />
                <LoginForm
                    title="Registration"
                    isMobile
                    show={!isLogin}
                    handleSubmit={handleSubmitCreateUserForm}
                    buttonName={t('to.register')}
                    fields={
                        <Box
                            sx={{ width: "100%", maxWidth: "360", mt: 2 }}
                            noValidate
                            autoComplete="off"
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
                                error={!passwordMatch}
                                helperText={!passwordMatch ? "As senhas precisam ser iguais" : null}
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
                                value={createUserForm.passwordconfirmation}
                                error={!passwordMatch}
                                helperText={!passwordMatch ? t('password.confirm.error') : null}
                                onChange={handleUpdateCreateUserForm}
                            />
                            <Box
                                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <Typography mt={1}>
                                    {t('already.registered')}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        mt: 2, color: muiTheme.palette.primary.main,
                                        borderColor: muiTheme.palette.primary.main
                                    }}
                                    onClick={toggleForm}
                                >
                                    Login
                                </Button>
                            </Box>
                        </Box>
                    }
                />
            </Box>
        </Box>
    )
}

export default MobileLayout