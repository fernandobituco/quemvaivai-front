import { Avatar, Box, Chip, Typography } from "@mui/material"

const Profile = (props) => {
    const { user, onProfileClick, userAvatar, isMobile } = props

    return (
        <Box
            onClick={onProfileClick}
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
                src={userAvatar}
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
                    <Chip
                        label="Online"
                        size="small"
                        sx={{
                            height: 16,
                            fontSize: '0.65rem',
                            bgcolor: '#27ae60',
                            color: 'white',
                            '& .MuiChip-label': {
                                px: 1
                            }
                        }}
                    />
                </Box>
            )}
        </Box>
    )
}

export default Profile