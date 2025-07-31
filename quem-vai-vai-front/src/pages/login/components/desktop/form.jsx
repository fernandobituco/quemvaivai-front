import { Box, Button, Typography, useTheme } from "@mui/material"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

const LoginForm = (props) => {

    const { title, fields, buttonName, show, leftSide } = props

    const theme = useTheme()
    const [animationKey, setAnimationKey] = useState(0)

    useEffect(() => {
        setAnimationKey(prev => prev + 1)
    }, [show])

    const handleSubmitForm = (e) => {
        e.preventDefault()
        console.log("HandleSubmitLogin")
    }

    return (
        <Box
            sx={{
                flex: 1,
                padding: theme.spacing(4),
                alignItems: "center",
                zIndex: 1,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                position: "relative",
                overflow: "hidden",
                [theme.breakpoints.down("sm")]: {
                    width: "100%",
                },
            }}>
            <AnimatePresence>
                {show && (
                    <form
                        onSubmit={handleSubmitForm}
                        style={{
                            height: "100%",
                        }}>
                        <Box
                            initial={{ opacity: 0, x: leftSide ? "100%" : "-100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: leftSide ? "100%" : "-100%" }}
                            transition={{ duration: 2, ease: "easeIn" }}
                            component={motion.div}
                            sx={{
                                width: "100%",
                                height: "100%",
                                marginBottom: 4,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexDirection: "column",
                            }}>
                            <Box
                                justifyContent="center"
                                marginTop={4}
                                sx={{ width: "100%", maxWidth: 360 }}
                            >
                                <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom align="center">
                                    {title}
                                </Typography>
                                <Box
                                    sx={{ width: "100%", maxWidth: "360", mt: 2 }}
                                    minHeight={"auto"}
                                >
                                    {fields}
                                </Box >
                            </Box>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{ mb: 3, borderRadius: 3 }}
                            >
                                {buttonName}
                            </Button>
                        </Box>
                    </form>
                )}
            </AnimatePresence>
        </Box >
    )
}

export default LoginForm