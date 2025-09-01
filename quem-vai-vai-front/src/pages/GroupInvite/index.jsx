import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as GroupService from "@/services/groups.service"
import * as GroupUserService from "@/services/groupuser.service"
import { useLoading } from "@/contexts/LoadingContext"
import { Box, Button, Container, Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next"
import GroupMembersDialog from "@/components/Dialogs/GroupMembersDialog"
import { People } from "@mui/icons-material"

const GroupInvite = () => {

    const { invitecode } = useParams()
    const [group, setGroup] = useState({})
    const [membersDialog, setMembersDialog] = useState(false)
    const { showLoading, hideLoading } = useLoading()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    useEffect(() => {
        const getGroup = async () => {
            try {
                showLoading()
                const response = await GroupService.getGroupByCode(invitecode)
                setGroup(response.Data)
            } finally {
                hideLoading
            }
        }
        getGroup()
    }, [])

    const handleJoin = async () => {
        try {
            showLoading()
            await GroupUserService.joinGroup(invitecode)
        } finally {
            navigate('/groups')
            hideLoading()
        }
    }

    const handleMembersClick = async () => {
        setMembersDialog(true)
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
                    Você foi convidado para este grupo
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

                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12} lg={12}>
                            <Typography variant="h2">{group.Name}</Typography>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Box display="flex" alignItems="center">
                                <Button onClick={handleMembersClick} sx={{ textTransform: 'none' }}>
                                    <People fontSize="small" sx={{ mr: 0.5 }} />
                                    <Typography variant="body2" fontWeight="medium">
                                        {group.MemberCount}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                        {t('members')}
                                    </Typography>
                                </Button>
                            </Box>
                        </Grid>
                        {
                            group.Description && <Grid item xs={12} lg={12}>
                                <Typography>{group.Description}</Typography>
                            </Grid>
                        }
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
                            onClick={_ => navigate('/groups')}
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
                            {t('cancel')}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleJoin}
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
                            {t('join')}
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <GroupMembersDialog group={group} open={membersDialog} onClose={_ => setMembersDialog(false)} canEdit={false} />
        </Container>
    )
}

export default GroupInvite