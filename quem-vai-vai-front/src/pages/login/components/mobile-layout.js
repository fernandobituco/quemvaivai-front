import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import SlidingPanel from "./sliding-panel";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginForm from "./form";

const MobileLayout = (props) => {

    const { showPassword, setShowPassword, toggleForm, toggleTheme, mode, isLogin, muiTheme } = props

    return (
        <Box
            sx={{
                width: "100%",
                //maxWidth: 960,
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
                handleChangeForm={toggleForm}
                toggleTheme={toggleTheme}
                mode={mode} />
            <Box sx={{ position: "absolute", top: 180, left: 0, width: "100%", height: "calc(100% - 200px)" }}>
                <LoginForm
                    title="Login"
                    isMobile
                    show={isLogin}
                    handleSubmit={e => {
                        e.preventDefault();
                        console.log("Register")
                        // Handle form submission logic here
                    }}
                    buttonName="Login"
                    fields={
                        <Box
                            sx={{ width: "100%", maxWidth: "360", mt: 2 }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                fullWidth
                                label="Email"
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                margin="normal"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
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
                                Forgot password?
                            </Typography>

                            <Typography mt={1}>
                                Don't have an account?
                            </Typography>
                            <Button
                                variant="outlined"
                                sx={{
                                    mt: 2, color: muiTheme.palette.primary.main,
                                    borderColor: muiTheme.palette.primary.main
                                }}
                                onClick={toggleForm}
                            >
                                Register
                            </Button>
                        </Box>
                    }
                />
                <LoginForm
                    title="Registration"
                    isMobile
                    show={!isLogin}
                    handleSubmit={e => {
                        e.preventDefault();
                        console.log("Register")
                        // Handle form submission logic here
                    }}
                    buttonName="Register"
                    fields={
                        <Box
                            sx={{ width: "100%", maxWidth: "360", mt: 2 }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                fullWidth
                                label="Username"
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                margin="normal"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
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
                            <Typography mt={1}>
                                Already have an account?
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
                    }
                />
            </Box>
        </Box>
    )
}

export default MobileLayout