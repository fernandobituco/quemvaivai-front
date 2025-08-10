import { Notifications } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";

const NotificationBadge = ({ notificationCount, onNotificationClick }) => {
  if (!notificationCount || notificationCount === 0) return null;

  return (
    <IconButton
      onClick={onNotificationClick}
      sx={{
        color: 'rgba(255,255,255,0.9)',
        bgcolor: 'rgba(255,255,255,0.1)',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.2)',
          transform: 'scale(1.05)'
        },
        transition: 'all 0.2s ease'
      }}
    >
      <Badge
        badgeContent={notificationCount > 99 ? '99+' : notificationCount}
        color="error"
        sx={{
          '& .MuiBadge-badge': {
            bgcolor: '#e74c3c',
            color: 'white',
            fontSize: '0.7rem',
            minWidth: 18,
            height: 18
          }
        }}
      >
        <Notifications />
      </Badge>
    </IconButton>
  )
}

export default NotificationBadge