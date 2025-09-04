import GroupMembersButton from "@/components/Buttons/GroupMembersButton"
import GroupMembersDialog from "@/components/Dialogs/GroupMembersDialog"
import { useLoading } from "@/contexts/LoadingContext"
import { useTheme } from "@emotion/react"
import { Box, Button, Container, Grid, Paper, Typography, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import * as GroupService from "@/services/groups.service"

const GroupView = () => {

    const { t } = useTranslation()
    const { showLoading, hideLoading } = useLoading()
    const location = useLocation()
    const { id } = useParams()
    const navigate = useNavigate()
    const [membersDialog, setMembersDialog] = useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const [group, setGroup] = useState(location.state?.group || null)

    const getGorup = async () => {
        const response = await GroupService.getGroupById(id)
        setGroup(response.Data)
    }

    useEffect(() => {
        if (!group && id) {
            showLoading()
            getGorup(id)
            hideLoading()
        }
    }, [])

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
                    {group.Name}
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
                            <Box display="flex" alignItems="center">
                                <GroupMembersButton
                                    onClick={() => setMembersDialog(true)}
                                    memberCount={group.MemberCount}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={12} border={1} borderColor={theme.palette.divider} borderRadius={2} padding={2}>
                            <Grid item xs={12} lg={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    {group.Description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <GroupMembersDialog group={group} open={membersDialog} onClose={_ => setMembersDialog(false)} canEdit={false} />
        </Container>
    )
}

export default GroupView