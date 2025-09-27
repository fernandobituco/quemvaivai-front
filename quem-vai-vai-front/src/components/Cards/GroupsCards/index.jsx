import { AccessTime, Event, People, RemoveRedEye, Settings } from "@mui/icons-material"
import { Box, Button, Card, CardContent, CardHeader, Chip, Grid, Stack, Tooltip, Typography, useTheme } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import GroupMembersDialog from "@/components/Dialogs/GroupMembersDialog"

const GroupsCards = (props) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { group } = props
    const { Id, Name, Description, NextEventDate, MemberCount, EventCount, CanEdit } = group

    const [membersDialog, setMembersDialog] = useState(false)

    const eventDate = new Date(NextEventDate)
    const today = new Date()
    const diffMs = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

    const handleMembersClick = async () => {
        setMembersDialog(true)
    }

    const handleEventsClick = async () => {
        navigate(`/events`, { state: { groupId: group.Id } })
    }

    return (
        <Grid item size={{ sm: 12, md: 6, lg: 4 }} width='100%' sx={{ margin: "auto" }}>
            <Card sx={{ borderTop: `1px ridge ${theme.palette.primary.main}`, borderRadius: 3 }}>
                <CardHeader
                    title={
                        <Tooltip title={Name}>
                            <Typography
                                noWrap
                                variant="h5"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    display: 'block',
                                    minWidth: 0, // -> permite encolher dentro do flex
                                }}
                            >
                                {Name}
                            </Typography>
                        </Tooltip>
                    }
                    action={
                        CanEdit ?
                            <Button
                                onClick={_ => navigate(`/groups-edit/${Id}`, { state: { group } })}
                                size="xs"
                                sx={{ marginRight: 1 }}
                            >
                                <Settings className="h-4 w-4" />
                            </Button>
                            :
                            <Button
                                onClick={_ => navigate(`/groups-view/${Id}`, { state: { group } })}
                                size="xs"
                                sx={{ marginRight: 1 }}
                            >
                                <RemoveRedEye className="h-4 w-4" />
                            </Button>
                    }
                    sx={{
                        padding: 2,
                        '& .MuiCardHeader-content': {
                            minWidth: 0,
                            flex: '1 1 auto',
                        },
                        '& .MuiCardHeader-action': {
                            flex: '0 0 auto',
                        }
                    }}
                />
                <CardContent>

                    {/* Descrição */}
                    <Typography variant="body2" color="text.secondary" display="box" height='20px' noWrap sx={{ mt: 1, textOverflow: 'ellipsis' }}>
                        {Description}
                    </Typography>

                    {/* Informações */}
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }} justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Button onClick={handleMembersClick} sx={{ textTransform: 'none' }}>
                                <People fontSize="small" sx={{ mr: 0.5 }} />
                                <Typography variant="body2" fontWeight="medium">
                                    {MemberCount}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                    {t('members')}
                                </Typography>
                            </Button>
                        </Box>

                        <Box display="flex" alignItems="center" marginLeft={0}>
                            <Button onClick={handleEventsClick} sx={{ textTransform: 'none' }} >
                                <Event fontSize="small" sx={{ mr: 0.5 }} />
                                <Typography variant="body2" fontWeight="medium">
                                    {EventCount}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                    {t('events')}
                                </Typography>
                            </Button>
                        </Box>
                    </Stack>
                    <Box sx={{ mt: 2 }}  >
                        <Button onClick={_ => console.log('next.event')} sx={{ textTransform: 'none' }} >
                            <Chip
                                icon={<AccessTime />}
                                label={diffDays && eventDate > today ? `Próximo evento em ${diffDays} dias` : "Sem evento marcado"}
                                color={diffDays && eventDate > today ? diffDays > 7 ? "info" : "success" : "error"}
                                size="small"
                                sx={{ fontWeight: 'medium' }}
                            />
                        </Button>
                    </Box>

                    {/* Status */}
                </CardContent>
            </Card>
            <GroupMembersDialog group={group} open={membersDialog} onClose={_ => setMembersDialog(false)} canEdit={CanEdit} />
        </Grid>
    )
}

export default GroupsCards