import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion";
import { useTheme } from "@emotion/react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

const SlidingPanel = ({ isLogin, handleChangeForm, mode, toggleTheme }) => {
    const controls = useAnimation()
    const [leftSide, setLeftSide] = useState(false)
    const theme = useTheme()

    useEffect(() => {
        const animate = async () => {
            console.log("Animating sliding panel:", isLogin, leftSide)
            if (!isLogin) {
                // Passo 1: expandir até cobrir tudo
                await controls.start({
                    width: "100%",
                    //maxWidth: "52%",
                    //left: "calc(24%)",
                    transition: { duration: 1, ease: "easeInOut" },
                })

                // Passo 2: mover para o lado direito com largura original
                setLeftSide(false);
                await controls.start({
                    //left: "calc(51%)",
                    width: "52%",
                    //maxWidth: "25%",
                    transition: { duration: 1, ease: "easeInOut" },
                })

                //onAnimationComplete?.() // Exibe o form de cadastro
            } else {
                // Reverter para login
                await controls.start({
                    width: "100%",
                    //maxWidth: "52%",
                    //left: "calc(24%)",
                    transition: { duration: 1, ease: "easeInOut" },
                })

                setLeftSide(true);
                await controls.start({
                    width: "52%",
                    //maxWidth: "25%",
                    //left: "calc(24%)",
                    transition: { duration: 1, ease: "easeInOut" },
                })
                //onAnimationComplete?.(); // Exibe o form de login
            }
        }
        animate()
    }, [isLogin])

    return (
        <Box
            component={motion.div}
            animate={controls}
            sx={{
                position: "absolute",
                width: "100%",
                maxWidth: "100%",
                height: "inherit",
                zIndex: 10, // garante que fique acima
                p: 4,
                color: "#fff",
                backgroundColor: theme.palette.primary.main,
                boxShadow: theme.shadows[10],
                borderRadius: `${theme.shape.borderRadius}px`,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                [theme.breakpoints.down("sm")]: {
                    width: "100%",
                    height: "auto",
                },
                ...(leftSide ? { left: 0 } : { right: 0 })
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h3" fontWeight="bold" pr={2}>
                    Quem Vai Vai
                </Typography>
                <IconButton onClick={toggleTheme}>
                    {mode === 'light' ? <DarkMode /> : <LightMode />}
                </IconButton>
            </Box>
            <Typography variant="h4" fontWeight="bold">
                {isLogin ? "Hello, Welcome!" : "Welcome Back!"}
            </Typography>
            <Typography mt={1}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
            </Typography>
            <Button
                variant="outlined"
                sx={{
                    mt: 2, color: "white",
                    borderColor: "white"
                }}
                onClick={handleChangeForm}
            >
                {isLogin ? "Register" : "Login"}
            </Button>
        </Box>
    )
}

export default SlidingPanel