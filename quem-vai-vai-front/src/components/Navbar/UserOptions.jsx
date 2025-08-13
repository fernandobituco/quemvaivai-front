import { Box, IconButton, useTheme } from "@mui/material"
import DarkModeSwitcher from "../DarkModeSwitcher"
import LanguageSwitcher from "../LanguageSwitcher"
import NotificationBadge from "./NotificationBadge"
import Profile from "./Profile"
import { motion } from "framer-motion"
import { Menu } from "@mui/icons-material"

const UserOptions = (props) => {

    const { user, isMobile } = props

    const theme = useTheme()

    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                    {/* <NotificationBadge notificationCount={notificationCount} onNotificationClick={onNotificationClick} /> */}

                    <DarkModeSwitcher sx={{
                        color: 'rgba(255,255,255,0.9)',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.2)',
                            transform: 'scale(1.05)'
                        },
                        transition: 'all 0.2s ease'
                    }} />

                    <LanguageSwitcher sx={{
                        color: 'rgba(255,255,255,0.9)',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.2)',
                            transform: 'scale(1.05)'
                        },
                        transition: 'all 0.2s ease'
                    }} />

                </Box>
                <Profile user={user} isMobile={isMobile} />
            </Box>
        </motion.div>
    )
}

export default UserOptions