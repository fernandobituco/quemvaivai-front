import { useState } from "react";
import {
    useTheme,
    useMediaQuery,
    Container,
} from "@mui/material";
import DesktopLayout from "./components/desktop/desktop-layout";
import MobileLayout from "./components/mobile/mobile-layout";
import * as Service from "@services/user.service";
import { useNotification } from "@contexts/NotificationContext";
import { useLoading } from "@/contexts/LoadingContext";
import GlobalSwitches from "@/components/Switches/GlobalSwitches";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    const { login } = useAuth()
    const navigate = useNavigate()


    const toggleForm = () => {
        setIsLogin((prev) => !prev)
        //setShowSlider((prev) => !prev)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(isLogin ? "Logging in..." : "Registering...");
        // Handle form submission logic here
    }

    const [passwordMatch, setPasswordMatch] = useState(true)

    const [createUserForm, setCreateUserForm] = useState({
        name: "",
        email: "",
        password: "",
        passwordconfirmation: "",
    })

    const { showNotification } = useNotification()

    const { t } = useTranslation()

    const { showLoading, hideLoading } = useLoading()

    const handleUpdateCreateUserForm = (e) => {
        const name = e.target.name
        const value = e.target.value
        setCreateUserForm(prev => ({
            ...prev,
            [name]: value
        }))
        if (name == "passwordconfirmation") {
            if (value == createUserForm.password) {
                setPasswordMatch(true)
            } else {
                setPasswordMatch(false)
            }
        }
    }

    const handleSubmitCreateUserForm = async (e) => {
        showLoading()
        e.preventDefault()
        if (passwordMatch) {
            try {
                const response = await Service.createUser(createUserForm)
                if (response.StatusCode == 200) {
                    setCreateUserForm({
                        name: "",
                        email: "",
                        password: "",
                        passwordconfirmation: "",
                    })
                    showNotification(t('will.receive.confimation.email'), "success")
                }
            } catch (err) {
            }
        }
        hideLoading()
    }

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    })

    const handleUpdateLoginForm = (e) => {
        const name = e.target.name
        const value = e.target.value
        setLoginForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmitLoginForm = async (e) => {
        e.preventDefault()
        showLoading()
        try {
            const loginresponse = await login(loginForm.email, loginForm.password)
            if (loginresponse.success) {
                navigate('groups')
            } else {
                showNotification(loginresponse.error, "error")
            }
        } finally {
            hideLoading()
        }
    }

    return (
        <Container sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isMobile ? muiTheme.palette.background.paper : muiTheme.palette.background.default,
            padding: muiTheme.spacing(2),
        }}>
            <GlobalSwitches top={isMobile ? "25vh" : 16} />

            {isMobile ? (
                <MobileLayout
                    isLogin={isLogin}
                    handleSubmit={handleSubmit}
                    createUserForm={createUserForm}
                    handleUpdateCreateUserForm={handleUpdateCreateUserForm}
                    loginForm={loginForm}
                    handleUpdateLoginForm={handleUpdateLoginForm}
                    toggleForm={toggleForm}
                    muiTheme={muiTheme}
                    showPassword={showPassword}
                    setShowPassword={value => setShowPassword(value)}
                    handleSubmitCreateUserForm={handleSubmitCreateUserForm}
                    handleSubmitLoginForm={handleSubmitLoginForm}
                    passwordMatch={passwordMatch}
                />
            ) : (
                <DesktopLayout
                    isLogin={isLogin}
                    handleSubmit={handleSubmit}
                    createUserForm={createUserForm}
                    handleUpdateCreateUserForm={handleUpdateCreateUserForm}
                    loginForm={loginForm}
                    handleUpdateLoginForm={handleUpdateLoginForm}
                    toggleForm={toggleForm}
                    muiTheme={muiTheme}
                    showPassword={showPassword}
                    setShowPassword={value => setShowPassword(value)}
                    handleSubmitCreateUserForm={handleSubmitCreateUserForm}
                    handleSubmitLoginForm={handleSubmitLoginForm}
                    passwordMatch={passwordMatch}
                />
            )}
        </Container>
    )
}

export default Login