import { motion, useAnimation } from "framer-motion";
import { useTheme } from "@emotion/react";
import { Box, Typography, IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const SlidingPanel = (props) => {
    const { isLogin } = props
    const controls = useAnimation()
    const theme = useTheme()
    const { t } = useTranslation()

    useEffect(() => {
        const animate = async () => {
            await controls.start({
                height: "100vh",
                transition: { duration: 1, ease: "easeInOut" },
            })
            await controls.start({
                height: "25vh",
                transition: { duration: 1, ease: "easeInOut" },
            })
        }
        animate()
    }, [isLogin])

    return (
        <Box
            component={motion.div}
            animate={controls}
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "25vh",
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
            </Box>
            <Typography variant="h4" fontWeight="bold">
                {isLogin ? t('welcome.back') : t('welcome')}
            </Typography>
        </Box>
    )
}

export default SlidingPanel