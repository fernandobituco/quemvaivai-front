import { useState } from "react";
import {
    useTheme,
    useMediaQuery,
    Container,
} from "@mui/material";
import { useThemeMode } from "../../contexts/ThemeContext";
import DesktopLayout from "./components/desktop/desktop-layout";
import MobileLayout from "./components/mobile/mobile-layout";

const Login = () => {
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
                <MobileLayout
                    isLogin={isLogin}
                    handleSubmit={handleSubmit}
                    toggleForm={toggleForm}
                    toggleTheme={toggleTheme}
                    muiTheme={muiTheme}
                    mode={mode}
                    showPassword={showPassword}
                    setShowPassword={value => setShowPassword(value)}
                />
            ) : (
                <DesktopLayout
                    isLogin={isLogin}
                    handleSubmit={handleSubmit}
                    toggleForm={toggleForm}
                    toggleTheme={toggleTheme}
                    muiTheme={muiTheme}
                    mode={mode}
                    showPassword={showPassword}
                    setShowPassword={value => setShowPassword(value)}
                />
            )}
        </Container>
    )
}

export default Login;