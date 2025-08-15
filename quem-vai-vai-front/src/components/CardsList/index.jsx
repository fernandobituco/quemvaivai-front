import { useState } from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ConfirmDeleteDialog from "../ConfimrDeleteDialog";
import { Add } from "@mui/icons-material";
import AddForm from "../AddForm";

const CardsList = (props) => {

    const {
        title,
        addFields,
        cards = [],
        onSubmit,
        onDelete,
        entity
    } = props

    const theme = useTheme()
    const { t } = useTranslation()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const [addDialogOpen, setAddDialogOpen] = useState(false)

    const handleChange = (name, value) => {
        setFormValues((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formValues)
    }

    const handleDelete = () => {
        onDelete()
    }

    return (
        <Container
            maxWidth={isMobile ? false : false}
            sx={{
                display: "flex",
                justifyContent: isMobile ? "flex-start" : "center",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "calc(100vh - 64px)",
                height: "calc(100vh - 64px)",
                py: isMobile ? 0 : 8,
            }}
        >
            {title && (
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    textAlign="center"
                    gutterBottom
                    color="primary"
                >
                    {title}
                </Typography>
            )}

            <Grid
                container
                borderRadius={{ sm: 2, md: 12 }}
                flex={1}
                direction="row"
                spacing={2}
                width="100%"
                paddingInline={{ sm: 0, md: 20 }}
                alignItems="center"
                sx={{
                    overFlowX: "hidden",
                    overflowY: 'auto',
                    position: 'relative'
                }}
            >
                {cards}
                <Grid item sx={{ alignSelf: 'flex-end', position: 'sticky', marginLeft: 'auto', bottom: 12 }} >
                    <Button
                        variant="contained"
                        onClick={_ => setAddDialogOpen(true)}
                        size="large"
                        sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: "bold",
                            maxWidth: "40%",
                            minWidth: "0",
                        }}
                    >
                        <Add />
                    </Button>
                </Grid>
            </Grid>
            <AddForm
                fields={addFields}
                onSubmit={_ => console.log('add')}
                open={addDialogOpen}
                onClose={_ => setAddDialogOpen(false)}
                entity={entity}
            />
        </Container>
    )
}

export default CardsList