import GroupsCards from "@/components/Cards/GroupsCards"
import CardsList from "@/components/CardsList"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import * as GroupService from "@/services/groups.service"
import { useNotification } from "@/contexts/NotificationContext"
import EditForm from "@/components/EditForm"

const Groups = () => {

    const { t } = useTranslation()
    const { showNotification } = useNotification()

    const [groups, setGroups] = useState([])

    useEffect(() => {
        const getGroups = async () => {
            const response = await GroupService.getGroupsByUser()
            if (response.StatusCode == 200) {
                setGroups(response.Data)
            }
        }
        getGroups()
    }, [])

    const addFields = [
        { name: "name", label: t('name'), type: "text", required: true },
        { name: "description", label: t('description'), type: "text", required: false },
    ]

    const handleSubmit = async (group) => {
        const response = await GroupService.createGroup(group)
        if (response.StatusCode = 200) {
            setGroups([...groups, response.Data])
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