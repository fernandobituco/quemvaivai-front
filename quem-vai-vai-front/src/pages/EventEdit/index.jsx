import { useLoading } from "@/contexts/LoadingContext"
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import * as EventService from "@/services/event.service"
import * as GroupService from "@/services/groups.service"
import EventMembersDialog from "@/components/Dialogs/EventMemberDialog"
import ConfirmDeleteDialog from "@/components/Dialogs/ConfirmDeleteDialog"
import EventMembersButton from "@/components/Buttons/EventMembersButton"
import dayjs from "dayjs"

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
    const [groupOptions, setGroupOptions] = useState([])

    const getEvent = async () => {
        const response = await EventService.getEventById(id)
        setEvent(response.Data)
    }

    const getGroups = async () => {
        try {
            showLoading()
            const response = await GroupService.getGroupsByUser()
            setGroupOptions(response.Data)
        } finally {
            hideLoading()
        }
    }

    useEffect(() => {
        if (!event && id) {
            showLoading()
            getEvent(id)
            hideLoading()
        }
        getGroups()
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
                        <Grid item size={{ xs: 12 }} container>
                            <Grid item size={{ xs: 12, md: 6 }}>
                                <EventMembersButton
                                    onClick={() => setMembersDialog(true)}
                                    Interested={event?.Interested || 0}
                                    Going={event?.Going || 0}
                                />
                            </Grid>
                            <Grid item size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth >
                                    <InputLabel>{t('group')}</InputLabel>
                                    <Select
                                        label={t('group')}
                                        value={event?.GroupId || ""}
                                        onChange={(e) => onChange("GroupId", e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <p></p>
                                        </MenuItem>
                                        {groupOptions?.map((group) => (
                                            <MenuItem key={group.Id} value={group.Id}>
                                                {group.Name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item size={{ xs: 12 }} direction="row" container spacing={2}>
                            <Grid item size={{ xs: 12, md: 4 }}>
                                <TextField
                                    label={t('event.date')}
                                    type="datetime-local"
                                    value={event.EventDate ? dayjs(event.EventDate).format("YYYY-MM-DDTHH:mm") : ""}
                                    onChange={(e) => handleChange('EventDate', new Date(e.target.value).toISOString())}
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item size={{ xs: 12, md: 8 }}>
                                <TextField
                                    label={t('location')}
                                    type="text"
                                    value={event.Location}
                                    onChange={(e) => handleChange('Location', e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid item size={{ xs: 12 }}>
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
                        <Grid item size={{ xs: 12 }}>
                            <TextField
                                label={t('description')}
                                type="text"
                                variant="outlined"
                                value={event.Description}
                                onChange={(e) => handleChange('Description', e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} lg={12}>
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
            <EventMembersDialog event={event} open={membersDialog} onClose={_ => setMembersDialog(false)} canEdit={true} />
            <ConfirmDeleteDialog open={deleteDialogOpen} onClose={_ => setDeleteDialogOpen(false)} onConfirm={handleDelete} entity={"event"} />
        </Container>
    )
}

export default EventEdit