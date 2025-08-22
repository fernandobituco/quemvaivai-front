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
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"

const MembersDialog = ({ group, open, onClose }) => {
    const { t } = useTranslation()
    const [showInvite, setShowInvite] = useState(false)
    const [inviteLink, setInviteLink] = useState(null)

    const membersMock = [
        { Name: "Fernando Angelim", Role: 1 },
        { Name: "Victoria Barbsoa", Role: 3 },
        { Name: "Lucas de Lima", Role: 2 },
        { Name: "Pedro Selfes", Role: 2 },
        { Name: "Clara Albuquerque", Role: 3 },
        { Name: "Fernando Angelim", Role: 1 },
        { Name: "Victoria Barbsoa", Role: 3 },
        { Name: "Lucas de Lima", Role: 3 },
        { Name: "Pedro Selfes", Role: 3 },
        { Name: "Clara Albuquerque", Role: 1 },
        { Name: "Fernando Angelim", Role: 2 },
        { Name: "Victoria Barbsoa", Role: 3 },
        { Name: "Lucas de Lima", Role: 3 },
        { Name: "Pedro Selfes", Role: 3 },
        { Name: "Clara Albuquerque", Role: 3 },
        { Name: "Fernando Angelim", Role: 3 },
        { Name: "Victoria Barbsoa", Role: 3 },
        { Name: "Lucas de Lima", Role: 3 },
        { Name: "Pedro Selfes", Role: 3 },
        { Name: "Clara Albuquerque", Role: 3 },
    ]

    const handleGenerateInvite = () => {
        setInviteLink(`${window.location.href}/invite/${group.InviteCode || "12345"}`)
        setShowInvite(true)
    }

    const handleClose = () => {
        setShowInvite(false)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>{group.Name}</DialogTitle>

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
                        {membersMock.map((member, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        {member.Role != 1 && <Button onClick={() => console.log("outra ação")}>
                                            {member.Role == 2 && <RemoveModeratorOutlined color="primary" />}
                                            {member.Role == 3 && <AddModeratorOutlined color="primary" />}
                                        </Button>}
                                        <Button onClick={() => console.log("delete")}>
                                            <Delete color="primary" />
                                        </Button>
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
                                sx={{ wordBreak: "break-all" }}
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
                    {t("cancel")}
                </Button>
                {!showInvite ? (
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
                )}
            </DialogActions>
        </Dialog>
    )
}

export default MembersDialog
