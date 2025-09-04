import { useLoading } from "@/contexts/LoadingContext"
import { useNotification } from "@/contexts/NotificationContext"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next"
import * as UserEventService from "@/services/userevent.service"

const UserEventStatusDialog = (props) => {
    const { eventId, open, onClose, onUpdateStatus } = props

    const { t } = useTranslation()
    const { showLoading, hideLoading } = useLoading()
    const { showNotification } = useNotification()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const handleClose = () => {
        onClose()
    }

    const handleChangeStatus = async (newStatus) => {
        try {
            showLoading()
            const response = await UserEventService.changeStatus(eventId, newStatus)
            if (response.StatusCode == 200) {
                showNotification(t('status.altered.success'), 'success')
                onUpdateStatus(eventId, newStatus)
                onClose()
            }
        } finally {
            hideLoading()
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" >
            <DialogTitle>{t('confirm.attendance')}</DialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, px: 2, pt: 0 }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                    flexDirection={isMobile ? "column" : "row"}
                    gap={2}
                    alignItems="center"
                    marginTop={2}
                >
                    <Button
                        variant="outlined"
                        size="large"
                        color="error"
                        onClick={_ => handleChangeStatus(3)} // 3 = Recusar
                        sx={{
                            mt: 1,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: "bold",
                            py: 1.2,
                            maxWidth: "40%",
                            minWidth: "180px"
                        }}
                    >
                        {t('i.not.going')}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={_ => handleChangeStatus(2)} // 1 = Interessado
                        size="large"
                        color="info"
                        sx={{
                            mt: 1,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: "bold",
                            py: 1.2,
                            maxWidth: "40%",
                            minWidth: "180px",
                        }}
                    >
                        {t('i.interested')}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={_ => handleChangeStatus(1)} // 1 = Confirmar
                        size="large"
                        color="success"
                        sx={{
                            mt: 1,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: "bold",
                            py: 1.2,
                            maxWidth: "40%",
                            minWidth: "180px",
                        }}
                    >
                        {t('i.going')}
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-start' }}>
                <Button onClick={handleClose} color="error" sx={{ textTransform: 'none' }} variant="outlined" >
                    {t("close")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserEventStatusDialog