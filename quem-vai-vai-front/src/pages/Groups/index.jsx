import GroupsCards from "@/components/Cards/GroupsCards"
import CardsList from "@/components/CardsList"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const Groups = () => {

    const { t } = useTranslation()
    const [groups, setGroups] = useState([
        { title: "grupo 1", members: 33 },
        { title: "grupo 2", members: 35 },
        { title: "grupo 3", members: 21 },
        { title: "grupo 4", members: 27 },
        { title: "grupo 5", members: 53 },
        { title: "grupo 1", members: 33 },
        { title: "grupo 2", members: 35 },
        { title: "grupo 3", members: 21 },
        { title: "grupo 4", members: 27 },
        { title: "grupo 5", members: 53 },
        { title: "grupo 1", members: 33 },
        { title: "grupo 2", members: 35 },
        { title: "grupo 3", members: 21 },
        { title: "grupo 4", members: 27 },
        { title: "grupo 5", members: 53 },
        { title: "grupo 1", members: 33 },
        { title: "grupo 2", members: 35 },
        { title: "grupo 3", members: 21 },
        { title: "grupo 4", members: 27 },
        { title: "grupo 5", members: 53 },
        { title: "grupo 1", members: 33 },
        { title: "grupo 2", members: 35 },
        { title: "grupo 3", members: 21 },
        { title: "grupo 4", members: 27 },
        { title: "grupo 5", members: 53 },
    ])

    const addFields = [
        { name: "nome", label: t('name'), type: "text", required: true },
        { name: "description", label: t('description'), type: "text", required: false },
    ]

    const cards = groups.map(group =>
        <GroupsCards
            title="Conferência de Tecnologia 2024"
            description="Um evento incrível sobre as últimas tendências em tecnologia, com palestrantes renomados e networking."
            memberCount={156}
            eventCount={12}
            hasActiveEvent={true}
            onEdit={() => console.log("Conferência de Tecnologia 2024")}
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
        />
    )
}

export default Groups