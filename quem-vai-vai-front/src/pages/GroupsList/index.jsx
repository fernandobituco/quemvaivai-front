import GroupsCards from "@/components/Cards/GroupsCards"
import CardsList from "@/components/Cards/CardsList"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import * as GroupService from "@/services/groups.service"
import { useNotification } from "@/contexts/NotificationContext"
import { useNavigate, useParams } from "react-router-dom"
import { useLoading } from "@/contexts/LoadingContext"
import { useTheme } from "@emotion/react"
import { Button, Container, Grid, Typography, useMediaQuery } from "@mui/material"
import { Add } from "@mui/icons-material"
import AddForm from "@/components/Dialogs/AddDialog"

const Groups = () => {

    const { t } = useTranslation()
    const { showNotification } = useNotification()
    const { showLoading, hideLoading } = useLoading()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const [groups, setGroups] = useState([])

    const [addDialogOpen, setAddDialogOpen] = useState(false)

    useEffect(() => {
        const getGroups = async () => {
            try {
                showLoading()
                const response = await GroupService.getGroupsByUser()
                if (response.StatusCode == 200) {
                    setGroups(response.Data)
                }
            } finally {
                hideLoading()
            }
        }
        getGroups()
    }, [])

    const addFields = [
        { name: "name", label: t('name'), type: "text", required: true },
        { name: "description", label: t('description'), type: "text", required: false },
    ]

    const handleSubmit = async (group) => {
        try {
            showLoading()
            const response = await GroupService.createGroup(group)
            if (response.StatusCode = 200) {

                setAddDialogOpen(false)
                setGroups([...groups, { ...response.Data, CanEdit: true, MemberCount: 1 }])
            } else {
                showNotification(response.Error)
            }
        } finally {
            hideLoading()
        }
    }

    const cards = groups.map(group =>
        <GroupsCards
            group={group}
        />
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
                {t('groups')}
            </Typography>

            <Grid
                container
                borderRadius={{ sm: 2, md: 12 }}
                flex={1}
                direction="row"
                spacing={2}
                width="100%"
                paddingInline={{ sm: 0, md: 20 }}
                alignItems="center"
                justifyContent="center"
                sx={{
                    overFlowX: "hidden",
                    overflowY: 'auto',
                    position: 'relative'
                }}
            >
                {cards}

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
                entity={t('group')}
            />
        </Container>
    )
}

export default Groups