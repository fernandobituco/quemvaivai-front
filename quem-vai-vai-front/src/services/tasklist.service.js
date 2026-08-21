import Api from "./api";

export const getTaskList = async (id) => {
  const response = await Api.get(`tasklists/${id}`)
  return response.data
}

export const getAllByEventId = async (eventId) => {
  const response = await Api.get(`tasklists/event/${eventId}`)
  return response.data
}

export const createTaskList = async (taskList) => {
  const response = await Api.post('tasklists', taskList)
  return response.data
}

export const updateTaskList = async (taskList) => {
  const response = await Api.put('tasklists', taskList)
  return response.data
}

export const deleteTaskList = async (taskListId) => {
  const response = await Api.delete(`tasklists/${taskListId}`)
  return response.data
}