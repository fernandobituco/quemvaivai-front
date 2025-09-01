import Api from "./api"

export const joinEvent = async (inviteCode) => {
    const response = await Api.post('userevents/invite', {invitecode: inviteCode})
    return response.data
}

export const changeRole = async (eventId, userId, role) => {
    const response = await Api.put('userevents', {eventid: eventId, userid: userId, role: role})
    return response.data
}

export const removeFromEvent = async (eventId, userId) => {
    const response = await Api.delete(`userevents/${eventId}/${userId}`)
    return response.data
}

export const leaveEvent = async (eventId) => {
    const response = await Api.post('userevents', {eventid: eventId})
    return response.data
}

export const getAllByEventId = async (eventid) => {
  const response = await Api.get(`userevents/event/${eventid}`)
  return response.data
}