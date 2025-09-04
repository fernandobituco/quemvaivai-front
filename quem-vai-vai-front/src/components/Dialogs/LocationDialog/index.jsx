import { useTheme } from "@emotion/react"
import { ContentCopy } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, useMediaQuery } from "@mui/material"
import { useTranslation } from "react-i18next"

const LocationDialog = (props) => {

    const { location, eventTitle, open, onClose } = props

    const { t } = useTranslation()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" >
            <DialogTitle>{eventTitle}</DialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', gap: 2, px: 2 }}>
                {location ? (
                    <Typography variant="body1" textAlign="center">
                        {location}
                    </Typography>
                ) : (
                    <Typography variant="body1" textAlign="center" color="text.secondary">
                        {t('no.location')}
                    </Typography>
                )}
                <Button onClick={_ => navigator.clipboard.writeText(location)} sx={{ minWidth: 0 }}>
                    <ContentCopy />
                </Button>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-start' }}>
                <Button onClick={onClose} color="error" sx={{ textTransform: 'none' }} variant="outlined" >
                    {t("close")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default LocationDialog