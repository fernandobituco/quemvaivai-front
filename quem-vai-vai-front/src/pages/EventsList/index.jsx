import CardsList from "@/components/Cards/CardsList"
import EventCard from "@/components/Cards/EventCard"
import { useLoading } from "@/contexts/LoadingContext"
import { useNotification } from "@/contexts/NotificationContext"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import * as GroupService from "@/services/groups.service"
import * as EventService from "@/services/event.service"
import { Box, Button, Container, Grid, Typography, useMediaQuery, useTheme } from "@mui/material"
import AddForm from "@/components/Dialogs/AddDialog"
import { Add } from "@mui/icons-material"
import EventFilters from "@/components/Filters/EventFilters"

const Events = () => {

    const { t } = useTranslation()
    const { showLoading, hideLoading } = useLoading()
    const { showNotification } = useNotification()
    const { groupId } = useParams()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const [groupOptions, setGroupOptions] = useState([])
    const [events, setEvents] = useState([])


    const [addDialogOpen, setAddDialogOpen] = useState(false)

    const getEvents = async (filters) => {
        try {
            showLoading()
            const response = await EventService.getEventsByUser(filters)
            setEvents(response.Data)
        } finally {
            hideLoading()
        }
    }

    const getGroups = async () => {
        try {
            showLoading()
            const response = await GroupService.getGroupsByUser()
            setGroupOptions(response.Data.map(g => ({ value: g.Id, label: g.Name })))
        } finally {
            hideLoading()
        }
    }

    useEffect(() => {
        getEvents(groupId)
        getGroups()
    }, [])

    const addFields = [
        { name: "title", label: t('title'), type: "text", required: true },
        { name: "description", label: t('description'), type: "text", required: false },
        { name: "location", label: t('location'), type: "text", required: false },
        { name: "eventDate", label: t('date'), type: "date", required: false },
        { name: "groupId", label: t('group'), type: "select", required: false, options: groupOptions },
    ]

    const handleSubmit = async (event) => {
        try {
            showLoading()
            const response = await EventService.createEvent(event)
            if (response.StatusCode = 200) {
                setAddDialogOpen(false)
                setEvents([...events, { ...response.Data }])
            } else {
                showNotification(response.Error)
            }
        } finally {
            hideLoading()
        }
    }

    const updateStatusOnEvent = (eventId, newStatus) => {
        setEvents(events.map(e => e.Id != eventId ? e : { ...e, Status: newStatus }))
    }

    const eventCards = events.map(event =>
        <EventCard event={event} onUpdateStatus={updateStatusOnEvent} />
    )

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
            <Typography
                variant="h3"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
                color="primary"
            >
                {t('events')}
            </Typography>

            {/* Filtros */}
            <Box width="100%" paddingInline={{ sm: 2, md: 20 }} marginBottom={2}>
                <EventFilters
                    groupOptions={groupOptions}
                    onFilter={filters => getEvents(filters)}
                />
            </Box>
            <Grid
                container
                borderRadius={{ sm: 2, md: 12 }}
                flex={1}
                direction="row"
                spacing={2}
                width="100%"
                paddingInline={{ sm: 0, md: 20 }}
                alignItems="center"
                justifyContent={isMobile ? "flex-start" : "center"}
                sx={{
                    overFlowX: "hidden",
                    overflowY: 'auto',
                    position: 'relative'
                }}
            >
                {eventCards}

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
                entity={t('event')}
            />
        </Container>
    )
}

export default Events