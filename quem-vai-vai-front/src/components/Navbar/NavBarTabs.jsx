import { Menu } from "@mui/icons-material"
import { Box, IconButton, Tab, Tabs, useTheme } from "@mui/material"
import { motion } from "framer-motion"

const NavBarTabs = (props) => {

    const { tabs, tabValue, handleChangeTab, setDrawerOpen, isMobile } = props

    const theme = useTheme()

    return (
        <motion.div
            initial={isMobile ? { opacity: 0, x: -60 } : { opacity: 0, y: -20 }}
            animate={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
        >
            <Tabs
                value={tabValue}
                onChange={(e, newValue) => handleChangeTab(newValue)}
                centered
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    '& .MuiTab-root': {
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.8)',
                        minHeight: 48,
                        minWidth: 45,
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            //left: 0,
                            bottom: 6,
                            width: 0,
                            height: '2px',
                            bgcolor: theme => theme.palette.background.default,
                            transition: 'width 0.3s ease'
                        },
                        '&:hover::after': {
                            width: '100%'
                        },
                        '&.Mui-selected::after': {
                            width: 0
                        }
                    },
                    '& .Mui-selected': {
                        color: 'white !important',
                        bgcolor: 'rgba(255,255,255,0.15)',
                        borderRadius: '12px'
                    },
                    '& .MuiTabs-indicator': {
                        display: 'none'
                    }
                }}
            >
                {
                    tabs && tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            icon={tab.icon}
                            label={tab.label}
                            sx={{ paddingInline: 3 }}
                            iconPosition="start"
                        />
                    ))
                }
            </Tabs>
            <IconButton sx={{ display: { xs: 'flex', md: 'none' } }} edge="start" onClick={_ => setDrawerOpen(true)}>
                <Menu sx={{ color: "white" }} />
            </IconButton>
        </motion.div>
    )
}

export default NavBarTabs