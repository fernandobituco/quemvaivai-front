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
    IconButton,
} from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import { useThemeMode } from '@/contexts/ThemeContext'
import { useState } from 'react'
import { DarkMode, Event, LightMode, Menu, People, Task } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import AppInfo from './AppInfo'
import NavBarTabs from './NavBarTabs'
import UserOptions from './UserOptions'


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
                    minHeight: { xs: 64, sm: 70 },
                }}
            >
                {isMobile &&
                    <NavBarTabs tabValue={tabValue} setTabValue={setTabValue} tabs={navItems} setDrawerOpen={setDrawerOpen} isMobile={isMobile} />
                }

                <AppInfo isMobile={isMobile} />

                {!isMobile && <NavBarTabs tabValue={tabValue} setTabValue={setTabValue} tabs={navItems} setDrawerOpen={setDrawerOpen} isMobile={isMobile} />}

                <UserOptions
                    user={user}
                    notificationCount={notificationCount}
                    onNotificationClick={onNotificationClick}
                    isMobile={isMobile}
                />

            </Toolbar>
            <Drawer anchor="right" open={drawerOpen} onClose={_ => setDrawerOpen(false)}>
                <Box sx={{ width: 250 }} role="presentation" >
                    <List>
                        {navItems.map((item) => (
                            <ListItem sx={{ color: theme.palette.primary.main }} key={item.label} >
                                <Button onClick={_ => setDrawerOpen(false)} fullWidth>
                                    <ListItemIcon sx={{ color: theme.palette.primary.main }}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        </AppBar>
    )
}

export default NavigationBar