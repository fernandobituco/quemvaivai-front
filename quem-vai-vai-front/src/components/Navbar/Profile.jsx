import { useAuth } from "@/contexts/AuthContext"
import { Avatar, Box, Chip, Menu, MenuItem, Typography } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const Profile = (props) => {

    const { user, isMobile } = props

    const [anchorElUser, setAnchorElUser] = useState(null)

    const { t } = useTranslation()
    const { logout } = useAuth()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleLogout = () => {
        handleCloseUserMenu()
        logout()
    }

    const goToProfile = () => {
        handleCloseUserMenu()
        console.log('Go to Profile')
    }

    return (
        <>
            <Box
                onClick={handleOpenUserMenu}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    bgcolor: 'rgba(255,255,255,0.15)',
                    borderRadius: '25px',
                    px: 1.5,
                    py: 0.5,
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.25)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }
                }}
            >
                <Avatar
                    sx={{
                        width: 36,
                        height: 36,
                        bgcolor: '#fff',
                        color: '#8e44ad',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                >
                    {user.name.charAt(0).toUpperCase()}
                </Avatar>

                {!isMobile && (
                    <Box>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.85rem',
                                lineHeight: 1.2
                            }}
                        >
                            {user.name}
                        </Typography>
                    </Box>
                )}
            </Box>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={goToProfile}>
                    <Typography sx={{ textAlign: 'center' }}>{t('profile')}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: 'center' }}>{t('logout')}</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default Profile