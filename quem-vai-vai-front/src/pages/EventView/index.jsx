import EventMembersButton from "@/components/Buttons/EventMembersButton"
import UserEventButton from "@/components/Buttons/UserEventButton"
import EventMembersDialog from "@/components/Dialogs/EventMemberDialog"
import UserEventStatusDialog from "@/components/Dialogs/UserEventStatusDialog"
import { useLoading } from "@/contexts/LoadingContext"
import { Event, Place } from "@mui/icons-material"
import { Box, Container, Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useParams } from "react-router-dom"

const EventView = () => {

    const { t } = useTranslation()
    const { showLoading, hideLoading } = useLoading()
    const location = useLocation()
    const { id } = useParams()
    const [membersDialog, setMembersDialog] = useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const [event, setEvent] = useState(location.state?.event || null)
    const [statusDialog, setStatusDialog] = useState(false)

    const getEvent = async () => {
        const response = await EventService.getEventById(id)
        setEvent(response.Data)
    }

    const onUpdateStatus = (eventId, newStatus) => {
        setEvent({ ...event, Status: newStatus })
    }

    useEffect(() => {
        if (!event && id) {
            showLoading()
            getEvent(id)
            hideLoading()
        }
    }, [])

    const formatEventDate = () => {
        const date = new Date(event.EventDate)
        if (!date) return "não marcado"

        const day = date.toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" })
        const time = date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false })

        return `${day} ${time}`
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
                    {event.Title}
                </Typography>

                <Box
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
                    <Grid container spacing={1} direction="row">
                        <Grid item size={{ xs: 12 }}>
                            <Typography variant="body2" color="text.secondary" >
                                {event.GroupName && `${t("group")}: ${event.GroupName}`}
                            </Typography>
                        </Grid>
                        <Grid item size={{ xs: 12 }} container justifyContent="space-between" alignItems="center">
                            <Grid item size={{ xs: 12, md: 6 }} >
                                <EventMembersButton
                                    onClick={() => setMembersDialog(true)}
                                    Interested={event?.Interested || 0}
                                    Going={event?.Going || 0}
                                />
                            </Grid>
                            <Grid item size={{ xs: 6, md: 3 }} direction="row" container alignItems="center" textAlign={"center"}>
                                <Event fontSize="small" sx={{ mr: 0.5, mt: 2 }} />
                                <Typography variant="body2" fontWeight="medium" mt={2}>
                                    {event.EventDate ? formatEventDate() : t('no.date')}
                                </Typography>
                            </Grid>
                            <Grid item size={{ xs: 6, md: 3 }} textAlign="right" direction="row" justifyContent="center" container spacing={2} alignItems="center">
                                <UserEventButton onClick={_ => setStatusDialog(true)} status={event.Status}/>
                            </Grid>
                        </Grid>
                        <Grid item size={{ xs: 12 }} direction="row" container spacing={2} alignItems="center" border={1} borderColor={theme.palette.divider} borderRadius={2} padding={2}>
                            <Grid item size={1 }>
                                <Place fontSize="small" sx={{ mr: 0.5, mt: 0.5 }} />
                            </Grid>
                            <Grid item size={ 11 }>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {event.Location}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item size={{ xs: 12 }} border={1} borderColor={theme.palette.divider} borderRadius={2} padding={2}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {event.Description}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <EventMembersDialog event={event} open={membersDialog} onClose={_ => setMembersDialog(false)} canEdit={false} />
            <UserEventStatusDialog open={statusDialog} onClose={_ => setStatusDialog(false)} eventId={event.Id} currentStatus={event.Status} onUpdateStatus={onUpdateStatus} />
        </Container>
    )
}

export default EventView