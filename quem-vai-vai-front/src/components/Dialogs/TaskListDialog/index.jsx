import { useLoading } from "@/contexts/LoadingContext"
import { useNotification } from "@/contexts/NotificationContext"
import { useTheme } from "@emotion/react"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fade, List, ListItem, Tooltip, Typography, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import * as TaskListService from "@/services/tasklist.service"
import { CheckBox, Delete } from "@mui/icons-material"

const TaskListDialog = (props) => {

    const { event, open, onClose, canEdit } = props

    const { t } = useTranslation()
    const { showLoading, hideLoading } = useLoading()
    const { showNotification } = useNotification()

    const [taskLists, setTaskLists] = useState([])
    const [currenTaskList, setCurrentTaskList] = useState()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const getTaskLists = async () => {
        try {
            showLoading()
            const response = await TaskListService.getAllByEventId(event.Id)
            setTaskLists(response.Data)
        } finally {
            hideLoading()
        }
    }

    useEffect(() => {
        if (open) {
            getTaskLists()
        }
    }, [open])

    const handleClose = () => {
        onClose()
    }

    const setResponsible = (taskId, userId) => {
        // To be implemented
    }

    const toggleComplete = (taskId) => {
        // To be implemented
    }

    const getCurrentTaskList = async () => {
        try {
            showLoading()
            //const response = await TaskListService.createTaskList(event.Id, t("new.task.list"))
            // if (response.StatusCode == 200) {
            //     setTaskLists([...taskLists, response.Data])
            //     setCurrentTaskList(response.Data)
            // } else {
            //     showNotification(response.Error)
            // }
        } finally {
            hideLoading()
        }
    }

    const removeFromEvent = async (taskListId) => {
        try {
            showLoading()
            const response = await TaskListService.deleteTaskList(taskListId)
            if (response.StatusCode == 200) {
                setTaskLists(taskLists.filter(tl => tl.Id !== taskListId))
            } else {
                showNotification(response.Error)
            }
        } finally {
            hideLoading()
        }
    }

    return (
        <Dialog fullScreen={isMobile} open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{t("taskLists")}</DialogTitle>

            <DialogContent
                dividers
                sx={{
                    position: "relative",
                    minHeight: 300,
                    maxHeight: '60vh'
                }}
            >
                <Box sx={{ display: !currenTaskList ? 'auto' : 'none' }}>
                    <List>
                        {taskLists.map(taskList => (
                            <ListItem
                                button
                                key={taskList.Id}
                                onClick={() => setCurrentTaskList(taskList)}
                                secondaryAction={
                                    canEdit &&
                                    <Tooltip title={t('remove.from.event')}>
                                        <Button onClick={() => removeFromEvent(taskList.Id)}>
                                            <Delete color="primary" />
                                        </Button>
                                    </Tooltip>
                                }
                            >
                                {taskList.Title}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Fade in={currenTaskList} unmountOnExit>
                    <Box sx={{ display: currenTaskList ? 'auto' : 'none' }}>
                        {currenTaskList && (
                            <Box>
                                <Button onClick={() => setCurrentTaskList(null)} sx={{ mb: 2 }}>
                                    {t("back.to.lists")}
                                </Button>
                                <Typography variant="h6" gutterBottom>{currenTaskList.Title}</Typography>
                                <List>
                                    {currenTaskList.TaskItems.map(task => (
                                        <ListItem
                                            key={task.Id}
                                            secondaryAction={
                                                canEdit &&
                                                <Tooltip title={t('remove.task')}>
                                                    <Button >
                                                        <Delete color="primary" />
                                                    </Button>
                                                </Tooltip>
                                            }
                                        >
                                            <CheckBox
                                                checked={task.Completed}
                                                onChange={() => toggleComplete(task.Id)}
                                            />
                                            <Typography
                                                variant="body1"
                                                sx={{ textDecoration: task.Completed ? 'line-through' : 'none', flex: 1 }}
                                            >
                                                {task.Description}
                                            </Typography>
                                            {/* <Button >
                                                {task.ResponsibleName || t("assign.to.me")}
                                            </Button> */}
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Box>
                </Fade>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'space-between', paddingInline: 3 }}>
                <Button onClick={handleClose} color="error" sx={{ textTransform: 'none' }} variant="outlined" >
                    {t("close")}
                </Button>
                {canEdit && (!currenTaskList ? (
                    <Button onClick={getCurrentTaskList} variant="outlined" sx={{ textTransform: 'none' }}>
                        {t("add.new")} {t("task.list.item")}
                    </Button>
                ) : (
                    <Button
                        variant="outlined"
                        onClick={() => setCurrentTaskList()}
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

export default TaskListDialog