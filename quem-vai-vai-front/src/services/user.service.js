import Api from "./api";

export const getUser = async (userId) => {
  try {
    const response = await Api.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export const loginUser = async (email, password) => {
  try {
    const response = await Api.post('/api/users/login', { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}