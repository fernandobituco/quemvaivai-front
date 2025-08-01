import { motion, useAnimation } from "framer-motion";
import { useTheme } from "@emotion/react";
import { Box, Typography, IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const SlidingPanel = ({ isLogin, mode, toggleTheme }) => {
    //const controls = useAnimation()
    const theme = useTheme()
    const { t } = useTranslation()

    // useEffect(() => {
    //     const animate = async () => {
    //         console.log("Animating sliding panel:", isLogin,)
    //         if (!isLogin) {
    //             // Passo 1: expandir até cobrir tudo
    //             await controls.start({
    //                 width: "100%",
    //                 maxWidth: "52%",
    //                 left: "calc(24%)",
    //                 transition: { duration: 1, ease: "easeInOut" },
    //             })

    //             await controls.start({
    //                 left: "calc(51%)",
    //                 width: "52%",
    //                 maxWidth: "25%",
    //                 transition: { duration: 1, ease: "easeInOut" },
    //             })

    //             //onAnimationComplete?.() // Exibe o form de cadastro
    //         } else {
    //             // Reverter para login
    //             await controls.start({
    //                 width: "100%",
    //                 maxWidth: "52%",
    //                 left: "calc(24%)",
    //                 transition: { duration: 1, ease: "easeInOut" },
    //             })

    //             await controls.start({
    //                 width: "50%",
    //                 maxWidth: "25%",
    //                 left: "calc(24%)",
    //                 transition: { duration: 1, ease: "easeInOut" },
    //             })
    //             //onAnimationComplete?.(); // Exibe o form de login
    //         }
    //     }
    //     animate()
    // }, [isLogin])
    return (
        <Box
            //component={motion.div}
            //animate={controls}
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "inherit",
                zIndex: 10, // garante que fique acima
                paddingBottom: 4,
                color: "#fff",
                backgroundColor: theme.palette.primary.main,
                boxShadow: theme.shadows[10],
                //borderRadius: `${theme.shape.borderRadius}px`,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBlock={4}>
                <Typography variant="h3" fontWeight="bold" pr={2}>
                    Quem Vai Vai
                </Typography>
                <IconButton onClick={toggleTheme}>
                    {mode === 'light' ? <DarkMode /> : <LightMode />}
                </IconButton>
            </Box>
            <Typography variant="h4" fontWeight="bold">
                {isLogin ? t('welcome') : t('welcom.back')}
            </Typography>
        </Box>
    )
}

export default SlidingPanel