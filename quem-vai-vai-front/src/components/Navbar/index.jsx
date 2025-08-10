import {
    AppBar,
    Toolbar,
    Container,
    useTheme,
    useMediaQuery,
} from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import { useThemeMode } from '@/contexts/ThemeContext'
import LeftSection from './LeftSection'
import CenterSection from './CenterSection'
import RightSection from './RightSection'
import { useState } from 'react'

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const NavigationBar = (props) => {
    const {
        userAvatar,
        notificationCount = 3,
        onProfileClick,
        onNotificationClick,
    } = props
    const theme = useTheme()
    const { user } = useAuth()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [tabValue, setTabValue] = useState(0)

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                background: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 50%, #a569bd 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                height: 64
            }}
        >
            <Container maxWidth="xl">
                <Toolbar
                    sx={{
                        justifyContent: 'space-between',
                        py: 1,
                        minHeight: { xs: 64, sm: 70 }
                    }}
                >
                    <LeftSection isMobile={isMobile} />

                    <CenterSection tabValue={tabValue} setTabValue={setTabValue} isMobile={isMobile} />

                    <RightSection
                        user={user}
                        userAvatar={userAvatar}
                        onProfileClick={onProfileClick}
                        notificationCount={notificationCount}
                        onNotificationClick={onNotificationClick}
                        isMobile={isMobile}
                    />

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavigationBar