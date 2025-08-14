import Api from "./api";

export const getProfile = async (user) => {
  const response = await Api.get('users/profile')
  return response.data
}

export const createUser = async (user) => {
  const response = await Api.post('users', user)
  return response.data
}

export const updateUser = async (user) => {
  const response = await Api.put('users', user)
  return response.data
}

export const deleteUser = async (userid) => {
  const response = await Api.delete(`users/${userid}`)
  return response.data
}