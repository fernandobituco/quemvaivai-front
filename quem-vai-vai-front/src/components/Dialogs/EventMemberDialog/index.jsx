import { AddModeratorOutlined, ContentCopy, Delete, RemoveModeratorOutlined } from "@mui/icons-material"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    Typography,
    Box,
    Fade,
    Tooltip,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import * as UserEventService from "@/services/userevent.service"
import { useLoading } from "@/contexts/LoadingContext"
import { useNotification } from "@/contexts/NotificationContext"

const EventMembersDialog = (props) => {

    const { event, open, onClose, canEdit } = props

    const { t } = useTranslation()
    const { showLoading, hideLoading } = useLoading()
    const { showNotification } = useNotification()

    const [showInvite, setShowInvite] = useState(false)
    const [inviteLink, setInviteLink] = useState(null)
    const [members, setMembers] = useState([])

    const getMembers = async () => {
        try {
            showLoading()
            const response = await UserEventService.getAllByEventId(event.Id)
            setMembers(response.Data)
        } finally {
            hideLoading()
        }
    }

    useEffect(() => {
        if (open) {
            getMembers()
        }
    }, [open])

    const handleGenerateInvite = () => {
        const host = import.meta.env.VITE_DEV_HOST
        const port = import.meta.env.VITE_DEV_PORT
        const portstring = port ? `:${port}` : ''
        setInviteLink(`https://${host}${portstring}/events-invite/${event.InviteCode}`)
        setShowInvite(true)
    }

    const handleClose = () => {
        setShowInvite(false)
        onClose()
    }

    const handleChangeRole = async (userId, currentRole) => {
        const newRole = currentRole == 2 ? 3 : 2
        try {
            showLoading()
            const response = await UserEventService.changeRole(event.Id, userId, newRole)
            if (response.StatusCode == 200) {
                showNotification(t('role.altered.success'), 'success')
                setMembers(members.map(m => m.Id != userId ? m : { ...m, Role: newRole }))
            }
        } finally {
            hideLoading()
        }
    }

    const removeFromGroup = async (userId) => {
        try {
            showLoading()
            const response = await UserEventService.removeFromEvent(event.Id, userId)
            if (response.StatusCode == 200) {
                showNotification(t('remove.user.success'), 'success')
                setMembers(members.filter(m => m.Id != userId))
            }
        } finally {
            hideLoading()
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>{event.Title}</DialogTitle>

            <DialogContent
                dividers
                sx={{
                    position: "relative",
                    minHeight: 300,
                    maxHeight: '60vh'
                }}
            >
                <Box sx={{ display: !showInvite ? 'auto' : 'none' }}>
                    <List>
                        {members.map((member, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    canEdit &&
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        {
                                            member.Role != 1 &&
                                            <Tooltip title={member.Role == 2 ? t("moderator.revoke") : t("moderator.make")}>
                                                <Button onClick={() => handleChangeRole(member.Id, member.Role)}>
                                                    {member.Role == 2 && <RemoveModeratorOutlined color="primary" />}
                                                    {member.Role == 3 && <AddModeratorOutlined color="primary" />}
                                                </Button>
                                            </Tooltip>
                                        }
                                        {
                                            member.Role != 1 &&
                                            <Tooltip title={t('remove.from.event')}>
                                                <Button onClick={() => removeFromGroup(member.Id)}>
                                                    <Delete color="primary" />
                                                </Button>
                                            </Tooltip>
                                        }
                                    </Box>
                                }
                            >
                                <ListItemText primary={member.Name} />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Fade in={showInvite} mountOnEnter unmountOnExit>
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            bgcolor: "background.paper",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 2,
                            zIndex: 10,
                            gap: 1
                        }}
                    >
                        <Typography variant="body2" gutterBottom >
                            {t('share.this.link')}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                            <Typography
                                variant="body2"
                                color="primary"
                                textOverflow="ellipsis"
                                sx={{ textOverflow: "ellipsis" }}
                            >
                                {inviteLink}
                            </Typography>
                            <Button onClick={_ => navigator.clipboard.writeText(inviteLink)} sx={{ minWidth: 0 }}>
                                <ContentCopy />
                            </Button>
                        </Box>
                        <QRCodeSVG value={inviteLink || ""} size={128} />
                    </Box>
                </Fade>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'space-between', paddingInline: 3 }}>
                <Button onClick={handleClose} color="error" sx={{ textTransform: 'none' }} variant="outlined" >
                    {t("close")}
                </Button>
                {canEdit && (!showInvite ? (
                    <Button onClick={handleGenerateInvite} variant="outlined" sx={{ textTransform: 'none' }}>
                        {t("add.new")} {t("member")}
                    </Button>
                ) : (
                    <Button
                        variant="outlined"
                        onClick={() => setShowInvite(false)}
                        size="small"
                        sx={{ textTransform: 'none' }}
                    >
                        {t('back.to.list')}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    )
}

export default EventMembersDialog
