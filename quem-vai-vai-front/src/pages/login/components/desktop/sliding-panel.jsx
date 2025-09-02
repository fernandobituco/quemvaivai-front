import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion";
import { useTheme } from "@emotion/react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const SlidingPanel = ({ isLogin, handleChangeForm }) => {
    const controls = useAnimation()
    const [leftSide, setLeftSide] = useState(false)
    const theme = useTheme()
    const { t } = useTranslation()

    useEffect(() => {
        const animate = async () => {
            if (!isLogin) {
                await controls.start({
                    width: "100%",
                    transition: { duration: 1, ease: "easeInOut" },
                })
                setLeftSide(false);
                await controls.start({
                    width: "52%",
                    transition: { duration: 1, ease: "easeInOut" },
                })
            } else {
                // Reverter para login
                await controls.start({
                    width: "100%",
                    transition: { duration: 1, ease: "easeInOut" },
                })
                setLeftSide(true);
                await controls.start({
                    width: "52%",
                    transition: { duration: 1, ease: "easeInOut" },
                })
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
                zIndex: 10,
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
            </Box>
            <Typography variant="h4" fontWeight="bold">
                {isLogin ? t('welcome.back') : t('welcome')}
            </Typography>
            <Typography mt={1}>
                {isLogin ? t('not.registered') : t('already.registered')}
            </Typography>
            <Button
                variant="outlined"
                sx={{
                    mt: 2, color: "white",
                    borderColor: "white"
                }}
                onClick={handleChangeForm}
            >
                {isLogin ? t('register') : "Login"}
            </Button>
        </Box>
    )
}

export default SlidingPanel