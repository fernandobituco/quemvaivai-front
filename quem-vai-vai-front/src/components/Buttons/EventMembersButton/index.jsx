import { People } from "@mui/icons-material"
import { Box, Button, Stack, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

const EventMembersButton = (props) => {
    const { t } = useTranslation()
    const { onClick, Interested, Going } = props

    return (
        <Button onClick={onClick} sx={{ textTransform: 'none', mt: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="start" gap={5}>
                <Box display="flex" flexDirection="row" gap={1}>
                    <People fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" fontWeight="medium">
                        {Going}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t("users.going")}
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="row" gap={1}>
                    <People fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" fontWeight="medium">
                        {Interested}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t("users.interested")}
                    </Typography>
                </Box>
            </Stack>
        </Button>
    )
}

export default EventMembersButton