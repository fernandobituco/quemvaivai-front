import { useThemeMode } from "../../contexts/ThemeContext"
import { DarkMode, LightMode } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"

const DarkModeSwitcher = (props) => {

    const { toggleTheme, mode } = useThemeMode()
    return (
        <Tooltip title="Change Mode" >
            <IconButton
                onClick={toggleTheme}
                sx={{ zIndex: 20 }}
                size="large"
                color={'primary'}
            >
                {mode === 'light' ? <DarkMode /> : <LightMode />}
            </IconButton>
        </Tooltip>
    )
}

export default DarkModeSwitcher