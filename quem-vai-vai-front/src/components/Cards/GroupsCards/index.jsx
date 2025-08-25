import { AccessTime, Event, People, Settings } from "@mui/icons-material"
import { Box, Button, Card, CardContent, CardHeader, Chip, Grid, Stack, Typography, useTheme } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as UserService from "@/services/user.service"
import { useLoading } from "@/contexts/LoadingContext"
import { useTranslation } from "react-i18next"
import MembersDialog from "@/components/Dialogs/MembersDialog"

const GroupsCards = (props) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const { showLoading, hideLoading } = useLoading()
    const { t } = useTranslation()

    const { group } = props
    const { Id, Name, Description, NextEventDate, MemberCount, EventCount, CanEdit } = group

    const [membersDialog, setMembersDialog] = useState(false)
    const [members, setMembers] = useState([])

    const eventDate = new Date(NextEventDate)
    const today = new Date()
    const diffMs = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

    const getMembers = async () => {
        showLoading()
        try {
            const users = await UserService.getAllByGroupId(group.Id)
            setMembers(users.Data)
        } finally {
            hideLoading()
        }
    }

    const handleMembersClick = async () => {
        await getMembers()
        setMembersDialog(true)
    }

    return (
        <Grid item size={{ sm: 12, md: 6, lg: 4 }} sx={{ margin: "auto" }}>
            <Card sx={{ borderTop: `1px ridge ${theme.palette.primary.main}`, borderRadius: 3 }}>
                <CardHeader
                    title={Name}
                    action={
                        CanEdit && <Button
                            //variant="ghost"
                            size="xs"
                            sx={{ marginRight: 1 }}
                        >
                            <Settings className="h-4 w-4" onClick={_ => navigate(`/groups-edit/${Id}`, { state: { group } })} />
                        </Button>
                    }
                    sx={{ padding: 2 }}

                />
                <CardContent>

                    {/* Descrição */}
                    <Typography variant="body2" color="text.secondary" height='20px' sx={{ mt: 1, textOverflow: 'ellipsis' }}>
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
                            <Button onClick={_ => console.log('events')} sx={{ textTransform: 'none' }} >
                                <Event fontSize="small" sx={{ mr: 0.5 }} />
                                <Typography variant="body2" fontWeight="medium">
                                    {EventCount}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                    {t('events')}
                                </Typography>
                            </Button>
                        </Box>
                        <Box sx={{ mt: 2 }} justifySelf="end" >
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
                    </Stack>

                    {/* Status */}
                </CardContent>
            </Card>
            <MembersDialog group={group} open={membersDialog} onClose={_ => setMembersDialog(false)} members={members}/>
        </Grid>
    )
}

export default GroupsCards