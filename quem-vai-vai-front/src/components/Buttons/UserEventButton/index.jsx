import { Button, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next"

const UserEventButton = (props) => {

    const { onClick, status } = props

    const theme = useTheme()
    const { t } = useTranslation()

    const getStatusColor = () => {
        switch (status) {
            case 1:
                return "success"
            case 2:
                return "info"
            case 3:
                return "error"
            default:
                return theme.palette.primary.main
        }
    }

    const getStatusLabel = () => {
        switch (status) {
            case 1:
                return t('i.going')
            case 2:
                return t('i.interested')
            case 3:
                return t('i.not.going')
            default:
                break
        }
    }

    return (
        <Button
            variant="contained"
            onClick={onClick}
            color={getStatusColor()}
            sx={{ textTransform: 'none', mt: 2 }}
        >
            {getStatusLabel()}
        </Button>
    )
}

export default UserEventButton