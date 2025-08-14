import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material"
import { Delete as DeleteIcon } from "@mui/icons-material"
import { useTranslation } from "react-i18next"

const ConfirmDeleteDialog = (props) => {
    const {
        open,
        onClose,
        onConfirm,
        entity,
    } = props

    const { t } = useTranslation()

    const handleConfirm = async () => {
        await onConfirm()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirm-delete-title"
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle id="confirm-delete-title">{t('delete')} {entity}</DialogTitle>

            <DialogContent>
                <DialogContentText >
                    {t('delete.confirm')} {entity}
                    {t('delete.irreversible')}
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ p: 2.5, pt: 1.5 }}>
                <Button onClick={onClose} >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleConfirm}
                >
                    {t('delete')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeleteDialog