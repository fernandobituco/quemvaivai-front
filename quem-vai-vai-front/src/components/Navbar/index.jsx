import {
    AppBar,
    Toolbar,
    useTheme,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Divider,
    Button,
} from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import { useThemeMode } from '@/contexts/ThemeContext'
import LeftSection from './LeftSection'
import CenterSection from './CenterSection'
import RightSection from './RightSection'
import { useState } from 'react'
import { DarkMode, Event, LightMode, People, Task } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'


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
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { toggleTheme, mode } = useThemeMode()
    const { t } = useTranslation()

    const navItems = [
        { label: t('groups'), icon: <People /> },
        { label: t('events'), icon: <Event /> },
        { label: t('tasks'), icon: <Task /> },
    ]

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                background: theme.palette.primary.main,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                height: 64
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: 'space-between',
                    py: 1,
                    minHeight: { xs: 64, sm: 70 }
                }}
            >
                <LeftSection />

                {!isMobile && <CenterSection tabValue={tabValue} setTabValue={setTabValue} tabs={navItems} />}

                <RightSection
                    user={user}
                    userAvatar={userAvatar}
                    onProfileClick={onProfileClick}
                    notificationCount={notificationCount}
                    onNotificationClick={onNotificationClick}
                    isMobile={isMobile}
                    toggleDrawer={setDrawerOpen}
                />

            </Toolbar>
            <Drawer anchor="right" open={drawerOpen} onClose={_ => setDrawerOpen(false)}>
                <Box sx={{ width: 250 }} role="presentation" >
                    <List>
                        {navItems.map((item) => (
                            <ListItem button key={item.label} onClick={_ => setDrawerOpen(false)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <ListItem >
                        <Button onClick={toggleTheme}>
                            {mode === 'light' ? <DarkMode /> : <LightMode />}
                            <span style={{ marginLeft: 20, textTransform: 'none' }}>{t('dark.mode')}</span>
                        </Button>
                    </ListItem>
                    <List>
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    )
}

export default NavigationBar