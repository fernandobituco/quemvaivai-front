import { useThemeMode } from "@/contexts/ThemeContext"
import { DarkMode, LightMode } from "@mui/icons-material"
import { Button, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next"

const DarkModeSwitcher = (props) => {
    const { navBar = false } = props
    
    const { toggleTheme, mode } = useThemeMode()
    const { t } = useTranslation()
    const theme = useTheme()

    return (
        navBar ?
            <ListItem sx={{ color: theme.palette.primary.main }} key={-1} >
                <Button onClick={toggleTheme} fullWidth>
                    <ListItemIcon sx={{ color: theme.palette.primary.main }}>{mode === 'light' ? <DarkMode /> : <LightMode />}</ListItemIcon>
                    <ListItemText primary={t(mode === 'light' ? 'dark.mode' : 'light.mode')} />
                </Button>
            </ListItem>
            :
            <Tooltip title="Change Mode" >
                <IconButton
                    onClick={toggleTheme}
                    sx={props.sx ?? { zIndex: 2 }}
                    size="large"
                    color={'primary'}
                >
                    {mode === 'light' ? <DarkMode /> : <LightMode />}
                </IconButton>
            </Tooltip>
    )
}

export default DarkModeSwitcher