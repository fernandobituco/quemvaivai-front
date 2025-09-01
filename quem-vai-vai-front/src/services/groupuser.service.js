import Api from "./api"

export const joinGroup = async (inviteCode) => {
    const response = await Api.post('groupusers/invite', {invitecode: inviteCode})
    return response.data
}

export const changeRole = async (groupId, userId, role) => {
    const response = await Api.put('groupusers', {groupid: groupId, userid: userId, role: role})
    return response.data
}

export const removeFromGroup = async (groupId, userId) => {
    const response = await Api.delete(`groupusers/${groupId}/${userId}`)
    return response.data
}

export const leaveGroup = async (groupId) => {
    const response = await Api.post('groupusers', {groupid: groupId})
    return response.data
}

export const getAllByGroupId = async (groupid) => {
  const response = await Api.get(`groupusers/group/${groupid}`)
  return response.data
}