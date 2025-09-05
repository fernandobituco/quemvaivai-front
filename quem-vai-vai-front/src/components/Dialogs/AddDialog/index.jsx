import { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import RenderField from "../../RenderField";

const AddForm = (props) => {
    const {
        open,
        fields = [],
        initialValues = {},
        onSubmit,
        onClose,
        entity
    } = props

    const { t } = useTranslation()

    const [formValues, setFormValues] = useState(() => {
        const initial = {}
        fields.forEach((f) => {
            initial[f.name] = initialValues[f.name] || f.type == "text" ? "" : null
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
                    <Box
                        display="flex"
                        width="100%"
                        flexDirection="column"
                        gap={2}
                        alignItems="center"
                        paddingTop={1}
                    >
                        {fields.map((field) => (
                            <Box key={field.name} width="100%">
                                <RenderField field={field} value={formValues[field.name]} onChange={handleChange} />
                            </Box>
                        ))}
                    </Box>
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