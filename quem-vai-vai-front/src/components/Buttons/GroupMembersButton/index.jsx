import { People } from "@mui/icons-material"
import { Button, Typography, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next"

const GroupMembersButton = (props) => {
    const { t } = useTranslation()
    const { onClick, memberCount } = props

    const theme = useTheme()

    return (
        <Button onClick={onClick} sx={{ textTransform: 'none' }}>
            <People fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2" fontWeight="medium">
                {memberCount}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                {t('members')}
            </Typography>
        </Button>
    )
}

export default GroupMembersButton