import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    useTheme,
    useMediaQuery,
    IconButton,
    InputAdornment,
    Container,
} from "@mui/material";
import { styled } from "@mui/system";
import SlidingPanel from "./components/sliding-panel";
import LoginForm from "./components/form";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useThemeMode } from "../../contexts/ThemeContext";
import SlidingPanelMobile from "./components/sliding-panel-mobile";
import FormMobile from "./components/form-mobile";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const muiTheme = useTheme()
    const { toggleTheme, mode } = useThemeMode()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))

    const toggleForm = () => {
        setIsLogin((prev) => !prev)
        //setShowSlider((prev) => !prev)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(isLogin ? "Logging in..." : "Registering...");
        toggleForm()
        // Handle form submission logic here
    }

    console.log(isMobile ? muiTheme.palette.background.default : muiTheme.palette.background.paper)

    return (
        <Container sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isMobile ? muiTheme.palette.background.paper : muiTheme.palette.background.default,
            padding: muiTheme.spacing(2),
        }}>

            {isMobile ? (
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
                    <SlidingPanelMobile
                        isLogin={isLogin}
                        handleChangeForm={toggleForm}
                        toggleTheme={toggleTheme}
                        mode={mode} />
                    <Box sx={{ position: "absolute", top: 180, left: 0, width: "100%", height: "calc(100% - 200px)" }}>
                        <FormMobile
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
                        <FormMobile
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
            ) : (
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
                    <SlidingPanel isLogin={isLogin} handleChangeForm={toggleForm} toggleTheme={toggleTheme} mode={mode} />
                    <LoginForm
                        isMobile={isMobile}
                        show={!isLogin}
                        leftSide
                        title="Registration"
                        handleSubmit={handleSubmit}
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
                        isMobile={isMobile}
                        title="Login"
                        show={isLogin}
                        leftSide={false}
                        handleSubmit={handleSubmit}
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
            )}
        </Container>
    )
}

export default AuthPage;