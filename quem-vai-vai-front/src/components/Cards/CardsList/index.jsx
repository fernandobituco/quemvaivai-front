import { useState } from "react";
import {
    Button,
    Container,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Add } from "@mui/icons-material";
import AddForm from "@/components/Dialogs/AddDialog";

const CardsList = (props) => {

    const {
        title,
        addFields,
        cards = [],
        onSubmit,
        entity
    } = props

    const theme = useTheme()
    const { t } = useTranslation()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const [addDialogOpen, setAddDialogOpen] = useState(false)

    const handleSubmit = (formValues) => {
        setAddDialogOpen(false)
        onSubmit(formValues)
    }

    return (
        <Container
            maxWidth={isMobile ? false : false}
            sx={{
                display: "flex",
                justifyContent: "center",
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
                justifyContent="center"
                sx={{
                    overFlowX: "hidden",
                    overflowY: 'auto',
                    position: 'relative'
                }}
            >
                {cards}

            </Grid>
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
            <AddForm
                fields={addFields}
                onSubmit={handleSubmit}
                open={addDialogOpen}
                onClose={_ => setAddDialogOpen(false)}
                entity={entity}
            />
        </Container>
    )
}

export default CardsList