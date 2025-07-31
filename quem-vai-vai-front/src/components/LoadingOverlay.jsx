import { Backdrop, CircularProgress, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingOverlay({ open }) {
    const theme = useTheme()

    return (
        <Backdrop
            open={open}
            sx={{
                zIndex: theme.zIndex.modal + 1,
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}