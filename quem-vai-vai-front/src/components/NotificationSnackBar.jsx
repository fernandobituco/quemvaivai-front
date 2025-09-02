import { Alert, Slide, Snackbar, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function NotificationSnackbar({ message, open, onClose, duration = 5000, severity = "error" }) {
    const [internalOpen, setInternalOpen] = useState(open)

    useEffect(() => {
        setInternalOpen(open)
    }, [open])

    const handleClose = () => {
        setInternalOpen(false)
        onClose()
    }

    const theme = useTheme()

    return (
        <AnimatePresence>
            {open && (
                <Snackbar
                    open={internalOpen}
                    autoHideDuration={duration}
                    onClose={handleClose}
                    sx={{ zIndex: 1000 }}
                    TransitionComponent={(props) => <Slide {...props} direction={open ? "down" : "up"} />}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Alert
                            severity={severity}
                            onClose={handleClose}
                            variant="filled"
                            sx={{
                                width: "100%",
                                backgroundColor: {
                                    success: theme.palette.success,
                                    error: theme.palette.error,
                                    warning: theme.palette.warning,
                                    info: theme.palette.info,
                                }[severity],
                                color: "white",
                                fontWeight: 500,
                                boxShadow: 3,
                            }}
                        >
                            {message}
                        </Alert>
                    </motion.div>
                </Snackbar>
            )}
        </AnimatePresence>
    )
}
