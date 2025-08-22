import GroupsCards from "@/components/Cards/GroupsCards"
import CardsList from "@/components/Cards/CardsList"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import * as GroupService from "@/services/groups.service"
import * as GroupUserService from "@/services/groupuser.service"
import { useNotification } from "@/contexts/NotificationContext"
import { useNavigate, useParams } from "react-router-dom"
import { useLoading } from "@/contexts/LoadingContext"

const Groups = () => {

    const { t } = useTranslation()
    const { showNotification } = useNotification()
    const { invitecode } = useParams()
    const { showLoading, hideLoading } = useLoading()
    const navigate = useNavigate()

    const [groups, setGroups] = useState([])

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
        const joinGroup = async () => {
            try {
                showLoading()
                const response = await GroupUserService.joinGroup(invitecode)
                if (response.StatusCode == 200) {
                    showNotification(t('join.group.success'), 'success')
                    hideLoading()
                }
            } finally {
                navigate('/groups')
            }
        }
        if (invitecode) {
            joinGroup()
        } else {
            getGroups()
        }
    }, [])

    const addFields = [
        { name: "name", label: t('name'), type: "text", required: true },
        { name: "description", label: t('description'), type: "text", required: false },
    ]

    const handleSubmit = async (group) => {
        const response = await GroupService.createGroup(group)
        if (response.StatusCode = 200) {
            setGroups([...groups, {...response.Data, CanEdit: true}])
        } else {
            showNotification(response.Error)
        }
    }

    const cards = groups.map(group =>
        <GroupsCards
            group={group}
        />
    )

    return (
        <CardsList
            title="Grupos"
            description="lista de grupos"
            submitLabel="Salvar Alterações"
            cards={cards}
            addFields={addFields}
            entity={t('group')}
            onSubmit={handleSubmit}
        />
    )
}

export default Groups