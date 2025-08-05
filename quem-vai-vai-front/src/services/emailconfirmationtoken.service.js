import Api from "./api"

export const ConfirmAccount = async (token) => {
  const response = await Api.get(`email-confirmation/${token}`)
  return response.data
}