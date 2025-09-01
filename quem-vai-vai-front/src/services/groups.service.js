import Api from "./api";

export const getGroupsByUser = async () => {
    const response = await Api.get('groups/user')
    return response.data
}

export const getGroupById = async (id) => {
    const response = await Api.get(`groups/${id}`)
    return response.data
}

export const getGroupByCode = async (inviteCode) => {
    const response = await Api.get(`groups/invitecode/${inviteCode}`)
    return response.data
}

export const createGroup = async (group) => {
    const response = await Api.post('groups', group)
    return response.data
}

export const updateGroup = async (group) => {
    const response = await Api.put('groups', group)
    return response.data
}

export const deleteGroup = async (groupid) => {
    const response = await Api.delete(`groups/${groupid}`)
    return response.data
}