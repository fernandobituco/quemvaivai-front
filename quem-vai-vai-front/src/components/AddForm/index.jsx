import { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import RenderField from "../RenderField";

const AddForm = (props) => {
    const {
        open,
        fields = [],
        initialValues = {},
        onSubmit,
        onClose,
        entity
    } = props

    const theme = useTheme()
    const { t } = useTranslation()

    const [formValues, setFormValues] = useState(() => {
        const initial = {}
        fields.forEach((f) => {
            initial[f.name] = initialValues[f.name] || ""
        })
        return initial
    })

    const handleChange = (name, value) => {
        setFormValues((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formValues)
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirm-delete-title"
            fullWidth
            maxWidth="md"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle id="confirm-delete-title">{t('add.new')} {entity || ""}</DialogTitle>

                <DialogContent>
                    <DialogContentText sx={{ pt: 1 }}>
                        <Box
                            display="flex"
                            width="100%"
                            flexDirection="column"
                            gap={2}
                            alignItems="center"
                        >
                            {fields.map((field) => (
                                <Box key={field.name} width="100%">
                                    <RenderField field={field} formValues={formValues[field.name]} onChange={handleChange} />
                                </Box>
                            ))}
                        </Box>
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={{ p: 2.5, pt: 1.5, justifyContent: 'space-between' }}>
                    <Button onClick={onClose} color="error" variant="outlined">
                        {t('cancel')}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 1,
                            textTransform: "none",
                            fontWeight: "bold",
                            py: 1.2,
                            maxWidth: "40%",
                        }}
                    >
                        {t('save')}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddForm