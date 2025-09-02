import Api from "./api"

export const joinEvent = async (inviteCode, status) => {
    const response = await Api.post('userevents/invite', {invitecode: inviteCode, status: status})
    return response.data
}

export const changeRole = async (eventId, userId, role) => {
    const response = await Api.put('userevents/change-role', {eventid: eventId, userid: userId, role: role})
    return response.data
}

export const changeStatus = async (eventId, status) => {
    const response = await Api.put('userevents/change-status', {eventid: eventId, status: status})
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