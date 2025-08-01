import { Box, Button, Typography, useTheme } from "@mui/material"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const LoginForm = (props) => {
    const { title, fields, buttonName, show, handleSubmit } = props
    const theme = useTheme()
    const [shouldRender, setShouldRender] = useState(show)
    const [isAnimatingIn, setIsAnimatingIn] = useState(show)

    useEffect(() => {
        if (show) {
            setIsAnimatingIn(true);
            setTimeout(() => setShouldRender(true), 1000)
        } else {
            setIsAnimatingIn(false);
            setTimeout(() => setShouldRender(false), 1000)
        }
    }, [show])
    
    if (!shouldRender) return null;

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity : 0 }}
            animate={{ opacity: isAnimatingIn ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{
                width: "100%",
                height: "100%",
                zIndex: 1,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                paddingInline: theme.spacing(4),
                paddingBottom: theme.spacing(4),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <Box
                sx={{ width: "100%", maxWidth: 360, marginTop: 2 }}
            >
                <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom align="center">
                    {title}
                </Typography>
                <Box sx={{ mt: 2, minHeight: "40vh" }}>
                    {fields}
                </Box>
            </Box>

            <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: "auto", mb: 3, borderRadius: 3, alignSelf: 'flex-end' }}
            >
                {buttonName}
            </Button>
        </motion.form>
    );
}

export default LoginForm