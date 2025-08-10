import Api from "./api";

export const getUser = async (userId) => {
  try {
    const response = await Api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createUser = async (user) => {
  const response = await Api.post('users', user)
  return response.data
}