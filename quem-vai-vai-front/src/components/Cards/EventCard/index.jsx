import { Assignment, Event, HowToVote, People, Place, RemoveRedEye, Settings } from "@mui/icons-material"
import { Box, Button, Card, CardContent, CardHeader, Chip, Grid, Stack, Typography, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import EventMembersDialog from "@/components/Dialogs/EventMemberDialog"
import { useState } from "react"
import EventMembersButton from "@/components/Buttons/EventMembersButton"
import UserEventButton from "@/components/Buttons/UserEventButton"
import UserEventStatusDialog from "@/components/Dialogs/UserEventStatusDialog"
import LocationDialog from "@/components/Dialogs/LocationDialog"

const EventCard = (props) => {

    const theme = useTheme()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { event, onUpdateStatus } = props
    const { Id, Title, Description, EventDate, Location, GroupId, GroupName, Interested, Going, CanEdit, ActiveVote, UserHasTaskItem, Status } = event

    const [membersDialog, setMembersDialog] = useState(false)
    const [statusDialog, setStatusDialog] = useState(false)
    const [locationDialog, setLocationDialog] = useState(false)

    const eventDate = new Date(EventDate)
    const today = new Date()
    const diffMs = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

    const formatEventDate = (date) => {
        if (!date) return "não marcado"

        const day = date.toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" })
        const time = date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false })

        return `${day} ${time}`
    }

    const getStatusColor = () => {
        switch (Status) {
            case 1:
                return theme.palette.success.main
            case 2:
                return theme.palette.info.main
            case 3:
                return theme.palette.error.main
            default:
                return theme.palette.primary.main
        }
    }

    return (
        <Grid item size={{ xs: 12, md: 6, lg: 4 }} key={Id}>
            <Card sx={{ borderTop: `1px ridge ${getStatusColor()}`, borderRadius: 3, height: '260px' }}>
                <CardHeader
                    title={Title}
                    subheader={GroupName && `${t("group")}: ${GroupName}`}
                    action={
                        CanEdit ?
                            <Button size="xs" sx={{ marginRight: 1 }}
                                onClick={() => navigate(`/events-edit/${Id}`, { state: { event } })}>
                                <Settings className="h-4 w-4" />
                            </Button>
                            :
                            <Button size="xs" sx={{ marginRight: 1 }}
                                onClick={() => navigate(`/events-view/${Id}`, { state: { event } })}>
                                <RemoveRedEye className="h-4 w-4" />
                            </Button>
                    }
                    sx={{ paddingBottom: 0, mt: 1, px: 2, height: '72px' }}
                />
                <CardContent sx={{ paddingTop: 0 }}>
                    {/* Informações principais */}
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }} justifyContent="space-between">

                        <Box display="flex" alignItems="center">
                            <Event fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body2" fontWeight="medium">
                                {EventDate ? formatEventDate(eventDate) : t('no.date')}
                            </Typography>
                        </Box>

                        <Button
                            display="flex"
                            alignItems="center"
                            onClick={_ => setLocationDialog(true)}
                            sx={{ textTransform: 'none', minWidth: 0, maxWidth: '55%' }}
                        >
                            <Place fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body2" fontWeight="medium" noWrap>
                                {Location || t('no.location')}
                            </Typography>
                        </Button>
                    </Stack>

                    {/* Indicadores extras */}
                    <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
                        {ActiveVote && (
                            <Chip
                                icon={<HowToVote />}
                                label={t("activeVote")}
                                color="info"
                                size="small"
                            />
                        )}
                        {UserHasTaskItem && (
                            <Chip
                                icon={<Assignment />}
                                label={t("yourTask")}
                                color="warning"
                                size="small"
                            />
                        )}
                        {EventDate && <Chip
                            label={diffDays && eventDate > today
                                ? `${diffDays} ${diffDays > 1 ? t("days.to") : t("day.to")}`
                                : t("event.passed")}
                            color={diffDays && eventDate > today ? diffDays > 7 ? "info" : "success" : "error"}
                            size="small"
                        />}
                    </Stack>

                    {/* Participantes */}
                    <Box display="flex" alignItems="center" justifyContent="space-between" gap={1}>
                        <EventMembersButton
                            onClick={() => setMembersDialog(true)}
                            Interested={Interested}
                            Going={Going}
                        />

                        <UserEventButton onClick={_ => setStatusDialog(true)} status={Status} />
                    </Box>
                </CardContent>
            </Card>
            <EventMembersDialog event={event} open={membersDialog} onClose={_ => setMembersDialog(false)} canEdit={CanEdit} />
            <UserEventStatusDialog open={statusDialog} onClose={_ => setStatusDialog(false)} eventId={Id} currentStatus={Status} onUpdateStatus={onUpdateStatus} />
            <LocationDialog eventTitle={Title} location={Location} open={locationDialog} onClose={_ => setLocationDialog(false)} />
        </Grid >
    )
}

export default EventCard