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
import { useEffect, useState } from 'react'
import { Event, People, Task } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import AppInfo from './AppInfo'
import NavBarTabs from './NavBarTabs'
import UserOptions from './UserOptions'
import { useLocation, useNavigate } from 'react-router-dom'


const NavigationBar = (props) => {
    const {
        notificationCount = 3,
        onNotificationClick,
    } = props

    const { t } = useTranslation()

    const navItems = [
        { label: t('groups'), value: 'groups', icon: <People /> },
        { label: t('events'), value: 'events', icon: <Event /> },
        { label: t('tasks'), value: 'tasks', icon: <Task /> },
        { label: t('profile'), value: 'profile', icon: <Task /> },
    ]

    const theme = useTheme()
    const { user } = useAuth()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const location = useLocation()
    const [tabValue, setTabValue] = useState(navItems.findIndex(item => item.value === location.pathname.split('/')[1]) || '')
    const [drawerOpen, setDrawerOpen] = useState(false)
    const navigate = useNavigate()

    const handleChangeTab = (newValue) => {
        console.log('newValue')
        console.log(newValue)
        setTabValue(newValue)
        setDrawerOpen(false)
        navigate(navItems[newValue].value)
    }

    const handleClickListItem = (item) => {
        const index = navItems.findIndex(navItem => navItem.value === item.value)
        if (index !== -1) {
            handleChangeTab(index)
        }
    }

    useEffect(() => {
        const currentPath = location.pathname.split('/')[1]
        const index = navItems.findIndex(item => item.value === currentPath)
        if (index !== -1) {
            setTabValue(index)
        } else {
            setTabValue(false)
        }
    }, [location.pathname])

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

                {!isMobile && <NavBarTabs tabValue={tabValue} handleChangeTab={handleChangeTab} tabs={navItems} setDrawerOpen={setDrawerOpen} isMobile={isMobile} />}

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
                                <Button onClick={_ => handleClickListItem(item)} fullWidth>
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