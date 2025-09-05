import { useTheme } from "@emotion/react"
import { FilterList } from "@mui/icons-material"
import { Drawer, FormControl, IconButton, InputLabel, Select, Stack, Typography, useMediaQuery } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const EventFilters = (props) => {
    const { groupOptions = [], onFilter } = props

    const { t } = useTranslation()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    const [selectedGroup, setSelectedGroup] = useState("")
    const statusOptions = [
        { value: 0, label: t('upcoming') },
        { value: 1, label: t('past') },
    ]
    const [selectedStatus, setSelectedStatus] = useState("")
    const situationsOptions = [
        { value: "1", label: t('i.going') },
        { value: "2", label: t('i.interested') },
        { value: "3", label: t('i.not.going') },
    ]
    const [selectedSituation, setSelectedSituation] = useState("")

    const [open, setOpen] = useState(false)

    const toggleDrawer = (state) => () => {
        setOpen(state)
    }

    return !isMobile ? (
        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
        >
            {/* Select de Grupo */}
            <FormControl sx={{ minWidth: 120 }} variant="outlined">
                <InputLabel id="group-label" shrink>{t('group')}</InputLabel>
                <Select
                    native
                    label={t('group')}
                    value={selectedGroup}
                    onChange={(e) => {
                        setSelectedGroup(e.target.value)
                        onFilter({
                            groupId: e.target.value,
                            status: selectedStatus,
                            situation: selectedSituation
                        })
                    }}
                    inputProps={{ 'aria-label': 'Group Filter' }}
                >
                    <option value="">{t('all.groups')}</option>
                    <option value={0}>{t('no.group')}</option>
                    {groupOptions.map((group) => (
                        <option key={group.Id} value={group.value}>
                            {group.label}
                        </option>
                    ))}
                </Select>
            </FormControl>

            {/* Select de Status */}
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="status-label" shrink>{t('status')}</InputLabel>
                <Select
                    native
                    label={t('status')}
                    value={selectedStatus}
                    onChange={(e) => {
                        setSelectedStatus(e.target.value)
                        onFilter({
                            groupId: selectedGroup,
                            status: e.target.value,
                            situation: selectedSituation
                        })
                    }}
                    inputProps={{ 'aria-label': 'Status Filter' }}
                >
                    <option value="">{t('all.status')}</option>
                    {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                            {status.label}
                        </option>
                    ))}
                </Select>
            </FormControl>

            {/* Select de Situação */}
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="situation-label" shrink>{t('situation')}</InputLabel>
                <Select
                    native
                    label={t('situation')}
                    value={selectedSituation}
                    onChange={(e) => {
                        setSelectedSituation(e.target.value)
                        onFilter({
                            groupId: selectedGroup,
                            status: selectedStatus,
                            situation: e.target.value
                        })
                    }}
                    inputProps={{ 'aria-label': 'My Status Filter' }}
                >
                    <option value="">{t('all.situations')}</option>
                    {situationsOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                            {status.label}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    )
        :
        (
            <>
                <IconButton color="primary" onClick={toggleDrawer(true)}>
                    <FilterList />
                </IconButton>
                <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                    <Stack direction="column" spacing={3} sx={{ p: 2, width: "80vw", maxWidth: 360 }}>
                        <Typography variant="h6">{t("filters")}</Typography>

                        {/* Grupo */}
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="group-label" shrink>{t("group")}</InputLabel>
                            <Select
                                native
                                label={t("group")}
                                value={selectedGroup}
                                onChange={(e) => {
                                    setSelectedGroup(e.target.value)
                                    onFilter({
                                        groupId: e.target.value,
                                        status: selectedStatus,
                                        selfStatus: selectedSituation
                                    })
                                }}
                            >
                                <option value="">{t("all.groups")}</option>
                                {groupOptions.map((group) => (
                                    <option key={group.Id} value={group.value}>
                                        {group.label}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Status */}
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="status-label" shrink>{t("status")}</InputLabel>
                            <Select
                                native
                                label={t("status")}
                                value={selectedStatus}
                                onChange={(e) => {
                                    setSelectedStatus(e.target.value)
                                    onFilter({
                                        groupId: selectedGroup,
                                        status: e.target.value,
                                        selfStatus: selectedSituation
                                    })
                                }}
                            >
                                <option value="">{t("all.status")}</option>
                                {statusOptions.map((status) => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Situação */}
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="situation-label" shrink>{t("situation")}</InputLabel>
                            <Select
                                native
                                label={t("situation")}
                                value={selectedSituation}
                                onChange={(e) => {
                                    setSelectedSituation(e.target.value)
                                    onFilter({
                                        groupId: selectedGroup,
                                        status: selectedStatus,
                                        selfStatus: e.target.value
                                    })
                                }}
                            >
                                <option value="">{t("all.situations")}</option>
                                {situationsOptions.map((status) => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </Drawer>
            </>
        )
}

export default EventFilters