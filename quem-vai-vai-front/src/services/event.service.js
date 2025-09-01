import Api from "./api";

export const getEventsByUser = async () => {
    const response = await Api.get('events/user')
    return response.data
}

export const getEventById = async (id) => {
    const response = await Api.get(`events/${id}`)
    return response.data
}

export const getEventByCode = async (inviteCode) => {
    const response = await Api.get(`events/invitecode/${inviteCode}`)
    return response.data
}

export const createEvent = async (event) => {
    const response = await Api.post('events', event)
    return response.data
}

export const updateEvent = async (event) => {
    const response = await Api.put('events', event)
    return response.data
}

export const deleteEvent = async (eventid) => {
    const response = await Api.delete(`events/${eventid}`)
    return response.data
}