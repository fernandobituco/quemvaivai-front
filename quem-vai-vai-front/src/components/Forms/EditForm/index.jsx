import { useState } from "react";
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ConfirmDeleteDialog from "../../Dialogs/ConfirmDeleteDialog";

const EditForm = (props) => {
    const {
        title,
        description,
        fields = [],
        initialValues = {},
        onSubmit,
        onDelete,
    } = props

    const theme = useTheme()
    const { t } = useTranslation()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const [formValues, setFormValues] = useState(() => {
        const initial = {}
        fields.forEach((f) => {
            initial[f.name] = initialValues[f.name] || ""
        })
        return initial
    })

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const handleChange = (name, value) => {
        setFormValues((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formValues)
    }

    const handleDelete = () => {
        setDeleteDialogOpen(false)
        onDelete()
    }

    return (
        <Container
            maxWidth={isMobile ? false : "md"}
            disableGutters={isMobile}
            sx={{
                display: "flex",
                justifyContent: isMobile ? "flex-start" : "center",
                alignItems: "center",
                minHeight: "calc(100vh - 64px)",
                height: "calc(100vh - 64px)",
                py: isMobile ? 0 : 8,
            }}
        >
            <Paper
                elevation={isMobile ? 0 : 3}
                sx={{
                    py: isMobile ? 8 : 4,
                    px: 0,
                    borderRadius: isMobile ? 0 : 3,
                    backgroundColor: theme.palette.background.paper,
                    width: "100%",
                    height: isMobile ? "100%" : "100%",
                    alignItems: "center",
                    justifyContent: "start",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                {title && (
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        textAlign="center"
                        gutterBottom
                        color="primary"
                    >
                        {title}
                    </Typography>
                )}

                {description && (
                    <Typography
                        variant="body2"
                        textAlign="center"
                        color="text.secondary"
                        mb={3}
                    >
                        {description}
                    </Typography>
                )}

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    gap={3}
                    width="100%"
                    flex={1} // ocupa o espaço vertical restante
                    sx={{
                        px: isMobile ? 2 : 8,
                        py: isMobile ? 3 : 4,
                        maxWidth: isMobile ? "100%" : "800px",
                    }}
                >

                    <Box
                        display="flex"
                        width="100%"
                        flexDirection="column"
                        gap={2}
                        alignItems="center"
                    >
                        {fields.map((field) => (
                            <TextField
                                key={field.name}
                                label={field.label}
                                type={field.type || "text"}
                                variant="outlined"
                                value={formValues[field.name]}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                required={field.required}
                                fullWidth
                                {...(field.props || {})}
                            />
                        ))}
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                        flexDirection="row"
                        gap={2}
                        alignItems="center"
                        marginTop={2}
                    >
                        <Button
                            variant="outlined"
                            size="large"
                            color="error"
                            onClick={_ => setDeleteDialogOpen(true)}
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
                            {t('delete')}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
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
                            {t('save.edit')}
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <ConfirmDeleteDialog open={deleteDialogOpen} onClose={_ => setDeleteDialogOpen(false)} onConfirm={handleDelete} entity={"usuário"}/>
        </Container>
    )
}

export default EditForm