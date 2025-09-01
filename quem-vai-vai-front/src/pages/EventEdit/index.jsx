import { useLoading } from "@/contexts/LoadingContext"
import { Box, Button, Container, Grid, Paper, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import * as EventService from "@/services/event.service"
import { People } from "@mui/icons-material"
import EventMembersDialog from "@/components/Dialogs/EventMembersDialog"
import ConfirmDeleteDialog from "@/components/Dialogs/ConfirmDeleteDialog"

const EventEdit = () => {

    const { t } = useTranslation()
    const { showLoading, hideLoading } = useLoading()
    const location = useLocation()
    const { id } = useParams()
    const navigate = useNavigate()
    const [membersDialog, setMembersDialog] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const [event, setEvent] = useState(location.state?.event || null)

    const getEvent = async () => {
        const response = await EventService.getEventById(id)
        setEvent(response.Data)
    }

    useEffect(() => {
        if (!event && id) {
            showLoading()
            getEvent(id)
            hideLoading()
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        showLoading()
        try {
            await EventService.updateEvent(event)
        } finally {
            hideLoading()
        }
    }

    const handleDelete = async () => {
        showLoading()
        setDeleteDialogOpen(false)
        try {
            const response = await EventService.deleteEvent(event.Id)
            if (response.StatusCode == 200) {
                hideLoading()
                navigate('/events')
            }
        } finally {
            hideLoading()
        }
    }

    const handleChange = (name, value) => {
        setEvent({
            ...event,
            [name]: value
        })
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
                    minHeight: '300px',
                    overflow: 'auto'
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    textAlign="center"
                    gutterBottom
                    color="primary"
                >
                    {t("event.edit")}
                </Typography>

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
                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12} lg={12}>
                            <Box display="flex" alignItems="center">
                                <Button onClick={_ => setMembersDialog(true)} sx={{ textTransform: 'none' }}>
                                    <People fontSize="small" sx={{ mr: 0.5 }} />
                                    <Typography variant="body2" fontWeight="medium">
                                        {event.Going}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                        {t('members')}
                                    </Typography>
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Box display="flex" alignItems="center">
                                <Button onClick={_ => setMembersDialog(true)} sx={{ textTransform: 'none' }}>
                                    <People fontSize="small" sx={{ mr: 0.5 }} />
                                    <Typography variant="body2" fontWeight="medium">
                                        {event.Interested}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                        {t('members')}
                                    </Typography>
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <TextField
                                label={t('title')}
                                type="text"
                                variant="outlined"
                                value={event.Title}
                                onChange={(e) => handleChange('Title', e.target.value)}
                                required={true}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Grid item xs={12} lg={12}>
                                <TextField
                                    label={t('description')}
                                    type="text"
                                    variant="outlined"
                                    value={event.Description}
                                    onChange={(e) => handleChange('Description', e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Grid>

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
            <EventMembersDialog group={group} open={membersDialog} onClose={_ => setMembersDialog(false)} canEdit={true} />
            <ConfirmDeleteDialog open={deleteDialogOpen} onClose={_ => setDeleteDialogOpen(false)} onConfirm={handleDelete} entity={"event"} />
        </Container>
    )
}

export default EventEdit