import CardsList from "@/components/Cards/CardsList"
import EventCard from "@/components/Cards/EventCard"
import { useLoading } from "@/contexts/LoadingContext"
import { useNotification } from "@/contexts/NotificationContext"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import * as GroupService from "@/services/groups.service"
import * as EventService from "@/services/event.service"

const Events = () => {

    const { t } = useTranslation()
    const { showLoading, hideLoading } = useLoading()
    const { showNotification } = useNotification()
    const { groupId } = useParams()

    const [groupOptions, setGroupOptions] = useState([])
    const [events, setEvents] = useState([])

    const getEvents = async (groupId) => {
        try {
            showLoading()
            const response = await EventService.getEventsByUser()
            setEvents(response.Data)
        } finally {
            hideLoading()
        }
    }

    const getGroups = async () => {
        try {
            showLoading()
            const response = await GroupService.getGroupsByUser()
            setGroupOptions(response.Data.map(g => ({value: g.Id, label: g.Name})))
        } finally {
            hideLoading()
        }
    }

    useEffect(() => {
        getEvents(groupId)
        getGroups()
    }, [])

    const addFields = [
        { name: "title", label: t('title'), type: "text", required: true },
        { name: "description", label: t('description'), type: "text", required: false },
        { name: "location", label: t('location'), type: "text", required: false },
        { name: "eventDate", label: t('date'), type: "date", required: false },
        { name: "groupId", label: t('group'), type: "select", required: false, options: groupOptions },
    ]

    const handleSubmit = async (event) => {
        const response = await EventService.createEvent(event)
        if (response.StatusCode = 200) {
            setEvents([...events, { ...response.Data }])
        } else {
            showNotification(response.Error)
        }
    }

    const updateStatusOnEvent = (eventId, newStatus) => {
        setEvents(events.map(e => e.Id != eventId ? e : { ...e, Status: newStatus }))
    }

    const eventCards = events.map(event =>
        <EventCard event={event} onUpdateStatus={updateStatusOnEvent}/>
    )

    return (
        <CardsList
            title={t('events')}
            description="lista de eventos"
            submitLabel="Salvar Alterações"
            cards={eventCards}
            addFields={addFields}
            entity={t('event')}
            onSubmit={handleSubmit}
        />
    )
}

export default Events