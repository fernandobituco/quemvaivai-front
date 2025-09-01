import { Assignment, Event, HowToVote, People, Place, Settings } from "@mui/icons-material"
import { Box, Button, Card, CardContent, CardHeader, Chip, Grid, Stack, Typography, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import EventMembersDialog from "@/components/Dialogs/EventMemberDialog"
import { useState } from "react"

const EventCard = (props) => {

    const theme = useTheme()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { event } = props
    const { Id, Title, Description, EventDate, Location, GroupId, GroupName, Interested, Going, CanEdit, ActiveVote, UserHasTaskItem } = event

    const [membersDialog, setMembersDialog] = useState(false)

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

    return (
        <Grid item size={{ xs: 12, md: 6, lg: 4 }} key={Id}>
            <Card sx={{ borderTop: `1px ridge ${theme.palette.primary.main}`, borderRadius: 3, height: '245px' }}>
                <CardHeader
                    title={Title}
                    subheader={`${t("group")}: ${GroupName}`}
                    action={
                        CanEdit && (
                            <Button size="xs" sx={{ marginRight: 1 }}
                                onClick={() => navigate(`/events-edit/${Id}`, { state: { event } })}>
                                <Settings className="h-4 w-4" />
                            </Button>
                        )
                    }
                    sx={{ paddingBottom: 0 }}
                />
                <CardContent sx={{ paddingTop: 0 }}>
                            {/* Descrição */}
                            <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 1 }} >
                                {Description}
                            </Typography>
                        {/* Informações principais */}
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }} justifyContent="space-between">

                            <Box display="flex" alignItems="center">
                                <Event fontSize="small" sx={{ mr: 0.5 }} />
                                <Typography variant="body2" fontWeight="medium">
                                    {formatEventDate(eventDate)}
                                </Typography>
                            </Box>

                            <Box display="flex" alignItems="center">
                                <Place fontSize="small" sx={{ mr: 0.5 }} />
                                <Typography variant="body2" fontWeight="medium" noWrap>
                                    {Location || "indefinido"}
                                </Typography>
                            </Box>
                        </Stack>

                        {/* Participantes */}
                        <Button onClick={_ => setMembersDialog(true)} sx={{ textTransform: 'none', mt: 2 }}>
                            <Stack direction="row" spacing={1} alignItems="center" justifyContent="start" gap={5}>
                                <Box display="flex" flexDirection="row" gap={1}>
                                    <People fontSize="small" sx={{ mr: 0.5 }} />
                                    <Typography variant="body2" fontWeight="medium">
                                        {Interested}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {t("interested")}
                                    </Typography>
                                </Box>
                                <Box display="flex" flexDirection="row" gap={1}>
                                    <People fontSize="small" sx={{ mr: 0.5 }} />
                                    <Typography variant="body2" fontWeight="medium">
                                        {Going}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {t("going")}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Button>

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
                                    ? `Faltam ${diffDays} dias`
                                    : "Já aconteceu"}
                                color={diffDays && eventDate > today ? "success" : "error"}
                                size="small"
                            />}
                        </Stack>
                </CardContent>
            </Card>
            <EventMembersDialog event={event} open={membersDialog} onClose={_ => setMembersDialog(false)} canEdit={CanEdit} />
        </Grid >
    )
}

export default EventCard