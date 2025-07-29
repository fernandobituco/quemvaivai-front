import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import SlidingPanel from "./sliding-panel"
import LoginForm from "./form"
import { Visibility, VisibilityOff } from "@mui/icons-material"

const DesktopLayout = (props) => {

    const { showPassword, setShowPassword, toggleForm, toggleTheme, mode, isLogin, muiTheme } = props

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
                handleChangeForm={toggleForm}
                toggleTheme={toggleTheme}
                mode={mode}
            />
            <LoginForm
                show={!isLogin}
                leftSide
                title="Registration"
                buttonName={"Register"}
                fields={
                    <Box
                        sx={{ width: "100%", maxWidth: "360", mt: 2 }}
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
                    </Box>
                }
            />
            <LoginForm
                title="Login"
                show={isLogin}
                leftSide={false}
                buttonName={"Login"}
                fields={
                    <Box
                        sx={{ width: "100%", maxWidth: 360, mt: 2 }}
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
                        <Typography variant="caption" sx={{ display: "block", mt: 1 }} align="center">
                            Forgot password?
                        </Typography>
                    </Box>
                }
            />
        </Box>
    )
}

export default DesktopLayout