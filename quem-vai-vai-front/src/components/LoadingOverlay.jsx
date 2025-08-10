import { Backdrop, CircularProgress, useTheme } from "@mui/material";

export default function LoadingOverlay({ open }) {
    const theme = useTheme()

    return (
        <Backdrop
            open={open}
            sx={{
                zIndex: theme.zIndex.modal + 100,
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}